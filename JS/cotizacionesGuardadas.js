// Retrieve favorite quotes from local storage or initialize an empty array
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];


// Function to load favorite quotes
function cargarCotizacionesFavoritas() {
    // Get the table body element
    const tbody = document.querySelector('#tabla-cotizaciones tbody'); // Obtenemos el cuerpo de la tabla
    // Initialize a variable to store the HTML for the table rows
    let htmlFilas = '';
    // Iterate over each favorite quote
    favoritos.forEach((cotizacion, index) => {
        // Build the HTML for the table row for the current quote
        htmlFilas += `
            <tr>
                <td>${cotizacion.fecha}</td> 
                <td>${cotizacion.nombre}</td>
                <td>${cotizacion.compra}</td>
                <td>${cotizacion.venta}</td>
                <td><button class="btn" onclick="eliminarFavorito(${index})"><i class="fa-solid fa-eraser fa-custom-size"></i></button></td>
            </tr>
        `;
    });
    tbody.innerHTML = htmlFilas; // Insertamos las filas en la tabla
}

// Function to delete a favorite quote by its index
function eliminarFavorito(index) {
    // Check if the index is within bounds
    if (index !== -1 && index < favoritos.length) {
        favoritos.splice(index, 1); // Eliminar la cotización del array
        localStorage.setItem('favoritos', JSON.stringify(favoritos)); // Actualizar el localStorage
        cargarCotizacionesFavoritas(); // Actualizar la tabla
        alert('Cotización eliminada de favoritos!');
    }
}

// Function to print a specific section of the page
function imprimirRecuadro() {
    // Get the content of the element to be printed
    var contenido = document.getElementById('imprimir').innerHTML;
    // Store the original content of the body
    var contenidoOriginal = document.body.innerHTML;
    // Replace the body content with the content to be printed
    document.body.innerHTML = contenido;
    // Print the current window content
    window.print();
    // Restore the original body content
    document.body.innerHTML = contenidoOriginal;
}

// Llamamos a la función para cargar las cotizaciones al cargar la página
cargarCotizacionesFavoritas();