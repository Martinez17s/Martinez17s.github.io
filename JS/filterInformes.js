function getSavedCurrencies() {
    const favoriteQuotes = JSON.parse(localStorage.getItem('favoritos')) || [];
    const savedCurrencies = favoriteQuotes.map(quote => quote.nombre); 
    return savedCurrencies;
}

function filterAndDisplay() {
    const selectedCurrency = document.getElementById('currencySelector').value;
    const savedCurrencies = getSavedCurrencies();
    const displayArea = document.querySelector('.table table tbody'); 
    displayArea.innerHTML = ''; 

    if (selectedCurrency === 'TODAS') {
        
        const uniqueCurrencies = [...new Set(savedCurrencies)]; 
        uniqueCurrencies.forEach(currency => {
            displayCurrencyData(currency);
        });
    } else if (savedCurrencies.includes(selectedCurrency)) {
        
        displayCurrencyData(selectedCurrency);
    } else {
        
        displayArea.innerHTML = "<p>Esta moneda no está en tus favoritos.</p>";
    }
}

function displayCurrencyData(currency) {
    const displayArea = document.querySelector('.table table tbody'); 
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const filteredQuotes = favoritos.filter(quote => quote.nombre === currency);
    
    let filaMoneda = document.createElement('tr');
    filaMoneda.innerHTML = `<td colspan="5" class="db">${currency}</td>`;
    displayArea.appendChild(filaMoneda); 
    filteredQuotes.forEach((cotizacion, index) => {
        let variacionIcono = '';
        if (index > 0) {
            const cotizacionAnterior = filteredQuotes[index - 1];
            if (parseFloat(cotizacion.compra) > parseFloat(cotizacionAnterior.compra)) {
                variacionIcono = '<i class="fa-solid fa-arrow-up"></i>';
            } else if (parseFloat(cotizacion.compra) < parseFloat(cotizacionAnterior.compra)) {
                variacionIcono = '<i class="fa-solid fa-arrow-down"></i>';
            } else {
                variacionIcono = '<i class="fa-solid fa-equals"></i>';
            }
        }
        
        let filaCotizacion = document.createElement('tr');
        filaCotizacion.innerHTML = `
            <td></td>
            <td>${cotizacion.fecha}</td>
            <td>${cotizacion.compra}</td>
            <td>${cotizacion.venta}</td>
            <td>${variacionIcono}</td>
        `;
        displayArea.appendChild(filaCotizacion); 
    });
}

document.getElementById('buscar').addEventListener('click', filterAndDisplay);
