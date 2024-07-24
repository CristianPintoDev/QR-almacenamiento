document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('article-form');
    const articleInput = document.getElementById('article-name');
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
        const qrCodeData = JSON.stringify(articles);
        generateQRCode(qrCodeData);
    });

    function renderArticles() {
        articlesContainer.innerHTML = articles.map(article => `<p>${article}</p>`).join('');
    }

    function generateQRCode(data) {
        // add_bd();
        // crear el qr con el link de la pagina + el id del contendor
        qrCodeContainer.innerHTML = '';
        const qrCode = new QRCode(qrCodeContainer, {
            text: data,
            width: 250,
            height: 250,
        });
    }

    function add_bd(){
        // añadir los articulos a una bd
        // responder el id del contenedor para generar el qr
    }
});
