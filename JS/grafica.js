const url = 'https://api.argentinadatos.com/v1/cotizaciones/dolares';


const etiquetas = []; 
const datosBlue = []; 
const datosMayorista = []; 
const datosOficial = [];

async function obtenerCotizaciones() {
    try { 
        const respuesta = await fetch(url); 
        
        if (respuesta.status === 200) {
            const datos = await respuesta.json(); 
           
            datos.forEach(cotizacion => { 
                const fecha = cotizacion.fecha;

                if (!etiquetas.includes(fecha)) { 
                    etiquetas.push(fecha);
                }
                
                if (cotizacion.casa == 'blue') {
                    datosBlue.push(cotizacion.compra);
                } else if (cotizacion.casa == 'mayorista') {
                    datosMayorista.push(cotizacion.compra);
                } else if (cotizacion.casa == 'oficial') {
                    datosOficial.push(cotizacion.compra);
                }
            });

            
            const ctx = document.getElementById("miGrafica").getContext("2d");
            
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: etiquetas, 
                    datasets: [
                        {
                            label: 'Dólar Blue', 
                            data: datosBlue, 
                            borderColor: "rgba(255, 99, 132, 1)", 
                            backgroundColor: 'rgba(255, 99, 132, 0.2)', 
                            borderWidth: 1, 
                            fill: false 
                        },
                        {
                            label: 'Dólar Mayorista', 
                            data: datosMayorista, 
                            borderColor: "rgba(54, 162, 235, 1)", 
                            backgroundColor: 'rgba(54, 162, 235, 0.2)', 
                            borderWidth: 1, 
                            fill: false 
                        },
                        {
                            label: 'Dólar Oficial', 
                            data: datosOficial, 
                            borderColor: "rgba(75, 192, 192, 1)", 
                            backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                            borderWidth: 1, 
                            fill: false 
                        }
                    ]
                }
            });
            
        } else {
            console.error(`Error al obtener cotización del dólar`); 
        }
    } catch (error) {
        console.error("Error fetching or processing data:", error); 
    }
}

obtenerCotizaciones();
