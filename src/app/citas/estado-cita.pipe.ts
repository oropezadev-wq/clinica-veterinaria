import { Pipe, PipeTransform } from '@angular/core';
import { EstadoCita } from './cita.model';

/**
 * Pipe personalizado para el estado de una cita.
 * {{ cita.estado | estadoCita }}          => "Pendiente"
 * [class]="cita.estado | estadoCita:'clase'" => "badge text-bg-warning" (color de Bootstrap)
 */
@Pipe({ name: 'estadoCita' })
export class EstadoCitaPipe implements PipeTransform {
  private textos: Record<EstadoCita, string> = {
    pendiente: 'Pendiente',
    atendida: 'Atendida',
    cancelada: 'Cancelada',
  };

  private colores: Record<EstadoCita, string> = {
    pendiente: 'text-bg-warning',
    atendida: 'text-bg-success',
    cancelada: 'text-bg-secondary',
  };

  transform(estado: EstadoCita, salida: 'texto' | 'clase' = 'texto'): string {
    return salida === 'clase' ? `badge ${this.colores[estado]}` : this.textos[estado];
  }
}
