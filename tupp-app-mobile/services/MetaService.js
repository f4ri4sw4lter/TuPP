export const toggleAccionable = (rutaId, metaId, accionableId) => {
  const nuevasRutas = rutas.map((ruta) => {
    if (ruta.id !== rutaId) return ruta;
    return {
      ...ruta,
      metas: ruta.metas.map((meta) => {
        if (meta.id !== metaId) return meta;
        return {
          ...meta,
          accionables: meta.accionables.map((acc) =>
            acc.id === accionableId ? { ...acc, checked: !acc.checked } : acc,
          ),
        };
      }),
    };
  });
  guardarRutas(nuevasRutas);
};

export const agregarNuevaMeta = (rutaId, nuevoTitulo) => {
  const nuevasRutas = rutas.map((ruta) => {
    if (ruta.id !== rutaId) return ruta;

    const nuevaMeta = {
      id: Date.now(),
      titulo: nuevoTitulo,
      descripcion: "",
      accionables: [],
    };

    return {
      ...ruta,
      metas: [...ruta.metas, nuevaMeta],
    };
  });

  guardarRutas(nuevasRutas);
};

const editarMeta = (rutaId, metaId, nuevoTitulo) => {
  const nuevasRutas = rutas.map((ruta) => {
    if (ruta.id !== rutaId) return ruta;
    return {
      ...ruta,
      metas: ruta.metas.map((meta) => {
        if (meta.id !== metaId) return meta;
        return { ...meta, titulo: nuevoTitulo };
      }),
    };
  });
  setRutas(nuevasRutas);
};

// Función para ELIMINAR una meta completa
const eliminarMeta = (rutaId, metaId) => {
  const nuevasRutas = rutas.map((ruta) => {
    if (ruta.id !== rutaId) return ruta;
    return {
      ...ruta,
      // Filtramos para dejar fuera la meta que coincida con el ID
      metas: ruta.metas.filter((meta) => meta.id !== metaId),
    };
  });
  setRutas(nuevasRutas);
};
