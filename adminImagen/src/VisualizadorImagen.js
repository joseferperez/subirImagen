
function VisualizadorImagen({ url }) {
  return ( 
    <img
      src={url}
      alt="Visualizador de Imagen"
      style={{ width: '100%', maxHeight: '400px' }} // Ajusta según necesidad
    />
  );
}

export default VisualizadorImagen;



