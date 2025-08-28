// Function to fetch and parse the Google Sheets data
async function fetchRankingData() {
    const SHEET_ID_PROD = '2PACX-1vSmel6U0j_8HOMCL6xSdaG9tHLZbSs3upjemF8YeGKP3sWp_uCEWkhS16_97nbjB32sQMY-BFSeE51m';
    const SHEET_ID_DEV = '2PACX-1vQQ4rf-zyDnlqtwtbPYe9nXDzZpG-Wr7-xDCYqjDQyaxCxliKd_6CRp4VeIGVsCqcLdBvm7FBtHk1ck';
    const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID_DEV}/pub?output=csv`;
    try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        
        console.log("CSV content:", csvText.substring(0, 500));
        
        // Parse CSV data
        const lines = csvText.split('\n');
        const structuredData = {};
        
        // Skip header row (first line)
        for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;
            
            // Split by comma and handle quoted values
            const values = lines[i].split(',').map(v => v.replace(/"/g, '').trim());
            
            if (values.length < 5) continue; // Skip rows with insufficient data
            
            const categoria = values[2] || '';
            const division = values[3] || '';
            
            if (!categoria || !division) continue; // Skip rows without category/division
            
            console.log("Processing:", categoria, division);
            
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
                Nombre: values[0] || '',
                Club: values[1] || '',
                Localidad: values[4] || '',
                'Fecha 1': parseInt(values[5]) || 0,
                'Fecha 2': parseInt(values[6]) || 0,
                'Fecha 3': parseInt(values[7]) || 0,
                'Fecha 4': parseInt(values[8]) || 0,
                Total: parseInt(values[9]) || 0
            };
            
            // Only add archer if they have a name
            if (archer.Nombre) {
                structuredData[categoria][division].push(archer);
            }
        }
        
        console.log("structuredData", structuredData);
        
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

// Function to get the top 2 tournaments for a specific archer
function getArcherTopTournaments(archer) {
    const tournamentScores = {
        'Fecha 1': archer['Fecha 1'] || 0,
        'Fecha 2': archer['Fecha 2'] || 0,
        'Fecha 3': archer['Fecha 3'] || 0,
        'Fecha 4': archer['Fecha 4'] || 0
    };
    
    // Sort tournaments by score and get the top 2
    const sortedTournaments = Object.entries(tournamentScores)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 2)
        .map(([tournament]) => tournament);

    return sortedTournaments;
}

// WIP Helper function to generate image path from archer name
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

    // Hide loading container
    const loadingContainer = document.getElementById('loading-container');
    if (loadingContainer) {
        loadingContainer.style.display = 'none';
    }

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
                                            <th>Localidad</th>
                                            <th>Torneo Zorro</th>
                                            <th>Torneo Liebre</th>
                                            <th>Torneo Pecarí</th>
                                            <th>Torneo Ciervo</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${archers.map((archer, position) => {
                                            const archerTopTournaments = getArcherTopTournaments(archer);
                                            return `
                                            <tr class="${position < 4 ? 'top-archer' : ''}">
                                                <td><span class="badge ${position < 4 ? 'bg-gold' : 'text-black'}">${position + 1}</span></td>
                                                <td><b>${archer.Nombre}</b></td>
                                                <td>${archer.Club}</td>
                                                <td>${archer.Localidad}</td>
                                                <td>${archerTopTournaments.includes('Fecha 1') ? `<strong>${archer['Fecha 1'] || '-'}</strong>` : (archer['Fecha 1'] || '-')}</td>
                                                <td>${archerTopTournaments.includes('Fecha 2') ? `<strong>${archer['Fecha 2'] || '-'}</strong>` : (archer['Fecha 2'] || '-')}</td>
                                                <td>${archerTopTournaments.includes('Fecha 3') ? `<strong>${archer['Fecha 3'] || '-'}</strong>` : (archer['Fecha 3'] || '-')}</td>
                                                <td>${archerTopTournaments.includes('Fecha 4') ? `<strong>${archer['Fecha 4'] || '-'}</strong>` : (archer['Fecha 4'] || '-')}</td>
                                                <td><strong>${archer.Total}</strong></td>
                                            </tr>
                                        `}).join('')}
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
    try {
        const data = await fetchRankingData();
        displayRankingTable(data);
    } catch (error) {
        console.error('Error loading ranking data:', error);
        // Show error message if loading fails
        const container = document.getElementById('ranking-container');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    Error al cargar las clasificaciones. Por favor, intenta de nuevo más tarde.
                </div>
            `;
        }
    }
});