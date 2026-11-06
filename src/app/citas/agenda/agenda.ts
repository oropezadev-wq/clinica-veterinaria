import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cita, EstadoCita } from '../cita.model';
import { FechaTextoPipe } from '../../shared/pipes/fecha-texto.pipe';
import { EstadoCitaPipe } from '../estado-cita.pipe';
import { ResaltarFechaDirective } from '../../shared/directives/resaltar-fecha.directive';
import { hoyTexto, sumarDias, diasDeLaSemana } from '../../shared/utils/fechas';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule, FechaTextoPipe, EstadoCitaPipe, ResaltarFechaDirective],
  template: `
    <div class="card shadow-sm mb-4">
      <div class="card-header bg-success-subtle d-flex justify-content-between align-items-center">
        <button class="btn btn-sm btn-outline-secondary" (click)="cambiarSemana(-7)">
          ◀ Semana anterior
        </button>
        <span class="fw-bold">Agenda Semanal</span>
        <button class="btn btn-sm btn-outline-secondary" (click)="cambiarSemana(7)">
          Semana siguiente ▶
        </button>
      </div>

      <div class="card-body">
        <div class="row row-cols-1 row-cols-md-4 row-cols-xl-7 g-2">
          @for (dia of dias; track dia) {
            <div class="col">
              <div class="card h-100 border" [appResaltarFecha]="dia">
                <div class="card-header py-1 text-center small fw-bold bg-light">
                  {{ dia | fechaTexto }}
                </div>
                <div class="card-body p-2 d-flex flex-column gap-2">
                  @for (cita of citasDe(dia); track cita.id) {
                    <div class="border rounded p-2 bg-white shadow-xs">
                      <div class="fw-bold text-primary small">{{ cita.hora }}</div>
                      <div class="small fw-semibold text-dark">🐾 {{ nombreMascota(cita.mascotaId) }}</div>
                      <div class="text-muted small text-truncate" title="{{ cita.motivo }}">{{ cita.motivo }}</div>
                      <div class="small">S/ {{ cita.costo | number: '1.2-2' }}</div>
                      
                      <div class="mt-1">
                        <span [class]="cita.estado | estadoCita:'clase'">
                          {{ cita.estado | estadoCita }}
                        </span>
                      </div>

                      @if (esPendiente(cita.estado)) {
                        <div class="mt-2 d-flex gap-1">
                          @if (cita.fecha <= hoy) {
                            <button class="btn btn-xs btn-success py-0 px-1 font-size-sm" style="font-size: 0.75rem;" (click)="atender.emit(cita)">
                              Atender
                            </button>
                          }
                          <button class="btn btn-xs btn-outline-danger py-0 px-1 font-size-sm" style="font-size: 0.75rem;" (click)="cambiarEstado.emit({ id: cita.id, estado: 'cancelada' })">
                            Cancelar
                          </button>
                        </div>
                      }
                    </div>
                  } @empty {
                    <div class="text-muted text-center small fst-italic py-3">Sin citas</div>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class Agenda {
  @Input({ required: true }) citas: Cita[] = [];
  @Input() nombreMascota: (id: number) => string = () => '';
  @Output() cambiarEstado = new EventEmitter<{ id: number; estado: EstadoCita }>();
  @Output() atender = new EventEmitter<Cita>();

  hoy = hoyTexto();
  inicio = this.hoy;

  get dias(): string[] {
    return diasDeLaSemana(this.inicio);
  }

  cambiarSemana(dias: number): void {
    this.inicio = sumarDias(this.inicio, dias);
  }

  citasDe(fecha: string): Cita[] {
    return this.citas
      .filter((c) => c.fecha === fecha)
      .sort((a, b) => a.hora.localeCompare(b.hora));
  }

  esPendiente(estado: string): boolean {
    return estado === 'pendiente';
  }
}
