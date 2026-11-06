import { Describible } from './describible';

/**
 * Clase abstracta: no se puede crear una "Persona" directamente,
 * solo sus hijas (Dueno y Veterinario). Así reutilizamos los datos comunes.
 */
export abstract class Persona implements Describible {
  constructor(
    public readonly id: number,
    public nombres: string,
    public apellidos: string,
    public dni: string,
    public telefono: string,
  ) {}

  /** Une nombres y apellidos. Lo heredan todas las clases hijas. */
  get nombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`;
  }

  /** Cada clase hija lo implementa a su manera (polimorfismo). */
  abstract describir(): string;
}
