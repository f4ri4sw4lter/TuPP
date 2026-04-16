export const agregarNuevaMeta = (rutas, rutaId, nuevoTitulo) => {
  return rutas.map((ruta) => {
    if (String(ruta.id) !== String(rutaId)) return ruta;
    const nuevaMeta = {
      id: Date.now().toString(),
      titulo: nuevoTitulo,
      descripcion: "",
      accionables: [],
    };
    return {
      ...ruta,
      metas: [...ruta.metas, nuevaMeta],
    };
  });
};

export const editarMeta = (rutas, rutaId, metaId, nuevoTitulo) => {
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

export const eliminarMeta = (rutas, rutaId, metaId) => {
  return rutas.map((ruta) => {
    if (String(ruta.id) !== String(rutaId)) return ruta;
    return {
      ...ruta,
      metas: ruta.metas.filter((meta) => String(meta.id) !== String(metaId)),
    };
  });
};