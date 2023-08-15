//abre el manu hamburguesa
function cambiarClaseMenu(){
    let siteNav = document.getElementById("site__nav");
        siteNav.classList.toggle("site__navAbrir");
        // hace el efecto de hamurguesa a cruz
    let menuAbierto = document.getElementById("menu-toggle");
        menuAbierto.classList.toggle("menu-abierto");
    }

