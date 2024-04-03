import React from 'react';
import { Image, Row, Col } from 'antd';
import './App.css'; // Asegúrate de que la ruta sea correcta

const GaleriaDeImagenes = ({ documentos }) => (
  <Image.PreviewGroup>
    <Row gutter={[6, 6]}>
      {documentos.map((documento, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6} xl={4}>
          {/* Aplica la clase CSS al contenedor */}
          <div className="image-container">
            <Image
              src={`http://localhost:3001/imagen/${documento.nombre_original}`}
            />
          </div>
        </Col>
      ))}
    </Row>
  </Image.PreviewGroup>
);

export default GaleriaDeImagenes;

