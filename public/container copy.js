const urlParts = window.location.pathname.split("/");
const contenedorId = urlParts[urlParts.length - 1];
const data = await response.json();


async function cargarContenedor(){

    const response = await fetch(`/api/contenedores/${contenedorId}`);

    const data = await response.json();

    document.getElementById("contenedor-name").textContent =
        "Contenedor: " + data.contenedor.name;

    const lista = document.getElementById("articles-list");

    lista.innerHTML = data.articulos
        .map(a => `<li>${a.name}</li>`)
        .join("");

    
    console.log("DATA:", data); 
}

cargarContenedor();