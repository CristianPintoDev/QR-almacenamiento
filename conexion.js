const express = require('express');
const cors = require('cors'); // Importa el middleware cors
const multer = require('multer');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
const port = 3000;

// Configurar Multer para manejar la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Aplica el middleware cors a todas las solicitudes
app.use(cors());

const con = mysql.createConnection({
    host: "mysql-pruebas.cdgq62eu4xqf.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "faxo123987",
    database: "qr"
});

// Conectar a la base de datos
con.connect((err) => {
    if (err) throw err;
    console.log("la conexion funciona");
});

// Ruta para manejar la carga de archivos
app.post('/almacenar', upload.single('archivo'), (req, res) => {
    // Verificar si se ha enviado un archivo
    if (!req.file) {
        res.status(400).send('Por favor, selecciona un archivo para cargar.');
        return;
    }

    // Leer el archivo cargado
    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            res.status(500).send('Error al leer el archivo.');
            return;
        }

        // Guardar el archivo en la base de datos
        con.query('INSERT INTO img (imagen) VALUES (?)', [data], (err, results) => {
            if (err) {
                res.status(500).send('Error al guardar el archivo en la base de datos.');
                return;
            }

            res.send('El archivo se ha cargado y guardado correctamente.');
        });
    });
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor Node.js ejecutándose en http://localhost:${port}`);
});
