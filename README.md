# QR Almacenamiento

Pequeña aplicación web para crear contenedores con artículos y generar un código QR para consultarlos.

---

## Descripción

Permite:

* Crear un contenedor
* Agregar artículos
* Generar un QR con un enlace al contenedor
* Ver los artículos desde una URL

---

## Tecnologías

* Node.js + Express
* MySQL
* HTML, CSS, JavaScript

---

## Instalación

```bash
npm install
```

Crear archivo `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=qr_storage
```

Ejecutar base de datos con `database.sql`

---

## Uso

```bash
npm start
```

Abrir:

```
http://localhost:3000
```

---

## Endpoints

* `POST /api/contenedores`
* `GET /api/contenedores/:id`

---

## Autor

Cristian Pinto Estay


## License

This project is licensed under the MIT License.