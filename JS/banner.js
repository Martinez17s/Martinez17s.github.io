const banners = document.querySelectorAll('.comment.banner'); 
let bannerActual = 0;
function cambiarBanner() {
    banners[bannerActual].style.display = 'none'; //esconde la linea actual
    bannerActual = (bannerActual + 1) % banners.length; //pasa al siguiente banner
    banners[bannerActual].style.display = 'block'; //queda el banner 1 en pantalla
}
// Llama a cambiarBanner una vez al cargar la página
cambiarBanner(); 

setInterval(cambiarBanner, 5000);  //c/5 segundos cambia el banner con comments
// Selecciona los comentarios que son banners
