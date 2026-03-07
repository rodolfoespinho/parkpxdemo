import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─────────────────────────────────────────────
//  LOGÓTIPO — Câmara Municipal de Peniche (SVG inline base64)
// ─────────────────────────────────────────────
const CMP_LOGO="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FtYWRhXzIiIGRhdGEtbmFtZT0iQ2FtYWRhIDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE5Ni41OCA0Ni4yMSI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogIzJmMzU0MzsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiAjMjI2NTJjOwogICAgICB9CgogICAgICAuY2xzLTIsIC5jbHMtMywgLmNscy00LCAuY2xzLTUsIC5jbHMtNiwgLmNscy03LCAuY2xzLTgsIC5jbHMtOSwgLmNscy0xMCwgLmNscy0xMSwgLmNscy0xMiwgLmNscy0xMywgLmNscy0xNCwgLmNscy0xNSwgLmNscy0xNiB7CiAgICAgICAgZmlsbC1ydWxlOiBldmVub2RkOwogICAgICB9CgogICAgICAuY2xzLTMgewogICAgICAgIGZpbGw6ICMxYjNmMWU7CiAgICAgIH0KCiAgICAgIC5jbHMtNCB7CiAgICAgICAgZmlsbDogIzI0MGQxYjsKICAgICAgfQoKICAgICAgLmNscy01IHsKICAgICAgICBmaWxsOiAjODJiYjI2OwogICAgICB9CgogICAgICAuY2xzLTYgewogICAgICAgIGZpbGw6ICMxYTNjMWU7CiAgICAgIH0KCiAgICAgIC5jbHMtNyB7CiAgICAgICAgZmlsbDogIzAwNjU3ZjsKICAgICAgfQoKICAgICAgLmNscy04IHsKICAgICAgICBmaWxsOiAjMWFhMmIyOwogICAgICB9CgogICAgICAuY2xzLTkgewogICAgICAgIGZpbGw6ICMxYTlmYjI7CiAgICAgIH0KCiAgICAgIC5jbHMtMTAgewogICAgICAgIGZpbGw6ICMwMDQxNWE7CiAgICAgIH0KCiAgICAgIC5jbHMtMTEgewogICAgICAgIGZpbGw6ICMwMDNlNTg7CiAgICAgIH0KCiAgICAgIC5jbHMtMTIgewogICAgICAgIGZpbGw6ICMwMzZjODI7CiAgICAgIH0KCiAgICAgIC5jbHMtMTMgewogICAgICAgIGZpbGw6ICM0MWJjY2Y7CiAgICAgIH0KCiAgICAgIC5jbHMtMTQgewogICAgICAgIGZpbGw6ICMzYzg4MzQ7CiAgICAgIH0KCiAgICAgIC5jbHMtMTUgewogICAgICAgIGZpbGw6ICMyOTcwMzA7CiAgICAgIH0KCiAgICAgIC5jbHMtMTYgewogICAgICAgIGZpbGw6ICMxYzA5MTg7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJDYW1hZGFfMS0yIiBkYXRhLW5hbWU9IkNhbWFkYSAxIj4KICAgIDxnPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik00Mi4zNiwxNC40MmgxMC45YzEuNiwwLDMuMDMuMjIsNC4yOS42NywxLjI2LjQ0LDIuMzIsMS4wNywzLjIsMS44OS44OC44MSwxLjU1LDEuNzgsMi4wMiwyLjkxLjQ3LDEuMTMuNywyLjM4LjcsMy43NXYuMDhjMCwxLjU1LS4yOCwyLjkxLS44NCw0LjA4LS41NiwxLjE3LTEuMzMsMi4xNS0yLjMsMi45My0uOTguNzktMi4xMiwxLjM4LTMuNDMsMS43Ny0xLjMxLjM5LTIuNzEuNTktNC4yMS41OWgtNC40NnY4aC01Ljg3VjE0LjQyWk01Mi44OCwyNy44NmMxLjQ3LDAsMi42Mi0uMzksMy40My0xLjE2czEuMjItMS43MywxLjIyLTIuODh2LS4wOGMwLTEuMzItLjQzLTIuMzItMS4yOC0zLjAxLS44NS0uNjktMi4wMS0xLjAzLTMuNDktMS4wM2gtNC41M3Y4LjE1aDQuNjVaIi8+CiAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSI2NC45OCAxNC40MiA4NS4wNiAxNC40MiA4NS4wNiAxOS42NCA3MC43NyAxOS42NCA3MC43NyAyNS4wNSA4My4zNCAyNS4wNSA4My4zNCAzMC4yNiA3MC43NyAzMC4yNiA3MC43NyAzNS44NiA4NS4yNSAzNS44NiA4NS4yNSA0MS4wOCA2NC45OCA0MS4wOCA2NC45OCAxNC40MiIvPgogICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iODcuNjcgMTQuNDIgOTMuMDggMTQuNDIgMTA1LjU4IDMwLjg0IDEwNS41OCAxNC40MiAxMTEuMzcgMTQuNDIgMTExLjM3IDQxLjA4IDEwNi4zOCA0MS4wOCA5My40NiAyNC4xMyA5My40NiA0MS4wOCA4Ny42NyA0MS4wOCA4Ny42NyAxNC40MiIvPgogICAgICA8cmVjdCBjbGFzcz0iY2xzLTEiIHg9IjExNS4yIiB5PSIxNC40MiIgd2lkdGg9IjUuODciIGhlaWdodD0iMjYuNjciLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTM3LjQsNDEuNTRjLTEuOTYsMC0zLjc3LS4zNi01LjQ1LTEuMDctMS42OC0uNzEtMy4xMi0xLjY4LTQuMzQtMi45MS0xLjIyLTEuMjMtMi4xNy0yLjY5LTIuODYtNC4zNi0uNjktMS42OC0xLjAzLTMuNDctMS4wMy01LjM3di0uMDhjMC0xLjkuMzQtMy42OSwxLjAzLTUuMzUuNjktMS42NiwxLjY0LTMuMTIsMi44Ni00LjM4LDEuMjItMS4yNiwyLjY4LTIuMjUsNC4zOC0yLjk3LDEuNy0uNzIsMy41OC0xLjA5LDUuNjQtMS4wOSwxLjI0LDAsMi4zOC4xLDMuNDEuMywxLjAzLjIsMS45Ni40OCwyLjguODQuODQuMzYsMS42MS43OSwyLjMyLDEuMy43MS41MSwxLjM3LDEuMDcsMS45OCwxLjY4bC0zLjczLDQuM2MtMS4wNC0uOTQtMi4xLTEuNjgtMy4xOC0yLjIxLTEuMDgtLjUzLTIuMjktLjgtMy42NC0uOC0xLjEyLDAtMi4xNS4yMi0zLjEuNjUtLjk1LjQzLTEuNzcsMS4wMy0yLjQ2LDEuNzktLjY5Ljc2LTEuMjIsMS42NC0xLjYsMi42NS0uMzgsMS0uNTcsMi4wOC0uNTcsMy4yMnYuMDhjMCwxLjE0LjE5LDIuMjIuNTcsMy4yNC4zOCwxLjAyLjkxLDEuOSwxLjU4LDIuNjcuNjcuNzYsMS40OSwxLjM3LDIuNDQsMS44MS45NS40NCwyLC42NywzLjE0LjY3LDEuNTIsMCwyLjgxLS4yOCwzLjg3LS44NCwxLjA1LS41NiwyLjEtMS4zMiwzLjE0LTIuMjlsMy43MywzLjc3Yy0uNjkuNzQtMS40LDEuNC0yLjEzLDEuOTgtLjc0LjU4LTEuNTQsMS4wOS0yLjQyLDEuNS0uODguNDItMS44NC43NC0yLjg4Ljk1LTEuMDQuMjItMi4yMS4zMi0zLjUuMzIiLz4KICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjE1MC4xOSAxNC40MiAxNTYuMDYgMTQuNDIgMTU2LjA2IDI0Ljk3IDE2Ni44OCAyNC45NyAxNjYuODggMTQuNDIgMTcyLjc0IDE0LjQyIDE3Mi43NCA0MS4wOCAxNjYuODggNDEuMDggMTY2Ljg4IDMwLjM4IDE1Ni4wNiAzMC4zOCAxNTYuMDYgNDEuMDggMTUwLjE5IDQxLjA4IDE1MC4xOSAxNC40MiIvPgogICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iMTc2LjMxIDE0LjQyIDE5Ni4zOSAxNC40MiAxOTYuMzkgMTkuNjQgMTgyLjEgMTkuNjQgMTgyLjEgMjUuMDUgMTk0LjY4IDI1LjA1IDE5NC42OCAzMC4yNiAxODIuMSAzMC4yNiAxODIuMSAzNS44NiAxOTYuNTggMzUuODYgMTk2LjU4IDQxLjA4IDE3Ni4zMSA0MS4wOCAxNzYuMzEgMTQuNDIiLz4KICAgICAgPHBvbHlnb24gY2xhc3M9ImNscy0xIiBwb2ludHM9IjQyLjA1IDExLjEyIDQyLjY3IDExLjEyIDQyLjY3IDMuNTkgNDYuMSA4LjU4IDQ2LjE1IDguNTggNDkuNTggMy41OSA0OS41OCAxMS4xMiA1MC4yMiAxMS4xMiA1MC4yMiAyLjQ1IDQ5LjYyIDIuNDUgNDYuMTQgNy41OCA0Mi42NSAyLjQ1IDQyLjA1IDIuNDUgNDIuMDUgMTEuMTIiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNTUuMywxMS4yNmMyLjExLDAsMy41NS0xLjMzLDMuNTUtMy44MlYyLjQ1aC0uNjR2NS4wN2MwLDIuMDktMS4xMywzLjE2LTIuODksMy4xNnMtMi45NC0xLjE4LTIuOTQtMy4yMlYyLjQ1aC0uNjR2NS4wN2MwLDIuNDMsMS40NywzLjc0LDMuNTYsMy43NCIvPgogICAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTEiIHBvaW50cz0iNjAuMzcgMTEuMTIgNjAuOTkgMTEuMTIgNjAuOTkgMy40MiA2Ny4xIDExLjEyIDY3LjU4IDExLjEyIDY3LjU4IDIuNDUgNjYuOTYgMi40NSA2Ni45NiAxMCA2MC45OCAyLjQ1IDYwLjM3IDIuNDUgNjAuMzcgMTEuMTIiLz4KICAgICAgPHJlY3QgY2xhc3M9ImNscy0xIiB4PSI2OS4zMiIgeT0iMi40NSIgd2lkdGg9Ii42NCIgaGVpZ2h0PSI4LjY3Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTc1LjY0LDExLjI3YzEuNTQsMCwyLjUzLS42MSwzLjQ0LTEuNTFsLS40My0uNDJjLS44OC44Ny0xLjczLDEuMzUtMi45OSwxLjM1LTIuMDcsMC0zLjY3LTEuNzEtMy42Ny0zLjl2LS4wMmMwLTIuMTgsMS41Ny0zLjg4LDMuNjUtMy44OCwxLjMsMCwyLjE3LjU1LDIuOTIsMS4yOGwuNDYtLjQ3Yy0uODktLjgyLTEuODItMS4zOS0zLjM3LTEuMzktMi41LDAtNC4zNCwyLjAzLTQuMzQsNC40OHYuMDJjMCwyLjQ5LDEuODMsNC40Niw0LjMxLDQuNDYiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODAuMSwxLjY1aC41MmwxLjMzLTEuMjgtLjc2LS4zNy0xLjA5LDEuNjVaTTgwLjAyLDExLjEyaC42NFYyLjQ1aC0uNjR2OC42N1oiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODMuMDUsNy4zVjMuMDVoMi40NWMxLjU2LDAsMi42My43MiwyLjYzLDIuMDl2LjAyYzAsMS4yOS0xLjA5LDIuMTMtMi43LDIuMTNoLTIuMzhaTTgyLjQsMTEuMTJoLjY0di0zLjIzaDIuMzRjMS44MSwwLDMuMzgtLjk0LDMuMzgtMi43NnYtLjAyYzAtMS42Ny0xLjMxLTIuNjUtMy4yMi0yLjY1aC0zLjE1djguNjdaIi8+CiAgICAgIDxyZWN0IGNsYXNzPSJjbHMtMSIgeD0iODkuODQiIHk9IjIuNDUiIHdpZHRoPSIuNjQiIGhlaWdodD0iOC42NyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik05Ni4yMiwxMC42OWMtMi4xNCwwLTMuNy0xLjc2LTMuNy0zLjl2LS4wMmMwLTIuMTQsMS41NC0zLjg4LDMuNjgtMy44OHMzLjcsMS43NiwzLjcsMy45di4wMmMwLDIuMTQtMS41NCwzLjg4LTMuNjgsMy44OE05Ni4yLDExLjI3YzIuNjMsMCw0LjM3LTIuMTIsNC4zNy00LjQ4dDAtLjAyYzAtMi4zNy0xLjcyLTQuNDYtNC4zNS00LjQ2cy00LjM3LDIuMTItNC4zNyw0LjQ4di4wMmMwLDIuMzcsMS43Miw0LjQ2LDQuMzUsNC40NloiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTA2LjIsMTAuNTNWMy4wNWgyLjI0YzIuNDIsMCwzLjk0LDEuNjgsMy45NCwzLjc0di4wMmMwLDIuMDctMS41MiwzLjcyLTMuOTQsMy43MmgtMi4yNFpNMTA1LjU2LDExLjEyaDIuODljMi43MywwLDQuNjEtMS45LDQuNjEtNC4zNHYtLjAyYzAtMi40NC0xLjg4LTQuMzEtNC42MS00LjMxaC0yLjg5djguNjdaIi8+CiAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSIxMTQuMzIgMTEuMTIgMTIwLjU1IDExLjEyIDEyMC41NSAxMC41MyAxMTQuOTcgMTAuNTMgMTE0Ljk3IDcuMDUgMTE5LjkzIDcuMDUgMTE5LjkzIDYuNDUgMTE0Ljk3IDYuNDUgMTE0Ljk3IDMuMDUgMTIwLjQ5IDMuMDUgMTIwLjQ5IDIuNDUgMTE0LjMyIDIuNDUgMTE0LjMyIDExLjEyIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTAiIGQ9Ik0xNC4yMSwzOC4wM2MuODcuMDEsMS43MywwLDIuNTctLjAzLjYxLDEuMDQsMS40MiwxLjk0LDIuMzcsMi42N2gwYy0xLjU2LS4xMy0yLjk2LS4yNi00LjIzLS40MS0uMzUtLjY5LS42LTEuNDQtLjcxLTIuMjMiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xMiIgZD0iTTE0LjM2LDM1LjMxYy40NS0uMDMuOS0uMDYsMS4zNS0uMS4yLjk5LjU3LDEuOTMsMS4wNywyLjc4LS44Ni4wMy0xLjcxLjA1LTIuNTYuMDQtLjA0LS4zMi0uMDctLjY1LS4wNy0uOTgsMC0uNi4wOC0xLjE5LjIyLTEuNzQiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xMiIgZD0iTTEwLjM3LDM1LjQ1Yy4zLDAsLjYsMCwuODktLjAxLS4xNS44LS4xNywxLjY1LS4wNiwyLjUtLjc0LS4wNC0xLjQ4LS4xLTIuMjItLjE4LjMzLS44Mi44MS0xLjYsMS4zOS0yLjMiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy05IiBkPSJNMTEuMjUsMzUuNDljLjA4LS40NC4yLS44Ni4zNy0xLjI3LS40Ny4zOC0uOTEuODItMS4yOSwxLjI5LjMxLDAsLjYyLDAsLjkyLS4wMSIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTkiIGQ9Ik0xNS43MSwzNS4yM2MtLjEzLS42MS0uMTktMS4yNC0uMTktMS44OSwwLS4xNiwwLS4zMy4wMS0uNDktLjU1LjczLS45NSwxLjU3LTEuMTgsMi40OS40NS0uMDMuOTEtLjA3LDEuMzYtLjExIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtOSIgZD0iTTE2LjkyLDI4LjE5aDBjLTQuOTYuODMtOS4yNC41Mi0xNC41OC0uMjVoMGMtMS4wNCwyLjEtMS40Miw0LjU1LTEsNy4wMSwxLjg2LjI0LDMuNzIuNCw1LjU4LjQ5LDEuOTItMy40NSw1LjcyLTYuMSw5LjMtNy4wMi4yNS0uMDYuNDgtLjE0LjctLjIyIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtNyIgZD0iTTUsMjQuNTZsLjAzLS4wMnMwLDAsMCwwYzEuMjQtMS4wMywyLjc1LTEuNzcsNC40OS0yLjEzLDUuMTEtMS4wNSw4LjU0LjY3LDkuMzMsMi41OGgwYy00LjQ0LjQzLTkuMDUuMzgtMTMuODItLjQ0aDBzLS4wMi4wMi0uMDIuMDJoMFoiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xMSIgZD0iTTUuMDIsMjQuNTNjNC43OC43Niw5LjM4Ljg3LDEzLjgzLjQ0LjUxLDEuMjItLjA1LDIuNTEtMS45MywzLjIyLTQuOTYuODMtOS41MS41LTE0LjU4LS4yNS42NS0xLjMxLDEuNTYtMi40NywyLjY5LTMuNDEiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy02IiBkPSJNMzIuMTUsMjIuMDR2LjVoMGMtMy44MSwyLjA4LTcuMTksMy41Mi0xMC4zMiw0LjQ5LjA0LS4yMi4wOC0uNDYuMS0uNzIuMDYtLjU5LDAtMS4xNi0uMTItMS42OSwzLjU0LS41NCw2Ljk4LTEuNDEsMTAuMzQtMi41NyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0zMi4xNSwxNi40N3YyLjc5czAsMi43NywwLDIuNzdjLTMuMzYsMS4xNi02LjgsMi4wMy0xMC4zNCwyLjU3LS4zMi0xLjI2LTEuMTEtMi4zNi0yLjEzLTMuMiw0LjA3LS45NSw4LjIyLTIuNjIsMTIuNDctNC45MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTkiIGQ9Ik0zMi4xNSwyMi41NGgwYy0zLjgxLDIuMDgtNy4xOSwzLjUyLTEwLjMyLDQuNDktLjY1LDMuMy0zLjEzLDIuNDEtMy4xNyw2LjYxLDAsLjQ0LjAzLjg1LjExLDEuMjQsNC42OC0uNjQsOS4xMi0xLjgyLDEzLjM2LTMuNDYsMC0uMTguMDEtLjM3LjAxLS41NnYtOC4zMnMwLS4xOSwwLS4xOXYuMTlaIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTAiIGQ9Ik0yMC4zMSwzNy43NGMzLjU5LS4zNiw3LjE5LTEuMDMsMTAuOC0xLjk5LTIuMzQsNC41Ny03Ljk5LDQuNzctMTAuOCwxLjk5Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTMiIGQ9Ik0xMy41OSw0My41NWMtMS4yNy4wNi0yLjQ0LjEtMy45Ni4xMi0uMDYsMC0uMi4wMi0uMjEsMCwxLjI3LDEuNjUsMy42NSwyLjcyLDcuNzUsMi41MS0xLjMyLS40LTIuNTYtMS4zNi0zLjU4LTIuNjMiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xMyIgZD0iTTE3LjEyLDQyLjc4bC0uMDMtLjAyaDBzLjAzLjAyLjAzLjAyWk0yMy4yLDQyLjQxYy0xLjYuMzEtMy4zNC41OS01LjM3LjgxLjk5LjU0LDIuMTIuODQsMy4zMy44NCwxLjY3LDAsMy4yMS0uNTksNC40Mi0xLjU3LS4yOC4wMy0uNTcuMDQtLjg2LjA0LS41MiwwLTEuMDItLjA0LTEuNTItLjEzWiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEwIiBkPSJNMS43MSwzNi40OWgwYzEuNDUuMzYsMi45MS42Niw0LjM2Ljg5LS4xMi4zOC0uMjIuNzctLjI5LDEuMTctMS4yNi0uMzYtMi40Ny0uNzUtMy43Ny0xLjE5LS4xMS0uMjktLjIyLS41Ny0uMzEtLjg2Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTIiIGQ9Ik0xLjM0LDM0Ljk1aDBjMS44Ni4yMywzLjcyLjQsNS41OC40OWgwYy0uMzUuNjItLjYzLDEuMjctLjg0LDEuOTQtMS40Ni0uMjMtMi45MS0uNTItNC4zNi0uODgtLjE2LS41MS0uMjgtMS4wMi0uMzctMS41NCIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTE0IiBkPSJNMCwxMS4zM3MwLS4wMywwLS4wNWMwLC4wMiwwLC4wMywwLC4wNU0wLDExLjM4czAtLjAzLDAtLjA1YzAsLjAyLDAsLjAzLDAsLjA1Wk0zMi4xNSwxNi40N2MtNC4yNSwyLjMxLTguNCwzLjk4LTEyLjQ3LDQuOTMtLjU1LS40Ni0xLjE3LS44NS0xLjgxLTEuMTUtMi43NS0xLjMtNi4wMS0xLjMzLTguOTQtLjczLTEuNjguMzQtMy4yNS45OS00LjY1LDEuOTEtMS40My0uMzYtMi44Ni0uODItNC4yOC0xLjM5SDBTMCwxOS4yNywwLDE5LjI3di0xLjY2czAtNi4yMywwLTYuMjN2LjQ3YzEyLjIsNS43MSwyMi42MSw2LjExLDMyLjE1LDMuOTR2LjY4WiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTUiIGQ9Ik0zMi4xNSwxNS44YzAtMS40NywwLTIuOTQsMC00LjQxLDAtMS4xMS0uOTEtMi4wMi0yLjAyLTIuMDItMS4yOCwwLTIuNTYsMC0zLjg0LDBoLTEuNjZjLTUuNywwLTExLjQxLDAtMTcuMTEsMC0uNTUsMC0xLjEsMC0xLjY2LDAtMS4yOCwwLTIuNTYsMC0zLjg0LDBDLjkxLDkuMzYsMCwxMC4yNywwLDExLjM4di40N2MxMi4yLDUuNzEsMjIuNjEsNi4xMSwzMi4xNSwzLjk0Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTAiIGQ9Ik04Ljk5LDM3LjczYy43NC4wNywxLjQ4LjE0LDIuMjEuMTguMDguNjMuMjIsMS4yNy40MSwxLjktMS4xMi0uMTgtMi4xMy0uMzctMy4wNy0uNTguMS0uNS4yNS0xLjAxLjQ1LTEuNSIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xLjYsMzYuMTFzLjAzLjA5LjA0LjE0Yy0uMDEtLjA1LS4wMy0uMDktLjA0LS4xNCIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEyIiBkPSJNMTguNzgsMzQuODdjNC42OC0uNjQsOS4xMi0xLjgyLDEzLjM2LTMuNDYtLjA3LDEuNzQtLjQ1LDMuMTgtMS4wNCw0LjM0LTMuNjEuOTUtNy4yMSwxLjYzLTEwLjgsMS45OS0uNzUtLjc1LTEuMy0xLjcxLTEuNTMtMi44NyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0wLDIzLjUyYy41MS4xMywxLjAyLjI0LDEuNTMuMzYtLjIzLjI3LS40Ni41Ni0uNjcuODUtLjMxLjQ0LS42Ljg5LS44NiwxLjM1di0yLjU2WiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTE1IiBkPSJNNC4yOCwyMS40NGMtMS4wMi42Ny0xLjk1LDEuNDktMi43NSwyLjQ0LS41MS0uMTEtMS4wMi0uMjMtMS41My0uMzZ2Mi41Ni02LjAzczAsMCwwLDBjMS40Mi41NywyLjg1LDEuMDMsNC4yOCwxLjM5Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIuNiwyYzEuNCwwLDIuNTMsMS4xMywyLjUzLDIuNTNzLTEuMTMsMi41My0yLjUzLDIuNTNDMS4yLDcuMDYuMDYsNS45Mi4wNiw0LjUzUzEuMiwyLDIuNiwyIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTkuMzMsMmMxLjQsMCwyLjUzLDEuMTMsMi41MywyLjUzLDAsMS40LTEuMTMsMi41My0yLjUzLDIuNTNzLTIuNTMtMS4xMy0yLjUzLTIuNTNjMC0xLjQsMS4xMy0yLjUzLDIuNTMtMi41MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNi4wNywyYzEuNCwwLDIuNTMsMS4xMywyLjUzLDIuNTNzLTEuMTMsMi41My0yLjUzLDIuNTNjLTEuNCwwLTIuNTMtMS4xMy0yLjUzLTIuNTNzMS4xMy0yLjUzLDIuNTMtMi41MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yMi44LDJjMS40LDAsMi41MywxLjEzLDIuNTMsMi41MywwLDEuNC0xLjEzLDIuNTMtMi41MywyLjUzLTEuNCwwLTIuNTMtMS4xMy0yLjUzLTIuNTMsMC0xLjQsMS4xMy0yLjUzLDIuNTMtMi41MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yOS41NCwyYzEuNCwwLDIuNTMsMS4xMywyLjUzLDIuNTNzLTEuMTMsMi41My0yLjUzLDIuNTNjLTEuNCwwLTIuNTMtMS4xMy0yLjUzLTIuNTNzMS4xMy0yLjUzLDIuNTMtMi41MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTE2IiBkPSJNMi4wMSwzNy4zNWMxLjMuNDQsMi41MS44MywzLjc3LDEuMTktLjI0LDEuMzQtLjE4LDIuNzYuMjgsNC4xOS0xLjk1LTEuNTgtMy4yNy0zLjQ0LTQuMDUtNS4zOE0xMy41OSw0My41NWMtMS4yNy4wNi0yLjY2LjEtNC4xNy4xMi0uOTYtMS4yNy0xLjItMi44Ny0uODgtNC40NiwxLjE4LjI3LDIuMDYuNDQsMy4wNy41OS40MywxLjM2LDEuMTIsMi42NiwxLjk4LDMuNzVaTTIzLjIsNDIuNDFjLTEuNi4zMS0zLjM0LjU5LTUuMzcuODEtMS4yNC0uNjctMi4yNi0xLjcxLTIuOTEtMi45NywxLjI3LjE1LDIuNjcuMjgsNC4yMy40MWgwYzEuMTYuODksMi41NCwxLjUsNC4wNSwxLjc1WiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTgiIGQ9Ik0yLjAxLDM3LjM1YzEuMy40NCwyLjUxLjgzLDMuNzcsMS4xOS0uMjQsMS4zNC0uMTgsMi43Ni4yOCw0LjItMS45NS0xLjU4LTMuMjctMy40NC00LjA1LTUuMzgiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy04IiBkPSJNMTMuNTksNDMuNTVjLTEuMjcuMDYtMi42Ni4xLTQuMTcuMTItLjk2LTEuMjctMS4yLTIuODctLjg4LTQuNDYsMS4xOC4yNywyLjA2LjQ0LDMuMDcuNTkuNDMsMS4zNiwxLjEyLDIuNjYsMS45OCwzLjc1Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtOCIgZD0iTTIzLjIsNDIuNDFjLTEuNi4zMS0zLjM0LjU5LTUuMzcuODEtMS4yNC0uNjctMi4yNi0xLjcxLTIuOTEtMi45NywxLjI3LjE1LDIuNjcuMjgsNC4yMy40MWgwYzEuMTYuODksMi41NCwxLjUsNC4wNSwxLjc1Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTAiIGQ9Ik0xNC4yMSwzOC4wM2MuODcuMDEsMS43MywwLDIuNTctLjAzLjYxLDEuMDQsMS40MiwxLjk0LDIuMzcsMi42N2gwYy0xLjU2LS4xMy0yLjk2LS4yNi00LjIzLS40MS0uMzUtLjY5LS42LTEuNDQtLjcxLTIuMjMiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xMiIgZD0iTTE0LjM2LDM1LjMxYy40NS0uMDMuOS0uMDYsMS4zNS0uMS4yLjk5LjU3LDEuOTMsMS4wNywyLjc4LS44Ni4wMy0xLjcxLjA1LTIuNTYuMDQtLjA0LS4zMi0uMDctLjY1LS4wNy0uOTgsMC0uNi4wOC0xLjE5LjIyLTEuNzQiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xMiIgZD0iTTEwLjM3LDM1LjQ1Yy4zLDAsLjYsMCwuODktLjAxLS4xNS44LS4xNywxLjY1LS4wNiwyLjUtLjc0LS4wNC0xLjQ4LS4xLTIuMjItLjE4LjMzLS44Mi44MS0xLjYsMS4zOS0yLjMiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy05IiBkPSJNMTEuMjUsMzUuNDljLjA4LS40NC4yLS44Ni4zNy0xLjI3LS40Ny4zOC0uOTEuODItMS4yOSwxLjI5LjMxLDAsLjYyLDAsLjkyLS4wMSIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTkiIGQ9Ik0xNS43MSwzNS4yM2MtLjEzLS42MS0uMTktMS4yNC0uMTktMS44OSwwLS4xNiwwLS4zMy4wMS0uNDktLjU1LjczLS45NSwxLjU3LTEuMTgsMi40OS40NS0uMDMuOTEtLjA3LDEuMzYtLjExIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtOSIgZD0iTTE2LjkyLDI4LjE5aDBjLTQuOTYuODMtOS4yNC41Mi0xNC41OC0uMjVoMGMtMS4wNCwyLjEtMS40Miw0LjU1LTEsNy4wMSwxLjg2LjI0LDMuNzIuNCw1LjU4LjQ5LDEuOTItMy40NSw1LjcyLTYuMSw5LjMtNy4wMi4yNS0uMDYuNDgtLjE0LjctLjIyIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtNyIgZD0iTTUsMjQuNTZsLjAzLS4wMnMwLDAsMCwwYzEuMjQtMS4wMywyLjc1LTEuNzcsNC40OS0yLjEzLDUuMTEtMS4wNSw4LjU0LjY3LDkuMzMsMi41OGgwYy00LjQ0LjQzLTkuMDUuMzgtMTMuODItLjQ0aDBzLS4wMi4wMi0uMDIuMDJoMFoiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xMSIgZD0iTTUuMDIsMjQuNTNjNC43OC43Niw5LjM4Ljg3LDEzLjgzLjQ0LjUxLDEuMjItLjA1LDIuNTEtMS45MywzLjIyLTQuOTYuODMtOS41MS41LTE0LjU4LS4yNS42NS0xLjMxLDEuNTYtMi40NywyLjY5LTMuNDEiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy02IiBkPSJNMzIuMTUsMjIuMDR2LjVoMGMtMy44MSwyLjA4LTcuMTksMy41Mi0xMC4zMiw0LjQ5LjA0LS4yMi4wOC0uNDYuMS0uNzIuMDYtLjU5LDAtMS4xNi0uMTItMS42OSwzLjU0LS41NCw2Ljk4LTEuNDEsMTAuMzQtMi41NyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0zMi4xNSwxNi40N3YyLjc5czAsMi43NywwLDIuNzdjLTMuMzYsMS4xNi02LjgsMi4wMy0xMC4zNCwyLjU3LS4zMi0xLjI2LTEuMTEtMi4zNi0yLjEzLTMuMiw0LjA3LS45NSw4LjIyLTIuNjIsMTIuNDctNC45MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTkiIGQ9Ik0zMi4xNSwyMi41NGgwYy0zLjgxLDIuMDgtNy4xOSwzLjUyLTEwLjMyLDQuNDktLjY1LDMuMy0zLjEzLDIuNDEtMy4xNyw2LjYxLDAsLjQ0LjAzLjg1LjExLDEuMjQsNC42OC0uNjQsOS4xMi0xLjgyLDEzLjM2LTMuNDYsMC0uMTguMDEtLjM3LjAxLS41NnYtOC4zMnMwLS4xOSwwLS4xOXYuMTlaIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTAiIGQ9Ik0yMC4zMSwzNy43NGMzLjU5LS4zNiw3LjE5LTEuMDMsMTAuOC0xLjk5LTIuMzQsNC41Ny03Ljk5LDQuNzctMTAuOCwxLjk5Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTMiIGQ9Ik0xMy41OSw0My41NWMtMS4yNy4wNi0yLjQ0LjEtMy45Ni4xMi0uMDYsMC0uMi4wMi0uMjEsMCwxLjI3LDEuNjUsMy42NSwyLjcyLDcuNzUsMi41MS0xLjMyLS40LTIuNTYtMS4zNi0zLjU4LTIuNjMiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy0xMyIgZD0iTTE3LjEyLDQyLjc4bC0uMDMtLjAyaDBzLjAzLjAyLjAzLjAyWk0yMy4yLDQyLjQxYy0xLjYuMzEtMy4zNC41OS01LjM3LjgxLjk5LjU0LDIuMTIuODQsMy4zMy44NCwxLjY3LDAsMy4yMS0uNTksNC40Mi0xLjU3LS4yOC4wMy0uNTcuMDQtLjg2LjA0LS41MiwwLTEuMDItLjA0LTEuNTItLjEzWiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEwIiBkPSJNMS43MSwzNi40OWgwYzEuNDUuMzYsMi45MS42Niw0LjM2Ljg5LS4xMi4zOC0uMjIuNzctLjI5LDEuMTctMS4yNi0uMzYtMi40Ny0uNzUtMy43Ny0xLjE5LS4xMS0uMjktLjIyLS41Ny0uMzEtLjg2Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTIiIGQ9Ik0xLjM0LDM0Ljk1aDBjMS44Ni4yMywzLjcyLjQsNS41OC40OWgwYy0uMzUuNjItLjYzLDEuMjctLjg0LDEuOTQtMS40Ni0uMjMtMi45MS0uNTItNC4zNi0uODgtLjE2LS41MS0uMjgtMS4wMi0uMzctMS41NCIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTE0IiBkPSJNMCwxMS4zM3MwLS4wMywwLS4wNWMwLC4wMiwwLC4wMywwLC4wNU0wLDExLjM4czAtLjAzLDAtLjA1YzAsLjAyLDAsLjAzLDAsLjA1Wk0zMi4xNSwxNi40N2MtNC4yNSwyLjMxLTguNCwzLjk4LTEyLjQ3LDQuOTMtLjU1LS40Ni0xLjE3LS44NS0xLjgxLTEuMTUtMi43NS0xLjMtNi4wMS0xLjMzLTguOTQtLjczLTEuNjguMzQtMy4yNS45OS00LjY1LDEuOTEtMS40My0uMzYtMi44Ni0uODItNC4yOC0xLjM5SDBTMCwxOS4yNywwLDE5LjI3di0xLjY2czAtNi4yMywwLTYuMjN2LjQ3YzEyLjIsNS43MSwyMi42MSw2LjExLDMyLjE1LDMuOTR2LjY4WiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTUiIGQ9Ik0zMi4xNSwxNS44YzAtMS40NywwLTIuOTQsMC00LjQxLDAtMS4xMS0uOTEtMi4wMi0yLjAyLTIuMDItMS4yOCwwLTIuNTYsMC0zLjg0LDBoLTEuNjZjLTUuNywwLTExLjQxLDAtMTcuMTEsMC0uNTUsMC0xLjEsMC0xLjY2LDAtMS4yOCwwLTIuNTYsMC0zLjg0LDBDLjkxLDkuMzYsMCwxMC4yNywwLDExLjM4di40N2MxMi4yLDUuNzEsMjIuNjEsNi4xMSwzMi4xNSwzLjk0Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMTAiIGQ9Ik04Ljk5LDM3LjczYy43NC4wNywxLjQ4LjE0LDIuMjEuMTguMDguNjMuMjIsMS4yNy40MSwxLjktMS4xMi0uMTgtMi4xMy0uMzctMy4wNy0uNTguMS0uNS4yNS0xLjAxLjQ1LTEuNSIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xLjYsMzYuMTFzLjAzLjA5LjA0LjE0Yy0uMDEtLjA1LS4wMy0uMDktLjA0LS4xNCIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEyIiBkPSJNMTguNzgsMzQuODdjNC42OC0uNjQsOS4xMi0xLjgyLDEzLjM2LTMuNDYtLjA3LDEuNzQtLjQ1LDMuMTgtMS4wNCw0LjM0LTMuNjEuOTUtNy4yMSwxLjYzLTEwLjgsMS45OS0uNzUtLjc1LTEuMy0xLjcxLTEuNTMtMi44NyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0wLDIzLjUyYy41MS4xMywxLjAyLjI0LDEuNTMuMzYtLjIzLjI3LS40Ni41Ni0uNjcuODUtLjMxLjQ0LS42Ljg5LS44NiwxLjM1di0yLjU2WiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTE1IiBkPSJNNC4yOCwyMS40NGMtMS4wMi42Ny0xLjk1LDEuNDktMi43NSwyLjQ0LS41MS0uMTEtMS4wMi0uMjMtMS41My0uMzZ2Mi41Ni02LjAzczAsMCwwLDBjMS40Mi41NywyLjg1LDEuMDMsNC4yOCwxLjM5Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIuNiwyYzEuNCwwLDIuNTMsMS4xMywyLjUzLDIuNTNzLTEuMTMsMi41My0yLjUzLDIuNTNDMS4yLDcuMDYuMDYsNS45Mi4wNiw0LjUzUzEuMiwyLDIuNiwyIi8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTkuMzMsMmMxLjQsMCwyLjUzLDEuMTMsMi41MywyLjUzLDAsMS40LTEuMTMsMi41My0yLjUzLDIuNTNzLTIuNTMtMS4xMy0yLjUzLTIuNTNjMC0xLjQsMS4xMy0yLjUzLDIuNTMtMi41MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNi4wNywyYzEuNCwwLDIuNTMsMS4xMywyLjUzLDIuNTNzLTEuMTMsMi41My0yLjUzLDIuNTNjLTEuNCwwLTIuNTMtMS4xMy0yLjUzLTIuNTNzMS4xMy0yLjUzLDIuNTMtMi41MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yMi44LDJjMS40LDAsMi41MywxLjEzLDIuNTMsMi41MywwLDEuNC0xLjEzLDIuNTMtMi41MywyLjUzLTEuNCwwLTIuNTMtMS4xMy0yLjUzLTIuNTMsMC0xLjQsMS4xMy0yLjUzLDIuNTMtMi41MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0yOS41NCwyYzEuNCwwLDIuNTMsMS4xMywyLjUzLDIuNTNzLTEuMTMsMi41My0yLjUzLDIuNTNjLTEuNCwwLTIuNTMtMS4xMy0yLjUzLTIuNTNzMS4xMy0yLjUzLDIuNTMtMi41MyIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTE2IiBkPSJNMi4wMSwzNy4zNWMxLjMuNDQsMi41MS44MywzLjc3LDEuMTktLjI0LDEuMzQtLjE4LDIuNzYuMjgsNC4xOS0xLjk1LTEuNTgtMy4yNy0zLjQ0LTQuMDUtNS4zOE0xMy41OSw0My41NWMtMS4yNy4wNi0yLjY2LjEtNC4xNy4xMi0uOTYtMS4yNy0xLjItMi44Ny0uODgtNC40NiwxLjE4LjI3LDIuMDYuNDQsMy4wNy41OS40MywxLjM2LDEuMTIsMi42NiwxLjk4LDMuNzVaTTIzLjIsNDIuNDFjLTEuNi4zMS0zLjM0LjU5LTUuMzcuODEtMS4yNC0uNjctMi4yNi0xLjcxLTIuOTEtMi45NywxLjI3LjE1LDIuNjcuMjgsNC4yMy40MWgwYzEuMTYuODksMi41NCwxLjUsNC4wNSwxLjc1WiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTgiIGQ9Ik0yLjAxLDM3LjM1YzEuMy40NCwyLjUxLjgzLDMuNzcsMS4xOS0uMjQsMS4zNC0uMTgsMi43Ni4yOCw0LjItMS45NS0xLjU4LTMuMjctMy40NC00LjA1LTUuMzgiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy04IiBkPSJNMTMuNTksNDMuNTVjLTEuMjcuMDYtMi42Ni4xLTQuMTcuMTItLjk2LTEuMjctMS4yLTIuODctLjg4LTQuNDYsMS4xOC4yNywyLjA2LjQ0LDMuMDcuNTkuNDMsMS4zNiwxLjEyLDIuNjYsMS45OCwzLjc1Ii8+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtOCIgZD0iTTIzLjIsNDIuNDFjLTEuNi4zMS0zLjM0LjU5LTUuMzcuODEtMS4yNC0uNjctMi4yNi0xLjcxLTIuOTEtMi45NywxLjI3LjE1LDIuNjcuMjgsNC4yMy40MWgwYzEuMTYuODksMi41NCwxLjUsNC4wNSwxLjc1Ii8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4=";

// ─────────────────────────────────────────────
//  PALETTE
// ─────────────────────────────────────────────
const C = {
  green:"#3d7a3a", greenD:"#2c5829", greenL:"rgba(61,122,58,.09)", greenM:"rgba(61,122,58,.16)",
  teal:"#1a8fa0",  tealL:"rgba(26,143,160,.09)",
  slate:"#3d4f5c", slateL:"rgba(61,79,92,.09)",
  bg:"#f2f5f2", bg2:"#eaeeea", bg3:"#dfe5df",
  surface:"#ffffff", surface2:"#f7faf7", surface3:"#eff4ef",
  border:"rgba(61,122,58,.13)", border2:"rgba(61,79,92,.08)",
  text:"#18281a", text2:"rgba(24,40,26,.56)", text3:"rgba(24,40,26,.34)",
  fill:"rgba(61,122,58,.06)",
  ok:"#2c6e29",  okBg:"rgba(61,122,58,.09)",  okBd:"rgba(61,122,58,.24)",
  err:"#b83232", errBg:"rgba(184,50,50,.08)",  errBd:"rgba(184,50,50,.24)",
  warn:"#9a5c08",warnBg:"rgba(154,92,8,.08)",  warnBd:"rgba(154,92,8,.24)",
};

// ─────────────────────────────────────────────
//  TRANSLATIONS
// ─────────────────────────────────────────────
const T = {
  pt:{
    appName:"Câmara Municipal de Peniche", slogan:"Parquímetro Digital",
    pay:"🅿  Pagar Estacionamento", login:"Área Reservada",
    active:"Serviço activo · Peniche",
    whereParking:"Onde está a parcar?", selectZone:"Seleccione a zona indicada na placa de sinalização.",
    plate:"Matrícula", platePlaceholder:"AA-00-AA · AB123CD · 1ABC123",
    plateHint:"PT · ES · FR · DE · UK · IT · NL · BE · BR e outras",
    recentPlates:"Usadas recentemente", continue:"Prosseguir →",
    howLong:"Quanto tempo?", choosePayment:"Seleccionar Método de Pagamento",
    paymentMethod:"Método de Pagamento", payNow:"Confirmar e Pagar",
    secure:"🔒 Pagamento seguro via Stripe",
    receipt:"Recibo", activeParking:"Estacionamento Activo",
    payConfirmed:"Pagamento efectuado com sucesso. Boa viagem!",
    sessionSaved:"Sessão registada",
    validUntil:"Válido até", sessionEnded:"Sessão terminada",
    save:"📥 Guardar", share:"📤 Partilhar", back:"← Início",
    zone:"Zona", start:"Início", end:"Término previsto", total:"Total",
    duration:"Duração", payment:"Pagamento", ref:"Ref.",
    extendPrompt:"Tempo quase a terminar. Quer prolongar?",
    extended:"Sessão prolongada +1 hora",
    sessionActive:"Sessão activa", viewReceipt:"Consultar comprovativo →",
    emailLabel:"Email", passwordLabel:"Password",
    signIn:"Iniciar Sessão", signOut:"Sair",
    wrongCreds:"Dados de acesso incorrectos",
    demoHint:"Acesso de demonstração:",
    myAccount:"A Minha Área", myVehicle:"Veículo",
    discount:"Desconto", validity:"Validade",
    payWithDiscount:"🅿️ Pagar com Desconto",
    paymentHistory:"Histórico", noHistory:"Sem pagamentos anteriores.",
    faq:"FAQ's", terms:"Termos e Condições", support:"Suporte",
    logout:"Sair",
    // Operador
    opDashboard:"Verificação de Estacionamento",
    opSelectZone:"Seleccione a zona em fiscalização",
    opChangeZone:"Alterar Zona",
    opCheckPlate:"Verificar Matrícula",
    opEnterPlate:"Introduzir matrícula",
    opScanPlate:"📷 Ler por Câmara",
    opManualPlate:"✏️ Introdução Manual",
    opCheck:"Verificar",
    opScanSim:"Simular Leitura OCR",
    opScanning:"A processar imagem...",
    opDetected:"Matrícula identificada:",
    opResult:"Resultado",
    opNoSession:"Sem registo de estacionamento",
    opExpired:"Sessão expirada",
    opWrongZone:"Sessão activa — zona divergente",
    opValid:"Sessão válida e activa",
    opPaidZone:"Zona paga",
    opCurrentZone:"Zona actual",
    opValidUntil:"Válida até",
    opRemaining:"Tempo restante",
    opCheckedAt:"Verificado às",
    opStatus:"Estado",
    opNewCheck:"Nova Verificação",
    opActiveSessions:"Sessões activas nesta zona",
    opNoSessions:"Nenhuma sessão activa",
    // Admin
    adminDashboard:"Painel de Mobilidade",
    adminOverview:"Resumo",
    adminSessions:"Sessões",
    adminZones:"Zonas",
    adminRevenue:"Receita",
    adminPending:"Pendentes",
    adminQR:"QR Codes",
    adminActiveSessions:"Sessões activas",
    adminTodayRevenue:"Receita hoje",
    adminOccupancy:"Ocupação média",
    adminUniquePlates:"Matrículas únicas",
    adminLatest:"Últimas sessões",
    adminAllSessions:"Todas as sessões",
    adminValid:"Válidas",
    adminExpired2:"Expiradas",
    adminResident:"Residentes",
    adminApprove:"Aprovar",
    adminReject:"Rejeitar",
    adminApproved:"Aprovado",
    adminRejected:"Rejeitado",
    adminNoPending:"Sem pedidos pendentes.",
    adminWeek:"Semana", adminMonth:"Mês", adminYear:"Ano",
    // QR
    qrTitle:"QR Codes das Zonas",
    qrDesc:"Digitalize com o telemóvel para pagar directamente.",
    qrNote:"QR codes funcionais — apontam para a zona correcta. Imprima e cole nas placas.",
    qrDownload:"⬇ Imprimir / Guardar",
    // footer
    footerRights:"© Câmara Municipal de Peniche. Todos os direitos reservados",
    footerLegal:"Regulamento Municipal de Estacionamento — Edital nº 2024/0042",
    nif:"NIF: 506 715 320", address:"Largo do Município · 2520-208 Peniche",
    phone:"Tel: 262 780 100", emailAddr:"geral@cm-peniche.pt",
    sessionExpiresSoon:"A sua sessão expira em menos de 10 minutos",
    requestSent:"Pedido Enviado!",
    requestDesc:"A Câmara Municipal de Peniche analisará o pedido em até 5 dias úteis e enviará as credenciais por correio electrónico.",
    today:"Hoje",
  },
  en:{
    appName:"Municipality of Peniche", slogan:"Digital Parking Meter",
    pay:"🅿  Pay Parking", login:"Members Area",
    active:"Service active · Peniche",
    whereParking:"Where are you parking?", selectZone:"Select the zone shown on the sign.",
    plate:"Licence Plate", platePlaceholder:"AA-00-AA · AB123CD · 1ABC123",
    plateHint:"PT · ES · FR · DE · UK · IT · NL · BE · BR and more",
    recentPlates:"Recently used", continue:"Proceed →",
    howLong:"How long?", choosePayment:"Select Payment Method",
    paymentMethod:"Payment Method", payNow:"Confirm & Pay",
    secure:"🔒 Secure payment via Stripe",
    receipt:"Receipt", activeParking:"Parking Active",
    payConfirmed:"Payment successful. Enjoy your visit!",
    sessionSaved:"Session registered",
    validUntil:"Valid until", sessionEnded:"Session ended",
    save:"📥 Save", share:"📤 Share", back:"← Home",
    zone:"Zone", start:"Start", end:"Expected end", total:"Total",
    duration:"Duration", payment:"Payment", ref:"Ref.",
    extendPrompt:"Time almost up. Extend session?",
    extended:"Session extended +1 hour",
    sessionActive:"Active session", viewReceipt:"View receipt →",
    emailLabel:"Email", passwordLabel:"Password",
    signIn:"Sign In", signOut:"Sign Out",
    wrongCreds:"Incorrect access details",
    demoHint:"Demo access:",
    myAccount:"My Area", myVehicle:"Vehicle",
    discount:"Discount", validity:"Valid until",
    payWithDiscount:"🅿️ Pay with Discount",
    paymentHistory:"History", noHistory:"No previous payments.",
    faq:"FAQ's", terms:"Terms & Conditions", support:"Support",
    logout:"Sign Out",
    opDashboard:"Parking Enforcement",
    opSelectZone:"Select the zone you are enforcing",
    opChangeZone:"Change Zone",
    opCheckPlate:"Check Plate",
    opEnterPlate:"Enter plate",
    opScanPlate:"📷 Read by Camera",
    opManualPlate:"✏️ Manual Input",
    opCheck:"Check",
    opScanSim:"Simulate OCR Read",
    opScanning:"Recognising...",
    opDetected:"Plate identified:",
    opResult:"Result",
    opNoSession:"No parking record found",
    opExpired:"Session expired",
    opWrongZone:"Active session — wrong zone",
    opValid:"Valid active session",
    opPaidZone:"Paid zone",
    opCurrentZone:"Current zone",
    opValidUntil:"Valid until",
    opRemaining:"Time remaining",
    opCheckedAt:"Checked at",
    opStatus:"Status",
    opNewCheck:"New Check",
    opActiveSessions:"Active sessions in this zone",
    opNoSessions:"No active sessions",
    adminDashboard:"Mobility Panel",
    adminOverview:"Overview",
    adminSessions:"Sessions",
    adminZones:"Zones",
    adminRevenue:"Revenue",
    adminPending:"Pending",
    adminQR:"QR Codes",
    adminActiveSessions:"Active sessions",
    adminTodayRevenue:"Today's revenue",
    adminOccupancy:"Avg. occupancy",
    adminUniquePlates:"Unique plates",
    adminLatest:"Latest sessions",
    adminAllSessions:"All sessions",
    adminValid:"Valid",
    adminExpired2:"Expired",
    adminResident:"Residents",
    adminApprove:"Approve",
    adminReject:"Reject",
    adminApproved:"Approved",
    adminRejected:"Rejected",
    adminNoPending:"No pending requests.",
    adminWeek:"Week", adminMonth:"Month", adminYear:"Year",
    qrTitle:"Zone QR Codes",
    qrDesc:"Scan with your phone to pay directly.",
    qrNote:"Functional QR codes — link directly to the correct zone. Print and attach to signs.",
    qrDownload:"⬇ Print / Save",
    footerRights:"All rights reserved",
    footerLegal:"Municipal Parking By-Law — Notice nº 2024/0042",
    nif:"VAT: 506 715 320", address:"Largo do Município · 2520-208 Peniche, Portugal",
    phone:"Tel: +351 262 780 100", emailAddr:"geral@cm-peniche.pt",
    sessionExpiresSoon:"Your session expires in less than 10 minutes",
    requestSent:"Request Sent!",
    requestDesc:"We'll validate within 5 working days and send credentials by email.",
    today:"Today",
  }
};

// ─────────────────────────────────────────────
//  ZONES
// ─────────────────────────────────────────────
const ZONES={
  A:{name:"Centro",              rate:1.20,color:"#b83232",bg:"rgba(184,50,50,.08)",  bd:"rgba(184,50,50,.22)",  desc:"Rua Vasco da Gama / Praça Bocage"},
  B:{name:"Marina de Peniche",   rate:1.00,color:"#1a8fa0",bg:"rgba(26,143,160,.08)", bd:"rgba(26,143,160,.22)", desc:"Doca de Recreio / Edifício da Marina"},
  C:{name:"Rendilheira",         rate:0.80,color:"#6d3bbf",bg:"rgba(109,59,191,.08)", bd:"rgba(109,59,191,.22)", desc:"Av. Marginal / Museu da Rendilheira"},
  D:{name:"Zona Histórica",      rate:0.80,color:"#9a5c08",bg:"rgba(154,92,8,.08)",   bd:"rgba(154,92,8,.22)",   desc:"Bairro Histórico / Largo da Ribeira"},
  E:{name:"Fortaleza de Peniche",rate:0.60,color:"#3d7a3a",bg:"rgba(61,122,58,.08)",  bd:"rgba(61,122,58,.22)",  desc:"Junto à Fortaleza / Parque de Merendas"},
  F:{name:"Ribeira Velha",       rate:0.50,color:"#3d4f5c",bg:"rgba(61,79,92,.08)",   bd:"rgba(61,79,92,.22)",   desc:"Cais da Ribeira / Zona de Pesca"},
};
const ZR=id=>`${ZONES[id].rate.toFixed(2).replace(".",",")}€/h`;

// ─────────────────────────────────────────────
//  USERS
// ─────────────────────────────────────────────
const USERS=[
  {email:"residente@demo.pt",   pass:"res2024",   role:"resident", name:"João Silva",            discount:50,plate:"AA-11-BB"},
  {email:"trabalhador@demo.pt", pass:"trab2024",  role:"worker",   name:"Ana Ferreira",          discount:30,plate:"ZZ-99-YY"},
  {email:"operador@demo.pt",    pass:"op2024",    role:"operator", name:"Carlos Mendes"},
  {email:"admin@demo.pt",       pass:"admin2024", role:"admin",    name:"Director de Mobilidade Urbana"},
];
const isOps=r=>["operator","admin"].includes(r);
const isRes=r=>["resident","worker"].includes(r);
const PM={mbway:"MB WAY",card:"Cartão",apple:"Apple/Google Pay",paypal:"PayPal"};
const LS_SESS="pkx_sess_v9",LS_PLATES="pkx_plates_v9",LS_HIST="pkx_hist_v9";

// ─────────────────────────────────────────────
//  LOCAL STORAGE
// ─────────────────────────────────────────────
const lsG=(k,d)=>{try{const r=localStorage.getItem(k);return r?JSON.parse(r):d;}catch{return d;}};
const lsS=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch{}};
const getLive=()=>lsG(LS_SESS,[]).map(s=>({...s,start:new Date(s.start),end:new Date(s.end)}));
const saveLive=s=>{const a=getLive();const i=a.findIndex(x=>x.plate===s.plate&&x.zone===s.zone);if(i>=0)a[i]=s;else a.unshift(s);lsS(LS_SESS,a);};
const extendLive=(plate,zone,ms)=>{const a=getLive();const i=a.findIndex(x=>x.plate===plate&&x.zone===zone);if(i>=0){a[i].end=new Date(new Date(a[i].end).getTime()+ms);lsS(LS_SESS,a);}};
const addHist=(s,email)=>{const k=LS_HIST+(email||"g");const a=lsG(k,[]);a.unshift({...s,savedAt:new Date().toISOString()});lsS(k,a.slice(0,60));};
const getHist=email=>lsG(LS_HIST+(email||"g"),[]);

const DEMO_SESS=()=>{const n=Date.now();return[
  {plate:"AA-00-BB",zone:"A",mins:60, status:"ok", ref:"PKX-100001",method:"MB WAY",         start:new Date(n-22*60000),end:new Date(n+38*60000)},
  {plate:"GH-12-KL",zone:"B",mins:120,status:"ok", ref:"PKX-100002",method:"Cartão",         start:new Date(n-40*60000),end:new Date(n+80*60000)},
  {plate:"AB123CD", zone:"B",mins:30, status:"err",ref:"PKX-100003",method:"Apple/Google Pay",start:new Date(n-75*60000),end:new Date(n-45*60000)},
  {plate:"GG-33-HH",zone:"D",mins:90, status:"res",ref:"PKX-100004",method:"MB WAY",         start:new Date(n-15*60000),end:new Date(n+75*60000)},
  {plate:"EF 789 GH",zone:"E",mins:60,status:"err",ref:"PKX-100005",method:"Cartão",         start:new Date(n-95*60000),end:new Date(n-35*60000)},
  {plate:"KK-55-LL",zone:"F",mins:180,status:"ok", ref:"PKX-100006",method:"PayPal",         start:new Date(n-35*60000),end:new Date(n+145*60000)},
  {plate:"MN-77-PQ",zone:"A",mins:45, status:"ok", ref:"PKX-100007",method:"MB WAY",         start:new Date(n-10*60000),end:new Date(n+35*60000)},
  {plate:"1ABC123", zone:"C",mins:60, status:"ok", ref:"PKX-100008",method:"Cartão",         start:new Date(n-5*60000), end:new Date(n+55*60000)},
]};
const getAllSess=()=>[...getLive(),...DEMO_SESS()];

// ─────────────────────────────────────────────
//  UTILS
// ─────────────────────────────────────────────
const fmtTime=t=>new Date(t).toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit"});
const fmtDate=t=>new Date(t).toLocaleDateString("pt-PT",{day:"2-digit",month:"short",year:"numeric"});
const fmtEur=n=>n.toFixed(2).replace(".",",")+" €";
const cleanPlate=v=>v.toUpperCase().replace(/[^A-Z0-9\-\s]/g,"").slice(0,15);
const genRef=()=>"PKX-"+Math.floor(100000+Math.random()*900000);
// matchPlate — ignora separadores para comparacao
const matchPlate=(a,b)=>a.toUpperCase().replace(/[\s\-]/g,"")===b.toUpperCase().replace(/[\s\-]/g,"");

// ─────────────────────────────────────────────
//  PLATE FORMATS — PT, ES, FR, DE, UK, NL, BE, IT, CH, AT, PL, SE, NO, DK, FI, IE, BR, generico
// ─────────────────────────────────────────────
const normalisePlate=(raw)=>{
  const s=raw.toUpperCase().replace(/[^A-Z0-9]/g,"");
  if(s.length<4||s.length>10)return null;
  // Portugal
  const pt1=s.match(/^([A-Z]{2})(\d{2})([A-Z]{2})$/);if(pt1)return`${pt1[1]}-${pt1[2]}-${pt1[3]}`;
  const pt2=s.match(/^([A-Z]{2})([A-Z]{2})(\d{2})$/);if(pt2)return`${pt2[1]}-${pt2[2]}-${pt2[3]}`;
  const pt3=s.match(/^(\d{2})([A-Z]{2})(\d{2})$/);if(pt3)return`${pt3[1]}-${pt3[2]}-${pt3[3]}`;
  // Espanha 0000-BBB
  const es=s.match(/^(\d{4})([BCDFGHJKLMNPRSTUVWXYZ]{3})$/);if(es)return`${es[1]}-${es[2]}`;
  // Espanha antiga AA-0000-BB
  const esO=s.match(/^([A-Z]{1,2})(\d{4})([A-Z]{1,2})$/);if(esO)return`${esO[1]}-${esO[2]}-${esO[3]}`;
  // Franca AA-000-AA
  const fr=s.match(/^([A-Z]{2})(\d{3})([A-Z]{2})$/);if(fr)return`${fr[1]}-${fr[2]}-${fr[3]}`;
  // UK actual AB12CDE
  const uk=s.match(/^([A-Z]{2})(\d{2})([A-Z]{3})$/);if(uk)return`${uk[1]}${uk[2]} ${uk[3]}`;
  // UK antiga
  const ukO=s.match(/^([A-Z]{1,2})(\d{2,4})([A-Z]{1,3})$/);if(ukO)return`${ukO[1]}${ukO[2]} ${ukO[3]}`;
  // Italia AA000AA
  const it=s.match(/^([A-Z]{2})(\d{3})([A-Z]{2})$/);if(it)return`${it[1]}-${it[2]}-${it[3]}`;
  // Belgica 1-AAA-000
  const be=s.match(/^(\d)([A-Z]{3})(\d{3})$/);if(be)return`${be[1]}-${be[2]}-${be[3]}`;
  // Suecia/Finlandia AAA000
  const se=s.match(/^([A-Z]{2,3})(\d{3})$/);if(se)return`${se[1]}-${se[2]}`;
  // Noruega AA00000
  const no=s.match(/^([A-Z]{2})(\d{5})$/);if(no)return`${no[1]}-${no[2]}`;
  // Irlanda 00AA000000
  const ie=s.match(/^(\d{2})([A-Z]{1,2})(\d{1,6})$/);if(ie)return`${ie[1]}-${ie[2]}-${ie[3]}`;
  // Brasil AAA0000 / Mercosul AAA0A00
  const br1=s.match(/^([A-Z]{3})(\d{4})$/);if(br1)return`${br1[1]}-${br1[2]}`;
  const br2=s.match(/^([A-Z]{3})(\d)([A-Z])(\d{2})$/);if(br2)return`${br2[1]}${br2[2]}${br2[3]}${br2[4]}`;
  // Suica AA000000
  const ch=s.match(/^([A-Z]{1,2})(\d{4,6})$/);if(ch)return`${ch[1]} ${ch[2]}`;
  // Polonia AA00000
  const pl=s.match(/^([A-Z]{2,3})(\d{4,5})$/);if(pl)return`${pl[1]}-${pl[2]}`;
  // Austria/Alemanha generico: letras+numeros misturados
  const de=s.match(/^([A-Z]{1,3})([A-Z]{1,2})(\d{1,4}[EH]?)$/);
  if(de&&de[3].replace(/[EH]$/,"").length>=1)return`${de[1]}-${de[2]}-${de[3]}`;
  // Generico internacional (US/CA/AU) — 5-9 alfanum com letras E numeros
  if(s.length>=5&&s.length<=9&&/[A-Z]/.test(s)&&/[0-9]/.test(s))return s;
  return null;
};

// ─────────────────────────────────────────────
//  STYLE HELPERS
// ─────────────────────────────────────────────
const card=(x={})=>({background:C.surface,borderRadius:20,border:`1px solid ${C.border2}`,boxShadow:"0 1px 8px rgba(0,0,0,.05)",...x});
const inp=(x={})=>({width:"100%",background:C.surface,border:`1.5px solid ${C.border}`,borderRadius:16,padding:"16px 18px",fontFamily:"inherit",fontSize:15,fontWeight:500,color:C.text,outline:"none",...x});
// Fitts: CTA primário mínimo 56px de altura (zona de toque polegar)
const btnP=(x={})=>({display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"18px 24px",borderRadius:22,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:16,fontWeight:700,background:C.green,color:"#ffffff",letterSpacing:"-.1px",minHeight:56,...x});
// Fitts: botão secundário ligeiramente menor mas ainda >= 52px
const btnO=(x={})=>({display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"16px 24px",borderRadius:22,border:`1.5px solid ${C.border}`,cursor:"pointer",fontFamily:"inherit",fontSize:15,fontWeight:600,background:C.surface,color:C.text,minHeight:52,...x});
const zChip=id=>({display:"inline-flex",alignItems:"center",gap:5,background:ZONES[id].bg,color:ZONES[id].color,border:`1px solid ${ZONES[id].bd}`,borderRadius:999,padding:"4px 12px",fontSize:13,fontWeight:600});

// ─────────────────────────────────────────────
//  NOTIFICATIONS — Service Worker Push
//  • Regista SW uma vez por sessão de utilizador
//  • Agenda notificações 10min antes e no fim
//  • Funciona com o tab fechado
//  • Apenas para utilizadores com login
// ─────────────────────────────────────────────
const SW_URL = "./sw.js"; // caminho relativo ao deploy

// Pedir permissão (não-intrusivo — só chama quando necessário)
const askNotif = () => {
  if (typeof Notification === "undefined") return;
  if (Notification.permission === "default") {
    Notification.requestPermission().catch(() => {});
  }
};

// Enviar notificação inline (fallback quando SW não está activo)
const pushNotif = (title, body) => {
  if (typeof Notification !== "undefined" && Notification.permission === "granted") {
    try { new Notification(title, { body }); } catch {}
  }
};

// Registar Service Worker — retorna a registration ou null
let _swReg = null;
const registerSW = async () => {
  if (!("serviceWorker" in navigator)) return null;
  if (_swReg) return _swReg;
  try {
    _swReg = await navigator.serviceWorker.register(SW_URL, { scope: "./" });
    await navigator.serviceWorker.ready;
    return _swReg;
  } catch {
    return null;
  }
};

// Obter SW activo (instalado + controlador)
const getSW = () =>
  navigator.serviceWorker?.controller ||
  (_swReg?.active) ||
  null;

// Agendar notificações de expiração para uma sessão
const scheduleSessionAlerts = async ({ plate, zone, zoneName, endTime, ref }) => {
  try {
    if (Notification.permission !== "granted") return;
    const sw = getSW() || (await registerSW(), getSW());
    if (!sw) {
      const ms = new Date(endTime).getTime() - Date.now() - 10 * 60 * 1000;
      if (ms > 0) setTimeout(() => pushNotif("⏱ Estacionamento a expirar", `${plate} · Zona ${zone} — expira em 10 minutos.`), ms);
      return;
    }
    sw.postMessage({ type: "SCHEDULE", payload: { plate, zone, zoneName, endTime, ref } });
  } catch { /* notificações não críticas — nunca bloqueiam o pagamento */ }
};

// Cancelar alertas (ao renovar ou sair)
const cancelSessionAlerts = async (plate, zone) => {
  try {
    const sw = getSW();
    if (sw) sw.postMessage({ type: "CANCEL", payload: { plate, zone } });
  } catch {}
};

// ─────────────────────────────────────────────
//  NAV
// ─────────────────────────────────────────────
const Nav=({left,title,right})=>(
  <div style={{position:"sticky",top:0,zIndex:50,height:54,display:"flex",alignItems:"center",
    justifyContent:"space-between",padding:"0 18px",
    background:"rgba(242,245,242,.95)",backdropFilter:"blur(16px)",
    borderBottom:`1px solid ${C.border}`}}>
    <div style={{minWidth:72}}>{left}</div>
    <div style={{fontSize:14,fontWeight:700,letterSpacing:"-.3px",color:C.text}}>{title}</div>
    <div style={{minWidth:72,display:"flex",justifyContent:"flex-end",alignItems:"center",gap:8}}>{right}</div>
  </div>
);
const Back=({onClick})=>(
  // Fitts: mínimo 44×44px de área de toque (Apple HIG standard)
  <button onClick={onClick} style={{background:"none",border:"none",color:C.green,cursor:"pointer",
    fontFamily:"inherit",fontSize:26,fontWeight:300,lineHeight:1,
    padding:"0",margin:"0",
    width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center",
    borderRadius:12,WebkitTapHighlightColor:"transparent"}}>‹</button>
);
const NavLink=({onClick,children})=>(
  <button onClick={onClick} style={{background:"none",border:"none",color:C.green,cursor:"pointer",
    fontFamily:"inherit",fontSize:13,fontWeight:600,padding:"4px 0",lineHeight:1}}>{children}</button>
);

// ─────────────────────────────────────────────
//  HAMBURGER MENU
// ─────────────────────────────────────────────
const Menu=({goTo,lang,setLang,t})=>{
  const [open,setOpen]=useState(false);
  const items=[{id:"faq",icon:"❓",label:t.faq},{id:"terms",icon:"📄",label:t.terms},{id:"support",icon:"💬",label:t.support}];
  return(
    <>
      {open&&<div onClick={()=>setOpen(false)} style={{position:"fixed",inset:0,zIndex:9997,background:"transparent"}}/>}
      <button onClick={()=>setOpen(o=>!o)}
        style={{background:open?C.greenL:"none",border:`1px solid ${open?C.green:C.border}`,borderRadius:10,
          width:36,height:36,display:"flex",flexDirection:"column",alignItems:"center",
          justifyContent:"center",gap:5,cursor:"pointer",flexShrink:0,position:"relative",zIndex:9999}}>
        <span style={{display:"block",width:15,height:1.5,background:open?C.green:C.text2,borderRadius:1,transform:open?"rotate(45deg) translate(0px,6.5px)":"none",transition:"all .2s"}}/>
        <span style={{display:"block",width:15,height:1.5,background:open?C.green:C.text2,borderRadius:1,opacity:open?0:1,transition:"all .2s"}}/>
        <span style={{display:"block",width:15,height:1.5,background:open?C.green:C.text2,borderRadius:1,transform:open?"rotate(-45deg) translate(0px,-6.5px)":"none",transition:"all .2s"}}/>
      </button>
      {open&&(
        <div style={{position:"absolute",top:"calc(100% + 8px)",right:0,
          background:C.surface,border:`1px solid ${C.border}`,borderRadius:18,
          padding:"8px",minWidth:220,zIndex:9999,
          boxShadow:"0 12px 40px rgba(0,0,0,.12),0 2px 8px rgba(0,0,0,.06)"}}>
          {items.map(({id,icon,label})=>(
            <button key={id} onClick={()=>{setOpen(false);goTo(id);}}
              style={{display:"flex",alignItems:"center",gap:12,width:"100%",padding:"12px 14px",
                background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",
                fontSize:14,fontWeight:500,color:C.text,borderRadius:12,textAlign:"left"}}>
              <span style={{fontSize:17,flexShrink:0}}>{icon}</span><span>{label}</span>
            </button>
          ))}
          <div style={{height:1,background:C.border,margin:"4px 8px"}}/>
          <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px"}}>
            <span style={{fontSize:12,color:C.text3,fontWeight:500,flex:1}}>Idioma / Language</span>
            {["pt","en"].map(l=>(
              <button key={l} onClick={()=>setLang(l)}
                style={{background:lang===l?C.greenL:"transparent",border:`1px solid ${lang===l?C.green:C.border}`,
                  borderRadius:7,padding:"4px 10px",cursor:"pointer",fontFamily:"inherit",
                  fontSize:12,fontWeight:700,color:lang===l?C.green:C.text3}}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <div style={{padding:"4px 14px 8px",fontSize:10,color:C.text3}}>Parquímetro Digital · v9.0</div>
        </div>
      )}
    </>
  );
};

// ─────────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────────
const Toast=({msg})=>msg?(
  <div style={{position:"fixed",bottom:28,left:"50%",transform:"translateX(-50%)",
    background:C.text,color:"#f2f5f2",padding:"11px 22px",borderRadius:999,fontSize:13,
    fontWeight:600,zIndex:9999,boxShadow:"0 8px 28px rgba(0,0,0,.18)",
    whiteSpace:"nowrap",pointerEvents:"none",letterSpacing:"-.1px"}}>
    {msg}
  </div>
):null;

// ─────────────────────────────────────────────
//  STEPS
// ─────────────────────────────────────────────
const Steps=({step,labels})=>(
  <div style={{display:"flex",alignItems:"flex-start",padding:"16px 24px 4px",maxWidth:480,margin:"0 auto",width:"100%"}}>
    {labels.map((s,i)=>(
      <div key={i} style={{display:"flex",alignItems:"flex-start",flex:i<labels.length-1?1:0}}>
        <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
          <div style={{width:28,height:28,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:11,fontWeight:700,flexShrink:0,transition:"all .2s",
            background:i<step?C.green:i===step?C.surface:"transparent",
            color:i<step?"#fff":i===step?C.green:C.text3,
            border:i===step?`2px solid ${C.green}`:i<step?"none":`2px solid ${C.border}`,
            boxShadow:i===step?"0 0 0 4px rgba(61,122,58,.12)":"none"}}>
            {i<step?"✓":i+1}
          </div>
          <div style={{fontSize:10,color:i===step?C.green:C.text3,marginTop:5,fontWeight:600,letterSpacing:".2px"}}>{s}</div>
        </div>
        {i<labels.length-1&&<div style={{flex:1,height:1.5,background:i<step?C.green:C.bg3,margin:"12px 8px 0",borderRadius:1,transition:"background .3s"}}/>}
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
//  SEGMENTED
// ─────────────────────────────────────────────
const Seg=({tabs,active,onChange})=>(
  <div style={{display:"flex",background:C.bg3,borderRadius:14,padding:3,marginBottom:20}}>
    {tabs.map(t=>(
      <button key={t.id} onClick={()=>onChange(t.id)}
        style={{flex:1,padding:"9px 6px",borderRadius:11,border:"none",fontFamily:"inherit",
          fontSize:12,fontWeight:600,cursor:"pointer",transition:"all .18s",
          background:active===t.id?C.surface:"transparent",
          color:active===t.id?C.text:C.text3,
          boxShadow:active===t.id?"0 1px 4px rgba(0,0,0,.07)":"none"}}>
        {t.label}
      </button>
    ))}
  </div>
);

// ─────────────────────────────────────────────
//  PLATE BADGE
// ─────────────────────────────────────────────
const PlateBadge=({plate,size="md"})=>{
  const s=size==="lg"?{fontSize:22,fontWeight:800,letterSpacing:3,padding:"8px 16px",borderRadius:12}
                     :{fontSize:11,fontWeight:800,letterSpacing:1.5,padding:"5px 9px",borderRadius:8};
  return(
    <span style={{...s,background:C.bg2,color:C.text,border:`1px solid ${C.border}`,
      fontFamily:"monospace",display:"inline-block",wordBreak:"break-all"}}>
      {plate}
    </span>
  );
};

// ─────────────────────────────────────────────
//  SESSION CARD (compact)
// ─────────────────────────────────────────────
const SessCard=({s})=>{
  const now=new Date();
  const isActive=new Date(s.end)>now;
  const z=ZONES[s.zone];
  const rem=Math.max(0,(new Date(s.end)-now)/60000);
  return(
    <div style={{...card(),padding:"14px 16px",marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
      <div style={{width:8,height:8,borderRadius:4,background:isActive?z?.color||C.ok:C.text3,flexShrink:0,marginTop:1}}/>
      <PlateBadge plate={s.plate}/>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:12,color:C.text3,marginBottom:2}}>Zona {s.zone} · {s.method||"—"}</div>
        <div style={{fontSize:13,fontWeight:600,color:C.text}}>{fmtTime(s.start)} → {fmtTime(s.end)}</div>
      </div>
      {isActive
        ?s.status==="res"
          ?<span style={{fontSize:11,fontWeight:700,color:C.teal,background:C.tealL,borderRadius:999,padding:"3px 9px"}}>Res.</span>
          :rem<15
            ?<span style={{fontSize:11,fontWeight:700,color:C.warn,background:C.warnBg,borderRadius:999,padding:"3px 9px"}}>{Math.round(rem)}m</span>
            :<span style={{fontSize:11,fontWeight:700,color:C.ok,background:C.okBg,borderRadius:999,padding:"3px 9px"}}>Activa</span>
        :<span style={{fontSize:11,fontWeight:700,color:C.err,background:C.errBg,borderRadius:999,padding:"3px 9px"}}>Exp.</span>}
    </div>
  );
};

// ─────────────────────────────────────────────
//  FOOTER
// ─────────────────────────────────────────────
const Footer=({t})=>(
  <div style={{background:C.surface2,borderTop:`1px solid ${C.border}`,padding:"28px 24px 40px",textAlign:"center"}}>
    {/* Logótipo oficial */}
    <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
      <img src={CMP_LOGO} alt="Câmara Municipal de Peniche"
        style={{height:32,width:"auto",opacity:.85}}/>
    </div>
    <div style={{fontSize:12,color:C.text3,lineHeight:2}}>
      <div>{t.address}</div>
      <div>{t.nif}</div>
      <div style={{marginTop:8,fontSize:11,opacity:.7}}>{t.footerLegal}</div>
      <div style={{fontSize:10,opacity:.4,marginTop:4}}>© {new Date().getFullYear()} · {t.footerRights}</div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
//  INFO SCREENS
// ─────────────────────────────────────────────
const InfoScreen=({goTo,screen,lang,setLang,t})=>{
  const WRAP=({goTo,lang,setLang,t,title,icon,children})=>(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",zIndex:9999}}>
        <Nav left={<Back onClick={()=>goTo("landing")}/>} title={title}
          right={<div style={{position:"relative"}}><Menu goTo={goTo} lang={lang} setLang={setLang} t={t}/></div>}/>
      </div>
      <div style={{flex:1,padding:"24px 18px",maxWidth:480,margin:"0 auto",width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:44,marginBottom:8}}>{icon}</div>
          <div style={{fontSize:20,fontWeight:700,color:C.text}}>{title}</div>
        </div>
        {children}
      </div>
      <Footer t={t}/>
    </div>
  );
  // Converte emails e telefones em links clicáveis
  const linkify=(text)=>{
    const parts=text.split(/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g);
    return parts.map((p,i)=>{
      if(p.includes("@")&&/^[^@\s]+@[^@\s]+$/.test(p))
        return<a key={i} href={"mailto:"+p} style={{color:C.green,fontWeight:700,textDecoration:"underline"}}>{p}</a>;
      return p;
    });
  };
  const CARD=({q,a})=>(
    <div style={{...card(),padding:"16px 18px",marginBottom:10}}>
      <div style={{fontSize:13,fontWeight:700,color:C.green,marginBottom:6,lineHeight:1.4}}>{q}</div>
      <div style={{fontSize:13,color:C.text2,lineHeight:1.75,whiteSpace:"pre-line"}}>{linkify(a)}</div>
    </div>
  );
  if(screen==="faq") return(
    <WRAP goTo={goTo} lang={lang} setLang={setLang} t={t} title={t.faq} icon="❓">
      {[["Como funciona?","Digitalize o QR code na placa da zona, ou abra a app directamente. Seleccione a zona, introduza a matrícula, escolha a duração e pague. O recibo é gerado instantaneamente."],
        ["Que pagamentos são aceites?","MB WAY, cartão bancário (débito ou crédito), Apple Pay, Google Pay e PayPal. Todos processados via Stripe (PCI DSS nível 1)."],
        ["A sessão expira ao fechar o browser?","Não. A sessão fica guardada e o temporizador continua a correr. Ao reabrir, retoma com o tempo restante actualizado."],
        ["Preciso de conta para pagar?","Não. Qualquer utilizador paga directamente sem registo. A conta serve apenas para descontos de residente ou trabalhador."],
        ["Como obtenho desconto?","Residentes beneficiam de 50% de desconto e trabalhadores locais de 30%. Submeta o pedido em 'Iniciar Sessão → Pedir Estatuto'. Validação em 5 dias úteis."],
        ["Posso prolongar o tempo?","Sim. Quando restar menos de 10 minutos, surge o botão '+1h'. Pode prolongar várias vezes."],
        ["Aceita matrículas estrangeiras?","Sim. Qualquer formato: PT (AA-00-AA), FR (AA-123-AA), UK (AB12CDE), USA (ABC1234), etc."],
      ].map(([q,a],i)=><CARD key={i} q={q} a={a}/>)}
    </WRAP>
  );
  if(screen==="terms") return(
    <WRAP goTo={goTo} lang={lang} setLang={setLang} t={t} title={t.terms} icon="📄">
      {[["1. Aceitação","Ao utilizar o Parquímetro Digital aceita integralmente os presentes Termos da Câmara Municipal de Peniche."],
        ["2. Âmbito","Exclusivo para pagamento de estacionamento nas zonas controladas do município de Peniche."],
        ["3. Pagamentos","Processados via Stripe (PCI DSS nível 1). A CM Peniche não armazena dados de cartão. Tarifas conforme Edital nº 2024/0042, actualizáveis anualmente."],
        ["4. Responsabilidade do Utilizador","O utilizador é responsável pela correcta introdução da matrícula e zona. Erros não dão lugar a reembolso."],
        ["5. Verificação","As matrículas são verificadas electronicamente pelos agentes municipais. Veículos sem sessão válida estão sujeitos a procedimento de contraordenação."],
        ["6. RGPD","Dados tratados conforme o RGPD (UE 2016/679). Responsável: CM Peniche, NIF 506 715 320. Contacto: rgpd@cm-penichepark.pt — clique para escrever"],
        ["7. Reembolsos","Pedidos em 24h após pagamento.
Email: suporte@cm-penichepark.pt
Indique a ref. PKX-XXXXXX e IBAN.
Creditados em 5–10 dias úteis."],
        ["8. Alterações","Alterações publicadas em cm-peniche.pt com 30 dias de aviso. Utilização continuada implica aceitação."],
      ].map(([q,a],i)=><CARD key={i} q={q} a={a}/>)}
    </WRAP>
  );
  if(screen==="support") return(
    <WRAP goTo={goTo} lang={lang} setLang={setLang} t={t} title={t.support} icon="💬">
      {[["📧 Email","suporte@cm-penichepark.pt\nResposta em 2 dias úteis."],
        ["📞 Telefone","262 780 100\nDias úteis 9h–17h (excluindo feriados)."],
        ["🏛️ Presencial","Câmara Municipal de Peniche\nLargo do Município, 2520-208 Peniche\nSeg–Sex 9h–17h30"],
        ["🚔 Contactos de Emergência","PSP Peniche: 262 782 220\nEmergência: 112\nPolícia Municipal: 262 780 130"],
        ["💳 Reembolsos","Email com:\n• Ref. PKX-XXXXXX\n• Motivo do pedido\n• IBAN\nPrazo: 24h após pagamento."],
        ["🔒 Dados / RGPD","rgpd@cm-penichepark.pt\nEncarregado DPO: epd@cm-peniche.pt"],
      ].map(([q,a],i)=><CARD key={i} q={q} a={a}/>)}
    </WRAP>
  );
  return null;
};

// ─────────────────────────────────────────────
//  LANDING
// ─────────────────────────────────────────────
const Landing=({goTo,state,lang,setLang,t})=>(
  <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
    {/* Header */}
    <div style={{position:"relative",zIndex:9999,display:"flex",alignItems:"center",
      justifyContent:"space-between",padding:"18px 20px",
      borderBottom:`1px solid ${C.border}`}}>
      <img src={CMP_LOGO} alt="Câmara Municipal de Peniche"
        style={{height:26,width:"auto",opacity:.9}}/>
      <div style={{position:"relative"}}>
        <Menu goTo={goTo} lang={lang} setLang={setLang} t={t}/>
      </div>
    </div>
    {/* Hero */}
    <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",textAlign:"center",padding:"56px 32px 64px"}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:7,background:C.okBg,
        borderRadius:999,padding:"6px 16px",marginBottom:32,fontSize:12,fontWeight:600,
        color:C.ok,border:`1px solid ${C.okBd}`,letterSpacing:".2px"}}>
        <span style={{width:6,height:6,background:C.ok,borderRadius:"50%"}}/>
        {t.active}
      </div>
      <div style={{fontSize:11,fontWeight:700,letterSpacing:3.5,textTransform:"uppercase",
        color:C.text3,marginBottom:10}}>
        Parquímetro
      </div>
      <div style={{fontSize:68,fontWeight:900,letterSpacing:-3,lineHeight:.88,color:C.text,marginBottom:10}}>
        Digital
      </div>
      <div style={{fontSize:14,color:C.text2,lineHeight:1.7,maxWidth:260,marginBottom:12}}>
        Simples. Rápido. Sem papel.
      </div>
      <div style={{fontSize:12,color:C.text3,marginBottom:40}}>Município de Peniche · 6 Zonas Tarifadas</div>

      {state.endTime&&new Date(state.endTime)>new Date()&&(
        <div onClick={()=>goTo("success")}
          style={{display:"inline-flex",alignItems:"center",gap:10,background:C.okBg,
            border:`1px solid ${C.okBd}`,borderRadius:16,padding:"12px 18px",marginBottom:20,
            cursor:"pointer",maxWidth:320,width:"100%"}}>
          <span style={{width:9,height:9,borderRadius:"50%",background:C.ok,flexShrink:0}}/>
          <span style={{fontSize:13,fontWeight:600,color:C.ok,textAlign:"left"}}>
            {t.sessionActive}: <strong>{state.plate}</strong> · {t.viewReceipt}
          </span>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:300}}>
        <button onClick={()=>goTo("zone")} style={btnP({fontSize:16,padding:"18px 20px",borderRadius:22,boxShadow:"0 4px 20px rgba(61,122,58,.28)"})}>
          {t.pay}
        </button>
        <button onClick={()=>goTo("login")} style={btnO({fontSize:15,borderRadius:22})}>
          {t.login}
        </button>
      </div>
    </div>
    <Footer t={t}/>
  </div>
);

// ─────────────────────────────────────────────
//  GOOGLE SIGN-IN HELPERS
//  • Decodes JWT on the client (no verification needed — Google already verified it)
//  • Stores Google user profiles in localStorage so returning users skip setup
//  • GOOGLE_CLIENT_ID: replace with your real OAuth 2.0 Client ID in production
//    (APIs & Services → Credentials → OAuth 2.0 Client IDs in Google Cloud Console)
//    Authorised origins must include your domain. Demo works without it — the button
//    shows a setup hint instead of the popup.
// ─────────────────────────────────────────────
const GOOGLE_CLIENT_ID = "750901746635-mna374qus37jkg3kbsv4mdptnduie2k2.apps.googleusercontent.com";
const LS_GUSERS = "pkx_gusers_v9";

const decodeJWT = tok => {
  try { return JSON.parse(atob(tok.split(".")[1].replace(/-/g,"+").replace(/_/g,"/"))); }
  catch { return null; }
};
const saveGProfile = p => { const a=lsG(LS_GUSERS,{}); a[p.email]=p; lsS(LS_GUSERS,a); };
const getGProfile  = e => lsG(LS_GUSERS,{})[e]||null;

// Loads the Google Identity Services script once
let _gsiReady=false;
const loadGSI=()=>new Promise(res=>{
  if(_gsiReady||window.google?.accounts){_gsiReady=true;res();return;}
  const s=document.createElement("script");
  s.src="https://accounts.google.com/gsi/client";s.async=true;
  s.onload=()=>{_gsiReady=true;res();}; document.head.appendChild(s);
});

// ─────────────────────────────────────────────
//  GOOGLE BUTTON
// ─────────────────────────────────────────────
const GoogleBtn=({onCredential})=>{
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const isDemo=GOOGLE_CLIENT_ID.startsWith("YOUR_");

  const handleClick=async()=>{
    if(isDemo){
      // In demo mode: simulate a Google login with a fake payload
      const fakePayload={
        sub:"google_demo_001",
        email:"utilizador.google@gmail.com",
        name:"Utilizador Google (Demo)",
        picture:null,
        email_verified:true,
      };
      // Encode as a fake credential token (base64 payload only — never used for verification)
      const fakeToken="header."+btoa(JSON.stringify(fakePayload))+".sig";
      onCredential(fakeToken);
      return;
    }
    setErr("");setLoading(true);
    try{
      await loadGSI();
      window.google.accounts.id.initialize({
        client_id:GOOGLE_CLIENT_ID,
        callback:r=>{setLoading(false);if(r.credential)onCredential(r.credential);else setErr("Autenticação cancelada.");},
        ux_mode:"popup",
        cancel_on_tap_outside:true,
      });
      window.google.accounts.id.prompt(n=>{
        if(n.isNotDisplayed()||n.isSkippedMoment()){
          // One Tap blocked — render hidden button and trigger it
          const tmp=document.createElement("div");
          tmp.style="position:absolute;left:-9999px;";document.body.appendChild(tmp);
          window.google.accounts.id.renderButton(tmp,{type:"standard",size:"large"});
          const b=tmp.querySelector("div[role=button]");
          if(b)b.click();else{setLoading(false);setErr("Popup bloqueado. Verifique as definições do browser.");}
          setTimeout(()=>document.body.contains(tmp)&&document.body.removeChild(tmp),4000);
        }
      });
    }catch(e){setLoading(false);setErr(e.message);}
  };

  return(
    <div>
      <button onClick={handleClick} disabled={loading}
        style={{display:"flex",alignItems:"center",justifyContent:"center",gap:12,
          width:"100%",padding:"15px 20px",borderRadius:20,cursor:loading?"wait":"pointer",
          border:`1.5px solid ${C.border}`,background:C.surface,fontFamily:"inherit",
          fontSize:15,fontWeight:600,color:C.text,transition:"all .15s",
          boxShadow:"0 1px 6px rgba(0,0,0,.06)",opacity:loading?.7:1}}>
        {loading
          ?<span style={{fontSize:13,color:C.text2}}>A autenticar…</span>
          :<>
            <svg width="20" height="20" viewBox="0 0 24 24" style={{flexShrink:0}}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isDemo?"Entrar com Google (Demo)":"Entrar com Google"}
          </>}
      </button>
      {err&&<div style={{marginTop:10,background:C.errBg,border:`1px solid ${C.errBd}`,
        borderRadius:12,padding:"10px 14px",fontSize:12,color:C.err,lineHeight:1.5}}>{err}</div>}
      {isDemo&&(
        <div style={{marginTop:8,fontSize:11,color:C.text3,textAlign:"center",lineHeight:1.6,
          background:C.warnBg,border:`1px solid ${C.warnBd}`,borderRadius:10,padding:"8px 12px"}}>
          🔧 Demo activa — em produção substitua <code style={{background:C.bg3,padding:"1px 5px",borderRadius:4,fontSize:10}}>GOOGLE_CLIENT_ID</code> pelo Client ID real da Google Cloud Console.
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
//  LOGIN
// ─────────────────────────────────────────────
const LoginScreen=({goTo,setUser,toast,t,lang,setLang})=>{
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const [showDemo,setShowDemo]=useState(false);

  // Demo / operator login (unchanged)
  const goCredentials=()=>{
    const u=USERS.find(u=>u.email===email.trim()&&u.pass===pass.trim());
    if(!u){toast(t.wrongCreds);return;}
    setUser(u);
    goTo(isOps(u.role)?(u.role==="admin"?"adminPanel":"opPanel"):"resArea");
  };

  // Google credential callback
  const onGoogleCredential=credential=>{
    const payload=decodeJWT(credential);
    if(!payload){toast("Erro ao processar token Google.");return;}
    const existing=getGProfile(payload.email);
    const gUser={
      email:   payload.email,
      name:    payload.name||payload.email.split("@")[0],
      picture: payload.picture||null,
      googleId:payload.sub,
      isGoogle:true,
      // Inherit saved role/plate/discount if returning user
      role:     existing?.role     || "google",
      plate:    existing?.plate    || "",
      discount: existing?.discount || 0,
      pendingRole: existing?.pendingRole || null,
    };
    setUser(gUser);
    // Returning user with complete profile → resArea
    if(existing?.plate && existing?.role && existing.role!=="google"){
      toast("Bem-vindo/a, "+gUser.name+".");
      goTo("resArea");
    } else {
      // First time or incomplete → profile setup
      goTo("googleProfile");
    }
  };

  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <Nav left={<Back onClick={()=>goTo("landing")}/>} title={t.signIn}/>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"32px 20px"}}>
        <div style={{width:"100%",maxWidth:360}}>

          {/* Header */}
          <div style={{textAlign:"center",marginBottom:32}}>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:3.5,textTransform:"uppercase",
              color:C.text3,marginBottom:8}}>Parquímetro Digital</div>
            <div style={{fontSize:24,fontWeight:800,color:C.text,letterSpacing:"-.5px"}}>{t.signIn}</div>
            <div style={{fontSize:13,color:C.text2,marginTop:6,lineHeight:1.6}}>
              Cidadãos · Residentes · Trabalhadores
            </div>
          </div>

          {/* ── Google Sign-In (primary CTA) ── */}
          <GoogleBtn onCredential={onGoogleCredential}/>

          {/* Divider */}
          <div style={{display:"flex",alignItems:"center",gap:12,margin:"22px 0 18px"}}>
            <div style={{flex:1,height:1,background:C.border}}/>
            <span style={{fontSize:12,color:C.text3,fontWeight:500}}>ou entrar com email</span>
            <div style={{flex:1,height:1,background:C.border}}/>
          </div>

          {/* ── Email + password ── */}
          <div style={{...card(),marginBottom:12,overflow:"hidden"}}>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email"
              placeholder={t.emailLabel} onKeyDown={e=>e.key==="Enter"&&goCredentials()}
              style={{...inp(),border:"none",borderRadius:0,borderBottom:`1px solid ${C.border}`,boxShadow:"none"}}/>
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password"
              placeholder={t.passwordLabel} onKeyDown={e=>e.key==="Enter"&&goCredentials()}
              style={{...inp(),border:"none",borderRadius:0,boxShadow:"none"}}/>
          </div>
          <button style={btnP()} onClick={goCredentials}>{t.signIn}</button>

          {/* ── Demo credentials (collapsible) ── */}
          <button onClick={()=>setShowDemo(o=>!o)}
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,
              width:"100%",marginTop:20,padding:"10px",background:"none",border:"none",
              cursor:"pointer",fontFamily:"inherit",fontSize:12,color:C.text3,fontWeight:600,
              letterSpacing:.2}}>
            <span style={{fontSize:10,opacity:.6}}>{showDemo?"▲":"▼"}</span>
            {t.demoHint}
          </button>
          {showDemo&&(
            <div style={{background:C.surface2,borderRadius:16,padding:"12px 16px",
              border:`1px solid ${C.border}`}}>
              {USERS.map(u=>(
                <button key={u.email}
                  onClick={()=>{setEmail(u.email);setPass(u.pass);setShowDemo(false);}}
                  style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                    width:"100%",padding:"10px 0",background:"none",border:"none",
                    cursor:"pointer",fontFamily:"inherit",borderBottom:`1px solid ${C.border2}`}}>
                  <span style={{fontSize:12,color:C.text2,fontWeight:500}}>{u.name}</span>
                  <span style={{fontSize:11,color:C.green,fontFamily:"monospace",fontWeight:600}}>{u.email}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  GOOGLE PROFILE SETUP
//  Shown once after Google login to collect plate + status
// ─────────────────────────────────────────────
const GoogleProfileScreen=({goTo,user,setUser,toast,t})=>{
  const [plate,setPlate]=useState(user?.plate||"");
  const [role,setRole]=useState(
    user?.pendingRole||
    (["resident","worker","visitor"].includes(user?.role)?user.role:""
  ));
  const [done,setDone]=useState(false);

  const ROLES=[
    {id:"visitor", icon:"🧳", label:"Visitante",    sub:"Tarifa normal · sem desconto",                 discount:0},
    {id:"resident",icon:"🏠", label:"Residente",    sub:"50% desconto após validação municipal",         discount:50},
    {id:"worker",  icon:"💼", label:"Trabalhador",  sub:"30% desconto após validação municipal",         discount:30},
  ];

  const save=()=>{
    if(plate.trim().length<2){toast("Introduza a matrícula.");return;}
    if(!role){toast("Seleccione o tipo de utilizador.");return;}
    const r=ROLES.find(x=>x.id===role);
    const needsValidation=["resident","worker"].includes(role);
    const updated={
      ...user,
      plate: plate.trim().toUpperCase(),
      role:  needsValidation?"pending_"+role:role,
      discount: needsValidation?0:r.discount,
      pendingRole: needsValidation?role:null,
    };
    saveGProfile(updated);
    setUser(updated);
    setDone(true);
  };

  // ── Success state ──
  if(done) return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column",
      alignItems:"center",justifyContent:"center",textAlign:"center",padding:"48px 32px"}}>
      {user?.picture
        ?<img src={user.picture} alt="" style={{width:68,height:68,borderRadius:34,
            marginBottom:18,border:`3px solid ${C.green}`,boxShadow:`0 4px 16px rgba(61,122,58,.25)`}}/>
        :<div style={{fontSize:60,marginBottom:18}}>✅</div>}
      <div style={{fontSize:22,fontWeight:800,color:C.text,letterSpacing:"-.5px",marginBottom:10}}>
        Perfil guardado!
      </div>
      {["resident","worker"].includes(role)?(
        <>
          <div style={{background:C.warnBg,border:`1px solid ${C.warnBd}`,borderRadius:14,
            padding:"14px 18px",maxWidth:300,margin:"0 auto 24px",fontSize:13,color:C.warn,lineHeight:1.7}}>
            ⏳ Pedido de <strong>{ROLES.find(r=>r.id===role)?.label}</strong> registado.
            A Câmara Municipal de Peniche validará o pedido em até <strong>5 dias úteis</strong>.
            Receberá confirmação em <strong>{user?.email}</strong>.
          </div>
          <div style={{background:C.okBg,border:`1px solid ${C.okBd}`,borderRadius:14,
            padding:"12px 18px",maxWidth:300,margin:"0 auto 28px",fontSize:13,color:C.ok}}>
            ✓ Pode efectuar pagamentos de imediato — o desconto será aplicado após validação.
          </div>
        </>
      ):(
        <p style={{color:C.text2,maxWidth:280,margin:"0 auto 28px",fontSize:14,lineHeight:1.7}}>
          Veículo <strong>{plate.toUpperCase()}</strong> registado com sucesso.
        </p>
      )}
      <button style={btnP({maxWidth:300,borderRadius:20})} onClick={()=>goTo("resArea")}>
        Ir para a minha conta →
      </button>
    </div>
  );

  // ── Setup form ──
  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <Nav left={<Back onClick={()=>goTo("landing")}/>} title="Completar Perfil"/>
      <div style={{flex:1,padding:"24px 20px 48px",maxWidth:440,margin:"0 auto",width:"100%"}}>

        {/* Google identity card */}
        <div style={{...card(),padding:"18px 20px",marginBottom:28,
          display:"flex",alignItems:"center",gap:14,
          background:`linear-gradient(135deg,${C.greenL},${C.tealL})`}}>
          {user?.picture
            ?<img src={user.picture} alt="" style={{width:50,height:50,borderRadius:25,
                flexShrink:0,border:`2px solid ${C.green}`}}/>
            :<div style={{width:50,height:50,borderRadius:25,background:C.green,color:"#fff",
                display:"flex",alignItems:"center",justifyContent:"center",
                fontSize:18,fontWeight:800,flexShrink:0}}>
              {(user?.name?.[0]||"G").toUpperCase()}
            </div>}
          <div style={{minWidth:0}}>
            <div style={{fontSize:15,fontWeight:700,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.name}</div>
            <div style={{fontSize:12,color:C.text2,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.email}</div>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,marginTop:6,
              background:"rgba(66,133,244,.1)",border:"1px solid rgba(66,133,244,.2)",
              borderRadius:999,padding:"3px 10px",fontSize:11,fontWeight:600,color:"#4285F4"}}>
              <svg width="9" height="9" viewBox="0 0 24 24" style={{flexShrink:0}}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Conta Google verificada
            </div>
          </div>
        </div>

        {/* Step 1 — Plate */}
        <div style={{marginBottom:24}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,
            color:C.text3,marginBottom:10}}>1 · {t.plate}</div>
          <input value={plate} onChange={e=>setPlate(cleanPlate(e.target.value))}
            placeholder="AA-00-AA · AB123CD · 1ABC123" maxLength={12}
            style={{...inp(),textAlign:"center",fontSize:20,fontWeight:800,letterSpacing:4}}/>
          <div style={{fontSize:12,color:C.text3,marginTop:6,textAlign:"center"}}>{t.plateHint}</div>
        </div>

        {/* Step 2 — Role */}
        <div style={{marginBottom:28}}>
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,
            color:C.text3,marginBottom:10}}>2 · Tipo de utilizador</div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            {ROLES.map(r=>{
              const sel=role===r.id;
              return(
                <div key={r.id} onClick={()=>setRole(r.id)}
                  style={{...card(),padding:"15px 18px",cursor:"pointer",transition:"all .15s",
                    border:`2px solid ${sel?C.green:C.border2}`,
                    background:sel?C.greenL:C.surface,
                    display:"flex",alignItems:"center",gap:14}}>
                  <span style={{fontSize:22,flexShrink:0}}>{r.icon}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700,color:C.text}}>{r.label}</div>
                    <div style={{fontSize:12,color:C.text2,marginTop:2}}>{r.sub}</div>
                  </div>
                  <div style={{width:22,height:22,borderRadius:11,flexShrink:0,
                    border:`2px solid ${sel?C.green:C.border}`,
                    background:sel?C.green:"transparent",
                    display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {sel&&<div style={{width:7,height:7,borderRadius:"50%",background:"#fff"}}/>}
                  </div>
                </div>
              );
            })}
          </div>
          {["resident","worker"].includes(role)&&(
            <div style={{marginTop:12,background:C.warnBg,border:`1px solid ${C.warnBd}`,
              borderRadius:12,padding:"11px 14px",fontSize:12,color:C.warn,lineHeight:1.6}}>
              ⏳ O desconto ficará pendente até à validação pela Câmara Municipal de Peniche (prazo máximo: 5 dias úteis).
            </div>
          )}
        </div>

        <button style={btnP()} onClick={save}>Guardar e continuar →</button>
        <button style={{...btnO({borderRadius:18,marginTop:10}),fontSize:13,color:C.text3}}
          onClick={()=>goTo("landing")}>
          Fazer isto mais tarde
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  ZONE LANDING — ecrã directamente após leitura de QR de zona
//  Fundo com a cor da zona + pagamento imediato (matrícula + tempo)
// ─────────────────────────────────────────────
const ZoneLanding=({goTo,state,setState,toast,t,user})=>{
  const zId=state.zone;
  const z=ZONES[zId];
  useEffect(()=>{if(!z)goTo("landing");},[z]);
  if(!z)return null;

  const [plate,setPlate]=useState(state.plate||"");
  const plateRef=useRef(null);
  const recent=lsG(LS_PLATES,[]);

  // Mesmo options que TimeScreen: 15 em 15 min até 8h
  const OPTIONS=useMemo(()=>{
    const out=[];
    for(let m=15;m<=480;m+=15){
      const h=Math.floor(m/60),rm=m%60;
      let label;
      if(h===0)label=`${m} min`;
      else if(rm===0)label=h===1?"1 hora":`${h} horas`;
      else label=`${h}h ${String(rm).padStart(2,"0")}`;
      out.push({mins:m,label});
    }
    return out;
  },[]);

  const [idx,setIdx]=useState(3); // default 1 hora
  const mins=OPTIONS[idx].mins;
  const PILLS=[{m:15,l:"15 min"},{m:60,l:"1 hora"},{m:120,l:"2 horas"},{m:240,l:"4 horas"}];

  // desconto se utilizador com desconto activo
  const disc=user?.discount||0;
  const raw=parseFloat((z.rate*(mins/60)).toFixed(2));
  const final=disc?parseFloat((raw*(1-disc/100)).toFixed(2)):raw;

  const proceed=()=>{
    const p=plate.trim().toUpperCase();
    if(p.length<2){toast("Introduza a matrícula do veículo.");plateRef.current?.focus();return;}
    setState(s=>({...s,plate:p,mins:mins,price:z.rate}));
    lsS(LS_PLATES,[p,...recent.filter(r=>r!==p)].slice(0,5));
    goTo("payment");
  };

  useEffect(()=>{setTimeout(()=>plateRef.current?.focus(),300);},[]);

  // gradient: zona cor no topo, claro em baixo
  const bgGrad=`linear-gradient(175deg,${z.color} 0%,${z.color}dd 28%,${z.bg.replace('.08','.04')} 60%,${C.bg} 100%)`;

  return(
    <div style={{minHeight:"100svh",background:bgGrad,display:"flex",flexDirection:"column"}}>
      {/* Topo com zona */}
      <div style={{padding:"52px 24px 32px",textAlign:"center",position:"relative"}}>
        <button onClick={()=>goTo("landing")}
          style={{position:"absolute",top:16,left:16,width:44,height:44,borderRadius:22,
            background:"rgba(255,255,255,.22)",border:"none",color:"#fff",fontSize:20,
            cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
          ←
        </button>
        {/* Badge de zona */}
        <div style={{display:"inline-flex",alignItems:"center",gap:10,
          background:"rgba(255,255,255,.18)",borderRadius:999,
          padding:"8px 20px",marginBottom:16,backdropFilter:"blur(8px)"}}>
          <div style={{width:32,height:32,borderRadius:16,background:"rgba(255,255,255,.3)",
            color:"#fff",fontWeight:900,fontSize:15,display:"flex",
            alignItems:"center",justifyContent:"center"}}>
            {zId}
          </div>
          <div style={{color:"#fff",fontWeight:700,fontSize:14,letterSpacing:.3}}>
            Zona {zId} · {ZR(zId)}
          </div>
        </div>
        <div style={{fontSize:26,fontWeight:900,color:"#fff",letterSpacing:-.5,marginBottom:4}}>
          {z.name}
        </div>
        <div style={{fontSize:13,color:"rgba(255,255,255,.78)",fontWeight:500}}>
          {z.desc}
        </div>
        {disc>0&&(
          <div style={{display:"inline-flex",alignItems:"center",gap:6,
            background:"rgba(255,255,255,.22)",borderRadius:999,
            padding:"5px 14px",marginTop:10,backdropFilter:"blur(8px)"}}>
            <span style={{color:"#fff",fontSize:12,fontWeight:700}}>
              ✓ Desconto de {disc}% aplicado
            </span>
          </div>
        )}
      </div>

      {/* Formulário rápido */}
      <div style={{flex:1,background:"#fff",borderRadius:"28px 28px 0 0",
        padding:"28px 20px 40px",display:"flex",flexDirection:"column",gap:20}}>

        {/* Matrícula */}
        <div>
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",
            letterSpacing:1,color:C.text3,marginBottom:8}}>
            Matrícula do Veículo
          </div>
          <input
            ref={plateRef}
            value={plate}
            onChange={e=>setPlate(e.target.value.toUpperCase())}
            onKeyDown={e=>e.key==="Enter"&&proceed()}
            placeholder="AA-00-AA"
            style={{width:"100%",padding:"14px 16px",borderRadius:14,
              border:`1.5px solid ${plate.length>1?z.color:C.border}`,
              fontSize:20,fontWeight:800,letterSpacing:3,textAlign:"center",
              color:C.text,background:C.bg,outline:"none",
              fontFamily:"'Sora',monospace",transition:"border-color .15s"}}
          />
          {/* Matrículas recentes */}
          {recent.length>0&&!plate&&(
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:8}}>
              {recent.slice(0,3).map(r=>(
                <button key={r} onClick={()=>setPlate(r)}
                  style={{fontSize:12,fontWeight:700,padding:"5px 12px",
                    borderRadius:999,border:`1px solid ${C.border}`,
                    background:C.bg,color:C.text2,cursor:"pointer",letterSpacing:1}}>
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Duração — DrumPicker igual ao TimeScreen */}
        <div>
          <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",
            letterSpacing:1,color:C.text3,marginBottom:10}}>
            Duração
          </div>
          {/* Preço em destaque */}
          <div style={{textAlign:"center",marginBottom:12}}>
            <div style={{fontSize:36,fontWeight:900,color:z.color,letterSpacing:-1,lineHeight:1}}>
              {final.toFixed(2).replace(".",",")} €
            </div>
            {disc>0&&(
              <div style={{fontSize:11,color:C.ok,fontWeight:700,marginTop:4}}>
                Desconto de {disc}% aplicado
              </div>
            )}
          </div>
          {/* Drum picker */}
          <div style={{...card({background:C.surface2}),padding:"0",overflow:"hidden",marginBottom:12}}>
            <DrumPicker items={OPTIONS} selectedIndex={idx} onChange={setIdx}/>
          </div>
          {/* Pills de atalho */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {PILLS.map(({m,l})=>{
              const pidx=OPTIONS.findIndex(o=>o.mins===m);
              const sel=idx===pidx;
              return(
                <button key={m} onClick={()=>setIdx(pidx)}
                  style={{minHeight:44,padding:"10px 4px",borderRadius:14,border:"none",
                    fontFamily:"inherit",fontSize:11,fontWeight:700,cursor:"pointer",
                    background:sel?z.color:C.bg3,
                    color:sel?"#fff":C.text2,
                    transition:"all .18s",lineHeight:1.2,
                    boxShadow:sel?`0 2px 8px ${z.color}44`:"none"}}>
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <button onClick={proceed}
          style={{...btnP(),background:z.color,
            boxShadow:`0 4px 20px ${z.color}55`,
            fontSize:16,padding:"18px 20px",borderRadius:22}}>
          Confirmar e Pagar
        </button>

        {/* Link alternativo */}
        <button onClick={()=>goTo("zone")}
          style={{background:"none",border:"none",color:C.text3,
            fontSize:13,fontWeight:600,cursor:"pointer",padding:"4px",
            fontFamily:"'Sora',sans-serif"}}>
          ← Escolher outra zona
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  ZONE SELECT
// ─────────────────────────────────────────────
const ZoneScreen=({goTo,state,setState,toast,lang,setLang,t,user})=>{
  const [plate,setPlate]=useState(state.plate||"");
  const plateRef=useRef(null);
  const recent=lsG(LS_PLATES,[]);
  const next=()=>{
    if(!state.zone){toast("Seleccione uma zona.");return;}
    const p=plate.trim();
    if(p.length<2){toast("Introduza a matrícula.");return;}
    const fp=p.toUpperCase();
    setState(s=>({...s,plate:fp}));
    lsS(LS_PLATES,[fp,...recent.filter(x=>x!==fp)].slice(0,6));
    goTo("time");
  };
  // Hick's: auto-focus matrícula quando zona já pré-seleccionada (via QR)
  useEffect(()=>{if(state.zone&&plateRef.current)plateRef.current.focus();},[]);

  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",zIndex:9999}}>
        <Nav left={<Back onClick={()=>goTo("landing")}/>} title={t.pay.replace("🅿️  ","")}
          right={<div style={{position:"relative"}}><Menu goTo={goTo} lang={lang} setLang={setLang} t={t}/></div>}/>
      </div>
      <Steps step={0} labels={[t.zone,"Tempo",t.payment]}/>
      <div style={{flex:1,padding:"20px 18px 40px",maxWidth:480,margin:"0 auto",width:"100%"}}>
        <div style={{fontSize:21,fontWeight:800,letterSpacing:"-.5px",marginBottom:4,color:C.text}}>{t.whereParking}</div>
        <div style={{fontSize:14,color:C.text2,marginBottom:22,lineHeight:1.6}}>{t.selectZone}</div>
        {user&&isRes(user.role)&&(
          <div style={{background:C.okBg,border:`1px solid ${C.okBd}`,borderRadius:14,padding:"12px 16px",marginBottom:18}}>
            <div style={{fontSize:13,color:C.ok,fontWeight:600}}>✓ Desconto de {user.discount}% activo — {user.name}</div>
          </div>
        )}

        {/* Fitts: single-column full-width cards — maior área de toque, sem erro de coluna errada */}
        {/* Hick's: cada card é uma única decisão linear, sem comparação simultânea de 6 */}
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:24}}>
          {Object.entries(ZONES).map(([id,z])=>{
            const sel=state.zone===id;
            return(
              <div key={id} onClick={()=>{
                setState(s=>({...s,zone:id,price:z.rate}));
                // Fitts: após seleccionar zona, foca automaticamente no input de matrícula
                setTimeout(()=>plateRef.current?.focus(),100);
              }}
                style={{
                  borderRadius:20,padding:"14px 18px",cursor:"pointer",
                  border:`2px solid ${sel?z.color:C.border2}`,
                  background:sel?z.bg:C.surface,
                  boxShadow:sel?`0 0 0 4px ${z.color}12`:"none",
                  transition:"all .15s",
                  display:"flex",alignItems:"center",gap:16,
                  // Fitts: mínimo 64px altura — alvos fáceis de atingir
                  minHeight:64,
                }}>
                {/* Letra da zona — âncora visual primária */}
                <div style={{width:44,height:44,borderRadius:13,flexShrink:0,
                  background:sel?z.color:z.bg,
                  border:`2px solid ${sel?z.color:z.bd}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:20,fontWeight:900,
                  color:sel?"#fff":z.color,
                  transition:"all .15s"}}>
                  {id}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:15,fontWeight:700,color:sel?z.color:C.text}}>{z.name}</div>
                  <div style={{fontSize:12,color:C.text3,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{z.desc}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:15,fontWeight:800,color:z.color}}>{ZR(id)}</div>
                  {sel&&<div style={{fontSize:11,color:z.color,fontWeight:700,marginTop:2}}>✓ Seleccionada</div>}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{marginBottom:20}}>
          <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:.7,color:C.text3,marginBottom:10}}>{t.plate}</div>
          {/* Fitts: input com altura generosa, foco automático */}
          <input ref={plateRef} value={plate} onChange={e=>setPlate(cleanPlate(e.target.value))}
            onKeyDown={e=>e.key==="Enter"&&next()}
            placeholder={t.platePlaceholder}
            maxLength={12} style={{...inp(),textAlign:"center",fontSize:20,fontWeight:800,letterSpacing:3,marginBottom:6}}/>
          <div style={{fontSize:12,color:C.text3,textAlign:"center"}}>{t.plateHint}</div>
          {/* Hick's: recentes só aparecem se existirem — não poluem o ecrã */}
          {recent.length>0&&(
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:12}}>
              <span style={{fontSize:11,color:C.text3,alignSelf:"center"}}>{t.recentPlates}:</span>
              {recent.map(p=>(
                <button key={p} onClick={()=>setPlate(p)}
                  // Fitts: pills mais altas para facilitar toque
                  style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:999,
                    padding:"8px 14px",fontFamily:"inherit",fontSize:12,fontWeight:700,
                    color:C.text,cursor:"pointer",letterSpacing:1,minHeight:36}}>
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
        <button style={btnP()} onClick={next}>{t.continue}</button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  DRUM PICKER — Apple-style iOS wheel
// ─────────────────────────────────────────────
const ITEM_H = 52;   // px height of each row
const VISIBLE = 5;   // odd number — centre item is selected

const DrumPicker=({items,selectedIndex,onChange})=>{
  const drumRef=useRef(null);
  const startYRef=useRef(null);
  const startScrollRef=useRef(null);
  const velRef=useRef(0);
  const lastYRef=useRef(null);
  const rafRef=useRef(null);
  const containerH=ITEM_H*VISIBLE;

  // Scroll position where item[i] is centred
  const idxToScroll=i=>i*ITEM_H;

  // Snap to nearest item with smooth deceleration
  const snapTo=useCallback((targetIdx)=>{
    const el=drumRef.current; if(!el) return;
    const clamped=Math.max(0,Math.min(items.length-1,targetIdx));
    const target=idxToScroll(clamped);
    const start=el.scrollTop; const dist=target-start;
    if(Math.abs(dist)<1){el.scrollTop=target;onChange(clamped);return;}
    let t=0; const dur=320;
    const ease=x=>x<0.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
    const step=()=>{
      t+=16; const p=Math.min(1,t/dur);
      el.scrollTop=start+dist*ease(p);
      if(p<1){rafRef.current=requestAnimationFrame(step);}
      else{el.scrollTop=target;onChange(clamped);}
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current=requestAnimationFrame(step);
  },[items.length,onChange]);

  // Initialise position
  useEffect(()=>{
    const el=drumRef.current; if(!el) return;
    el.scrollTop=idxToScroll(selectedIndex);
  },[]);

  // When selectedIndex changes externally (quick-select pills)
  useEffect(()=>{
    const el=drumRef.current; if(!el) return;
    const target=idxToScroll(selectedIndex);
    if(Math.abs(el.scrollTop-target)>2) snapTo(selectedIndex);
  },[selectedIndex]);

  // Touch handlers
  const onTouchStart=e=>{
    cancelAnimationFrame(rafRef.current);
    startYRef.current=e.touches[0].clientY;
    startScrollRef.current=drumRef.current.scrollTop;
    lastYRef.current=e.touches[0].clientY;
    velRef.current=0;
  };
  const onTouchMove=e=>{
    e.preventDefault();
    const dy=e.touches[0].clientY-startYRef.current;
    drumRef.current.scrollTop=startScrollRef.current-dy;
    velRef.current=lastYRef.current-e.touches[0].clientY;
    lastYRef.current=e.touches[0].clientY;
    // Live update while dragging
    const idx=Math.round(drumRef.current.scrollTop/ITEM_H);
    onChange(Math.max(0,Math.min(items.length-1,idx)));
  };
  const onTouchEnd=()=>{
    const el=drumRef.current;
    // Apply momentum
    let scroll=el.scrollTop+velRef.current*8;
    const raw=Math.round(scroll/ITEM_H);
    snapTo(raw);
  };

  // Mouse/pointer (desktop)
  const isDragging=useRef(false);
  const onPointerDown=e=>{
    cancelAnimationFrame(rafRef.current);
    isDragging.current=true;
    startYRef.current=e.clientY;
    startScrollRef.current=drumRef.current.scrollTop;
    lastYRef.current=e.clientY;
    velRef.current=0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove=e=>{
    if(!isDragging.current)return;
    const dy=e.clientY-startYRef.current;
    drumRef.current.scrollTop=startScrollRef.current-dy;
    velRef.current=lastYRef.current-e.clientY;
    lastYRef.current=e.clientY;
    const idx=Math.round(drumRef.current.scrollTop/ITEM_H);
    onChange(Math.max(0,Math.min(items.length-1,idx)));
  };
  const onPointerUp=()=>{
    if(!isDragging.current)return;
    isDragging.current=false;
    const raw=Math.round((drumRef.current.scrollTop+velRef.current*6)/ITEM_H);
    snapTo(raw);
  };

  // Wheel (trackpad/mouse scroll)
  const onWheel=e=>{
    e.preventDefault();
    cancelAnimationFrame(rafRef.current);
    drumRef.current.scrollTop+=e.deltaY;
    clearTimeout(drumRef._wt);
    drumRef._wt=setTimeout(()=>{
      const raw=Math.round(drumRef.current.scrollTop/ITEM_H);
      snapTo(raw);
    },80);
  };

  const pad=Math.floor(VISIBLE/2); // padding items above/below

  return(
    <div style={{position:"relative",height:containerH,overflow:"hidden",userSelect:"none",touchAction:"none"}}>
      {/* Selection highlight bar */}
      <div style={{
        position:"absolute",left:0,right:0,
        top:ITEM_H*pad,height:ITEM_H,
        background:C.greenL,
        borderTop:`1.5px solid ${C.green}`,
        borderBottom:`1.5px solid ${C.green}`,
        borderRadius:14,pointerEvents:"none",zIndex:2
      }}/>
      {/* Fade top */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:ITEM_H*pad+16,
        background:`linear-gradient(to bottom,${C.surface},rgba(255,255,255,.2))`,
        pointerEvents:"none",zIndex:3}}/>
      {/* Fade bottom */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:ITEM_H*pad+16,
        background:`linear-gradient(to top,${C.surface},rgba(255,255,255,.2))`,
        pointerEvents:"none",zIndex:3}}/>
      {/* Scroll container */}
      <div ref={drumRef}
        style={{height:"100%",overflowY:"scroll",scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}
        onWheel={onWheel}>
        {/* Top padding */}
        {Array.from({length:pad}).map((_,i)=>(
          <div key={"pt"+i} style={{height:ITEM_H}}/>
        ))}
        {items.map((item,i)=>{
          const isSel=i===selectedIndex;
          return(
            <div key={i}
              onClick={()=>snapTo(i)}
              style={{
                height:ITEM_H,display:"flex",alignItems:"center",justifyContent:"center",
                cursor:"pointer",transition:"color .15s",
                fontSize:isSel?22:16,
                fontWeight:isSel?800:400,
                color:isSel?C.green:C.text3,
                letterSpacing:isSel?"-.5px":"0",
              }}>
              {item.label}
            </div>
          );
        })}
        {/* Bottom padding */}
        {Array.from({length:pad}).map((_,i)=>(
          <div key={"pb"+i} style={{height:ITEM_H}}/>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  TIME SELECT
// ─────────────────────────────────────────────
const TimeScreen=({goTo,state,setState,lang,setLang,t,user})=>{
  // Build options: 15, 30, 45 ... up to 8h = 480 min (every 15min)
  const OPTIONS=useMemo(()=>{
    const out=[];
    for(let m=15;m<=480;m+=15){
      const h=Math.floor(m/60),rm=m%60;
      let label;
      if(h===0)label=`${m} min`;
      else if(rm===0)label=h===1?"1 hora":`${h} horas`;
      else label=`${h}h ${String(rm).padStart(2,"0")}`;
      out.push({mins:m,label});
    }
    return out;
  },[]);

  // Default: 1 hour = index 3 (15→30→45→60)
  const [idx,setIdx]=useState(3);
  const mins=OPTIONS[idx].mins;
  const base=(state.price||1)*(mins/60);
  const disc=user&&isRes(user.role)?user.discount:0;
  const total=Math.round((base*(1-disc/100))*100)/100;

  useEffect(()=>setState(s=>({...s,mins,total})),[mins,total]);

  const now=new Date(),end=new Date(now.getTime()+mins*60000);
  // Hick's: 4 âncoras em vez de 6 — cobre 80% dos casos de uso sem sobrecarga cognitiva
  // (15m → breve, 1h → padrão, 2h → compras/visita, 4h → dia inteiro)
  const PILLS=[{m:15,l:"15 min"},{m:60,l:"1 hora"},{m:120,l:"2 horas"},{m:240,l:"4 horas"}];

  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",zIndex:9999}}>
        <Nav left={<Back onClick={()=>goTo("zone")}/>} title={t.howLong}
          right={<div style={{position:"relative"}}><Menu goTo={goTo} lang={lang} setLang={setLang} t={t}/></div>}/>
      </div>
      <Steps step={1} labels={[t.zone,"Tempo",t.payment]}/>

      <div style={{flex:1,padding:"20px 18px 40px",maxWidth:480,margin:"0 auto",width:"100%"}}>
        {z&&<div style={{...zChip(state.zone),marginBottom:20,fontSize:14}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:z.color}}/>
          Zona {state.zone} — {z.name}
        </div>}

        {/* Picker card */}
        <div style={{...card(),padding:"24px 20px 20px",marginBottom:16}}>
          {/* Price display */}
          <div style={{textAlign:"center",marginBottom:20}}>
            <div style={{fontSize:42,fontWeight:800,color:C.green,letterSpacing:-2,lineHeight:1}}>
              {fmtEur(total)}
            </div>
            {disc>0&&(
              <div style={{fontSize:13,color:C.ok,fontWeight:600,marginTop:6,
                display:"inline-flex",alignItems:"center",gap:5,background:C.okBg,
                borderRadius:999,padding:"4px 12px",border:`1px solid ${C.okBd}`}}>
                Poupa {fmtEur(base*(disc/100))} · {disc}% desconto
              </div>
            )}
          </div>

          {/* Drum picker */}
          <div style={{...card({background:C.surface2}),padding:"0",overflow:"hidden",marginBottom:16}}>
            <DrumPicker items={OPTIONS} selectedIndex={idx} onChange={setIdx}/>
          </div>

          {/* Fitts: pills dispostas em grelha 4 colunas — alvos maiores, sem wrap */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
            {PILLS.map(({m,l})=>{
              const pidx=OPTIONS.findIndex(o=>o.mins===m);
              const sel=idx===pidx;
              return(
                <button key={m} onClick={()=>setIdx(pidx)}
                  style={{
                    // Fitts: minHeight 44px — zona de toque confortável para polegar
                    minHeight:44,padding:"10px 4px",borderRadius:14,border:"none",
                    fontFamily:"inherit",fontSize:11,fontWeight:700,cursor:"pointer",
                    background:sel?C.green:C.bg3,
                    color:sel?"#fff":C.text2,
                    transition:"all .18s",lineHeight:1.2,
                    boxShadow:sel?`0 2px 8px rgba(61,122,58,.25)`:"none",
                  }}>
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hick's: resumo mínimo — só o que o utilizador ainda não viu (hora de fim + total).
            Zona e matrícula já foram confirmadas no ecrã anterior, repetição aumenta carga cognitiva */}
        <div style={{...card(),marginBottom:18,padding:"16px 20px",
          display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,color:C.text3,marginBottom:3}}>{t.end}</div>
            <div style={{fontSize:18,fontWeight:800,color:C.text}}>{fmtTime(end)}</div>
            <div style={{fontSize:12,color:C.text3,marginTop:1}}>{state.plate} · Zona {state.zone}</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,color:C.text3,marginBottom:3}}>Total</div>
            <div style={{fontSize:30,fontWeight:800,color:C.green,letterSpacing:-1}}>{fmtEur(total)}</div>
          </div>
        </div>

        <button style={btnP()} onClick={()=>goTo("payment")}>{t.choosePayment}</button>
      </div>
      <style>{`div::-webkit-scrollbar{display:none;}`}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
//  PAYMENT
// ─────────────────────────────────────────────
const PaymentScreen=({goTo,state,setState,onPay,lang,setLang,t})=>{
  // Hick's: MB WAY pré-seleccionado — reduz decisão de 4 para confirmação de 1
  const [method,setMethod]=useState("card");
  const [showAll,setShowAll]=useState(false);
  const [showMb,setShowMb]=useState(false),[mbPhone,setMbPhone]=useState(""),[mbWait,setMbWait]=useState(false);
  const [showCard,setShowCard]=useState(false),[cNum,setCNum]=useState(""),[cExp,setCExp]=useState(""),[cCvv,setCCvv]=useState("");

  const PRIMARY = {id:"card",icon:"💳",name:"Cartão Bancário",sub:"Débito ou crédito"}; 
  const OTHER_METHODS=[
    {id:"mbway", icon:"📱",name:"MB WAY",    sub:"Confirmação imediata"},
    {id:"apple", icon:"◼", name:"Apple / Google Pay",sub:"Face ID · Touch ID"},
    {id:"paypal",icon:"🅿",name:"PayPal",    sub:"Conta PayPal"},
  ];
  const allMethods=[PRIMARY,...OTHER_METHODS];

  const Sheet=({show,close,children})=>!show?null:(
    <div onClick={close} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:400,
      display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(8px)"}}>
      <div onClick={e=>e.stopPropagation()}
        style={{background:C.surface,borderRadius:"24px 24px 0 0",padding:"0 22px 44px",width:"100%",maxWidth:480,
          border:`1px solid ${C.border}`,borderBottom:"none"}}>
        <div style={{width:32,height:4,background:C.bg3,borderRadius:2,margin:"16px auto 24px"}}/>
        {children}
      </div>
    </div>
  );

  const MethodRow=({m,sel})=>(
    <div onClick={()=>{setMethod(m.id);setShowAll(false);}}
      style={{...card(),padding:"14px 18px",cursor:"pointer",display:"flex",alignItems:"center",gap:16,
        border:`2px solid ${sel?C.green:C.border2}`,
        background:sel?C.greenL:C.surface,transition:"all .15s",
        // Fitts: mínimo 64px altura
        minHeight:64}}>
      <div style={{width:46,height:46,borderRadius:14,background:C.bg2,display:"flex",
        alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>{m.icon}</div>
      <div style={{flex:1}}>
        <div style={{fontSize:15,fontWeight:600,color:C.text}}>{m.name}</div>
        <div style={{fontSize:12,color:C.text3,marginTop:2}}>{m.sub}</div>
      </div>
      <div style={{width:24,height:24,borderRadius:12,
        border:`2px solid ${sel?C.green:C.border}`,
        background:sel?C.green:"transparent",flexShrink:0,
        display:"flex",alignItems:"center",justifyContent:"center"}}>
        {sel&&<div style={{width:8,height:8,borderRadius:"50%",background:"#fff"}}/>}
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",zIndex:9999}}>
        <Nav left={<Back onClick={()=>goTo("time")}/>} title={t.paymentMethod}
          right={<div style={{position:"relative"}}><Menu goTo={goTo} lang={lang} setLang={setLang} t={t}/></div>}/>
      </div>
      <Steps step={2} labels={[t.zone,"Tempo",t.payment]}/>
      <div style={{flex:1,padding:"20px 18px 40px",maxWidth:480,margin:"0 auto",width:"100%"}}>

        {/* Hick's: mostra só o método seleccionado em destaque */}
        <MethodRow m={allMethods.find(m=>m.id===method)||PRIMARY} sel={true}/>

        {/* Hick's: "outros métodos" colapsados — só expandem se o utilizador quiser */}
        <button onClick={()=>setShowAll(o=>!o)}
          style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,
            width:"100%",margin:"10px 0 14px",padding:"12px",background:"none",border:"none",
            cursor:"pointer",fontFamily:"inherit",fontSize:13,color:C.text3,fontWeight:600}}>
          <span style={{fontSize:10,opacity:.6}}>{showAll?"▲":"▼"}</span>
          {showAll?"Fechar outros métodos":"Outros métodos de pagamento"}
        </button>
        {showAll&&(
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
            {allMethods.filter(m=>m.id!==method).map(m=>(
              <MethodRow key={m.id} m={m} sel={false}/>
            ))}
          </div>
        )}

        {/* Total */}
        <div style={{...card(),marginBottom:16,padding:"18px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontSize:15,fontWeight:600,color:C.text}}>Total</span>
          <span style={{fontSize:30,fontWeight:800,color:C.green,letterSpacing:"-.5px"}}>{fmtEur(state.total||0)}</span>
        </div>

        {/* Fitts: CTA grande, sempre activo (método já está pré-seleccionado) */}
        <button style={btnP()}
          onClick={()=>{
            setState(s=>({...s,pay:method}));
            if(method==="mbway")setShowMb(true);
            else if(method==="card")setShowCard(true);
            else onPay(method);
          }}>{t.payNow}</button>
        <div style={{textAlign:"center",fontSize:12,color:C.text3,marginTop:12}}>{t.secure}</div>
      </div>
      <Sheet show={showMb} close={()=>!mbWait&&setShowMb(false)}>
        <div style={{fontSize:20,fontWeight:700,marginBottom:16,color:C.text}}>MB WAY</div>
        <div style={{background:C.bg2,borderRadius:14,padding:"14px 18px",textAlign:"center",marginBottom:16}}>
          <div style={{fontSize:11,color:C.text3,fontWeight:600,letterSpacing:1,marginBottom:4}}>MONTANTE</div>
          <div style={{fontSize:42,fontWeight:800,color:C.text,letterSpacing:-1}}>{fmtEur(state.total||0)}</div>
        </div>
        <input value={mbPhone} onChange={e=>setMbPhone(e.target.value)} type="tel" placeholder="9XX XXX XXX" style={{...inp(),marginBottom:14}}/>
        {mbWait
          ?<div style={{textAlign:"center",padding:"12px 0",color:C.text2,fontSize:14}}>⏳ A aguardar confirmação...</div>
          :<button style={btnP()} onClick={()=>{if(!mbPhone)return;setMbWait(true);setTimeout(()=>{setShowMb(false);setMbWait(false);onPay("mbway");},2800);}}>Enviar pedido MB WAY</button>}
      </Sheet>
      <Sheet show={showCard} close={()=>setShowCard(false)}>
        <div style={{fontSize:20,fontWeight:700,marginBottom:16,color:C.text}}>Cartão Bancário</div>
        <input value={cNum} onChange={e=>setCNum(e.target.value)} placeholder="0000  0000  0000  0000" style={{...inp(),marginBottom:10}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
          <input value={cExp} onChange={e=>setCExp(e.target.value)} placeholder="MM / AA" style={inp()}/>
          <input value={cCvv} onChange={e=>setCCvv(e.target.value)} placeholder="CVV" type="password" style={inp()}/>
        </div>
        <button style={btnP()} onClick={()=>{setShowCard(false);onPay("card");}}>Confirmar Pagamento</button>
      </Sheet>
    </div>
  );
};

// ─────────────────────────────────────────────
//  CIRCULAR TIMER — estilo Via Verde
// ─────────────────────────────────────────────
const CircularTimer=({pct,rem,barColor,remLabel,state,fmtTime,t})=>{
  const R=84,STROKE=10,CXY=100,circ=2*Math.PI*R;
  const fill=circ*(1-(Math.min(100,Math.max(0,pct))/100));
  const rh=Math.floor(rem/3600),rmm=Math.floor((rem%3600)/60),rs=Math.floor(rem%60);
  const bigLabel=rem<=0?"00:00"
    :rh>=1?`${String(rh).padStart(2,"0")}:${String(rmm).padStart(2,"0")}`
    :`${String(rmm).padStart(2,"0")}:${String(rs).padStart(2,"0")}`;
  const subLabel=rem<=0?"Sessão terminada"
    :rh>=1?`${rmm}m ${String(rs).padStart(2,"0")}s restantes`
    :`${String(rmm).padStart(2,"0")}m ${String(rs).padStart(2,"0")}s restantes`;
  const totalMins=Math.round((state.cdTotal||0)/60);
  const paidLabel=totalMins>=60
    ?`${Math.floor(totalMins/60)}h${totalMins%60>0?" "+totalMins%60+"m":""} pagos`
    :`${totalMins}min pagos`;
  const arcColor=rem<=0?C.err:barColor;
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",paddingBottom:4}}>
      <div style={{position:"relative",width:210,height:210}}>
        <svg viewBox="0 0 200 200" width="210" height="210" style={{transform:"rotate(-90deg)"}}>
          <circle cx={CXY} cy={CXY} r={R} fill="none" stroke={C.bg3} strokeWidth={STROKE} strokeLinecap="round"/>
          <circle cx={CXY} cy={CXY} r={R} fill="none" stroke={arcColor}
            strokeWidth={STROKE} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={fill}
            style={{transition:"stroke-dashoffset 1s linear,stroke .4s"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",
          alignItems:"center",justifyContent:"center",gap:1}}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke={arcColor} strokeWidth="2.2" strokeLinecap="round" style={{marginBottom:4}}>
            <circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 15.5"/>
          </svg>
          <div style={{fontSize:36,fontWeight:800,color:rem<=0?C.err:C.text,
            letterSpacing:-2,lineHeight:1,fontVariantNumeric:"tabular-nums"}}>
            {bigLabel}
          </div>
          <div style={{marginTop:6,background:rem<=0?C.errBg:C.greenL,
            border:`1px solid ${rem<=0?C.errBd:C.okBd}`,
            borderRadius:999,padding:"3px 16px",
            fontSize:14,fontWeight:700,color:rem<=0?C.err:C.green}}>
            {fmtEur(state.total||0)}
          </div>
        </div>
      </div>
      <div style={{fontSize:12,color:C.text3,fontWeight:500,marginTop:-4,marginBottom:12}}>{subLabel}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:0,
        width:"100%",borderTop:`1px solid ${C.border}`,paddingTop:16}}>
        <div style={{textAlign:"center",borderRight:`1px solid ${C.border}`,paddingRight:8}}>
          <div style={{fontSize:10,color:C.text3,fontWeight:700,textTransform:"uppercase",
            letterSpacing:.6,marginBottom:4}}>{t.start||"Início"}</div>
          <div style={{fontSize:22,fontWeight:800,color:C.text,letterSpacing:-0.5,lineHeight:1}}>
            {fmtTime(state.startTime||new Date())}
          </div>
          <div style={{fontSize:11,color:C.text3,marginTop:3}}>
            {new Date(state.startTime||Date.now()).toLocaleDateString("pt-PT",{day:"2-digit",month:"2-digit",year:"numeric"})}
          </div>
        </div>
        <div style={{textAlign:"center",paddingLeft:8}}>
          <div style={{fontSize:10,color:C.text3,fontWeight:700,textTransform:"uppercase",
            letterSpacing:.6,marginBottom:4}}>{t.validUntil||"Válido até"}</div>
          <div style={{fontSize:22,fontWeight:800,color:arcColor,letterSpacing:-0.5,lineHeight:1}}>
            {fmtTime(state.endTime||new Date())}
          </div>
          <div style={{fontSize:11,color:C.text3,marginTop:3}}>
            {new Date(state.endTime||Date.now()).toLocaleDateString("pt-PT",{day:"2-digit",month:"2-digit",year:"numeric"})}
          </div>
        </div>
      </div>
      <div style={{fontSize:12,color:C.text3,fontWeight:500,marginTop:10,
        display:"flex",alignItems:"center",gap:5}}>
        <span style={{width:6,height:6,borderRadius:"50%",background:arcColor,display:"inline-block"}}/>
        {paidLabel}
      </div>
    </div>
  );
};


// ─────────────────────────────────────────────
//  SUCCESS / RECEIPT
// ─────────────────────────────────────────────
const SuccessScreen=({goTo,state,onExtend,t,lang,setLang,notifSent,setNotifSent,user})=>{
  const [notifBanner,setNotifBanner]=useState(
    // Mostrar banner se: utilizador com login + permissão ainda não concedida + não dispensado antes
    ()=> user && typeof Notification!=="undefined" && Notification.permission==="default"
  );
  const requestPushPermission=async()=>{
    const perm=await Notification.requestPermission();
    setNotifBanner(false);
    if(perm==="granted"){
      // Registar SW e agendar para a sessão actual
      await registerSW();
      scheduleSessionAlerts({
        plate:state.plate,zone:state.zone,
        zoneName:ZONES[state.zone]?.name||state.zone,
        endTime:(state.endTime||new Date()).toISOString(),
        ref:state.ref
      });
      // Notificação de confirmação imediata
      pushNotif("✓ Notificações activadas","Irá receber um aviso antes de a sessão expirar.");
    }
  };

  const [rem,setRem]=useState(0);
  const [pct,setPct]=useState(100);
  const [showRenew,setShowRenew]=useState(false);
  const [showPay,setShowPay]=useState(false);
  const [extMins,setExtMins]=useState(60);
  const [extMethod,setExtMethod]=useState("card");
  const [mbPhone,setMbPhone]=useState("");
  const [mbWait,setMbWait]=useState(false);
  const [cNum,setCNum]=useState(""),[cExp,setCExp]=useState(""),[cCvv,setCCvv]=useState("");
  const [showOtherMethods,setShowOtherMethods]=useState(false);

  useEffect(()=>{
    const tick=setInterval(()=>{
      const r=Math.max(0,(new Date(state.endTime)-Date.now())/1000);
      setRem(r);
      if(state.cdTotal>0)setPct((r/state.cdTotal)*100);
      if(r>0&&r<600&&!notifSent){
        setNotifSent(true);
        pushNotif("Parquímetro Digital",t.sessionExpiresSoon);
      }
    },1000);
    return()=>clearInterval(tick);
  },[state.endTime,state.cdTotal,notifSent]);

  const rh=Math.floor(rem/3600),rmm=Math.floor((rem%3600)/60),rs=Math.floor(rem%60);
  const remLabel=rh>0?`${rh}h ${String(rmm).padStart(2,"0")}m`
    :rmm>0?`${rmm}m ${String(rs).padStart(2,"0")}s`
    :t.sessionEnded;
  const z=ZONES[state.zone];
  const zoneColor=z?.color||C.ok;
  const barColor=pct<15?C.err:pct<35?C.warn:zoneColor;
  // Price calculation for extension
  const disc=user&&isRes(user.role)?user.discount:0;
  const extBase=(state.price||1)*(extMins/60);
  const extTotal=Math.round(extBase*(1-disc/100)*100)/100;

  // Extension duration options (reuse drum picker options subset)
  const EXT_OPTS=[
    {m:15,l:"15 min"},{m:30,l:"30 min"},{m:45,l:"45 min"},
    {m:60,l:"1 hora"},{m:90,l:"1h 30m"},{m:120,l:"2 horas"},
    {m:180,l:"3 horas"},{m:240,l:"4 horas"},
  ];

  const PAY_METHODS=[
    {id:"mbway", icon:"📱",name:"MB WAY",    sub:"Confirmação imediata"},
    {id:"card",  icon:"💳",name:"Cartão",    sub:"Débito ou crédito"},
    {id:"apple", icon:"◼", name:"Apple / Google Pay",sub:"Face ID · Touch ID"},
    {id:"paypal",icon:"🅿",name:"PayPal",    sub:"Conta PayPal"},
  ];

  // Sheet backdrop
  const Sheet=({show,close,title,children})=>!show?null:(
    <div onClick={close} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.55)",zIndex:500,
      display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(8px)"}}>
      <div onClick={e=>e.stopPropagation()}
        style={{background:C.surface,borderRadius:"24px 24px 0 0",width:"100%",maxWidth:480,
          padding:"0 22px 48px",border:`1px solid ${C.border}`,borderBottom:"none",
          maxHeight:"90svh",overflowY:"auto"}}>
        <div style={{width:36,height:4,background:C.bg3,borderRadius:2,margin:"14px auto 20px"}}/>
        {title&&<div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:18,letterSpacing:"-.3px"}}>{title}</div>}
        {children}
      </div>
    </div>
  );

  // Payment method row
  const MethodRow=({m})=>{
    const sel=extMethod===m.id;
    return(
      <div onClick={()=>{setExtMethod(m.id);setShowOtherMethods(false);}}
        style={{...card(),padding:"14px 16px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,
          border:`2px solid ${sel?C.green:C.border2}`,background:sel?C.greenL:C.surface,
          transition:"all .15s",marginBottom:8,minHeight:60}}>
        <div style={{width:42,height:42,borderRadius:13,background:C.bg2,display:"flex",
          alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{m.icon}</div>
        <div style={{flex:1}}>
          <div style={{fontSize:14,fontWeight:600,color:C.text}}>{m.name}</div>
          <div style={{fontSize:12,color:C.text3}}>{m.sub}</div>
        </div>
        <div style={{width:22,height:22,borderRadius:11,border:`2px solid ${sel?C.green:C.border}`,
          background:sel?C.green:"transparent",flexShrink:0,
          display:"flex",alignItems:"center",justifyContent:"center"}}>
          {sel&&<div style={{width:7,height:7,borderRadius:"50%",background:"#fff"}}/>}
        </div>
      </div>
    );
  };

  // Confirm payment logic
  const confirmPay=()=>{
    if(extMethod==="mbway"){
      if(!mbPhone){return;}
      setMbWait(true);
      setTimeout(()=>{
        setMbWait(false);setMbPhone("");setShowPay(false);
        onExtend(extMins,extMethod);
      },2800);
    } else if(extMethod==="card"){
      if(!cNum||!cExp||!cCvv)return;
      setCNum("");setCExp("");setCCvv("");
      setShowPay(false);
      onExtend(extMins,extMethod);
    } else {
      setShowPay(false);
      onExtend(extMins,extMethod);
    }
  };

  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",zIndex:9999}}>
        <Nav left={<span/>} title={t.receipt}
          right={<div style={{position:"relative"}}><Menu goTo={goTo} lang={lang} setLang={setLang} t={t}/></div>}/>
      </div>

      {/* Confirmação header */}
      <div style={{textAlign:"center",padding:"28px 24px 16px"}}>
        <div style={{width:60,height:60,borderRadius:30,background:C.green,color:"#fff",
          fontSize:24,display:"flex",alignItems:"center",justifyContent:"center",
          margin:"0 auto 14px",boxShadow:`0 6px 24px rgba(61,122,58,.28)`}}>✓</div>
        <div style={{fontSize:20,fontWeight:800,color:C.text,letterSpacing:"-.3px"}}>{t.activeParking}</div>
        <div style={{fontSize:14,color:C.text2,marginTop:5}}>{t.payConfirmed}</div>
        <div style={{display:"inline-flex",alignItems:"center",gap:5,background:C.tealL,color:C.teal,
          borderRadius:999,padding:"5px 14px",fontSize:12,fontWeight:600,marginTop:10,
          border:`1px solid rgba(26,143,160,.2)`}}>
          ↓ {t.sessionSaved}
        </div>
      </div>

      {/* ── Banner de permissão de notificações (só para utilizadores com login) ── */}
      {notifBanner&&user&&(
        <div style={{margin:"0 18px 12px",borderRadius:20,overflow:"hidden",
          border:`1.5px solid rgba(26,143,160,.3)`,background:`rgba(26,143,160,.07)`}}>
          <div style={{padding:"14px 18px 12px",display:"flex",alignItems:"flex-start",gap:12}}>
            <span style={{fontSize:22,flexShrink:0}}>🔔</span>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:C.teal,marginBottom:4}}>
                Receber aviso antes de expirar?
              </div>
              <div style={{fontSize:12,color:C.text2,lineHeight:1.6}}>
                Deseja receber notificação quando o estacionamento estiver a terminar? (10min)
              </div>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",borderTop:`1px solid rgba(26,143,160,.15)`}}>
            <button onClick={()=>setNotifBanner(false)}
              style={{padding:"13px",background:"none",border:"none",borderRight:`1px solid rgba(26,143,160,.15)`,
                fontFamily:"inherit",fontSize:13,color:C.text3,fontWeight:600,cursor:"pointer"}}>
              Agora não
            </button>
            <button onClick={requestPushPermission}
              style={{padding:"13px",background:"none",border:"none",
                fontFamily:"inherit",fontSize:13,color:C.teal,fontWeight:800,cursor:"pointer"}}>
              Activar ✓
            </button>
          </div>
        </div>
      )}

      {/* Ticket */}
      <div style={{...card(),margin:"0 18px 12px",padding:"20px 20px 16px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:"50%",left:-10,width:20,height:20,borderRadius:10,background:C.bg,transform:"translateY(-50%)"}}/>
        <div style={{position:"absolute",top:"50%",right:-10,width:20,height:20,borderRadius:10,background:C.bg,transform:"translateY(-50%)"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:13,fontWeight:800,color:C.text,letterSpacing:"-.3px"}}>Parquímetro <em style={{color:C.green,fontStyle:"normal"}}>Digital</em></div>
          <span style={{fontSize:11,fontWeight:700,color:C.ok,background:C.okBg,borderRadius:999,padding:"3px 10px",border:`1px solid ${C.okBd}`}}>✓ Activo</span>
        </div>
        {z&&<div style={{...zChip(state.zone),marginBottom:12,fontSize:13}}>
          <span style={{width:7,height:7,borderRadius:"50%",background:z.color}}/>
          Zona {state.zone} — {z.name} · {ZR(state.zone)}
        </div>}
        <PlateBadge plate={state.plate||"—"} size="lg"/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12,marginBottom:14}}>
          {[[t.payment,PM[state.pay]||"—"],[t.duration,(()=>{const h=Math.floor((state.mins||0)/60),m=(state.mins||0)%60;return h>0?h+"h"+(m>0?" "+m+"m":""):m+"m";})()],[t.start,fmtTime(state.startTime||new Date())],[t.ref,state.ref||"—"]].map(([l,v])=>(
            <div key={l}>
              <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:.5,color:C.text3,fontWeight:700,marginBottom:3}}>{l}</div>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{borderTop:`1.5px dashed ${C.border}`,paddingTop:20}}>
          {/* ── Timer circular estilo Via Verde ── */}
          <CircularTimer pct={pct} rem={rem} barColor={barColor} remLabel={remLabel} state={state} fmtTime={fmtTime} t={t}/>
        </div>
      </div>

      {/* ── Renewal CTA — aparece a 10min do fim OU quando sessão terminou ── */}
      {(rem<600)&&(
        <div style={{margin:"0 18px 12px",borderRadius:20,overflow:"hidden",
          border:`1.5px solid ${rem===0?C.errBd:C.warnBd}`,
          background:rem===0?C.errBg:C.warnBg}}>
          <div style={{padding:"14px 18px 12px",display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:20}}>{rem===0?"🅿️":"⏱"}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:14,fontWeight:700,color:rem===0?C.err:C.warn}}>
                {rem===0?"Sessão terminada — volte a pagar para continuar":t.extendPrompt}
              </div>
              <div style={{fontSize:12,color:C.text2,marginTop:3,lineHeight:1.4}}>
                {rem===0
                  ? `${state.plate} · Zona ${state.zone} · ${ZR(state.zone)}`
                  : `Tempo restante: ${remLabel}`}
              </div>
            </div>
          </div>
          <button onClick={()=>setShowRenew(true)}
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              width:"100%",padding:"15px",
              background:rem===0?C.err:C.warn,
              color:"#fff",border:"none",fontFamily:"inherit",
              fontSize:15,fontWeight:800,cursor:"pointer",minHeight:52}}>
            {rem===0?"🔄  Renovar Estacionamento":"+ Prolongar Tempo"}
          </button>
        </div>
      )}

      {/* Bottom actions */}
      <div style={{padding:"0 18px 8px",display:"flex",gap:10}}>
        <button style={{...btnO({fontSize:13,padding:"13px",borderRadius:16,flex:1})}}>{t.save}</button>
        <button style={{...btnO({fontSize:13,padding:"13px",borderRadius:16,flex:1})}}>{t.share}</button>
      </div>
      <div style={{padding:"0 18px 28px"}}>
        <button style={btnO({borderRadius:20})} onClick={()=>goTo("landing")}>{t.back}</button>
      </div>

      {/* ── SHEET 1: Escolher tempo de renovação ── */}
      <Sheet show={showRenew} close={()=>setShowRenew(false)} title="Quanto tempo adicional?">
        {/* Duration grid */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {EXT_OPTS.map(({m,l})=>{
            const sel=extMins===m;
            return(
              <div key={m} onClick={()=>setExtMins(m)}
                style={{borderRadius:16,padding:"14px 12px",cursor:"pointer",textAlign:"center",
                  border:`2px solid ${sel?C.green:C.border2}`,
                  background:sel?C.greenL:C.surface,
                  transition:"all .15s",minHeight:56,
                  display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4}}>
                <div style={{fontSize:16,fontWeight:800,color:sel?C.green:C.text}}>{l}</div>
                <div style={{fontSize:12,color:sel?C.ok:C.text3,fontWeight:600}}>
                  {fmtEur(Math.round((state.price||1)*(m/60)*(1-disc/100)*100)/100)}
                </div>
              </div>
            );
          })}
        </div>
        {disc>0&&(
          <div style={{background:C.okBg,border:`1px solid ${C.okBd}`,borderRadius:12,
            padding:"10px 14px",fontSize:12,color:C.ok,fontWeight:600,marginBottom:16,textAlign:"center"}}>
            ✓ Desconto de {disc}% aplicado — {user?.name}
          </div>
        )}
        {/* Total preview */}
        <div style={{...card(),padding:"16px 18px",marginBottom:16,
          display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:12,color:C.text3,fontWeight:600,marginBottom:3}}>Adiciona</div>
            <div style={{fontSize:15,fontWeight:700,color:C.text}}>
              {EXT_OPTS.find(o=>o.m===extMins)?.l} · Zona {state.zone}
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:12,color:C.text3,fontWeight:600,marginBottom:3}}>Total</div>
            <div style={{fontSize:28,fontWeight:800,color:C.green,letterSpacing:-1}}>{fmtEur(extTotal)}</div>
          </div>
        </div>
        <button style={btnP()} onClick={()=>{setShowRenew(false);setShowPay(true);}}>
          Continuar para Pagamento →
        </button>
      </Sheet>

      {/* ── SHEET 2: Pagamento da renovação ── */}
      <Sheet show={showPay} close={()=>!mbWait&&setShowPay(false)} title="Pagamento">
        {/* Amount recap */}
        <div style={{background:C.bg2,borderRadius:14,padding:"14px 18px",
          display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:18}}>
          <div>
            <div style={{fontSize:11,color:C.text3,fontWeight:700,textTransform:"uppercase",letterSpacing:.5,marginBottom:3}}>RENOVAÇÃO</div>
            <div style={{fontSize:13,fontWeight:600,color:C.text}}>{EXT_OPTS.find(o=>o.m===extMins)?.l} · {state.plate}</div>
          </div>
          <div style={{fontSize:32,fontWeight:800,color:C.green,letterSpacing:-1}}>{fmtEur(extTotal)}</div>
        </div>

        {/* Selected method */}
        <MethodRow m={PAY_METHODS.find(m=>m.id===extMethod)||PAY_METHODS[0]}/>

        {/* Other methods toggle */}
        <button onClick={()=>setShowOtherMethods(o=>!o)}
          style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,
            width:"100%",margin:"4px 0 12px",padding:"10px",background:"none",border:"none",
            cursor:"pointer",fontFamily:"inherit",fontSize:12,color:C.text3,fontWeight:600}}>
          <span style={{fontSize:10,opacity:.6}}>{showOtherMethods?"▲":"▼"}</span>
          Outros métodos
        </button>
        {showOtherMethods&&PAY_METHODS.filter(m=>m.id!==extMethod).map(m=>(
          <MethodRow key={m.id} m={m}/>
        ))}

        {/* Method-specific inputs */}
        {extMethod==="mbway"&&(
          mbWait
            ?<div style={{textAlign:"center",padding:"16px 0",color:C.text2,fontSize:14}}>⏳ A aguardar confirmação MB WAY…</div>
            :<input value={mbPhone} onChange={e=>setMbPhone(e.target.value)} type="tel"
                placeholder="9XX XXX XXX" style={{...inp(),marginBottom:14}}/>
        )}
        {extMethod==="card"&&(
          <>
            <input value={cNum} onChange={e=>setCNum(e.target.value)} placeholder="0000  0000  0000  0000" style={{...inp(),marginBottom:10}}/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
              <input value={cExp} onChange={e=>setCExp(e.target.value)} placeholder="MM / AA" style={inp()}/>
              <input value={cCvv} onChange={e=>setCCvv(e.target.value)} placeholder="CVV" type="password" style={inp()}/>
            </div>
          </>
        )}

        {!mbWait&&(
          <button style={btnP()} onClick={confirmPay}>
            Pagar {fmtEur(extTotal)} e Renovar
          </button>
        )}
        <div style={{textAlign:"center",fontSize:12,color:C.text3,marginTop:10}}>{t.secure}</div>
      </Sheet>
    </div>
  );
};

// ─────────────────────────────────────────────
//  RESIDENT AREA
// ─────────────────────────────────────────────
const ResArea=({goTo,user,setUser,t,lang,setLang})=>{
  const [tab,setTab]=useState("vehicle");
  const hist=getHist(user?.email);

  // Múltiplas matrículas
  const [plates,setPlates]=useState(()=>{
    const saved=lsG("pkx_plates_"+user?.email,[]);
    const main=user?.plate;
    if(main&&!saved.includes(main))return[main,...saved];
    return saved.length?saved:(main?[main]:[]);
  });
  const [newPlate,setNewPlate]=useState("");
  const [addingPlate,setAddingPlate]=useState(false);

  // Dados pessoais
  const [editPersonal,setEditPersonal]=useState(false);
  const [phone,setPhone]=useState(user?.phone||"");
  const [address,setAddress]=useState(user?.address||"");

  // Notificações
  const [notifPerm,setNotifPerm]=useState(()=>
    typeof Notification!=="undefined"?Notification.permission:"default"
  );

  const savePersonal=()=>{
    const updated={...user,phone,address};
    saveGProfile(updated);setUser(updated);
    setEditPersonal(false);
  };

  const addPlate=()=>{
    const p=cleanPlate(newPlate);
    if(p.length<2)return;
    if(plates.includes(p)){setNewPlate("");return;}
    const next=[...plates,p];
    setPlates(next);
    lsS("pkx_plates_"+user?.email,next);
    const updated={...user,plate:user?.plate||p};
    saveGProfile(updated);setUser(updated);
    setNewPlate("");setAddingPlate(false);
  };

  const removePlate=(p)=>{
    const next=plates.filter(x=>x!==p);
    setPlates(next);
    lsS("pkx_plates_"+user?.email,next);
    if(user?.plate===p){
      const updated={...user,plate:next[0]||""};
      saveGProfile(updated);setUser(updated);
    }
  };

  const setPrimaryPlate=(p)=>{
    const updated={...user,plate:p};
    saveGProfile(updated);setUser(updated);
  };

  const requestNotif=async()=>{
    if(typeof Notification==="undefined")return;
    const perm=await Notification.requestPermission();
    setNotifPerm(perm);
    if(perm==="granted"){
      pushNotif("✓ Notificações activadas","Receberá avisos antes de o estacionamento expirar.");
    }
  };

  const roleLabel=()=>{
    if(user?.role==="resident")return"🏠 Residente";
    if(user?.role==="worker")return"💼 Trabalhador";
    if(user?.role?.startsWith("pending_resident"))return"⏳ Residente (pendente)";
    if(user?.role?.startsWith("pending_worker"))return"⏳ Trabalhador (pendente)";
    return"🧳 Visitante";
  };

  const validityYear=new Date().getFullYear()+1;

  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",zIndex:9999}}>
        <Nav left={<Back onClick={()=>goTo("landing")}/>} title={t.myAccount}
          right={<div style={{display:"flex",gap:8,alignItems:"center"}}>
            <NavLink onClick={()=>{setUser(null);goTo("landing");}}>{t.signOut}</NavLink>
            <div style={{position:"relative"}}><Menu goTo={goTo} lang={lang} setLang={setLang} t={t}/></div>
          </div>}/>
      </div>
      <div style={{flex:1,padding:"24px 18px 48px",maxWidth:480,margin:"0 auto",width:"100%"}}>

        {/* Profile card */}
        <div style={{...card(),padding:"20px",marginBottom:24,
          background:`linear-gradient(135deg,${C.greenL},${C.tealL})`}}>
          <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:16}}>
            {user?.picture
              ?<img src={user.picture} alt="" style={{width:52,height:52,borderRadius:26,
                  flexShrink:0,border:`2px solid ${C.green}`}}/>
              :<div style={{width:52,height:52,borderRadius:26,background:C.green,color:"#fff",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,fontWeight:800,flexShrink:0}}>
                {user?.name?.split(" ").map(n=>n[0]).slice(0,2).join("")}
              </div>}
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:16,fontWeight:700,color:C.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.name}</div>
              <div style={{fontSize:12,color:C.text2,marginTop:2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{user?.email}</div>
              <div style={{fontSize:12,color:user?.discount>0?C.ok:C.text2,fontWeight:600,marginTop:4}}>
                {roleLabel()}{user?.discount>0&&` · ${user.discount}% desconto`}
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div style={{background:"rgba(255,255,255,.55)",borderRadius:12,padding:"12px 14px",
            display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:C.text}}>🔔 Avisos de expiração</div>
              <div style={{fontSize:11,color:C.text2,marginTop:2}}>Notificação 10 min antes do tempo terminar</div>
            </div>
            {notifPerm==="granted"
              ?<div style={{fontSize:12,fontWeight:700,color:C.ok,background:C.okBg,
                  border:`1px solid ${C.okBd}`,borderRadius:999,padding:"4px 10px"}}>✓ Activo</div>
              :<button onClick={requestNotif}
                  style={{fontSize:12,fontWeight:700,color:"#fff",background:C.green,
                    border:"none",borderRadius:999,padding:"6px 14px",cursor:"pointer",
                    fontFamily:"inherit",whiteSpace:"nowrap"}}>
                  Activar
                </button>
            }
          </div>
        </div>

        <Seg tabs={[{id:"vehicle",label:"Veículos"},{id:"personal",label:"Dados Pessoais"},{id:"history",label:t.paymentHistory}]} active={tab} onChange={setTab}/>

        {/* ── VEÍCULOS ── */}
        {tab==="vehicle"&&(
          <>
            {user?.role?.startsWith("pending_")&&(
              <div style={{background:C.warnBg,border:`1px solid ${C.warnBd}`,borderRadius:14,
                padding:"12px 16px",marginBottom:16,fontSize:13,color:C.warn}}>
                ⏳ Pedido de estatuto em análise — desconto aplicado após validação municipal (até 5 dias úteis).
              </div>
            )}
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,
              color:C.text3,marginBottom:10}}>As minhas matrículas</div>
            {plates.length===0&&(
              <div style={{textAlign:"center",padding:"24px 0",color:C.text3,fontSize:14}}>
                Nenhuma matrícula registada.
              </div>
            )}
            {plates.map(p=>(
              <div key={p} style={{...card(),padding:"12px 16px",marginBottom:8,
                display:"flex",alignItems:"center",gap:12,
                border:`2px solid ${p===user?.plate?C.green:C.border2}`,
                background:p===user?.plate?C.greenL:C.surface}}>
                <PlateBadge plate={p}/>
                <div style={{flex:1}}>
                  {p===user?.plate&&<div style={{fontSize:11,color:C.ok,fontWeight:700}}>✓ Principal</div>}
                  {user?.discount>0&&<div style={{fontSize:11,color:C.ok}}>{user.discount}% desconto · Todas as zonas</div>}
                  <div style={{fontSize:11,color:C.text3}}>Válida até 31 Dez {validityYear}</div>
                </div>
                <div style={{display:"flex",gap:6}}>
                  {p!==user?.plate&&(
                    <button onClick={()=>setPrimaryPlate(p)}
                      style={{fontSize:11,fontWeight:700,padding:"5px 10px",borderRadius:999,
                        border:`1px solid ${C.green}`,background:"transparent",color:C.green,
                        cursor:"pointer",fontFamily:"inherit"}}>
                      Principal
                    </button>
                  )}
                  <button onClick={()=>removePlate(p)}
                    style={{fontSize:11,fontWeight:700,padding:"5px 10px",borderRadius:999,
                      border:`1px solid ${C.border}`,background:"transparent",color:C.text3,
                      cursor:"pointer",fontFamily:"inherit"}}>
                    ✕
                  </button>
                </div>
              </div>
            ))}
            {addingPlate?(
              <div style={{...card(),padding:"14px 16px",marginBottom:8}}>
                <input value={newPlate} onChange={e=>setNewPlate(cleanPlate(e.target.value))}
                  placeholder="AA-00-AA" maxLength={12}
                  style={{...inp(),textAlign:"center",fontSize:18,fontWeight:800,letterSpacing:3,marginBottom:10}}
                  autoFocus onKeyDown={e=>e.key==="Enter"&&addPlate()}/>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={addPlate} style={{...btnP(),flex:1,padding:"10px",fontSize:13,borderRadius:12}}>
                    Adicionar
                  </button>
                  <button onClick={()=>{setAddingPlate(false);setNewPlate("");}}
                    style={{...btnO({borderRadius:12}),flex:1,padding:"10px",fontSize:13}}>
                    Cancelar
                  </button>
                </div>
              </div>
            ):(
              <button onClick={()=>setAddingPlate(true)}
                style={{...btnO({borderRadius:16}),width:"100%",marginBottom:16,fontSize:13,
                  display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                + Adicionar matrícula
              </button>
            )}
            {user?.discount>0&&(
              <button style={btnP()} onClick={()=>goTo("zone")}>{t.payWithDiscount}</button>
            )}
          </>
        )}

        {/* ── DADOS PESSOAIS ── */}
        {tab==="personal"&&(
          <>
            <div style={{...card(),marginBottom:16}}>
              {[["Nome",user?.name||"—"],["Email",user?.email||"—"]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",
                  padding:"14px 18px",borderBottom:`1px solid ${C.border2}`}}>
                  <span style={{fontSize:14,color:C.text2}}>{l}</span>
                  <span style={{fontSize:14,fontWeight:600,color:C.text,maxWidth:"55%",textAlign:"right",
                    overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{v}</span>
                </div>
              ))}
            </div>
            {editPersonal?(
              <div style={{...card(),padding:"18px 16px",marginBottom:12}}>
                <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,
                  color:C.text3,marginBottom:6}}>Telefone</div>
                <input value={phone} onChange={e=>setPhone(e.target.value)}
                  placeholder="+351 9XX XXX XXX" type="tel"
                  style={{...inp(),marginBottom:14}}/>
                <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,
                  color:C.text3,marginBottom:6}}>Morada</div>
                <input value={address} onChange={e=>setAddress(e.target.value)}
                  placeholder="Rua, nº, localidade" style={{...inp(),marginBottom:16}}/>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={savePersonal} style={{...btnP(),flex:1,padding:"10px",fontSize:13,borderRadius:12}}>
                    Guardar
                  </button>
                  <button onClick={()=>setEditPersonal(false)}
                    style={{...btnO({borderRadius:12}),flex:1,padding:"10px",fontSize:13}}>
                    Cancelar
                  </button>
                </div>
              </div>
            ):(
              <div style={{...card(),marginBottom:16}}>
                {[["Telefone",user?.phone||"—"],["Morada",user?.address||"—"]].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",
                    padding:"14px 18px",borderBottom:`1px solid ${C.border2}`}}>
                    <span style={{fontSize:14,color:C.text2}}>{l}</span>
                    <span style={{fontSize:14,fontWeight:600,color:v==="—"?C.text3:C.text,
                      maxWidth:"55%",textAlign:"right"}}>{v}</span>
                  </div>
                ))}
                <button onClick={()=>setEditPersonal(true)}
                  style={{width:"100%",padding:"14px 18px",background:"none",border:"none",
                    color:C.green,fontWeight:700,fontSize:13,cursor:"pointer",
                    fontFamily:"inherit",textAlign:"left"}}>
                  ✏️ Editar dados pessoais
                </button>
              </div>
            )}
            <div style={{...card(),padding:"16px 18px",background:C.warnBg,border:`1px solid ${C.warnBd}`}}>
              <div style={{fontSize:13,color:C.warn,fontWeight:600,marginBottom:4}}>🔒 Privacidade</div>
              <div style={{fontSize:12,color:C.warn,lineHeight:1.6}}>
                Os seus dados são tratados exclusivamente para fins de gestão de estacionamento pela Câmara Municipal de Peniche, nos termos do RGPD. Contacto DPO: rgpd@cm-penichepark.pt
              </div>
            </div>
          </>
        )}

        {/* ── HISTÓRICO ── */}
        {tab==="history"&&(
          hist.length===0
            ?<div style={{textAlign:"center",padding:"40px 0",color:C.text3,fontSize:14}}>{t.noHistory}</div>
            :hist.map((s,i)=>(
              <div key={i} style={{...card(),padding:"14px 18px",marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                  <div>
                    <PlateBadge plate={s.plate}/>
                    <div style={{fontSize:12,color:C.text3,marginTop:5}}>
                      Zona {s.zone} — {ZONES[s.zone]?.name||s.zone}
                    </div>
                  </div>
                  <span style={{fontSize:15,fontWeight:700,color:C.green}}>{fmtEur(s.total||0)}</span>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:C.text3}}>
                  <span>{fmtDate(s.start)} {fmtTime(s.start)}</span>
                  <span>{s.method||"—"} · {s.ref}</span>
                </div>
              </div>
            ))
        )}
      </div>
      <Footer t={t}/>
    </div>
  );
};

// ─────────────────────────────────────────────
//  QR CODES
// ─────────────────────────────────────────────
const QRImg=({value,size=160,color="#3d7a3a"})=>{
  const ref=useRef(null);
  useEffect(()=>{
    const c=ref.current;if(!c)return;
    const ctx=c.getContext("2d");c.width=size;c.height=size;
    const img=new Image();img.crossOrigin="anonymous";
    img.src=`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&bgcolor=ffffff&color=${color.replace("#","")}&qzone=1&format=png&ecc=M`;
    img.onload=()=>ctx.drawImage(img,0,0,size,size);
    img.onerror=()=>{
      ctx.fillStyle="#fff";ctx.fillRect(0,0,size,size);
      const cell=size/21;let seed=value.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
      const rng=()=>{seed=(seed*1664525+1013904223)&0xffffffff;return(seed>>>0)/0xffffffff;};
      const finder=(x,y)=>{ctx.fillStyle=color;ctx.fillRect(x*cell,y*cell,7*cell,7*cell);ctx.fillStyle="#fff";ctx.fillRect((x+1)*cell,(y+1)*cell,5*cell,5*cell);ctx.fillStyle=color;ctx.fillRect((x+2)*cell,(y+2)*cell,3*cell,3*cell);};
      finder(0,0);finder(14,0);finder(0,14);
      for(let r=0;r<21;r++)for(let cc=0;cc<21;cc++){if((r<9&&cc<9)||(r<9&&cc>11)||(r>11&&cc<9))continue;if(rng()>0.5){ctx.fillStyle=color;ctx.fillRect(cc*cell,r*cell,cell,cell);}}
      ctx.fillStyle="rgba(255,255,255,.9)";ctx.fillRect(size/2-16,size/2-16,32,32);
      ctx.fillStyle=color;ctx.font=`bold ${size/6}px sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";
      ctx.fillText(value.match(/zona=([A-F])/i)?.[1]||"?",size/2,size/2);
    };
  },[value,size,color]);
  return <canvas ref={ref} style={{display:"block",borderRadius:6}}/>;
};

const QRTab=({t})=>(
  <div>
    <div style={{fontSize:18,fontWeight:700,color:C.text,marginBottom:4}}>{t.qrTitle}</div>
    <div style={{fontSize:13,color:C.text2,marginBottom:10}}>{t.qrDesc}</div>
    <div style={{background:C.okBg,borderRadius:12,padding:"11px 16px",display:"flex",gap:8,
      fontSize:13,color:C.ok,marginBottom:20,border:`1px solid ${C.okBd}`}}>
      <span>✓</span><span>{t.qrNote}</span>
    </div>
    {Object.entries(ZONES).map(([id,z])=>{
      const url=`https://www.cm-penichepark.pt/?zona=${id}`;
      return(
        <div key={id} style={{...card(),padding:18,marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{width:46,height:46,borderRadius:12,background:z.bg,border:`2px solid ${z.bd}`,
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:900,color:z.color,flexShrink:0}}>{id}</div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:C.text}}>Zona {id} — {z.name}</div>
              <div style={{fontSize:12,color:C.text2,marginTop:1}}>{z.desc}</div>
              <div style={{fontSize:12,fontWeight:700,color:z.color,marginTop:2}}>{ZR(id)}</div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:10}}>
            <div style={{background:"#fff",padding:12,borderRadius:14,border:`2px solid ${z.bd}`,boxShadow:"0 2px 10px rgba(0,0,0,.07)"}}>
              <QRImg value={url} size={160} color={z.color}/>
            </div>
            <div style={{fontSize:11,color:C.text3,fontFamily:"monospace",wordBreak:"break-all",textAlign:"center",maxWidth:260,lineHeight:1.5}}>{url}</div>
            <a href={`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(url)}&bgcolor=ffffff&color=${z.color.replace("#","")}&qzone=2&format=png&ecc=H`}
              target="_blank" rel="noreferrer"
              style={{...btnP({width:"auto",padding:"9px 20px",fontSize:13,borderRadius:12,textDecoration:"none",display:"inline-flex",background:z.color})}}>
              {t.qrDownload}
            </a>
          </div>
        </div>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────
//  OPERATOR PANEL — zone selection + engine
// ─────────────────────────────────────────────
const OpPanel=({goTo,user,setUser,toast,t,lang,setLang})=>{
  const [zone,setZone]=useState(null);
  const [mode,setMode]=useState("manual");
  const [plate,setPlate]=useState("");
  const [result,setResult]=useState(null);
  const [scanning,setScanning]=useState(false);
  const [camTxt,setCamTxt]=useState("");const [camOk,setCamOk]=useState(false);
  const [ocrReady,setOcrReady]=useState(false);
  const videoRef=useRef(null);const streamRef=useRef(null);
  const canvasRef=useRef(null);const workerRef=useRef(null);
  const rafRef=useRef(null);const lastFoundRef=useRef(null);const busyRef=useRef(false);
  const sessions=getAllSess();const now=new Date();
  const zoneSessions=sessions.filter(s=>s.zone===zone&&new Date(s.end)>now);

  const check=(override)=>{
    const raw=(override||plate).trim().toUpperCase();
    if(raw.length<2){toast("Introduza a matrícula.");return;}
    const matches=sessions.filter(s=>matchPlate(s.plate,raw));
    if(!matches.length){setResult({type:"notfound",plate:raw});return;}
    const active=matches.find(s=>s.zone===zone&&new Date(s.end)>now)
               ||matches.find(s=>new Date(s.end)>now)||matches[0];
    const isActive=new Date(active.end)>now;
    const wrongZone=active.zone!==zone;
    const rem=Math.max(0,(new Date(active.end)-now)/60000);
    setResult({type:isActive?(wrongZone?"wrongzone":"valid"):"expired",plate:raw,sess:active,rem});
  };

  /* ── Tenta reconhecer matrícula a partir de texto OCR bruto ── */
  const tryPlate=(raw)=>{
    const s=raw.toUpperCase().replace(/[^A-Z0-9]/g,"");
    if(!s||s.length<4||s.length>10)return null;
    // Directo
    let r=normalisePlate(s);if(r)return r;
    // O↔0 (confusão OCR muito comum)
    r=normalisePlate(s.replace(/O/g,"0"));if(r)return r;
    r=normalisePlate(s.replace(/0/g,"O"));if(r)return r;
    // I↔1
    r=normalisePlate(s.replace(/I/g,"1"));if(r)return r;
    r=normalisePlate(s.replace(/1/g,"I"));if(r)return r;
    // S↔5, B↔8, Z↔2, G↔6 (outras confusões comuns)
    r=normalisePlate(s.replace(/S/g,"5").replace(/B/g,"8").replace(/Z/g,"2"));if(r)return r;
    return null;
  };

  /* ── Prepara canvas com pré-processamento de imagem ── */
  const prepareFrame=(video,scale,cropTop,cropFrac,rotate180)=>{
    const vw=video.videoWidth,vh=video.videoHeight;
    const cropY=Math.round(vh*cropTop),cropH=Math.round(vh*cropFrac);
    const cvs=document.createElement("canvas");
    cvs.width=vw*scale;cvs.height=cropH*scale;
    const ctx=cvs.getContext("2d",{willReadFrequently:true});
    if(rotate180){
      ctx.translate(cvs.width,cvs.height);ctx.rotate(Math.PI);
    }
    ctx.save();
    const sx=rotate180?-scale:scale,sy=rotate180?-scale:scale;
    ctx.scale(Math.abs(sx),Math.abs(sy));
    ctx.filter="grayscale(1) contrast(3) brightness(1.2)";
    ctx.drawImage(video,0,cropY,vw,cropH,0,0,vw,cropH);
    ctx.restore();
    // Threshold adaptativo — preto/branco puro
    const id=ctx.getImageData(0,0,cvs.width,cvs.height);
    const d=id.data;
    // Calcular brilho médio para threshold adaptativo
    let sum=0;
    for(let i=0;i<d.length;i+=16)sum+=0.299*d[i]+0.587*d[i+1]+0.114*d[i+2];
    const avg=sum/(d.length/16);
    const thr=Math.min(Math.max(avg*0.85,100),180);
    for(let i=0;i<d.length;i+=4){
      const lum=0.299*d[i]+0.587*d[i+1]+0.114*d[i+2];
      const v=lum>thr?255:0;d[i]=d[i+1]=d[i+2]=v;d[i+3]=255;
    }
    ctx.putImageData(id,0,0);
    return cvs;
  };

  /* ── Carrega Tesseract.js — dois workers em paralelo ── */
  const loadOCR=async()=>{
    if(workerRef.current)return true;
    try{
      if(!window.Tesseract){
        await new Promise((res,rej)=>{
          const sc=document.createElement("script");
          sc.src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
          sc.onload=res;sc.onerror=rej;document.head.appendChild(sc);
        });
      }
      setCamTxt("A carregar OCR...");
      // PSM 7 = linha única de texto (melhor para matrículas com traços)
      const w=await window.Tesseract.createWorker("eng",1,{logger:()=>{}});
      await w.setParameters({
        tessedit_char_whitelist:"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-",
        tessedit_pageseg_mode:"7",
        preserve_interword_spaces:"0",
      });
      workerRef.current=w;
      setOcrReady(true);
      setCamTxt("Aponte a câmara para a matrícula");
      return true;
    }catch(e){console.warn("OCR falhou",e);return false;}
  };

  /* ── Loop de análise — a cada 900ms ── */
  const ocrLoop=async()=>{
    if(busyRef.current||!workerRef.current||!videoRef.current||!videoRef.current.videoWidth){
      rafRef.current=setTimeout(ocrLoop,900);return;
    }
    busyRef.current=true;
    try{
      const video=videoRef.current;
      let found=null;

      // Tentativas: 3 zonas de crop × 2 orientações (normal + 180°) × variações O/0
      const crops=[
        [0.30,0.40,false],  // centro-superior normal
        [0.35,0.30,false],  // centro normal
        [0.55,0.30,false],  // centro-inferior normal
        [0.30,0.40,true],   // centro-superior invertido
        [0.35,0.30,true],   // centro invertido
      ];

      for(const [top,frac,rot] of crops){
        if(found)break;
        try{
          const cvs=prepareFrame(video,2,top,frac,rot);
          const {data:{text}}=await workerRef.current.recognize(cvs);
          // Tentar cada palavra/linha separadamente
          const candidates=[
            text.replace(/[\n\r]/g," "),
            ...text.split(/[\n\r\s]+/)
          ].map(s=>s.trim()).filter(s=>s.length>=4);
          for(const c of candidates){
            const n=tryPlate(c);
            if(n){found=n;break;}
          }
        }catch{}
      }

      if(found&&found!==lastFoundRef.current){
        lastFoundRef.current=found;
        setPlate(found);setCamTxt("✓ "+found);setCamOk(true);setScanning(true);
        toast(t.opDetected+" "+found);
        setTimeout(()=>check(found),300);
        await new Promise(r=>setTimeout(r,3500));
        setScanning(false);lastFoundRef.current=null;
        setCamTxt("Aponte a câmara para a matrícula");setCamOk(false);
      }
    }catch{}
    busyRef.current=false;
    rafRef.current=setTimeout(ocrLoop,900);
  };

  const startCam=async()=>{
    setCamTxt("A iniciar câmara...");setCamOk(false);
    try{
      const stream=await navigator.mediaDevices.getUserMedia({
        video:{facingMode:{ideal:"environment"},width:{ideal:1920},height:{ideal:1080},frameRate:{ideal:30}}
      });
      streamRef.current=stream;
      if(videoRef.current)videoRef.current.srcObject=stream;
      setCamTxt("A carregar OCR...");
      await loadOCR();
      rafRef.current=setTimeout(ocrLoop,1200);
    }catch{setCamTxt("Câmara não disponível");setCamOk(false);}
  };

  const stopCam=()=>{
    clearTimeout(rafRef.current);
    if(streamRef.current)streamRef.current.getTracks().forEach(tr=>tr.stop());
    streamRef.current=null;busyRef.current=false;
  };

  useEffect(()=>{if(mode==="camera")startCam();else stopCam();},[mode]);
  useEffect(()=>()=>{
    stopCam();
    if(workerRef.current){workerRef.current.terminate().catch(()=>{});workerRef.current=null;}
  },[]);

  // — ZONE SELECTION —
  if(!zone) return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",zIndex:9999}}>
        <Nav left={<Back onClick={()=>goTo("landing")}/>} title={t.opDashboard}
          right={<NavLink onClick={()=>{setUser(null);goTo("landing");}}>{t.logout}</NavLink>}/>
      </div>
      <div style={{flex:1,padding:"28px 18px",maxWidth:480,margin:"0 auto",width:"100%"}}>
        <div style={{...card(),padding:"18px 20px",marginBottom:28,display:"flex",alignItems:"center",gap:14,
          background:C.greenL,border:`1px solid ${C.okBd}`}}>
          <div style={{width:42,height:42,borderRadius:21,background:C.green,color:"#fff",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0}}>
            {user?.name?.split(" ").map(n=>n[0]).slice(0,2).join("")}
          </div>
          <div>
            <div style={{fontSize:14,fontWeight:700,color:C.text}}>{user?.name}</div>
            <div style={{fontSize:12,color:C.text2,marginTop:2}}>Agente de Fiscalização · {new Date().toLocaleDateString("pt-PT",{weekday:"long"})}</div>
          </div>
        </div>
        <div style={{fontSize:21,fontWeight:800,color:C.text,marginBottom:6}}>{t.opSelectZone}</div>
        <div style={{fontSize:14,color:C.text2,marginBottom:24,lineHeight:1.6}}>
          Seleccione a zona em fiscalização para consultar as sessões activas e verificar matrículas.
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {Object.entries(ZONES).map(([id,z])=>{
            const active=sessions.filter(s=>s.zone===id&&new Date(s.end)>now).length;
            return(
              <button key={id} onClick={()=>setZone(id)}
                style={{...card(),padding:"16px 18px",cursor:"pointer",border:`1.5px solid ${C.border2}`,
                  display:"flex",alignItems:"center",gap:16,background:C.surface,textAlign:"left",
                  fontFamily:"inherit",transition:"all .15s"}}>
                <div style={{width:48,height:48,borderRadius:14,background:z.bg,border:`2px solid ${z.bd}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:20,fontWeight:900,color:z.color,flexShrink:0}}>{id}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:700,color:C.text}}>Zona {id} — {z.name}</div>
                  <div style={{fontSize:12,color:C.text2,marginTop:2}}>{z.desc} · {ZR(id)}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontSize:22,fontWeight:800,color:z.color}}>{active}</div>
                  <div style={{fontSize:10,color:C.text3,fontWeight:600}}>activas</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // — ENGINE —
  const z=ZONES[zone];
  const ResultCard=()=>{
    if(!result)return null;
    const{type,plate:p,sess,rem}=result;
    const cfg={
      notfound:{color:C.err,bg:C.errBg,bd:C.errBd,label:t.opNoSession,statusTxt:"Sem pagamento registado"},
      expired: {color:C.err,bg:C.errBg,bd:C.errBd,label:t.opExpired,statusTxt:"Sessão expirada"},
      wrongzone:{color:C.warn,bg:C.warnBg,bd:C.warnBd,label:t.opWrongZone,statusTxt:"Activa — zona incorrecta"},
      valid:   {color:C.ok, bg:C.okBg,  bd:C.okBd,  label:t.opValid,statusTxt:"Activa e válida"},
    }[type];
    const rows=type==="notfound"?[[t.opCheckedAt,fmtTime(now)]]
      :type==="expired"?[[t.opStatus,"Expirada"],[`${t.zone} paga`,`${sess.zone} — ${ZONES[sess.zone]?.name}`],["Expirou às",fmtTime(sess.end)],[t.opCheckedAt,fmtTime(now)]]
      :type==="wrongzone"?[[t.opStatus,"Activa"],[t.opPaidZone,`${sess.zone} — ${ZONES[sess.zone]?.name}`],[t.opCurrentZone,`${zone} — ${z.name}`],[t.opValidUntil,fmtTime(sess.end)],[t.opRemaining,rem>60?Math.floor(rem/60)+"h "+Math.round(rem%60)+"m":Math.round(rem)+"m"]]
      :[[t.opStatus,"Activa"],[`${t.zone}`,`${sess.zone} — ${ZONES[sess.zone]?.name}`],[t.opValidUntil,fmtTime(sess.end)],[t.opRemaining,rem>60?Math.floor(rem/60)+"h "+Math.round(rem%60)+"m":Math.round(rem)+"m"],[t.payment,sess.method]];
    return(
      <div style={{background:cfg.bg,border:`2px solid ${cfg.bd}`,borderRadius:18,padding:"20px 20px",marginTop:6}}>
        <div style={{fontSize:15,fontWeight:800,color:cfg.color,marginBottom:12}}>{cfg.label}</div>
        <div style={{marginBottom:14}}>
          <PlateBadge plate={p} size="lg"/>
        </div>
        {rows.map(([l,v])=>(
          <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${cfg.bd}40`}}>
            <span style={{fontSize:13,color:C.text2}}>{l}</span>
            <span style={{fontSize:13,fontWeight:700,color:C.text}}>{v}</span>
          </div>
        ))}
        <button style={{...btnO({marginTop:14,borderRadius:14,fontSize:13,padding:"11px"}),borderColor:cfg.color,color:cfg.color}}
          onClick={()=>{setResult(null);setPlate("");}}>
          {t.opNewCheck}
        </button>
      </div>
    );
  };

  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <div style={{position:"relative",zIndex:9999}}>
        <Nav
          left={
            // Fitts: botão "alterar zona" com altura e padding adequados (44px mínimo)
            <button onClick={()=>{setZone(null);setResult(null);setPlate("");}}
              style={{background:"none",border:"none",color:C.green,cursor:"pointer",
                fontFamily:"inherit",fontSize:13,fontWeight:700,
                padding:"0",height:44,display:"flex",alignItems:"center",gap:4,
                WebkitTapHighlightColor:"transparent"}}>
              ‹ {t.opChangeZone}
            </button>
          }
          title={`Zona ${zone}`}
          right={<NavLink onClick={()=>{setUser(null);goTo("landing");}}>{t.logout}</NavLink>}/>
      </div>

      <div style={{padding:"0 18px",paddingTop:14,maxWidth:480,margin:"0 auto",width:"100%"}}>
        {/* Zone badge + active count */}
        <div style={{...card(),padding:"14px 18px",marginBottom:20,display:"flex",alignItems:"center",gap:14,
          background:z.bg,border:`1.5px solid ${z.bd}`}}>
          <div style={{width:46,height:46,borderRadius:13,background:z.color,color:"#fff",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:900,flexShrink:0}}>{zone}</div>
          <div style={{flex:1}}>
            <div style={{fontSize:14,fontWeight:700,color:C.text}}>Zona {zone} — {z.name}</div>
            <div style={{fontSize:12,color:C.text2,marginTop:2}}>{z.desc}</div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:28,fontWeight:800,color:z.color}}>{zoneSessions.length}</div>
            <div style={{fontSize:10,color:C.text3,fontWeight:600}}>activas</div>
          </div>
        </div>

        {/* Input mode toggle */}
        <Seg tabs={[{id:"manual",label:t.opManualPlate},{id:"camera",label:t.opScanPlate}]} active={mode} onChange={v=>{setMode(v);setResult(null);}}/>

        {/* Manual */}
        {mode==="manual"&&(
          <div style={{marginBottom:16}}>
            {/* Fitts: input grande, teclado numérico hint para mobile */}
            <input value={plate} onChange={e=>setPlate(cleanPlate(e.target.value))}
              onKeyDown={e=>e.key==="Enter"&&check()}
              placeholder={t.opEnterPlate+" (AA-00-AA, AB123CD...)"} maxLength={12}
              autoComplete="off" autoCorrect="off" autoCapitalize="characters" spellCheck={false}
              style={{...inp(),textAlign:"center",fontSize:22,fontWeight:800,letterSpacing:4,
                textTransform:"uppercase",marginBottom:12,
                // Fitts: padding extra — alvo de input mais fácil de activar
                padding:"20px 18px"}}/>
            {/* Fitts: botão Verificar full-width, 56px — acção principal do operador */}
            <button style={btnP({fontSize:17})} onClick={()=>check()}>{t.opCheck}</button>
          </div>
        )}

        {/* Camera — leitura contínua automática */}
        {mode==="camera"&&(
          <div style={{marginBottom:16}}>
            <div style={{borderRadius:18,overflow:"hidden",background:"#000",aspectRatio:"16/9",position:"relative",marginBottom:12}}>
              <video ref={videoRef} autoPlay playsInline muted style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
              <canvas ref={canvasRef} style={{display:"none"}}/>
              {/* Estado em sobreposição no fundo */}
              <div style={{position:"absolute",bottom:10,left:10,right:10,
                background:scanning?"rgba(61,122,58,.92)":"rgba(0,0,0,.75)",
                borderRadius:10,padding:"10px 14px",
                display:"flex",alignItems:"center",gap:10,
                transition:"background .3s"}}>
                <div style={{width:8,height:8,borderRadius:"50%",flexShrink:0,
                  background:scanning?C.ok:ocrReady?"#ffd700":C.warn,
                  boxShadow:scanning?`0 0 6px ${C.ok}`:"none"}}/>
                <div style={{color:"#fff",fontSize:13,fontWeight:700,
                  letterSpacing:scanning?2:.5,fontFamily:"monospace"}}>
                  {scanning?camTxt:ocrReady?"A analisar...":camTxt}
                </div>
              </div>
            </div>
          </div>
        )}

        <ResultCard/>

        {/* Active sessions list */}
        {!result&&(
          <>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.8,color:C.text3,margin:"24px 0 10px"}}>
              {t.opActiveSessions}
            </div>
            {zoneSessions.length===0
              ?<div style={{textAlign:"center",padding:"32px 0",color:C.text3,fontSize:14}}>{t.opNoSessions}</div>
              :zoneSessions.map((s,i)=><SessCard key={i} s={s}/>)}
          </>
        )}
      </div>
      <div style={{height:32}}/>
      <style>{`@keyframes scan{0%,100%{top:0;opacity:0}10%,90%{opacity:1}50%{top:calc(100% - 2px)}}`}</style>
    </div>
  );
};

// ─────────────────────────────────────────────
//  ADMIN PANEL — analytics + all management
// ─────────────────────────────────────────────
const AdminPanel=({goTo,user,setUser,toast,t,lang,setLang})=>{
  const [tab,setTab]=useState("overview");
  const [sessFilter,setSessFilter]=useState("all");
  const [pending,setPending]=useState([
    {name:"Maria Fernandes",nif:"245 678 901",plate:"LL-66-MM",type:"Residente",  date:"2 Jun"},
    {name:"António Costa",  nif:"123 456 789",plate:"NN-77-PP",type:"Trabalhador", date:"4 Jun"},
    {name:"Sofia Rodrigues",nif:"987 654 321",plate:"QQ-88-RR",type:"Residente",  date:"5 Jun"},
  ]);
  const allSess=getAllSess();const now=new Date();
  const active=allSess.filter(s=>new Date(s.end)>now);
  const expired=allSess.filter(s=>new Date(s.end)<=now);
  const filtered=allSess.filter(s=>{
    if(sessFilter==="valid")return new Date(s.end)>now&&s.status!=="res";
    if(sessFilter==="expired2")return new Date(s.end)<=now;
    if(sessFilter==="resident")return s.status==="res";
    return true;
  });
  const tabs=[
    {id:"overview",l:t.adminOverview},
    {id:"sessions",l:t.adminSessions},
    {id:"zones",l:t.adminZones},
    {id:"revenue",l:t.adminRevenue},
    {id:"pending",l:t.adminPending},
    {id:"qr",l:t.adminQR},
  ];
  const StatCard=({value,label,sub,color})=>(
    <div style={{...card(),padding:"18px 16px"}}>
      <div style={{fontSize:32,fontWeight:800,color:color||C.green,letterSpacing:-1}}>{value}</div>
      <div style={{fontSize:12,color:C.text2,marginTop:4,fontWeight:500}}>{label}</div>
      {sub&&<div style={{fontSize:11,fontWeight:700,color:color||C.ok,marginTop:6}}>{sub}</div>}
    </div>
  );
  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      {/* Header */}
      <div style={{position:"sticky",top:0,zIndex:50,background:"rgba(242,245,242,.95)",
        backdropFilter:"blur(16px)",borderBottom:`1px solid ${C.border}`,
        padding:"14px 18px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div>
          <div style={{fontSize:15,fontWeight:800,color:C.text,letterSpacing:"-.3px"}}>{t.adminDashboard}</div>
          <div style={{fontSize:11,color:C.text3,marginTop:2}}>
            {user?.name} · {new Date().toLocaleDateString("pt-PT",{weekday:"short",day:"2-digit",month:"short"})}
          </div>
        </div>
        <NavLink onClick={()=>{setUser(null);goTo("landing");}}>{t.logout}</NavLink>
      </div>
      {/* Tabs */}
      <div style={{overflowX:"auto",borderBottom:`1px solid ${C.border2}`,
        display:"flex",padding:"0 18px",scrollbarWidth:"none",background:C.surface}}>
        {tabs.map(({id,l})=>(
          <button key={id} onClick={()=>setTab(id)}
            style={{padding:"13px 16px",border:"none",fontFamily:"inherit",fontSize:13,fontWeight:600,
              cursor:"pointer",whiteSpace:"nowrap",background:"none",flexShrink:0,
              color:tab===id?C.green:C.text3,
              borderBottom:tab===id?`2px solid ${C.green}`:"2px solid transparent",
              transition:"all .18s"}}>
            {l}
          </button>
        ))}
      </div>

      <div style={{padding:"20px 18px 48px",maxWidth:480,margin:"0 auto",width:"100%"}}>

        {tab==="overview"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
              <StatCard value={active.length} label={t.adminActiveSessions} sub="↑ +12% vs ontem" color={C.ok}/>
              <StatCard value="214€" label={t.adminTodayRevenue} sub="↑ +22% vs média" color={C.green}/>
              <StatCard value="74%" label={t.adminOccupancy} sub="Alta temporada" color={C.teal}/>
              <StatCard value={new Set(allSess.map(s=>s.plate)).size} label={t.adminUniquePlates} sub="Hoje" color={C.slate}/>
            </div>
            <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.8,color:C.text3,marginBottom:12}}>{t.adminLatest}</div>
            {allSess.slice(0,6).map((s,i)=><SessCard key={i} s={s}/>)}
          </>
        )}

        {tab==="sessions"&&(
          <>
            <Seg tabs={[{id:"all",label:"Todas"},{id:"valid",label:t.adminValid},{id:"expired2",label:t.adminExpired2},{id:"resident",label:t.adminResident}]}
              active={sessFilter} onChange={setSessFilter}/>
            <div style={{fontSize:12,color:C.text3,marginBottom:12}}>{filtered.length} sessões</div>
            {filtered.map((s,i)=><SessCard key={i} s={s}/>)}
          </>
        )}

        {tab==="zones"&&(
          Object.entries(ZONES).map(([id,z])=>{
            const zActive=allSess.filter(s=>s.zone===id&&new Date(s.end)>now).length;
            const zTotal=allSess.filter(s=>s.zone===id).length;
            const occ={A:87,B:64,C:73,D:55,E:82,F:40}[id]||60;
            return(
              <div key={id} style={{...card(),padding:"16px 18px",marginBottom:12,borderLeft:`4px solid ${z.color}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,color:z.color,marginBottom:2}}>Zona {id} — {z.name}</div>
                    <div style={{fontSize:12,color:C.text3}}>{ZR(id)} · {z.desc}</div>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:occ>75?C.err:C.ok,
                    background:occ>75?C.errBg:C.okBg,borderRadius:999,padding:"3px 10px",
                    border:`1px solid ${occ>75?C.errBd:C.okBd}`}}>{occ}%</span>
                </div>
                <div style={{display:"flex",gap:16,fontSize:12,color:C.text2,marginBottom:10}}>
                  <span><strong style={{color:C.text}}>{zActive}</strong> activas</span>
                  <span><strong style={{color:C.text}}>{zTotal}</strong> total hoje</span>
                </div>
                <div style={{background:C.bg3,borderRadius:4,height:5,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:4,width:occ+"%",background:z.color,transition:"width .5s"}}/>
                </div>
              </div>
            );
          })
        )}

        {tab==="revenue"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
              {[[t.today,"214€"],[t.adminWeek,"1.618€"],[t.adminMonth,"6.940€"],[t.adminYear,"36.2K€"]].map(([l,v])=>(
                <div key={l} style={{...card(),padding:"18px 16px"}}>
                  <div style={{fontSize:28,fontWeight:800,color:C.green,letterSpacing:-1}}>{v}</div>
                  <div style={{fontSize:12,color:C.text2,marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{...card(),padding:"18px"}}>
              <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:14}}>Distribuição por método</div>
              {[["MB WAY",46,C.teal],["Cartão",30,C.green],["Apple/Google Pay",16,C.warn],["PayPal",8,C.slate]].map(([n,p,co])=>(
                <div key={n} style={{marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5}}>
                    <span style={{color:C.text2}}>{n}</span>
                    <span style={{color:co,fontWeight:700}}>{p}%</span>
                  </div>
                  <div style={{background:C.bg3,borderRadius:4,height:5,overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:4,width:p+"%",background:co}}/>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab==="pending"&&(
          pending.length===0
            ?<div style={{textAlign:"center",padding:"40px 0",color:C.text3,fontSize:14}}>{t.adminNoPending}</div>
            :pending.map((p,i)=>(
              <div key={i} style={{...card(),padding:"16px 18px",marginBottom:12,borderLeft:`4px solid ${C.teal}`}}>
                <div style={{fontSize:14,fontWeight:700,color:C.text}}>{p.name}</div>
                <div style={{fontSize:12,color:C.text3,marginTop:3,marginBottom:12}}>
                  NIF {p.nif} · <PlateBadge plate={p.plate}/> · {p.type} · {p.date}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <button style={btnP({fontSize:12,padding:"10px",borderRadius:12})}
                    onClick={()=>{setPending(a=>a.filter((_,j)=>j!==i));toast(t.adminApproved+": "+p.name);}}>
                    {t.adminApprove}
                  </button>
                  <button style={btnO({fontSize:12,padding:"10px",borderRadius:12,borderColor:C.err,color:C.err})}
                    onClick={()=>{setPending(a=>a.filter((_,j)=>j!==i));toast(t.adminRejected);}}>
                    {t.adminReject}
                  </button>
                </div>
              </div>
            ))
        )}

        {tab==="qr"&&<QRTab t={t}/>}
      </div>
      <Footer t={t}/>
    </div>
  );
};

// ─────────────────────────────────────────────
//  APP ROOT
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
//  QR SCAN SCREEN — cidadão digitaliza QR da zona
//  Usa jsQR para descodificar QR codes em tempo real
// ─────────────────────────────────────────────
const QRScanScreen=({goTo,state,setState,toast})=>{
  const videoRef=useRef(null);
  const canvasRef=useRef(null);
  const streamRef=useRef(null);
  const rafRef=useRef(null);
  const [status,setStatus]=useState("A iniciar câmara...");
  const [error,setError]=useState(false);
  const [found,setFound]=useState(false);

  const loadJsQR=()=>new Promise((res,rej)=>{
    if(window.jsQR)return res(window.jsQR);
    const s=document.createElement("script");
    s.src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js";
    s.onload=()=>res(window.jsQR);s.onerror=rej;
    document.head.appendChild(s);
  });

  const tick=(jsQR)=>{
    const video=videoRef.current;const cvs=canvasRef.current;
    if(!video||!cvs||video.readyState<2){
      rafRef.current=requestAnimationFrame(()=>tick(jsQR));return;
    }
    cvs.width=video.videoWidth;cvs.height=video.videoHeight;
    const ctx=cvs.getContext("2d",{willReadFrequently:true});
    ctx.drawImage(video,0,0);
    const img=ctx.getImageData(0,0,cvs.width,cvs.height);
    const code=jsQR(img.data,img.width,img.height,{inversionAttempts:"dontInvert"});
    if(code){
      const m=code.data.match(/[?&]zona=([A-Fa-f])/i);
      if(m){
        const zona=m[1].toUpperCase();
        setFound(true);
        setStatus(`✓ Zona ${zona} — ${ZONES[zona]?.name||""}`);
        if(streamRef.current)streamRef.current.getTracks().forEach(t=>t.stop());
        cancelAnimationFrame(rafRef.current);
        toast(`Zona ${zona} identificada. A redirecionar para pagamento...`);
        setState(s=>({...s,zone:zona}));
        setTimeout(()=>{goTo("zonelanding");},900);
        return;
      }
    }
    rafRef.current=requestAnimationFrame(()=>tick(jsQR));
  };

  useEffect(()=>{
    let active=true;
    (async()=>{
      try{
        const stream=await navigator.mediaDevices.getUserMedia({
          video:{facingMode:{ideal:"environment"},width:{ideal:1280}}
        });
        if(!active){stream.getTracks().forEach(t=>t.stop());return;}
        streamRef.current=stream;
        if(videoRef.current)videoRef.current.srcObject=stream;
        setStatus("Aponte para o Código QR da zona");
        const jsQR=await loadJsQR();
        if(!active)return;
        rafRef.current=requestAnimationFrame(()=>tick(jsQR));
      }catch{
        setError(true);
        setStatus("Câmara não disponível neste dispositivo");
      }
    })();
    return()=>{
      active=false;
      cancelAnimationFrame(rafRef.current);
      if(streamRef.current)streamRef.current.getTracks().forEach(t=>t.stop());
    };
  },[]);

  return(
    <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column"}}>
      <Nav left={<Back onClick={()=>goTo("landing")}/>} title="Digitalizar Código QR"/>
      <div style={{flex:1,padding:"20px 20px 40px",maxWidth:480,margin:"0 auto",width:"100%",
        display:"flex",flexDirection:"column",gap:16}}>

        {/* Viewfinder */}
        <div style={{borderRadius:20,overflow:"hidden",background:"#000",
          aspectRatio:"1/1",position:"relative"}}>
          <video ref={videoRef} autoPlay playsInline muted
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
          <canvas ref={canvasRef} style={{display:"none"}}/>

          {/* Guia de enquadramento */}
          {!found&&!error&&(
            <div style={{position:"absolute",inset:0,display:"flex",
              alignItems:"center",justifyContent:"center"}}>
              <div style={{width:200,height:200,position:"relative"}}>
                {/* Cantos do viewfinder */}
                {[{t:0,l:0},{t:0,r:0},{b:0,l:0},{b:0,r:0}].map((pos,i)=>(
                  <div key={i} style={{position:"absolute",width:24,height:24,...pos,
                    borderTop:pos.t===0?"3px solid rgba(255,255,255,.9)":"none",
                    borderBottom:pos.b===0?"3px solid rgba(255,255,255,.9)":"none",
                    borderLeft:pos.l===0?"3px solid rgba(255,255,255,.9)":"none",
                    borderRight:pos.r===0?"3px solid rgba(255,255,255,.9)":"none"}}/>
                ))}
                {/* Linha de scan animada */}
                <div style={{position:"absolute",left:4,right:4,height:2,top:"50%",
                  background:"linear-gradient(90deg,transparent,rgba(255,255,255,.8),transparent)",
                  animation:"scan 2s ease-in-out infinite"}}/>
              </div>
            </div>
          )}

          {/* Estado */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,
            background:found?"rgba(61,122,58,.92)":error?"rgba(184,50,50,.85)":"rgba(0,0,0,.72)",
            padding:"12px 16px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:8,height:8,borderRadius:"50%",flexShrink:0,
              background:found?C.ok:error?"#ff6b6b":"#ffd700",
              animation:(!found&&!error)?"pulse 1s infinite":undefined}}/>
            <div style={{color:"#fff",fontSize:13,fontWeight:700}}>{status}</div>
          </div>
        </div>

        {/* Instrução */}
        {!found&&!error&&(
          <div style={{...card(),padding:"16px 20px",textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:8}}>📱</div>
            <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:4}}>
              Como utilizar
            </div>
            <div style={{fontSize:13,color:C.text2,lineHeight:1.6}}>
              Aponte a câmara do seu dispositivo para o Código QR presente na placa de estacionamento da zona pretendida.
              O sistema identificará a zona automaticamente.
            </div>
          </div>
        )}

        {/* Fallback se câmara não disponível */}
        {error&&(
          <div style={{...card(),padding:"20px",textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:12}}>⚠️</div>
            <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:8}}>
              Câmara indisponível
            </div>
            <div style={{fontSize:13,color:C.text2,lineHeight:1.6,marginBottom:16}}>
              Não foi possível aceder à câmara. Seleccione a zona manualmente para prosseguir com o pagamento.
            </div>
            <button onClick={()=>goTo("zone")} style={btnP()}>
              Seleccionar Zona Manualmente
            </button>
          </div>
        )}

        {/* Separador alternativo */}
        {!error&&(
          <div style={{textAlign:"center"}}>
            <button onClick={()=>goTo("zone")}
              style={{background:"none",border:"none",color:C.text3,
                fontSize:13,fontWeight:600,cursor:"pointer",padding:"8px",
                fontFamily:"'Sora',sans-serif"}}>
              ou seleccionar zona manualmente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function ParkPX(){
  const [screen,setScreen]=useState("landing");
  const [lang,setLang]=useState("pt");
  const t=T[lang];
  const [toastMsg,setToastMsg]=useState("");
  const [user,setUser]=useState(null);
  const [notifSent,setNotifSent]=useState(false);
  const [state,setState]=useState({zone:null,price:0,plate:"",mins:60,total:0,pay:null,ref:null,startTime:null,endTime:null,cdTotal:0});

  // ── Favicon & meta tags ──────────────────────
  useEffect(()=>{
    const setMeta=(sel,attr,val)=>{
      let el=document.querySelector(sel);
      if(!el){el=document.createElement(sel.startsWith("meta")||sel==="meta"?"meta":"link");document.head.appendChild(el);}
      Object.entries(attr).forEach(([k,v])=>el.setAttribute(k,v));
      if(val!==undefined)el.setAttribute("content",val);
    };
    // Remove existing favicons to avoid duplicates
    document.querySelectorAll("link[rel*='icon'],link[rel='apple-touch-icon']").forEach(e=>e.remove());
    // SVG favicon — Chrome/Firefox (não suportado pelo Safari)
    const svgLink=document.createElement("link");
    svgLink.rel="icon"; svgLink.type="image/svg+xml"; svgLink.href="/favicon.svg";
    document.head.appendChild(svgLink);
    // PNG favicon — Safari desktop e browsers antigos
    const pngLink=document.createElement("link");
    pngLink.rel="icon"; pngLink.type="image/png"; pngLink.sizes="32x32"; pngLink.href="/favicon.png";
    document.head.appendChild(pngLink);
    // Apple Touch Icon — iOS Safari (bookmark/homescreen)
    const appleLink=document.createElement("link");
    appleLink.rel="apple-touch-icon"; appleLink.sizes="180x180"; appleLink.href="/apple-touch-icon.png";
    document.head.appendChild(appleLink);
    // Safari pinned tab
    const maskLink=document.createElement("link");
    maskLink.rel="mask-icon"; maskLink.href="/favicon.svg"; maskLink.setAttribute("color","#22652c");
    document.head.appendChild(maskLink);
    // Meta tags para SEO e motores de busca
    document.title="ParkPX — Parquímetro Digital de Peniche";
    const metas=[
      ["meta[name='description']",{name:"description"},"Pague o estacionamento em Peniche de forma rápida e simples. 6 zonas tarifadas, MB WAY, cartão. Câmara Municipal de Peniche."],
      ["meta[name='theme-color']",{name:"theme-color"},"#22652c"],
      ["meta[name='application-name']",{name:"application-name"},"ParkPX"],
      ["meta[property='og:title']",{property:"og:title"},"ParkPX — Parquímetro Digital de Peniche"],
      ["meta[property='og:description']",{property:"og:description"},"Pague o estacionamento em Peniche. Rápido, simples, sem papel."],
      ["meta[property='og:image']",{property:"og:image"},"https://www.cm-penichepark.pt/favicon.svg"],
      ["meta[property='og:url']",{property:"og:url"},"https://www.cm-penichepark.pt"],
      ["meta[property='og:type']",{property:"og:type"},"website"],
      ["meta[name='twitter:card']",{name:"twitter:card"},"summary"],
      ["meta[name='twitter:title']",{name:"twitter:title"},"ParkPX — Parquímetro Digital de Peniche"],
      ["meta[name='twitter:description']",{name:"twitter:description"},"Pague o estacionamento em Peniche. Rápido, simples, sem papel."],
    ];
    metas.forEach(([sel,attrs,content])=>{
      let el=document.querySelector(sel);
      if(!el){el=document.createElement("meta");document.head.appendChild(el);}
      Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,v));
      el.setAttribute("content",content);
    });
  },[]);

  const toast=useCallback(msg=>{setToastMsg(msg);setTimeout(()=>setToastMsg(""),2800);},[]);
  const goTo=useCallback(sc=>{setScreen(sc);window.scrollTo(0,0);},[]);

  useEffect(()=>{
    const z=(new URLSearchParams(window.location.search).get("zona")||"").toUpperCase();
    // QR code lido → vai directamente para zonelanding (fundo da cor da zona + pagamento imediato)
    if(ZONES[z]){setState(s=>({...s,zone:z,price:ZONES[z].rate}));setScreen("zonelanding");}
    // Notificação clicada com ?renew= → abrir directo no sucesso
    const renew=(new URLSearchParams(window.location.search).get("renew")||"").toUpperCase();
    if(renew){const live=getLive();const s=live.find(x=>x.plate===renew&&new Date(x.end)>new Date());
      if(s){setState(prev=>({...prev,plate:s.plate,zone:s.zone,price:ZONES[s.zone]?.rate||1,
        mins:s.mins,total:s.total||0,pay:s.method,ref:s.ref,
        startTime:new Date(s.start),endTime:new Date(s.end),cdTotal:s.mins*60}));setScreen("success");}
    }
  },[]);

  // Listener de mensagens do Service Worker (ex: clique na notificação com app aberta)
  useEffect(()=>{
    if(!("serviceWorker" in navigator))return;
    const handler=e=>{
      if(e.data?.type==="OPEN_RENEW"){
        const {plate,zone}=e.data;
        const live=getLive();
        const s=live.find(x=>x.plate===plate&&x.zone===zone);
        if(s){setState(prev=>({...prev,plate:s.plate,zone:s.zone,price:ZONES[s.zone]?.rate||1,
          mins:s.mins,total:s.total||0,pay:s.method,ref:s.ref,
          startTime:new Date(s.start),endTime:new Date(s.end),cdTotal:s.mins*60}));
          setScreen("success");window.scrollTo(0,0);}
      }
    };
    navigator.serviceWorker.addEventListener("message",handler);
    return()=>navigator.serviceWorker.removeEventListener("message",handler);
  },[]);

  useEffect(()=>{
    const live=getLive();
    const act=live.find(s=>new Date(s.end)>new Date());
    if(act)setState(s=>({...s,plate:act.plate,zone:act.zone,price:ZONES[act.zone]?.rate||1,
      mins:act.mins,total:act.total||0,pay:act.method,ref:act.ref,
      startTime:new Date(act.start),endTime:new Date(act.end),cdTotal:act.mins*60}));
    // SW registado aqui apenas para ter o scope pronto; permissão pedida no contexto certo
    registerSW().catch(()=>{});
  },[]);

  const onPay=useCallback(method=>{
    const now=new Date(),end=new Date(now.getTime()+state.mins*60000),ref=genRef();
    const sess={plate:state.plate,zone:state.zone,mins:state.mins,
      status:user&&isRes(user.role)?"res":"ok",ref,method:PM[method]||method,
      total:state.total,start:now.toISOString(),end:end.toISOString()};
    saveLive(sess);
    if(user)addHist({...sess,start:now,end},user.email);
    setState(s=>({...s,pay:method,ref,startTime:now,endTime:end,cdTotal:state.mins*60}));
    setNotifSent(false);
    goTo("success");
    // Notificações: fire-and-forget, nunca bloqueiam o pagamento
    if(user){
      registerSW().then(()=>scheduleSessionAlerts({
        plate:state.plate,zone:state.zone,
        zoneName:ZONES[state.zone]?.name||state.zone,
        endTime:end.toISOString(),ref
      })).catch(()=>{});
    }
  },[state,user,goTo]);

  const onExtend=useCallback((extraMins, method)=>{
    const ms=extraMins*60000;
    const e=new Date((state.endTime||new Date()).getTime()+ms);
    extendLive(state.plate,state.zone,ms);
    const extRef=genRef();
    const extTotal=Math.round(((state.price||1)*(extraMins/60))*(user&&isRes(user.role)?1-user.discount/100:1)*100)/100;
    const extSess={plate:state.plate,zone:state.zone,mins:extraMins,
      status:user&&isRes(user.role)?"res":"ok",ref:extRef,
      method:PM[method]||method,total:extTotal,
      start:new Date().toISOString(),end:e.toISOString(),extended:true};
    if(user)addHist(extSess,user.email);
    setState(s=>({...s,endTime:e,cdTotal:(s.cdTotal||0)+(extraMins*60)}));
    setNotifSent(false);
    toast("✓ Sessão prolongada · "+extRef);
    // Reagendar: fire-and-forget
    if(user){
      cancelSessionAlerts(state.plate,state.zone);
      scheduleSessionAlerts({
        plate:state.plate,zone:state.zone,
        zoneName:ZONES[state.zone]?.name||state.zone,
        endTime:e.toISOString(),ref:extRef
      }).catch(()=>{});
    }
  },[state,user,toast]);

  const common={goTo,lang,setLang,t,user,setUser,toast};
  const screens={
    landing: <Landing goTo={goTo} state={state} lang={lang} setLang={setLang} t={t}/>,
    login:   <LoginScreen {...common}/>,
    googleProfile: <GoogleProfileScreen goTo={goTo} user={user} setUser={setUser} toast={toast} t={t}/>,
    zone:    <ZoneScreen  {...common} state={state} setState={setState}/>,
    time:    <TimeScreen  {...common} state={state} setState={setState}/>,
    payment: <PaymentScreen {...common} state={state} setState={setState} onPay={onPay}/>,
    success: <SuccessScreen goTo={goTo} state={state} onExtend={onExtend} t={t} lang={lang} setLang={setLang} notifSent={notifSent} setNotifSent={setNotifSent} user={user}/>,
    resArea: <ResArea goTo={goTo} user={user} setUser={setUser} t={t} lang={lang} setLang={setLang}/>,
    opPanel: <OpPanel {...common}/>,
    adminPanel:<AdminPanel {...common}/>,
    qrscan:  <QRScanScreen goTo={goTo} state={state} setState={setState} toast={toast} t={t}/>,
    zonelanding:<ZoneLanding goTo={goTo} state={state} setState={setState} toast={toast} t={t} user={user}/>,
    faq:     <InfoScreen goTo={goTo} screen="faq"     lang={lang} setLang={setLang} t={t}/>,
    terms:   <InfoScreen goTo={goTo} screen="terms"   lang={lang} setLang={setLang} t={t}/>,
    support: <InfoScreen goTo={goTo} screen="support" lang={lang} setLang={setLang} t={t}/>,
    resOk:(
      <div style={{minHeight:"100svh",background:C.bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:48}}>
        <div style={{fontSize:56,marginBottom:16}}>📬</div>
        <div style={{fontSize:21,fontWeight:800,color:C.text}}>{t.requestSent}</div>
        <p style={{color:C.text2,maxWidth:280,margin:"10px auto 28px",fontSize:14,lineHeight:1.7}}>{t.requestDesc}</p>
        <button style={btnO({maxWidth:300,borderRadius:18})} onClick={()=>goTo("landing")}>{t.back}</button>
      </div>
    ),
  };

  return(
    <div style={{fontFamily:"'Sora',-apple-system,sans-serif",WebkitFontSmoothing:"antialiased",background:C.bg,minHeight:"100svh"}}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      <Toast msg={toastMsg}/>
      {screens[screen]||screens.landing}
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}input,button{font-family:'Sora',-apple-system,sans-serif;}::-webkit-scrollbar{display:none;}input[type=range]{accent-color:#3d7a3a;}body{background:#f2f5f2;}`}</style>
    </div>
  );
}
