const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // se utiliza para politicas de seguridad cuando el servidor y la aplicacion corren sobre la misma maquina

const app = express();
const port = 3001; // El puerto en el que se ejecutará tu servidor Express


// Habilita CORS para todas las solicitudes
app.use(cors());

// Asegúrate de incluir esta línea antes de definir tus rutas
app.use(express.json());

// URL de conexión a tu base de datos MongoDB
// Reemplaza '<username>', '<password>', y '<dbname>' con tus credenciales reales
//const mongoDB = 'mongodb://<username>:<password>@host:port/<dbname>';

const mongoDB = 'mongodb://127.0.0.1:27017/prueba';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'db_personas';


app.get('/api/personas', async (req, res) => {
  let client;

  try {
      // Conexión al servidor MongoDB
      client = await MongoClient.connect(url, { useUnifiedTopology: true });
      console.log('Conexión a MongoDB exitosa');
      
      const db = client.db(dbName); // Obtén la base de datos
      const collection = db.collection('personas'); // Obtén la colección
      
      // Encuentra todos los documentos en la colección y conviértelos a un array
      const personas = await collection.find().toArray();
      
      // Envía los documentos como respuesta JSON
      res.json(personas);       

  } catch (err) {
      // Maneja errores de conexión o consulta
      console.error('Error al conectar a MongoDB:', err);
      res.status(500).send('Error al recuperar las personas');
  } finally {
      // Cierra la conexión al finalizar
      if (client) {
          await client.close();
      }
  }
});


//const client = new MongoClient(url, { useUnifiedTopology: true });
app.post('/api/personas', async (req, res) => {
    try {
        // Conexión al servidor MongoDB
        client = await MongoClient.connect(url, { useUnifiedTopology: true });

        //await client.connect();
        console.log('Conexión a MongoDB exitosa');
        
        const db = client.db(dbName); // Obtén la base de datos
        const collection = db.collection('personas'); // Obtén la colección
        
        // Inserta el documento en la colección
        const result = await collection.insertOne(req.body);
        
        // Envía una respuesta indicando el éxito de la operación
	res.status(201).json(result.rows[0]); // Devuelve los datos de la nueva persona insertada
        //res.status(201).json({ message: 'Persona creada exitosamente', _id: result.insertedId });
    } catch (err) {
        // Maneja errores de conexión o inserción
        console.error('Error al insertar en MongoDB:', err);
        res.status(500).send('Error al crear la persona');
    } finally {
        await client.close();
    }
});

async function main() {
    let client;

    try {
        // Conexión al servidor MongoDB
        client = await MongoClient.connect(url);
        console.log('Conexión a MongoDB exitosa');
        
        const db = client.db(dbName); // Obtén la base de datos
        const collection = db.collection('personas'); // Obtén la colección
        
        // Encuentra todos los documentos en la colección
        const cursor = collection.find();
        
        // Espera e imprime todos los documentos
        await cursor.forEach(doc => console.log(doc));       

    } catch (err) {
        // Maneja errores de conexión o consulta
        console.error('Error al conectar a MongoDB:', err);
    } finally {
        // Cierra la conexión al finalizar
        if (client) {
            await client.close();
        }
    }
}

main().catch(console.error);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});








