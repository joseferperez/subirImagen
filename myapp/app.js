const express = require('express');
const cors = require('cors'); // se utiliza para politicas de seguridad cuando el servidor y la aplicacion corren sobre la misma maquina
const fs = require('fs').promises; // Usa promesas con fs para manejar operaciones asíncronas
const app = express();
const port = 3001;

// Habilita CORS para todas las solicitudes
app.use(cors());

app.get('/api/personas', async (req, res) => {
  try {

    const data = await fs.readFile('personas.txt', 'utf8'); // Lee el archivo de manera asíncrona
    const personas = JSON.parse(data); // Convierte los datos de texto a un objeto JavaScript
    res.json(personas);
    console.log("Servidor" , personas)
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    res.status(500).send('Error al procesar la solicitud');
  }
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});






// El resto de tu configuración del servidor...


