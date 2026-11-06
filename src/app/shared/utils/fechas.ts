/**
 * En todo el proyecto las fechas se guardan como texto "AAAA-MM-DD"
 * (es lo mismo que devuelve un <input type="date">).
 */

/** Convierte un Date a "AAAA-MM-DD" usando la hora local. */
export function aTexto(fecha: Date): string {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

/** Convierte "AAAA-MM-DD" a Date (sin problemas de zona horaria). */
export function aFecha(texto: string): Date {
  const [anio, mes, dia] = texto.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
}

export function hoyTexto(): string {
  return aTexto(new Date());
}

/** Hora actual como "HH:mm", igual que las horas de la agenda. */
export function horaActual(): string {
  const ahora = new Date();
  const hora = String(ahora.getHours()).padStart(2, '0');
  const minutos = String(ahora.getMinutes()).padStart(2, '0');
  return `${hora}:${minutos}`;
}

/** sumarDias('2026-10-28', 1) => '2026-10-29' */
export function sumarDias(texto: string, dias: number): string {
  const fecha = aFecha(texto);
  fecha.setDate(fecha.getDate() + dias);
  return aTexto(fecha);
}

/** Devuelve 7 fechas seguidas empezando en "desde". Sirve para la agenda. */
export function diasDeLaSemana(desde: string): string[] {
  return [0, 1, 2, 3, 4, 5, 6].map((n) => sumarDias(desde, n));
}
