/**
 * Clase base para guardar datos en un arreglo (sin base de datos).
 * <T> es un tipo genérico: puede ser Dueno, Mascota, Cita, etc.
 * La única condición es que tenga un "id" numérico.
 */
export abstract class RepositorioMemoria<T extends { id: number }> {
  // protected: solo esta clase y sus hijas pueden tocar el arreglo (encapsulamiento)
  protected datos: T[];
  private ultimoId: number;

  constructor() {
    this.datos = this.datosIniciales();
    this.ultimoId = Math.max(0, ...this.datos.map((d) => d.id));
  }

  /** Cada servicio hijo devuelve sus datos de ejemplo. */
  protected abstract datosIniciales(): T[];

  /** Devuelve una copia para que nadie modifique el arreglo desde fuera. */
  listar(): T[] {
    return [...this.datos];
  }

  buscarPorId(id: number): T | undefined {
    return this.datos.find((d) => d.id === id);
  }

  eliminar(id: number): boolean {
    const cantidadAntes = this.datos.length;
    this.datos = this.datos.filter((d) => d.id !== id);
    return this.datos.length < cantidadAntes;
  }

  protected siguienteId(): number {
    this.ultimoId++;
    return this.ultimoId;
  }

  protected guardar(item: T): T {
    this.datos.push(item);
    return item;
  }
}
