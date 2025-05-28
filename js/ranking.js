// Ranking data and functionality
document.addEventListener("DOMContentLoaded", () => {
  // Sample data structure with subdivisions
  const sampleRankingData = {
    Longbow: {
      Masculino: [
        { nombre: "Miguel Torres", torneo1: 220, torneo2: 225, torneo3: 222, torneo4: 228, total: 895 },
        { nombre: "Fernando Díaz", torneo1: 210, torneo2: 215, torneo3: 212, torneo4: 218, total: 855 },
        { nombre: "Andrés Jiménez", torneo1: 200, torneo2: 205, torneo3: 202, torneo4: 208, total: 815 },
        { nombre: "Raúl Guerrero", torneo1: 190, torneo2: 195, torneo3: 192, torneo4: 198, total: 775 },
        { nombre: "Sergio Ortega", torneo1: 180, torneo2: 185, torneo3: 182, torneo4: 188, total: 735 },
        { nombre: "Carlos Mendoza", torneo1: 175, torneo2: 180, torneo3: 178, torneo4: 183, total: 716 },
        { nombre: "Pablo Herrera", torneo1: 170, torneo2: 175, torneo3: 172, torneo4: 178, total: 695 },
        { nombre: "Diego Morales", torneo1: 165, torneo2: 170, torneo3: 168, torneo4: 173, total: 676 },
        { nombre: "Roberto Silva", torneo1: 160, torneo2: 165, torneo3: 162, torneo4: 168, total: 655 },
        { nombre: "Javier Castro", torneo1: 155, torneo2: 160, torneo3: 158, torneo4: 163, total: 636 },
      ],
      Femenino: [
        { nombre: "Elena Vargas", torneo1: 215, torneo2: 220, torneo3: 218, torneo4: 223, total: 876 },
        { nombre: "Lucía Herrera", torneo1: 205, torneo2: 210, torneo3: 208, torneo4: 213, total: 836 },
        { nombre: "Valeria Mendoza", torneo1: 195, torneo2: 200, torneo3: 198, torneo4: 203, total: 796 },
        { nombre: "Natalia Ramos", torneo1: 185, torneo2: 190, torneo3: 188, torneo4: 193, total: 756 },
        { nombre: "Patricia Vega", torneo1: 175, torneo2: 180, torneo3: 178, torneo4: 183, total: 716 },
        { nombre: "Carmen López", torneo1: 170, torneo2: 175, torneo3: 172, torneo4: 178, total: 695 },
        { nombre: "Sofia Ruiz", torneo1: 165, torneo2: 170, torneo3: 168, torneo4: 173, total: 676 },
        { nombre: "Laura Martínez", torneo1: 160, torneo2: 165, torneo3: 162, torneo4: 168, total: 655 },
        { nombre: "Ana García", torneo1: 155, torneo2: 160, torneo3: 158, torneo4: 163, total: 636 },
        { nombre: "María Rodríguez", torneo1: 150, torneo2: 155, torneo3: 152, torneo4: 158, total: 615 },
      ],
      Escuela: [
        { nombre: "Tomás Pérez", torneo1: 180, torneo2: 185, torneo3: 182, torneo4: 188, total: 735 },
        { nombre: "Valentina Cruz", torneo1: 175, torneo2: 180, torneo3: 178, torneo4: 183, total: 716 },
        { nombre: "Mateo Fernández", torneo1: 170, torneo2: 175, torneo3: 172, torneo4: 178, total: 695 },
        { nombre: "Isabella Moreno", torneo1: 165, torneo2: 170, torneo3: 168, torneo4: 173, total: 676 },
        { nombre: "Santiago Díaz", torneo1: 160, torneo2: 165, torneo3: 162, torneo4: 168, total: 655 },
        { nombre: "Camila Torres", torneo1: 155, torneo2: 160, torneo3: 158, torneo4: 163, total: 636 },
        { nombre: "Nicolás Silva", torneo1: 150, torneo2: 155, torneo3: 152, torneo4: 158, total: 615 },
        { nombre: "Sofía Vargas", torneo1: 145, torneo2: 150, torneo3: 148, torneo4: 153, total: 596 },
        { nombre: "Benjamín López", torneo1: 140, torneo2: 145, torneo3: 142, torneo4: 148, total: 575 },
        { nombre: "Emma Guerrero", torneo1: 135, torneo2: 140, torneo3: 138, torneo4: 143, total: 556 },
      ],
    },
    Raso: {
      Masculino: [
        { nombre: "Alejandro Cruz", torneo1: 260, torneo2: 265, torneo3: 262, torneo4: 268, total: 1055 },
        { nombre: "Cristian Reyes", torneo1: 250, torneo2: 255, torneo3: 252, torneo4: 258, total: 1015 },
        { nombre: "Eduardo Paredes", torneo1: 240, torneo2: 245, torneo3: 242, torneo4: 248, total: 975 },
        { nombre: "Gabriel Núñez", torneo1: 230, torneo2: 235, torneo3: 232, torneo4: 238, total: 935 },
        { nombre: "Ignacio Rojas", torneo1: 220, torneo2: 225, torneo3: 222, torneo4: 228, total: 895 },
        { nombre: "Kevin Sandoval", torneo1: 215, torneo2: 220, torneo3: 218, torneo4: 223, total: 876 },
        { nombre: "Mauricio Peña", torneo1: 210, torneo2: 215, torneo3: 212, torneo4: 218, total: 855 },
        { nombre: "Oscar Valdez", torneo1: 205, torneo2: 210, torneo3: 208, torneo4: 213, total: 836 },
        { nombre: "Samuel Cortés", torneo1: 200, torneo2: 205, torneo3: 202, torneo4: 208, total: 815 },
        { nombre: "Ulises Bravo", torneo1: 195, torneo2: 200, torneo3: 198, torneo4: 203, total: 796 },
      ],
      Femenino: [
        { nombre: "Beatriz Soto", torneo1: 255, torneo2: 260, torneo3: 258, torneo4: 263, total: 1036 },
        { nombre: "Daniela Flores", torneo1: 245, torneo2: 250, torneo3: 248, torneo4: 253, total: 996 },
        { nombre: "Francisca Aguilar", torneo1: 235, torneo2: 240, torneo3: 238, torneo4: 243, total: 956 },
        { nombre: "Helena Campos", torneo1: 225, torneo2: 230, torneo3: 228, torneo4: 233, total: 916 },
        { nombre: "Julia Medina", torneo1: 215, torneo2: 220, torneo3: 218, torneo4: 223, total: 876 },
        { nombre: "Lorena Espinoza", torneo1: 210, torneo2: 215, torneo3: 212, torneo4: 218, total: 855 },
        { nombre: "Nadia Contreras", torneo1: 205, torneo2: 210, torneo3: 208, torneo4: 213, total: 836 },
        { nombre: "Paola Ibarra", torneo1: 200, torneo2: 205, torneo3: 202, torneo4: 208, total: 815 },
        { nombre: "Rosa Delgado", torneo1: 195, torneo2: 200, torneo3: 198, torneo4: 203, total: 796 },
        { nombre: "Teresa Molina", torneo1: 190, torneo2: 195, torneo3: 192, torneo4: 198, total: 775 },
      ],
      Escuela: [
        { nombre: "Agustín Herrera", torneo1: 200, torneo2: 205, torneo3: 202, torneo4: 208, total: 815 },
        { nombre: "Catalina Morales", torneo1: 195, torneo2: 200, torneo3: 198, torneo4: 203, total: 796 },
        { nombre: "Emilio Castro", torneo1: 190, torneo2: 195, torneo3: 192, torneo4: 198, total: 775 },
        { nombre: "Florencia Silva", torneo1: 185, torneo2: 190, torneo3: 188, torneo4: 193, total: 756 },
        { nombre: "Gonzalo Vega", torneo1: 180, torneo2: 185, torneo3: 182, torneo4: 188, total: 735 },
        { nombre: "Julieta López", torneo1: 175, torneo2: 180, torneo3: 178, torneo4: 183, total: 716 },
        { nombre: "Lucas Ruiz", torneo1: 170, torneo2: 175, torneo3: 172, torneo4: 178, total: 695 },
        { nombre: "Martina García", torneo1: 165, torneo2: 170, torneo3: 168, torneo4: 173, total: 676 },
        { nombre: "Rodrigo Martínez", torneo1: 160, torneo2: 165, torneo3: 162, torneo4: 168, total: 655 },
        { nombre: "Valentina Fernández", torneo1: 155, torneo2: 160, torneo3: 158, torneo4: 163, total: 636 },
      ],
    },
    Recurvo: {
      Masculino: [
        { nombre: "Kevin Sandoval", torneo1: 270, torneo2: 275, torneo3: 272, torneo4: 278, total: 1095 },
        { nombre: "Mauricio Peña", torneo1: 260, torneo2: 265, torneo3: 262, torneo4: 268, total: 1055 },
        { nombre: "Oscar Valdez", torneo1: 250, torneo2: 255, torneo3: 252, torneo4: 258, total: 1015 },
        { nombre: "Quintero Ramón", torneo1: 240, torneo2: 245, torneo3: 242, torneo4: 248, total: 975 },
        { nombre: "Samuel Cortés", torneo1: 230, torneo2: 235, torneo3: 232, torneo4: 238, total: 935 },
        { nombre: "Ulises Bravo", torneo1: 225, torneo2: 230, torneo3: 228, torneo4: 233, total: 916 },
        { nombre: "Walter Cabrera", torneo1: 220, torneo2: 225, torneo3: 222, torneo4: 228, total: 895 },
        { nombre: "Zacarías Moreno", torneo1: 215, torneo2: 220, torneo3: 218, torneo4: 223, total: 876 },
        { nombre: "Bruno Cáceres", torneo1: 210, torneo2: 215, torneo3: 212, torneo4: 218, total: 855 },
        { nombre: "Damián Quiroz", torneo1: 205, torneo2: 210, torneo3: 208, torneo4: 213, total: 836 },
      ],
      Femenino: [
        { nombre: "Lorena Espinoza", torneo1: 265, torneo2: 270, torneo3: 268, torneo4: 273, total: 1076 },
        { nombre: "Nadia Contreras", torneo1: 255, torneo2: 260, torneo3: 258, torneo4: 263, total: 1036 },
        { nombre: "Paola Ibarra", torneo1: 245, torneo2: 250, torneo3: 248, torneo4: 253, total: 996 },
        { nombre: "Rosa Delgado", torneo1: 235, torneo2: 240, torneo3: 238, torneo4: 243, total: 956 },
        { nombre: "Teresa Molina", torneo1: 225, torneo2: 230, torneo3: 228, torneo4: 233, total: 916 },
        { nombre: "Verónica Luna", torneo1: 220, torneo2: 225, torneo3: 222, torneo4: 228, total: 895 },
        { nombre: "Ximena Ponce", torneo1: 215, torneo2: 220, torneo3: 218, torneo4: 223, total: 876 },
        { nombre: "Yolanda Fuentes", torneo1: 210, torneo2: 215, torneo3: 212, torneo4: 218, total: 855 },
        { nombre: "Adriana Salinas", torneo1: 205, torneo2: 210, torneo3: 208, torneo4: 213, total: 836 },
        { nombre: "Claudia Navarro", torneo1: 200, torneo2: 205, torneo3: 202, torneo4: 208, total: 815 },
      ],
      Escuela: [
        { nombre: "Axel Moreno", torneo1: 210, torneo2: 215, torneo3: 212, torneo4: 218, total: 855 },
        { nombre: "Delfina Castro", torneo1: 205, torneo2: 210, torneo3: 208, torneo4: 213, total: 836 },
        { nombre: "Franco Silva", torneo1: 200, torneo2: 205, torneo3: 202, torneo4: 208, total: 815 },
        { nombre: "Guadalupe Vega", torneo1: 195, torneo2: 200, torneo3: 198, torneo4: 203, total: 796 },
        { nombre: "Joaquín López", torneo1: 190, torneo2: 195, torneo3: 192, torneo4: 198, total: 775 },
        { nombre: "Kiara Ruiz", torneo1: 185, torneo2: 190, torneo3: 188, torneo4: 193, total: 756 },
        { nombre: "Lautaro García", torneo1: 180, torneo2: 185, torneo3: 182, torneo4: 188, total: 735 },
        { nombre: "Milagros Martínez", torneo1: 175, torneo2: 180, torneo3: 178, torneo4: 183, total: 716 },
        { nombre: "Nahuel Fernández", torneo1: 170, torneo2: 175, torneo3: 172, torneo4: 178, total: 695 },
        { nombre: "Olivia Díaz", torneo1: 165, torneo2: 170, torneo3: 168, torneo4: 173, total: 676 },
      ],
    },
    Cazador: {
      Masculino: [
        { nombre: "Ulises Bravo", torneo1: 285, torneo2: 290, torneo3: 288, torneo4: 293, total: 1156 },
        { nombre: "Walter Cabrera", torneo1: 275, torneo2: 280, torneo3: 278, torneo4: 283, total: 1116 },
        { nombre: "Zacarías Moreno", torneo1: 260, torneo2: 265, torneo3: 262, torneo4: 268, total: 1055 },
        { nombre: "Bruno Cáceres", torneo1: 250, torneo2: 255, torneo3: 252, torneo4: 258, total: 1015 },
        { nombre: "Damián Quiroz", torneo1: 240, torneo2: 245, torneo3: 242, torneo4: 248, total: 975 },
        { nombre: "Esteban Herrera", torneo1: 235, torneo2: 240, torneo3: 238, torneo4: 243, total: 956 },
        { nombre: "Fabricio Morales", torneo1: 230, torneo2: 235, torneo3: 232, torneo4: 238, total: 935 },
        { nombre: "Gustavo Castro", torneo1: 225, torneo2: 230, torneo3: 228, torneo4: 233, total: 916 },
        { nombre: "Horacio Silva", torneo1: 220, torneo2: 225, torneo3: 222, torneo4: 228, total: 895 },
        { nombre: "Iván Vega", torneo1: 215, torneo2: 220, torneo3: 218, torneo4: 223, total: 876 },
      ],
      Femenino: [
        { nombre: "Verónica Luna", torneo1: 280, torneo2: 285, torneo3: 282, torneo4: 288, total: 1135 },
        { nombre: "Ximena Ponce", torneo1: 270, torneo2: 275, torneo3: 272, torneo4: 278, total: 1095 },
        { nombre: "Yolanda Fuentes", torneo1: 265, torneo2: 270, torneo3: 268, torneo4: 273, total: 1076 },
        { nombre: "Adriana Salinas", torneo1: 255, torneo2: 260, torneo3: 258, torneo4: 263, total: 1036 },
        { nombre: "Claudia Navarro", torneo1: 245, torneo2: 250, torneo3: 248, torneo4: 253, total: 996 },
        { nombre: "Estela López", torneo1: 240, torneo2: 245, torneo3: 242, torneo4: 248, total: 975 },
        { nombre: "Fernanda Ruiz", torneo1: 235, torneo2: 240, torneo3: 238, torneo4: 243, total: 956 },
        { nombre: "Graciela García", torneo1: 230, torneo2: 235, torneo3: 232, torneo4: 238, total: 935 },
        { nombre: "Hilda Martínez", torneo1: 225, torneo2: 230, torneo3: 228, torneo4: 233, total: 916 },
        { nombre: "Irma Fernández", torneo1: 220, torneo2: 225, torneo3: 222, torneo4: 228, total: 895 },
      ],
      Escuela: [
        { nombre: "Bautista Díaz", torneo1: 220, torneo2: 225, torneo3: 222, torneo4: 228, total: 895 },
        { nombre: "Constanza Torres", torneo1: 215, torneo2: 220, torneo3: 218, torneo4: 223, total: 876 },
        { nombre: "Emir Vargas", torneo1: 210, torneo2: 215, torneo3: 212, torneo4: 218, total: 855 },
        { nombre: "Francesca Guerrero", torneo1: 205, torneo2: 210, torneo3: 208, torneo4: 213, total: 836 },
        { nombre: "Gael Ramos", torneo1: 200, torneo2: 205, torneo3: 202, torneo4: 208, total: 815 },
        { nombre: "Helena Ortega", torneo1: 195, torneo2: 200, torneo3: 198, torneo4: 203, total: 796 },
        { nombre: "Ian Mendoza", torneo1: 190, torneo2: 195, torneo3: 192, torneo4: 198, total: 775 },
        { nombre: "Jazmín Jiménez", torneo1: 185, torneo2: 190, torneo3: 188, torneo4: 193, total: 756 },
        { nombre: "Kai Herrera", torneo1: 180, torneo2: 185, torneo3: 182, torneo4: 188, total: 735 },
        { nombre: "Luna Aguilar", torneo1: 175, torneo2: 180, torneo3: 178, torneo4: 183, total: 716 },
      ],
    },
  }

  // API URL from the original script
  const API_URL =
    "https://corsproxy.io/?https://script.google.com/macros/s/AKfycbwtaLj-UYpMxwRvqAGFQye-4LhpcxlfNeAUdahicwl1uYFfOdbkGQO5s4svY_jd2fmkvw/exec"

  // Function to create table row
  function createTableRow(archer, position) {
    const isTopFour = position <= 4
    const rowClass = isTopFour ? "table-warning" : ""
    const positionBadge = isTopFour
      ? `<span class="badge bg-gold text-dark fw-bold">${position}</span>`
      : `<span class="badge bg-secondary">${position}</span>`

    // Different image sizes for top 4 vs others
    const imageSize = isTopFour ? 80 : 40
    const imageClass = isTopFour ? "me-3 border border-gold border-3" : "me-3"

    return `
      <tr class="${rowClass}">
        <td class="text-center">${positionBadge}</td>
        <td>
          <div class="d-flex align-items-center">
            <img src="/img/alfio.png" class="rounded-circle ${imageClass}" alt="${archer.nombre}" width="${imageSize}" height="${imageSize}">
            <span class="fw-bold">${archer.nombre}</span>
          </div>
        </td>
        <td class="text-center">${archer.torneo1 || "-"}</td>
        <td class="text-center">${archer.torneo2 || "-"}</td>
        <td class="text-center">${archer.torneo3 || "-"}</td>
        <td class="text-center">${archer.torneo4 || "-"}</td>
        <td class="text-center">
          <span class="badge ${isTopFour ? "bg-gold text-dark" : "bg-primary"} fs-6">${archer.total}</span>
        </td>
      </tr>
    `
  }

  // Function to populate table
  function populateTable(tableId, data) {
    const tbody = document.querySelector(`#${tableId} tbody`)

    if (!tbody) return

    tbody.innerHTML = ""

    data.forEach((archer, index) => {
      tbody.innerHTML += createTableRow(archer, index + 1)
    })
  }

  // Function to load ranking data
  async function loadRankingData() {
    const loadingElement = document.getElementById("loading")
    const errorElement = document.getElementById("error-message")

    // Show loading
    loadingElement.style.display = "block"
    errorElement.style.display = "none"

    try {
      const response = await fetch(API_URL)
      const data = await response.json()

      // Hide loading
      loadingElement.style.display = "none"

      // Check if we have valid data
      if (data && typeof data === "object") {
        // Map API data to our categories and subdivisions
        const categories = ["Longbow", "Raso", "Recurvo", "Cazador"]
        const subdivisions = ["Masculino", "Femenino", "Escuela"]

        categories.forEach((category) => {
          subdivisions.forEach((subdivision) => {
            const categoryKey = `${category} ${subdivision}` || `${subdivision} ${category}` || category
            const categoryData = data[categoryKey] || []

            if (categoryData.length > 0) {
              // Sort by total points
              const sortedData = categoryData
                .map((archer) => ({
                  nombre: archer.Nombre || archer.nombre || "Arquero",
                  torneo1: archer["Torneo 1"] || archer.torneo1 || 0,
                  torneo2: archer["Torneo 2"] || archer.torneo2 || 0,
                  torneo3: archer["Torneo 3"] || archer.torneo3 || 0,
                  torneo4: archer["Torneo 4"] || archer.torneo4 || 0,
                  total: archer.Total || archer.total || 0,
                }))
                .sort((a, b) => b.total - a.total)
                .slice(0, 10) // Top 10

              const tableId = `${category.toLowerCase()}-${subdivision.toLowerCase()}-table`
              populateTable(tableId, sortedData)
            } else {
              // Use sample data if no API data available
              const tableId = `${category.toLowerCase()}-${subdivision.toLowerCase()}-table`
              const sampleData = sampleRankingData[category]?.[subdivision] || []
              populateTable(tableId, sampleData)
            }
          })
        })
      } else {
        throw new Error("Invalid data format")
      }
    } catch (error) {
      console.error("Error loading ranking data:", error)

      // Hide loading and show error
      loadingElement.style.display = "none"
      errorElement.style.display = "block"

      // Load sample data as fallback
      Object.keys(sampleRankingData).forEach((category) => {
        Object.keys(sampleRankingData[category]).forEach((subdivision) => {
          const tableId = `${category.toLowerCase()}-${subdivision.toLowerCase()}-table`
          populateTable(tableId, sampleRankingData[category][subdivision])
        })
      })
    }
  }

  // Initialize ranking data
  loadRankingData()


  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: "smooth",
        })

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          document.querySelector(".navbar-toggler").click()
        }
      }
    })
  })

  // Handle nested tab functionality
  document.addEventListener("shown.bs.tab", (e) => {
    // When a main category tab is shown, activate the first subdivision tab
    const targetId = e.target.getAttribute("data-bs-target")
    if (targetId) {
      const categoryName = targetId.replace("#", "")
      const firstSubTab = document.querySelector(`#${categoryName}-masculino-tab`)
      if (firstSubTab) {
        const tab = new bootstrap.Tab(firstSubTab)
        new bootstrap.Tab(firstSubTab).show()
      }
    }
  })
})
