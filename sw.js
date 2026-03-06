// ─────────────────────────────────────────────────────────────
//  ParkPX Service Worker  v9
//  Responsabilidades:
//   1. Receber mensagens da app (schedule / cancel)
//   2. Agendar notificações de expiração (10min antes + no fim)
//   3. Enviar notificação clicável que reabre a app no Success
//   4. Limpar timers quando a sessão é renovada ou cancelada
// ─────────────────────────────────────────────────────────────

const SW_VERSION = "pkx-sw-v9";

// Mapa de timers activos: plate+zone → [timerId, timerId]
const timers = new Map();

// ── Install / Activate ────────────────────────────────────────
self.addEventListener("install",  () => self.skipWaiting());
self.addEventListener("activate", e  => e.waitUntil(self.clients.claim()));

// ── Mensagens vindas da app ───────────────────────────────────
self.addEventListener("message", e => {
  const { type, payload } = e.data || {};

  if (type === "SCHEDULE") {
    // payload: { plate, zone, zoneName, endTime (ISO), ref }
    scheduleParkingAlerts(payload);
  }

  if (type === "CANCEL") {
    // payload: { plate, zone }
    cancelAlerts(payload.plate, payload.zone);
  }

  if (type === "PING") {
    // Health check — app verifica se SW está vivo
    e.source?.postMessage({ type: "PONG", version: SW_VERSION });
  }
});

// ── Agendar alertas ───────────────────────────────────────────
function scheduleParkingAlerts({ plate, zone, zoneName, endTime, ref }) {
  const key = plate + "|" + zone;
  cancelAlerts(plate, zone); // limpar anteriores se existirem

  const end   = new Date(endTime).getTime();
  const now   = Date.now();
  const warn  = end - 10 * 60 * 1000; // 10 min antes
  const ids   = [];

  // Aviso de 10 minutos
  if (warn > now) {
    const delay = warn - now;
    ids.push(setTimeout(() => {
      notify({
        title: "⏱ Estacionamento a expirar",
        body:  `${plate} · Zona ${zone} — expira em 10 minutos. Toque para prolongar.`,
        tag:   "pkx-warn-" + key,
        data:  { plate, zone, ref, action: "renew" },
      });
    }, delay));
  }

  // Aviso de expiração
  if (end > now) {
    const delay = end - now;
    ids.push(setTimeout(() => {
      notify({
        title: "🅿️ Sessão expirada",
        body:  `${plate} · Zona ${zoneName||zone} — renovar para continuar estacionado.`,
        tag:   "pkx-exp-" + key,
        data:  { plate, zone, ref, action: "renew" },
      });
    }, delay));
  }

  if (ids.length) timers.set(key, ids);
}

// ── Cancelar alertas ──────────────────────────────────────────
function cancelAlerts(plate, zone) {
  const key = plate + "|" + zone;
  const ids = timers.get(key) || [];
  ids.forEach(id => clearTimeout(id));
  timers.delete(key);
}

// ── Enviar notificação ────────────────────────────────────────
function notify({ title, body, tag, data }) {
  self.registration.showNotification(title, {
    body,
    tag,
    data,
    icon:  "/icon-192.png",   // substituir pelo ícone real em produção
    badge: "/badge-72.png",
    requireInteraction: true, // fica visível até o utilizador interagir
    actions: [
      { action: "renew",   title: "🔄 Renovar" },
      { action: "dismiss", title: "Dispensar"  },
    ],
  }).catch(() => {
    // Fallback silencioso se a permissão foi revogada
  });
}

// ── Click na notificação ──────────────────────────────────────
self.addEventListener("notificationclick", e => {
  e.notification.close();

  const { action } = e;
  const { plate, zone, ref } = e.notification.data || {};

  if (action === "dismiss") return;

  // Abrir ou focar o tab da app, na página de sucesso/renovação
  e.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(clients => {
      // Procurar tab já aberto
      const existing = clients.find(c => c.url.includes(self.registration.scope));
      if (existing) {
        existing.focus();
        // Enviar mensagem para a app navegar para o ecrã de sucesso
        existing.postMessage({ type: "OPEN_RENEW", plate, zone, ref });
        return;
      }
      // Abrir novo tab
      return self.clients.openWindow(
        self.registration.scope + "?renew=" + encodeURIComponent(plate) + "&zona=" + zone
      );
    })
  );
});
