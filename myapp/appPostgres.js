const express = require('express');
const cors = require('cors'); // se utiliza para politicas de seguridad cuando el servidor y la aplicacion corren sobre la misma maquina
const app = express();
const port = 3001;

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

app.get('/api/personas', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM catalogo.personas'); // Asegúrate de que tu tabla se llame 'personas'
    res.json(rows);
    console.log(res.rows);
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    res.status(500).json({error: 'Error interno del servidor'});
  }
});


// En tu servidor Express (server.js o donde tengas tu configuración)
app.put('/api/personas/:id', async (req, res) => {
  
  const id = req.params.id;
  const { nombre, edad, direccion } = req.body; // Suponiendo que recibes estos datos en el cuerpo de la petición
    
  try {
    const result = await pool.query(
      'UPDATE catalogo.personas SET nombre = $1, edad = $2, direccion = $3 WHERE id = $4 RETURNING *',
      [nombre, edad, direccion, id]
    );

    if (result.rows.length > 0) {
      res.json(result.rows[0]); // Devuelve los datos actualizados      
    } else {
      res.status(404).json({ error: 'Persona no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar en la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


// En tu servidor Express (por ejemplo, server.js)
app.post('/api/personas', async (req, res) => {
  const { nombre, edad, direccion } = req.body;
  
  console.log("Server req.body",req.body )

  try {
    const result = await pool.query(
      'INSERT INTO catalogo.personas (nombre, edad, direccion) VALUES ($1, $2, $3) RETURNING *',
      [nombre, edad, direccion]
    );
    res.status(201).json(result.rows[0]); // Devuelve los datos de la nueva persona insertada
  } catch (error) {
    console.error('Error al insertar en la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.delete('/api/personas/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM catalogo.personas WHERE id = $1 RETURNING *', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).send('Persona no encontrada');
    }

    res.status(204).send(); // No Content, indicando éxito en la eliminación
  } catch (err) {
    console.error('Error al eliminar la persona:', err);
    res.status(500).send('Error al eliminar la persona');
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

// El resto de tu configuración del servidor...




