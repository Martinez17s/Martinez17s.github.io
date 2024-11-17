// Function to fetch the API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


function consultarCotizacion() {
    
    const selectedValue = document.getElementById('currencySelector').value;
    
    let url;
    
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
            console.log("Invalid selection or 'TODAS' selected");
            return; 
    }
    if (url) {
        fetchData(url)
            .then(displayData);
    }
}


function displayData(data) {
    const displayArea = document.getElementById('grilla-cotizaciones');
    if (displayArea) {
    
        displayArea.innerHTML = '';

        if (Array.isArray(data)) {
            
            data.forEach(cotizacion => {
                
                const displayName = nombreMapping[cotizacion.nombre] || cotizacion.nombre;
                
                displayArea.innerHTML += `
                    <div class="cotizacion">
                        <h3 class="nombre">${cotizacion.nombre}</h3> 
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
            
            const displayName = nombreMapping[data.nombre] || data.nombre;
            displayArea.innerHTML += `
                <div class="cotizacion">
                    <h3 class="nombre">${data.nombre}</h3> 
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
            
            displayArea.innerHTML = 'Error fetching data';
        }
    } else {
        console.error("Element with ID 'grilla-cotizaciones' not found.");
    }
}

document.getElementById('buscar').addEventListener('click', consultarCotizacion);
