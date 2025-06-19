// Function to fetch and parse the Google Sheets data
async function fetchRankingData() {
    const SHEET_ID = '2PACX-1vSmel6U0j_8HOMCL6xSdaG9tHLZbSs3upjemF8yeGKP3sWp_uCEWkhS16_97nbjB32sQMY-BFSeE51m';
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pubhtml`;
    
    try {
        const response = await fetch(SHEET_URL);
        const htmlText = await response.text();
        
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        
        const table = doc.querySelector('table');
        if (!table) {
            throw new Error('No table found in the Google Sheet');
        }

        // Skip header rows
        let rows = Array.from(table.querySelectorAll('tr')).slice(1);
        rows.shift();
        
        // Create the structured data object
        const structuredData = {};
        
        rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('td'));
            const categoria = cells[2]?.textContent.trim() || '';
            const division = cells[3]?.textContent.trim() || '';
            console.log("division", division)
            // Create category if it doesn't exist
            if (!structuredData[categoria]) {
                structuredData[categoria] = {};
            }
            
            // Create division if it doesn't exist
            if (!structuredData[categoria][division]) {
                structuredData[categoria][division] = [];
            }
            
            // Create archer object 
            const archer = {
                Nombre: cells[0]?.textContent.trim() || '',
                Club: cells[1]?.textContent.trim() || '',
                'Fecha 1': parseInt(cells[4]?.textContent) || 0,
                'Fecha 2': parseInt(cells[5]?.textContent) || 0,
                'Fecha 3': parseInt(cells[6]?.textContent) || 0,
                'Fecha 4': parseInt(cells[7]?.textContent) || 0,
                Total: parseInt(cells[8]?.textContent) || 0
            };
            
            structuredData[categoria][division].push(archer);
        });
        console.log("structuredData", structuredData)
        // Sort archers by total score within each division
        Object.keys(structuredData).forEach(categoria => {
            Object.keys(structuredData[categoria]).forEach(division => {
                structuredData[categoria][division].sort((a, b) => b.Total - a.Total);
            });
        });
        
        return structuredData;
    } catch (error) {
        console.error('Error fetching ranking data:', error);
        return {};
    }
}

// Helper function to generate image path from archer name
function getArcherImagePath(archerName) {
  return `/img/archers/alfioperino.jpg` // COMING SOON.. TO BE RELEASED
    return `/img/archers/${archerName
        .toLowerCase()
        .replace(/\s+/g, '')
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")}.jpg`;
}

function displayRankingTable(data) {
    const container = document.getElementById('ranking-container');
    if (!container) return;

    // Create tabs for categories
    const categories = Object.keys(data);
    
    // Create the tabs HTML
    const tabsHtml = `
        <ul class="ranking nav nav-pills nav-fill mb-4" id="rankingTabs" role="tablist">
            ${categories.map((category, index) => `
                <li class="nav-item" role="presentation">
                    <button class="nav-link ranking-tab ${index === 0 ? 'active' : ''}"
                            id="tab-${category}"
                            data-bs-toggle="pill"
                            data-bs-target="#content-${category}"
                            type="button"
                            role="tab"
                            aria-controls="content-${category}"
                            aria-selected="${index === 0 ? 'true' : 'false'}">
                        ${category}
                    </button>
                </li>
            `).join('')}
        </ul>
    `;

    // Create content for each category
    const contentHtml = `
        <div class="tab-content" id="rankingTabsContent">
            ${categories.map((category, index) => `
                <div class="tab-pane ${index === 0 ? 'show active' : ''}"
                     id="content-${category}"
                     role="tabpanel"
                     aria-labelledby="tab-${category}">
                    ${Object.entries(data[category]).map(([division, archers]) => `
                        <div class="division-section mb-5">
                            <h3 class="division-title mb-4">${division}</h3>
                            <div class="table-responsive">
                                <table class="table table-hover">
                                    <thead class="table-dark">
                                        <tr>
                                            <th>Puesto</th>
                                            <th>Nombre</th>
                                            <th>Club</th>
                                            <th>Torneo Zorro</th>
                                            <th>Torneo Liebre</th>
                                            <th>Torneo Pecarí</th>
                                            <th>Torneo Ciervo</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${archers.map((archer, position) => `
                                            <tr class="${position < 4 ? 'top-archer' : ''}">
                                                <td><span class="badge ${position < 4 ? 'bg-gold' : 'text-black'}">${position + 1}</span></td>
                                                <td><b>${archer.Nombre}</b></td>
                                                <td>${archer.Club}</td>
                                                <td>${archer['Fecha 1'] || '-'}</td>
                                                <td>${archer['Fecha 2'] || '-'}</td>
                                                <td>${archer['Fecha 3'] || '-'}</td>
                                                <td>${archer['Fecha 4'] || '-'}</td>
                                                <td><strong>${archer.Total}</strong></td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
        </div>
    `;

    // Update the container
    container.innerHTML = `
        <div class="ranking-wrapper">
            ${tabsHtml}
            ${contentHtml}
        </div>
    `;

    // Add event listeners for tab switching
    const tabTriggerList = container.querySelectorAll('button[data-bs-toggle="pill"]');
    tabTriggerList.forEach(tabTriggerEl => {
        tabTriggerEl.addEventListener('click', event => {
            const targetId = event.target.getAttribute('data-bs-target');
            
            // Remove active classes from all tabs
            container.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            
            // Add active classes to selected tab
            const targetPane = container.querySelector(targetId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    });
}

// Keep the same CSS as before
const style = document.createElement('style');
style.textContent = `
    .archer-image {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 50%;
    }

    .top-archer {
        background-color: rgba(255, 215, 0, 0.1) !important;
    }

    .top-archer .archer-image {
        width: 80px;
        height: 80px;
        border: 2px solid gold;
    }

    .nav-tabs .nav-link {
        color: #333;
        font-weight: 500;
    }

    .nav-tabs .nav-link.active {
        font-weight: 700;
    }

  

    @media (max-width: 768px) {
        .table-responsive {
            margin: 0 -15px;
        }
        
        .archer-image {
            width: 40px;
            height: 40px;
        }

        .top-archer .archer-image {
            width: 50px;
            height: 50px;
        }
    }
`;
document.head.appendChild(style);

// Initialize the ranking table
document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchRankingData();
    displayRankingTable(data);
});