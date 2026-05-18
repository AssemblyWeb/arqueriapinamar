/**
 * Calendario de torneos — única fuente de datos para index.html y ranking.html.
 * Editar fechas y nombres aquí.
 */

const TORNEOS = [
  {
    date: "2026-05-18",
    dateLabel: "21 de Junio, 2026",
    name: "Premio Zorro",
  },
  {
    date: "2026-07-26",
    dateLabel: "26 de Julio, 2026",
    name: "Premio Liebre",
  },
  {
    date: "2026-08-30",
    dateLabel: "30 de Agosto, 2026",
    name: "Premio Pecarí",
  },
  {
    date: "2026-10-04",
    dateLabel: "4 de Octubre, 2026",
    name: "Premio Ciervo",
    nameExtra: " + <b>Gran Final</b>",
  },
]

function parseLocalDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number)
  return new Date(year, month - 1, day)
}

function startOfDay(date) {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/** Resalta el próximo torneo; pasa al siguiente al día posterior de su fecha. */
function getHighlightedTorneoIndex(torneos, today = new Date()) {
  const todayStart = startOfDay(today)

  for (let i = 0; i < torneos.length; i++) {
    const dayAfterTournament = startOfDay(
      addDays(parseLocalDate(torneos[i].date), 1),
    )
    if (todayStart < dayAfterTournament) return i
  }

  return -1
}

function renderTorneosModal() {
  const tbody = document.getElementById("torneosModalTableBody")
  if (!tbody) return

  const highlightIndex = getHighlightedTorneoIndex(TORNEOS)

  tbody.innerHTML = TORNEOS.map((torneo, index) => {
    const dateCell = torneo.dateLabel
    const nameCell = torneo.name + (torneo.nameExtra || "")
    const rowClass = index === highlightIndex ? ' class="table-warning"' : ""
    return `<tr${rowClass}><td>${dateCell}</td><td>${nameCell}</td></tr>`
  }).join("")
}

document.addEventListener("DOMContentLoaded", renderTorneosModal)
