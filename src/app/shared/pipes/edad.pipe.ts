import { Pipe, PipeTransform } from '@angular/core';
import { aFecha } from '../utils/fechas';

/**
 * Pipe personalizado: calcula la edad a partir de la fecha de nacimiento.
 * Uso: {{ mascota.fechaNacimiento | edad }} => "3 años" o "8 meses"
 */
@Pipe({ name: 'edad' })
export class EdadPipe implements PipeTransform {
  transform(fechaNacimiento: string | null | undefined, hoy: Date = new Date()): string {
    if (!fechaNacimiento) {
      return '';
    }
    const nacimiento = aFecha(fechaNacimiento);
    let meses =
      (hoy.getFullYear() - nacimiento.getFullYear()) * 12 +
      (hoy.getMonth() - nacimiento.getMonth());
    if (hoy.getDate() < nacimiento.getDate()) {
      meses--;
    }
    if (meses < 0) {
      return '';
    }
    if (meses < 12) {
      return meses === 1 ? '1 mes' : `${meses} meses`;
    }
    const anios = Math.floor(meses / 12);
    return anios === 1 ? '1 año' : `${anios} años`;
  }
}
