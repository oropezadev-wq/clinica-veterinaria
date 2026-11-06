import { AbstractControl, ValidationErrors } from '@angular/forms';
import { hoyTexto } from '../utils/fechas';

/** Solo letras y espacios, para nombres y apellidos. */
export const SOLO_LETRAS = '^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$';

/** Rechaza un texto que solo tiene espacios (Validators.required lo deja pasar). */
export function sinEspacios(control: AbstractControl): ValidationErrors | null {
  const valor = String(control.value ?? '');
  return valor.length > 0 && valor.trim().length === 0 ? { soloEspacios: true } : null;
}

/** La fecha no puede ser posterior a hoy (ej.: fecha de nacimiento). */
export function fechaNoFutura(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value > hoyTexto() ? { fechaFutura: true } : null;
}

/** La fecha no puede ser anterior a hoy (ej.: fecha de una cita nueva). */
export function fechaNoPasada(control: AbstractControl): ValidationErrors | null {
  return control.value && control.value < hoyTexto() ? { fechaPasada: true } : null;
}
