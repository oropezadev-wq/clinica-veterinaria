import { Pipe, PipeTransform } from '@angular/core';
import { aFecha } from '../utils/fechas';

export type FormatoFecha = 'larga' | 'corta';

/**
 * Pipe personalizado: muestra "2026-10-28" como texto legible.
 * Uso: {{ cita.fecha | fechaTexto }}         => miércoles, 28 de octubre de 2026
 *      {{ cita.fecha | fechaTexto:'corta' }} => 28/10/2026
 */
@Pipe({ name: 'fechaTexto' })
export class FechaTextoPipe implements PipeTransform {
  transform(valor: string | null | undefined, formato: FormatoFecha = 'larga'): string {
    if (!valor) {
      return '';
    }
    const fecha = aFecha(valor);
    if (formato === 'corta') {
      return fecha.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    }
    return fecha.toLocaleDateString('es-PE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
