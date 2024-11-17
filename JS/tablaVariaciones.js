function cargarCotizaciones() {
    
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const tabla = document.querySelector('.table table tbody');

    tabla.innerHTML = '';

    const cotizacionesPorMoneda = {}; 
    favoritos.forEach(cotizacion => {
        if (!cotizacionesPorMoneda[cotizacion.nombre]) {
            cotizacionesPorMoneda[cotizacion.nombre] = [];
        }
        cotizacionesPorMoneda[cotizacion.nombre].push(cotizacion);
    });

    for (const nombreMoneda in cotizacionesPorMoneda) {
        let filaMoneda = document.createElement('tr');
        filaMoneda.innerHTML = `<td colspan="5" class="db">${nombreMoneda}</td>`; 
        tabla.appendChild(filaMoneda);
        
        cotizacionesPorMoneda[nombreMoneda].forEach((cotizacion, index) => {
            let filaCotizacion = document.createElement('tr');
            let variacionIcono = '';
            
            if (index > 0) {
                
                const cotizacionAnterior = cotizacionesPorMoneda[nombreMoneda][index - 1];
                
                
                if (parseFloat(cotizacion.compra) > parseFloat(cotizacionAnterior.compra)) {
                    variacionIcono = '<i class="fa-solid fa-arrow-up"></i>'; 
                } else if (parseFloat(cotizacion.compra) < parseFloat(cotizacionAnterior.compra)) {
                    variacionIcono = '<i class="fa-solid fa-arrow-down"></i>'; 
                } else {
                    variacionIcono = '<i class="fa-solid fa-equals"></i>'; 
                }
            }
            
            filaCotizacion.innerHTML = `
            <td></td>
            <td>${cotizacion.fecha}</td>
            <td>${cotizacion.compra}</td>
            <td>${cotizacion.venta}</td>
            <td>${variacionIcono}</td>
            `;
            tabla.appendChild(filaCotizacion); 
        });
    }
}

cargarCotizaciones();