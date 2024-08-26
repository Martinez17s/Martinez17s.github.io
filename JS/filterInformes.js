// Function to get saved currencies from local storage
function getSavedCurrencies() {
    const favoriteQuotes = JSON.parse(localStorage.getItem('favoritos')) || [];// Get favorite quotes from local storage or initialize as empty array
    const savedCurrencies = favoriteQuotes.map(quote => quote.nombre); // Extract currency names from favorite quotes
    return savedCurrencies;// Return an array of saved currency names
}

// Function to filter and display currency data based on selection
function filterAndDisplay() {
    const selectedCurrency = document.getElementById('currencySelector').value;// Get the selected currency from the dropdown
    const savedCurrencies = getSavedCurrencies();// Get the list of saved currencies
    const displayArea = document.querySelector('.table table tbody'); // Get the table body element for displaying data
    displayArea.innerHTML = ''; // Clear the existing table data

    if (selectedCurrency === 'TODAS') {
        // Display all favorite currencies, but only once each
        const uniqueCurrencies = [...new Set(savedCurrencies)]; // Remove duplicates
        uniqueCurrencies.forEach(currency => {
            displayCurrencyData(currency);
        });
    } else if (savedCurrencies.includes(selectedCurrency)) {
        // Display only the selected favorite currency
        displayCurrencyData(selectedCurrency);// Display data for the selected currency
    } else {
        // Handle the case where the selected currency is not a favorite
        displayArea.innerHTML = "<p>Esta moneda no está en tus favoritos.</p>";
    }
}
// Function to display currency data in the table
function displayCurrencyData(currency) {
    const displayArea = document.querySelector('.table table tbody'); // Get the table body element for displaying data
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];// Get favorite quotes from local storage or initialize as empty array
    // Filter favorites to get quotes for the selected currency
    const filteredQuotes = favoritos.filter(quote => quote.nombre === currency);
    // Create a row for the currency name (spanning all columns)
    let filaMoneda = document.createElement('tr');
    filaMoneda.innerHTML = `<td colspan="5" class="db">${currency}</td>`;// Set the HTML content of the row with the currency name
    displayArea.appendChild(filaMoneda); // Append the currency name row to the table body
    filteredQuotes.forEach((cotizacion, index) => {
        let variacionIcono = '';// Initialize the variation icon variable
        if (index > 0) {
            // Calculate the variation icon based on the previous quote
            const cotizacionAnterior = filteredQuotes[index - 1];
            if (parseFloat(cotizacion.compra) > parseFloat(cotizacionAnterior.compra)) {
                variacionIcono = '<i class="fa-solid fa-arrow-up"></i>';
            } else if (parseFloat(cotizacion.compra) < parseFloat(cotizacionAnterior.compra)) {
                variacionIcono = '<i class="fa-solid fa-arrow-down"></i>';
            } else {
                variacionIcono = '<i class="fa-solid fa-equals"></i>';
            }
        }
        // Create a new row for each quote
        let filaCotizacion = document.createElement('tr');
        filaCotizacion.innerHTML = `
            <td></td>
            <td>${cotizacion.fecha}</td>
            <td>${cotizacion.compra}</td>
            <td>${cotizacion.venta}</td>
            <td>${variacionIcono}</td>
        `;
        displayArea.appendChild(filaCotizacion); // Append the quote row to the table body
    });
}
// Event listener for the 'buscar' (search) button to trigger filtering and display
document.getElementById('buscar').addEventListener('click', filterAndDisplay);
