/** Tipos con valores fijos: TypeScript avisa si se escribe otro valor. */
export type Especie = 'Perro' | 'Gato' | 'Ave' | 'Conejo' | 'Otro';
export type Sexo = 'Macho' | 'Hembra';

export const ESPECIES: Especie[] = ['Perro', 'Gato', 'Ave', 'Conejo', 'Otro'];

export interface Mascota {
  id: number;
  nombre: string;
  especie: Especie;
  raza: string;
  sexo: Sexo;
  fechaNacimiento: string; // "AAAA-MM-DD"
  pesoKg: number;
  duenoId: number;
}

/** Mascota sin id: es lo que manda el formulario (el id lo pone el servicio). */
export type DatosMascota = Omit<Mascota, 'id'>;
