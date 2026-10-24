import { Component } from '@angular/core';

/**
 * TAREA DE ABRAHAM: agenda semanal (el "calendario" de la rúbrica).
 *
 * Pasos:
 * 1. @Input({ required: true }) citas: Cita[] = [];
 *    @Input() nombreMascota: (id: number) => string = () => '';
 *    @Output() cambiarEstado = new EventEmitter<{ id: number; estado: EstadoCita }>();
 * 2. inicio = hoyTexto();   get dias(): string[] { return diasDeLaSemana(this.inicio); }
 *    Botones "◀ Semana anterior" / "Semana siguiente ▶": inicio = sumarDias(inicio, -7 / +7).
 * 3. citasDe(fecha: string): Cita[] -> filtra this.citas por fecha y ordena por hora.
 * 4. HTML: una columna (card) por día, con Bootstrap:
 *      <div class="row row-cols-1 row-cols-md-4 row-cols-xl-7 g-2">
 *    - Título del día: {{ dia | fechaTexto }}
 *    - Resaltar hoy:  <div class="card" [appResaltarFecha]="dia">
 *    - Cada cita: hora, nombre de la mascota, motivo y
 *      <span [class]="cita.estado | estadoCita:'clase'">{{ cita.estado | estadoCita }}</span>
 *    - Si la cita está pendiente: botones "Atendida" y "Cancelar" que emiten cambiarEstado.
 * 5. imports del componente: FechaTextoPipe, EstadoCitaPipe, ResaltarFechaDirective.
 */
@Component({
  selector: 'app-agenda',
  template: `
    <!-- TAREA DE ABRAHAM: agenda semanal (ver pasos en agenda.ts) -->
    <div class="alert alert-info">Agenda semanal en construcción.</div>
  `,
})
export class Agenda {}
