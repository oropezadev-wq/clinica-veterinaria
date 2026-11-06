/** Una atención es una entrada del historial de una mascota. */
export interface Atencion {
  id: number;
  citaId: number; // la fecha y el motivo se copian de esta cita
  mascotaId: number;
  veterinarioId: number;
  fecha: string; // "AAAA-MM-DD"
  motivo: string;
  diagnostico: string;
  tratamiento: string;
}

export type DatosAtencion = Omit<Atencion, 'id'>;
