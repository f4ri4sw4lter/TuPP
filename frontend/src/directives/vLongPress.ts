export const vLongPress = {
  mounted(el: HTMLElement, binding: any) {
    let pressTimer: ReturnType<typeof setTimeout> | null = null;

    const start = (e: Event) => {
      // CORRECCIÓN: Validamos click derecho en mousedown, no 'click'
      if (e.type === 'mousedown' && (e as MouseEvent).button !== 0) return;

      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          binding.value(e); 
        }, 800);
      }
    };

    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };

    // Inicio
    el.addEventListener("mousedown", start);
    el.addEventListener("touchstart", start);

    // Cancelación (Agregamos mouseup y mouseleave para mayor precisión)
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("touchend", cancel);
    el.addEventListener("touchcancel", cancel);
    el.addEventListener("mouseup", cancel); // Importante para escritorio
    el.addEventListener("mouseleave", cancel); // Importante si arrastra el mouse fuera
  }
};