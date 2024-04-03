//Comandos React

// crea un proyecto en react
npx create-react-app prueba100

// iniciar la aplicación
npm start


// iniciar servidor en express
directorio : myapp
codigo del servidor : app.js
iniciar servidor : node app.js
inciar servidor con base postgres node appPostgres.js
Se activa en el puerto : 3030
http://localhost:3030/

// se instala los componentes de AntDesign
npm install antd

// Se actualiza las dependencias del proyecto
// npm install


// Se utiliza para el router, rutear jsx como un menu
npm install react-router-dom


// se instala postgres
npm install pg


// se instala mongodb
npm install mongoose

// script de mongodb
{  
  "id":2,
"nombre":"Pedro",
"edad":"25",
"direccion":"Cuenca"  
}
"mongodb://mymongodb.example.com:23023"
show databases
use db_personas
db.Employee.find().forEach(printjson)

// se instala iconos en react
npm install @ant-design/icons


// maejo de seguridades
//en el cliente 
npm install mobx mobx-react

// Se inicia servior express con seguridades
node .\appPostgresToken.js 

// se instala en el servior y se utiliza para almacenas archivos 
npm install multer

//las imagenes se cragan en la carpeta 
D:\reactProyectos\myapp\imagen

//////////////////////////////////////
//Se almacena en base de datos postgres con la sigueinte estrctura
/////////////////////////////////////

CREATE TABLE catalogo.documentos
(
  id bigserial NOT NULL,
  nombre_original character varying NOT NULL,
  nombre_archivo character varying NOT NULL,
  url text NOT NULL,
  tamano character varying NOT NULL,
  tipo character varying NOT NULL,
  fecha_creacion timestamp without time zone,
  fecha_modificacion timestamp without time zone,
  usuario_creacion character varying(255),
  usuario_modificacion character varying(255),
  CONSTRAINT pk_documentos PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE catalogo.documentos
  OWNER TO postgres;

