export class Records {
  constructor() {
    this.datos = {};
  }

  // Mejor tiempo (en segundos) del nivel, o null si todavía no hay
  obtener(nivel) {
    return this.datos[nivel] ?? null;
  }

  // Guarda el tiempo solo si mejora el récord.
  // Devuelve true si es un récord nuevo.
  guardar(nivel, segundos) {
    const actual = this.obtener(nivel);
    if (actual !== null && segundos >= actual) return false;

    this.datos[nivel] = segundos;
    return true;
  }
}