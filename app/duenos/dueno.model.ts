import { Persona } from '../shared/models/persona';

/** Datos que llegan del formulario de registro. */
export interface DatosDueno {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono: string;
  email: string;
  direccion: string;
}

/** Dueno HEREDA de Persona: ya tiene id, nombres, apellidos, dni y teléfono. */
export class Dueno extends Persona {
  email: string;
  direccion: string;

  constructor(id: number, datos: DatosDueno) {
    super(id, datos.nombres, datos.apellidos, datos.dni, datos.telefono);
    this.email = datos.email;
    this.direccion = datos.direccion;
  }

  /** Sobrescribe el método abstracto de Persona (polimorfismo). */
  override describir(): string {
    return `Dueño · ${this.email}`;
  }
}
