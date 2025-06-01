// Function to fetch and parse the Google Sheets data
async function fetchRankingData() {
    const SHEET_ID = '2PACX-1vSmel6U0j_8HOMCL6xSdaG9tHLZbSs3upjemF8yeGKP3sWp_uCEWkhS16_97nbjB32sQMY-BFSeE51m';
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pubhtml`;
    
    try {
        const response = await fetch(SHEET_URL);
        const htmlText = await response.text();
        
        // Create a temporary element to parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        // Find the table in the document
        const table = doc.querySelector('table');
        if (!table) {
            throw new Error('No table found in the Google Sheet');
        }
        // Convert table rows to array of objects
        let rows = Array.from(table.querySelectorAll('tr')).slice(1); // Skip header row
        rows.shift()
        return rows.map(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            console.log("===========22", row)
            return {
                nombre: cells[0]?.textContent.trim() || '',
                club: cells[1]?.textContent.trim() || '',
                categoria: cells[2]?.textContent.trim() || '',
                division: cells[3]?.textContent.trim() || '',
                torneo1: parseInt(cells[4]?.textContent) || 0,
                torneo2: parseInt(cells[5]?.textContent) || 0,
                torneo3: parseInt(cells[6]?.textContent) || 0,
                torneo4: parseInt(cells[7]?.textContent) || 0,
                total: parseInt(cells[8]?.textContent) || 0
            };
        });
    } catch (error) {
        console.error('Error fetching ranking data:', error);
        return [];
    }
}

function getArcherImage(archer) {
  const imagen = archer.replace( /\s/g, '') || '';
  const defaultImage = '../img/archers/archer.jpg'; // Handle empty image
  return '' // COMING SOON.. TO BE RELEASED
  return `<img 
      src="../img/archers/${imagen}.jpg" 
      alt="${imagen}" 
      class="img-fluid rounded-circle ranking-img" 
      onerror="this.onerror=null; this.src='${defaultImage}';" 
  >`;
}
function capitalizeName(name) {
  if (!name) { // Handle empty or null input
    return '';
  }

  // Convert the entire string to lowercase first,
  // then split it into words
  const words = name.toLowerCase().split(' ');

  // Capitalize the first letter of each word
  const capitalizedWords = words.map(word => {
    if (word.length === 0) { // Handle potential extra spaces
      return '';
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back together
  return capitalizedWords.join(' ');
}

// Function to create and display the ranking table
function displayRankingTable(data) {
    const container = document.getElementById('ranking-container');
    if (!container) return;

    // Group data by category and division
    const groupedData = data.reduce((acc, item) => {
        const key = `${item.categoria}-${item.division}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});

    // Create tabs for categories
    const categories = [...new Set(data.map(item => item.categoria))];
    const tabsHtml = `
        <ul class="nav nav-pills mb-4 justify-content-center" role="tablist">
            ${categories.map((cat, index) => `
                <li class="nav-item" role="presentation">
                    <button class="nav-link ${index === 0 ? 'active' : ''}" 
                            id="tab-${cat}" 
                            data-bs-toggle="pill" 
                            data-bs-target="#content-${cat}" 
                            type="button" 
                            role="tab">${cat.toUpperCase()}</button>
                </li>
            `).join('')}
        </ul>
    `;

    // Create content for each category
    const contentHtml = `
        <div class="tab-content">
            ${categories.map((cat, index) => `
                <div class="tab-pane fade ${index === 0 ? 'show active' : ''}" 
                     id="content-${cat}" 
                     role="tabpanel">
                    ${Object.entries(groupedData)
                        .filter(([key]) => key.startsWith(cat))
                        .map(([key, items]) => `
                            <div class="table-responsive mb-4">
                                <h4 class="mb-3">${key.split('-')[1].toUpperCase()}</h4>
                                <table class="table table-hover">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Posición</th>
                                            <th>Nombre</th>
                                            <th>Club</th>
                                            <th>Torneo 1</th>
                                            <th>Torneo 2</th>
                                            <th>Torneo 3</th>
                                            <th>Torneo 4</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${items
                                            .sort((a, b) => b.total - a.total)
                                            .map((item, pos) => `
                                                <tr class="${pos < 4 ? 'table-warning' : ''}">
                                                    <td><span class="badge bg-gold">${pos + 1}º</span></td>
                                                    <td class="${pos < 4 ? 'ranking-img-xl' : ''}">${getArcherImage(item.nombre)} ${capitalizeName(item.nombre)}</td>
                                                    <td>${item.club}</td>
                                                    <td>${item.torneo1 || '-'}</td>
                                                    <td>${item.torneo2 || '-'}</td>
                                                    <td>${item.torneo3 || '-'}</td>
                                                    <td>${item.torneo4 || '-'}</td>
                                                    <td><strong>${item.total || '-'}</strong></td>
                                                </tr>
                                            `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `).join('')}
                </div>
            `).join('')}
        </div>
    `;

    // Update the container
    container.innerHTML = `
        <div class="ranking">
            ${tabsHtml}
            ${contentHtml}
        </div>
    `;
}

// Initialize the ranking table
document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchRankingData();
    console.log("data",data);
    displayRankingTable(data);
});
