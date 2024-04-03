
import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'antd';
//import 'antd/dist/antd.css'; // Importa los estilos de Ant Design
import VisualizadorImagen from './VisualizadorImagen';
import GaleriaDeImagenes from './GaleriaDeImagenes';


const DocumentosGrid = () => {
  const [documentos, setDocumentos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState('');

  useEffect(() => {
    console.log("se ejecuta get ini ")

    const fetchDocumentos = async () => {
      try {
        const respuesta = await fetch('http://localhost:3001/api/documentos');
        if (!respuesta.ok) {
          // Si la respuesta del servidor no es exitosa, lanza un error
          throw new Error(`Error en la respuesta del servidor: ${respuesta.status}`);
        }
        // Verifica que el contenido que se espera sea tipo JSON
        const contentType = respuesta.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError("La respuesta obtenida no es JSON");
        }
        const datos = await respuesta.json();
        setDocumentos(datos);
        console.log("Datos obtenidos: ", datos);
      } catch (error) {
        console.error("Error al obtener los documentos:", error);
      }
    };

    fetchDocumentos();

  }, []);

  // Definición de showModal dentro de DocumentosGrid
  const showModal = (nombreOriginal) => {
    setCurrentImageUrl(`http://localhost:3001/imagen/${nombreOriginal}`);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columnas = [
    {
      title: 'Nombre',
      dataIndex: 'nombre_original',
      key: 'nombre_original',
    },
    {
      title: 'Ruta',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Tamaño',
      dataIndex: 'tamano',
      key: 'tamano',
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      key: 'tipo',
    },
    // Puedes agregar más columnas según los datos que quieras mostrar

    {
      title: 'Acciones',
      dataIndex: 'actions',
      key: 'actions',
      render: (text, record) => (
        <Button
          onClick={() => showModal(record.nombre_original)}
          style={{ marginLeft: 8 }}
        >
          Ver Imagen
        </Button>
      ),
    }
  ];

  return (
    <>
      <Table dataSource={documentos} columns={columnas} rowKey="id" />

      <Modal
        title="Visualizador de Imagen"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="50%"
        footer={null} // Remueve los botones predeterminados del Modal
      >
        <VisualizadorImagen url={currentImageUrl} />
      </Modal>

      <div>
    <h1>Galería de Imágenes</h1>
      <GaleriaDeImagenes documentos={documentos} />
     </div>


    </>
  );
};

export default DocumentosGrid;





