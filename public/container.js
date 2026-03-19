document.addEventListener("DOMContentLoaded", () => {

    // 🔥 Obtener ID desde la URL
    const urlParts = window.location.pathname.split("/").filter(p => p);
    const contenedorId = urlParts[urlParts.length - 1];

    async function cargarContenedor(){

        console.log("ID:", contenedorId);

        const response = await fetch(`/api/contenedores/${contenedorId}`);
        const data = await response.json();

        console.log("DATA:", data);

        if (!data.contenedor) {
            document.body.innerHTML = "Contenedor no encontrado";
            return;
        }

        document.getElementById("contenedor-name").textContent =
            "Contenedor: " + data.contenedor.name;

        const lista = document.getElementById("articles-list");

        lista.innerHTML = data.articulos
            .map(a => `<li>${a.name}</li>`)
            .join("");
    }

    cargarContenedor();

});