document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('article-form');
    const articleInput = document.getElementById('article-name');
    const contenedorName = document.getElementById('contenedor-name');
    const articlesContainer = document.getElementById('articles-container');
    const generateQrButton = document.getElementById('generate-qr');
    const qrCodeContainer = document.getElementById('qr-code');

    let articles = [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const articleName = articleInput.value.trim();
        if (articleName) {
            articles.push(articleName);
            articleInput.value = '';
            renderArticles();
        }
    });

    generateQrButton.addEventListener('click', () => {
        const username = prompt("Por favor, ingresa tu nombre de usuario:");
        const password = prompt("Por favor, ingresa tu contraseña:");

        if (username && password) {
            almacenarArticulos(contenedorName, articles, username, password);
        } else {
            alert("Usuario y contraseña son requeridos.");
        }
    });

    function renderArticles() {
        articlesContainer.innerHTML = articles.map(article => `<p>${article}</p>`).join('');
    }

    async function almacenarArticulos(contenedorName, articulos, username, password) {
        try {
            const response = await fetch('/api/contenedores', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contenedor: contenedorName, articles: articulos, username: username, password: password }),
            });

            if (!response.ok) {
                throw new Error('Error al almacenar los artículos');
            }

            const data = await response.json();
            const { contenedorId } = data;
            generateQRCode(contenedorId);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function generateQRCode(idContenedor) {
        const data = `http://localhost:3000/container/${idContenedor}`; // Ejemplo de URL
        qrCodeContainer.innerHTML = '';
        const qrCode = new QRCode(qrCodeContainer, {
            text: data,
            width: 250,
            height: 250,
        });
    }
});
