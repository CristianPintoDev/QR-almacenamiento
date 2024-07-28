const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./db'); // Asegúrate de tener el archivo db.js configurado

// Configurar el puerto
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para insertar contenedor y artículos
app.post('/api/contenedores', (req, res) => {
  const { contenedor, articles, username, password } = req.body;
  console.log(contenedor)
  // Primero, insertar el usuario
  connection.query('INSERT INTO usuarios (name, clave) VALUES (?, ?)',[username, password], (error, results) => {
    if (error) {
      console.error('Error al insertar el usuario:', error);
      return res.status(500).json({ error: 'Error al insertar el usuario' });
    }

    const usuarioId = results.insertId;
    console.log(contenedor)
    
    // Luego, insertar los artículos con el ID del contenedor
    connection.query('INSERT INTO contenedores (name, user_id) VALUES (?, ?)',[contenedor, usuarioId], (error, results) => {
      if (error) {
        console.error('Error al insertar el contenedor:', error);
        return res.status(500).json({ error: 'Error al insertar el contenedor' });
      }

      const contenedorId = results.insertId;

      
      // Luego, insertar los artículos con el ID del contenedor
      const articleQueries = articles.map(articleName => {
        return new Promise((resolve, reject) => {
          connection.query('INSERT INTO articulos (name, cont_id) VALUES (?, ?)', [articleName, contenedorId], (error, results) => {
            if (error) {
              return reject(error);
            }
            resolve(results.insertId);
          });
        });
      });

      Promise.all(articleQueries)
        .then(articleIds => {
          res.json({ contenedorId, articleIds });
        })
        .catch(error => {
          console.error('Error al insertar artículos:', error);
          res.status(500).json({ error: 'Error al insertar artículos' });
        });
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
