import { Directive, HostBinding, Input } from '@angular/core';
import { hoyTexto } from '../utils/fechas';

/**
 * Directiva personalizada: resalta el elemento según su fecha.
 *  - Si la fecha es hoy  => clase "fecha-hoy" (fondo amarillo)
 *  - Si ya pasó         => clase "fecha-pasada" (se ve más claro)
 * Uso: <li [appResaltarFecha]="cita.fecha">...</li>
 */
@Directive({ selector: '[appResaltarFecha]' })
export class ResaltarFechaDirective {
  @Input({ required: true }) appResaltarFecha = '';

  @HostBinding('class.fecha-hoy')
  get esHoy(): boolean {
    return this.appResaltarFecha === hoyTexto();
  }

  @HostBinding('class.fecha-pasada')
  get yaPaso(): boolean {
    // Las fechas "AAAA-MM-DD" se pueden comparar como texto
    return this.appResaltarFecha !== '' && this.appResaltarFecha < hoyTexto();
  }
}
