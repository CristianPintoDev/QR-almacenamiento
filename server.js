const express = require('express');
const path = require('path');
const app = express();
const connection = require('./db'); // Asegúrate de tener el archivo db.js configurado

// Configurar el puerto
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para insertar contenedor y artículos
app.post('/api/contenedores', (req, res) => {
  const { contenedor, articles, username, password } = req.body;
  console.log(contenedor)

  if (!contenedor || !articles || articles.length === 0) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

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

app.get('/container/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'container.html'));
});

app.get('/api/contenedores/:id', (req, res) => {

  const contenedorId = req.params.id;

  connection.query(
    'SELECT name FROM contenedores WHERE id = ?',
    [contenedorId],
    (error, contenedorResults) => {

      if (contenedorResults.length === 0) {
        return res.status(404).json({ error: "Contenedor no encontrado" });
      }

      if(error){
        return res.status(500).json({error:"error contenedor"});
      }

      connection.query(
        'SELECT name FROM articulos WHERE cont_id = ?',
        [contenedorId],
        (error, articulosResults) => {

          if(error){
            return res.status(500).json({error:"error articulos"});
          }

          res.json({
            
            contenedor: contenedorResults[0],
            articulos: articulosResults
          });

        }
      );

    }
  );

});


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
