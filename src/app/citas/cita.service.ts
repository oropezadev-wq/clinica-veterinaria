import { Injectable } from '@angular/core';
import { RepositorioMemoria } from '../shared/services/repositorio-memoria';
import { hoyTexto, sumarDias } from '../shared/utils/fechas';
import { Cita, DatosCita, EstadoCita, HORARIO } from './cita.model';

@Injectable({ providedIn: 'root' })
export class CitaService extends RepositorioMemoria<Cita> {
  protected override datosIniciales(): Cita[] {
    // Fechas relativas a hoy, para que siempre haya citas de hoy y de los próximos días
    const hoy = hoyTexto();
    return [
      {
        id: 1,
        mascotaId: 1,
        fecha: sumarDias(hoy, -7),
        hora: '10:00',
        motivo: 'Vacuna antirrábica',
        estado: 'atendida',
      },
      {
        id: 2,
        mascotaId: 3,
        fecha: hoy,
        hora: '09:00',
        motivo: 'Control de peso',
        estado: 'pendiente',
      },
      {
        id: 3,
        mascotaId: 2,
        fecha: hoy,
        hora: '16:00',
        motivo: 'Desparasitación',
        estado: 'pendiente',
      },
      {
        id: 4,
        mascotaId: 4,
        fecha: sumarDias(hoy, 1),
        hora: '11:00',
        motivo: 'Corte de uñas',
        estado: 'pendiente',
      },
      {
        id: 5,
        mascotaId: 1,
        fecha: sumarDias(hoy, 3),
        hora: '15:00',
        motivo: 'Revisión de oídos',
        estado: 'pendiente',
      },
      {
        id: 6,
        mascotaId: 3,
        fecha: sumarDias(hoy, -2),
        hora: '12:00',
        motivo: 'Baño medicado',
        estado: 'cancelada',
      },
    ];
  }

  /** Citas de un día, ordenadas por hora. */
  citasDelDia(fecha: string): Cita[] {
    return this.datos.filter((c) => c.fecha === fecha).sort((a, b) => a.hora.localeCompare(b.hora));
  }

  /** Horas libres de un día (las canceladas liberan su hora). */
  horasDisponibles(fecha: string): string[] {
    const ocupadas = this.datos
      .filter((c) => c.fecha === fecha && c.estado !== 'cancelada')
      .map((c) => c.hora);
    return HORARIO.filter((hora) => !ocupadas.includes(hora));
  }

  /** Registra la cita solo si la hora está libre. Devuelve null si está ocupada. */
  registrar(datos: DatosCita): Cita | null {
    if (!this.horasDisponibles(datos.fecha).includes(datos.hora)) {
      return null;
    }
    return this.guardar({ id: this.siguienteId(), estado: 'pendiente', ...datos });
  }

  cambiarEstado(id: number, estado: EstadoCita): void {
    const cita = this.buscarPorId(id);
    if (cita) {
      cita.estado = estado;
    }
  }

  /** Citas pendientes desde hoy en adelante, en orden. */
  proximas(): Cita[] {
    const hoy = hoyTexto();
    return this.datos
      .filter((c) => c.estado === 'pendiente' && c.fecha >= hoy)
      .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
  }
}
