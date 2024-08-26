
async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to handle exchange rate queries based on user selection
function consultarCotizacion() {
    // Get the selected currency from the dropdown
    const selectedValue = document.getElementById('currencySelector').value;
    // Initialize a variable to store the API endpoint URL
    let url;
    // Determine the API endpoint based on the selected currency
    switch (selectedValue) {
        case 'TODAS':
            url = 'https://dolarapi.com/v1/cotizaciones';
            break;
        case 'oficial':
            url = 'https://dolarapi.com/v1/dolares/oficial';
            break;
        case 'blue':
            url = 'https://dolarapi.com/v1/dolares/blue';
            break;
        case 'bolsa':
            url = 'https://dolarapi.com/v1/dolares/bolsa';
            break;
        case 'contadoconliqui':
            url = 'https://dolarapi.com/v1/dolares/contadoconliqui';
            break;
        case 'tarjeta':
            url = 'https://dolarapi.com/v1/dolares/tarjeta';
            break;
        case 'mayorista':
            url = 'https://dolarapi.com/v1/dolares/mayorista';
            break;
        case 'cripto':
            url = 'https://dolarapi.com/v1/dolares/cripto';
            break;
        case 'eur':
            url = 'https://dolarapi.com/v1/cotizaciones/eur';
            break;
        case 'brl':
            url = 'https://dolarapi.com/v1/cotizaciones/brl';
            break;
        case 'clp':
            url = 'https://dolarapi.com/v1/cotizaciones/clp';
            break;
        case 'uyu':
            url = 'https://dolarapi.com/v1/cotizaciones/uyu';
            break;
        default:
            // Handle the 'TODAS' option or any invalid selection
            console.log("Invalid selection or 'TODAS' selected");
            return; // Exit the function 
    }
    if (url) {
        fetchData(url)
            .then(displayData);
    }
}

// Función para manejar la visualización de datos
function displayData(data) {
    const displayArea = document.getElementById('grilla-cotizaciones');
    if (displayArea) {
        // Limpiar el contenido existente en la grilla
        displayArea.innerHTML = '';

        if (Array.isArray(data)) {
            // Si 'data' es un array (es decir, seleccionaste "TODAS")
            data.forEach(cotizacion => {
                // Mapeo del nombre si es necesario
                const displayName = nombreMapping[cotizacion.nombre] || cotizacion.nombre;
                // Construir HTML para cada cotización y agregarlo a la grilla
                displayArea.innerHTML += `
                    <div class="cotizacion">
                        <h3 class="nombre">${displayName}</h3> 
                        <div class="precio-compra">
                            <span>Compra:</span>
                            <span class="compra">${cotizacion.compra}</span>
                        </div>
                        <div class="precio-venta">
                            <span>Venta:</span>
                            <span class="venta">${cotizacion.venta}</span>
                        </div>
                        <button class="btn" onclick="guardarFavorito('${cotizacion.nombre}', '${cotizacion.compra}', '${cotizacion.venta}')"><i class="fas fa-star fa-custom-size"></i></button>
                    </div>`;
            });
        } else if (data) {
            // Si 'data' es un objeto único
            const displayName = nombreMapping[data.nombre] || data.nombre;
            displayArea.innerHTML += `
                <div class="cotizacion">
                    <h3 class="nombre">${displayName}</h3> 
                    <div class="precio-compra">
                        <span>Compra:</span>
                        <span class="compra">${data.compra}</span>
                    </div>
                    <div class="precio-venta">
                        <span>Venta:</span>
                        <span class="venta">${data.venta}</span>
                    </div>
                    <button class="btn" onclick="guardarFavorito('${data.nombre}', '${data.compra}', '${data.venta}')"><i class="fas fa-star fa-custom-size"></i></button>
                </div>`;
        } else {
            // Manejo de errores
            displayArea.innerHTML = 'Error fetching data';
        }
    } else {
        console.error("Element with ID 'grilla-cotizaciones' not found.");
    }
}

document.getElementById('buscar').addEventListener('click', consultarCotizacion);
