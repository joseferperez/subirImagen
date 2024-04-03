import './App.css';
import React, { useState } from 'react';
import { Form, Button, Typography } from 'antd';
import ImageUpload from './ImageUpload';
import DocumentosGrid from './DocumentosGrid';


const { Title } = Typography;

function FormularioCarga() {
  const [form] = Form.useForm();
  const [updateFlag, setUpdateFlag] = useState(0); // Agregar estado de actualización

  const onFinish = (values) => {
    console.log('Received values of form:', values);
    // Aquí manejas el envío del formulario
  };

   // Función para manejar la actualización después de la carga
   const handleUploadSuccess = () => {
    setUpdateFlag(prevFlag => prevFlag + 1); // Cambiar el flag para provocar actualización
  };

  return (
    <div className="App">
      {/* Título del formulario */}
      <Title level={2}>Carga Documentos</Title>   
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          style={{ 
            display: 'flex', 
            justifyContent: 'left' // Alinea el contenido del Form.Item a la izquierda
          }}
        >
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
        </Form.Item>

        <Form.Item>          
          <DocumentosGrid key={updateFlag} /> {/* Utilizar el flag como key para forzar re-render */}
        </Form.Item>    

               
      </Form>
    </div>
  );
}

export default FormularioCarga;



