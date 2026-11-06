export type EstadoCita = 'pendiente' | 'atendida' | 'cancelada';

export interface Cita {
  id: number;
  mascotaId: number;
  fecha: string; // "AAAA-MM-DD"
  hora: string; // "HH:mm"
  motivo: string;
  costo: number; // en soles
  estado: EstadoCita;
}

export type DatosCita = Omit<Cita, 'id' | 'estado'>;

/** Horario de atención: una cita cada hora. */
export const HORARIO: string[] = ['09:00', '10:00', '11:00', '12:00', '15:00', '16:00', '17:00'];
