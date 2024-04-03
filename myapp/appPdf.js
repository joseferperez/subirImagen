const express = require('express');
const cors = require('cors'); // se utiliza para politicas de seguridad cuando el servidor y la aplicacion corren sobre la misma maquina
const app = express();
const port = 3001;
const multer = require('multer');
const path = require('path');


// Habilita CORS para todas las solicitudes
app.use(cors());

const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'db_personas',
  password: 'postgres',
  port: 5432, // Puerto predeterminado de PostgreSQL
});

// Asegúrate de incluir esta línea antes de definir tus rutas
app.use(express.json());

// Función para probar la conexión
async function probarConexion() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log(res.rows);
  } catch (error) {
    console.error(error);
  } finally {
    client.release(); // Importante: siempre libera el cliente
  }
}

probarConexion();

///////////////////
// llamada carga de archivo pdf
//////////////////

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'home/') // Asegúrate de que este directorio exista
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.pdf')
  }
});
const upload = multer({ storage: storage });

/*
app.post('/api/upload', upload.single('file'), (req, res) => {
  // Puedes acceder al archivo mediante req.file
  console.log(req.file);
  res.send('Archivo subido con éxito');
});
*/

app.post('/api/upload', upload.single('file'), async (req, res) => {
  if (req.file) {
    try {
      const { filename, path, size, mimetype } = req.file;
      const nuevoDocumento = await pool.query(
        "INSERT INTO catalogo.documentos (nombre_original,nombre_archivo,url,tamano, tipo) VALUES ($1,$1, $2, $3, $4) RETURNING *",
        [filename, path, size, mimetype]
      );      
      res.json(nuevoDocumento.rows[0]);
      //console.log(req.file);
      //res.send('Archivo subido con éxito');
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Error del servidor');
    }
  } else {
    res.status(400).send('No se subió ningún archivo');
  }
});

// Sirviendo archivos estáticos desde la carpeta 'uploads'
app.use('/home', express.static(path.join(__dirname, 'home')));



app.get('/api/documentos', async (req, res) => {
  try {    
    const { rows } = await pool.query(' SELECT nombre_original,url,tamano, tipo FROM catalogo.documentos'); // Asegúrate de que tu tabla se llame 'personas'
    console.log("Datos a enviar:", rows);
    res.json(rows);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
});



app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// El resto de tu configuración del servidor...
