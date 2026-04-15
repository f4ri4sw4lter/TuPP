export const editarNombreUsuario = (nombre, rutaId, metaId, nuevoTitulo) => {
  return rutas.map((ruta) => {
    if (String(ruta.id) !== String(rutaId)) return ruta;
    return {
      ...ruta,
      metas: ruta.metas.map((meta) => {
        if (String(meta.id) !== String(metaId)) return meta;
        return { ...meta, titulo: nuevoTitulo };
      }),
    };
  });
};