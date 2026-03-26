export const toggleAccionable = (rutas, rutaId, metaId, accionableId) => {
  return rutas.map((ruta) => {
    if (String(ruta.id) !== String(rutaId)) return ruta;
    return {
      ...ruta,
      metas: ruta.metas.map((meta) => {
        if (String(meta.id) !== String(metaId)) return meta;
        return {
          ...meta,
          accionables: meta.accionables.map((acc) =>
            String(acc.id) === String(accionableId)
              ? { ...acc, checked: !acc.checked }
              : acc,
          ),
        };
      }),
    };
  });
};

export const agregarAccionable = (rutas, rutaId, metaId, tituloAccionable) => {
  return rutas.map((ruta) => {
    if (String(ruta.id) !== String(rutaId)) return ruta;
    return {
      ...ruta,
      metas: ruta.metas.map((meta) => {
        if (String(meta.id) !== String(metaId)) return meta;
        const nuevoAcc = {
          id: Date.now().toString(),
          titulo: tituloAccionable,
          checked: false,
        };
        return {
          ...meta,
          accionables: [...meta.accionables, nuevoAcc],
        };
      }),
    };
  });
};

export const editarAccionable = (rutas, rutaId, metaId, accId, nuevoTitulo) => {
  return rutas.map((ruta) => {
    if (String(ruta.id) !== String(rutaId)) return ruta;
    return {
      ...ruta,
      metas: ruta.metas.map((meta) => {
        if (String(meta.id) !== String(metaId)) return meta;
        return {
          ...meta,
          accionables: meta.accionables.map((acc) =>
            String(acc.id) === String(accId) ? { ...acc, titulo: nuevoTitulo } : acc
          ),
        };
      }),
    };
  });
};

export const eliminarAccionable = (rutas, rutaId, metaId, accId) => {
  return rutas.map((ruta) => {
    if (String(ruta.id) !== String(rutaId)) return ruta;
    return {
      ...ruta,
      metas: ruta.metas.map((meta) => {
        if (String(meta.id) !== String(metaId)) return meta;
        return {
          ...meta,
          accionables: meta.accionables.filter((acc) => String(acc.id) !== String(accId)),
        };
      }),
    };
  });
};