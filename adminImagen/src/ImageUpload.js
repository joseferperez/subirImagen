import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function ImageUpload({ onUploadSuccess }) {
  const [fileList, setFileList] = useState([]);

  const props = {
    beforeUpload: file => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Solo puedes subir imágenes!');
        return Upload.LIST_IGNORE;
      }
      setFileList([file]);
      return false; // No cargar automáticamente
    },
    fileList,
    accept: "image/png, image/jpeg", // Acepta solo imágenes PNG y JPEG
  };

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('images', file); // Cambiado de 'file' a 'images' para reflejar el propósito
    });

    try {
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        message.success('Imagen subida con éxito');
        setFileList([]);
        onUploadSuccess();
      } else {
        message.error('Hubo un error al subir la imagen');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      message.error('Error al conectar con el servidor');
    }
  };

  return (
    <div className="buttons-container">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Seleccionar Imagen</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
      >
        Subir Imagen
      </Button>
    </div>
  );
}

export default ImageUpload;






