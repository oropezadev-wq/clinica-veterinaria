import { Persona } from '../shared/models/persona';

/** Veterinario también HEREDA de Persona, pero describe distinto (polimorfismo). */
export class Veterinario extends Persona {
  constructor(
    id: number,
    nombres: string,
    apellidos: string,
    dni: string,
    telefono: string,
    public especialidad: string,
  ) {
    super(id, nombres, apellidos, dni, telefono);
  }

  override describir(): string {
    return `Veterinario · ${this.especialidad}`;
  }
}
