
const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];


function cargarCotizacionesFavoritas() {
    
    const tbody = document.querySelector('#tabla-cotizaciones tbody'); 
    
    let htmlFilas = '';
    
    favoritos.forEach((cotizacion, index) => {
        
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
    tbody.innerHTML = htmlFilas;
}


function eliminarFavorito(index) {
    
    if (index !== -1 && index < favoritos.length) {
        favoritos.splice(index, 1); 
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        cargarCotizacionesFavoritas();
        alert('Cotización eliminada de favoritos!');
    }
}


function imprimirRecuadro() {
    
    var contenido = document.getElementById('imprimir').innerHTML;
    
    var contenidoOriginal = document.body.innerHTML;
    
    document.body.innerHTML = contenido;
    
    window.print();
    
    document.body.innerHTML = contenidoOriginal;
}


cargarCotizacionesFavoritas();