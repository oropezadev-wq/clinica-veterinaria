import { Pipe, PipeTransform, inject } from '@angular/core';
import { DuenoService } from '../duenos/dueno.service';
import { Mascota } from './mascota.model';

/**
 * Pipe personalizado para las listas de mascotas: pone el DNI del dueño antes del nombre.
 * {{ mascota | etiquetaMascota }} => "45871236 - Firulais (Perro)"
 */
@Pipe({ name: 'etiquetaMascota' })
export class EtiquetaMascotaPipe implements PipeTransform {
  private duenoService = inject(DuenoService);

  transform(mascota: Mascota): string {
    const dni = this.duenoService.buscarPorId(mascota.duenoId)?.dni ?? 'Sin DNI';
    return `${dni} - ${mascota.nombre} (${mascota.especie})`;
  }
}
