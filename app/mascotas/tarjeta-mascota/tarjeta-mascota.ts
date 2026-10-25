import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EdadPipe } from '../../shared/pipes/edad.pipe';
import { Especie, Mascota } from '../mascota.model';

/**
 * Componente reutilizable: tarjeta con los datos de una mascota.
 * Se usa en Mascotas y se puede usar en Historial.
 *
 * Entradas  (@Input):  mascota, nombreDueno, mostrarAcciones
 * Salidas   (@Output): verHistorial, eliminar
 *
 * Uso:
 * <app-tarjeta-mascota [mascota]="m" nombreDueno="Lucía"
 *     (verHistorial)="irAlHistorial($event)" (eliminar)="borrar($event)" />
 */
@Component({
  selector: 'app-tarjeta-mascota',
  imports: [EdadPipe],
  templateUrl: './tarjeta-mascota.html',
})
export class TarjetaMascota {
  @Input({ required: true }) mascota!: Mascota;
  @Input() nombreDueno = '';
  @Input() mostrarAcciones = true;

  @Output() verHistorial = new EventEmitter<Mascota>();
  @Output() eliminar = new EventEmitter<Mascota>();

  private iconos: Record<Especie, string> = {
    Perro: '🐶',
    Gato: '🐱',
    Ave: '🐦',
    Conejo: '🐰',
    Otro: '🐾',
  };

  get icono(): string {
    return this.iconos[this.mascota.especie];
  }
}
