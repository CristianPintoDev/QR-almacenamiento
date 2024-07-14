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
        qrCodeContainer.innerHTML = '';
        const qrCode = new QRCode(qrCodeContainer, {
            text: data,
            width: 250,
            height: 250,
        });
    }
});
