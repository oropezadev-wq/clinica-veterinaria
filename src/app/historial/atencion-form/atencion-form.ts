import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosAtencion } from '../atencion.model';
import { Veterinario } from '../veterinario.model';
import { Cita } from '../../citas/cita.model';
import { FechaTextoPipe } from '../../shared/pipes/fecha-texto.pipe';
import { sinEspacios } from '../../shared/validators/validadores';

@Component({
  selector: 'app-atencion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FechaTextoPipe],
  template: `
    <div class="card shadow-sm">
      <div class="card-header bg-success-subtle fw-semibold">Registrar atención</div>
      <div class="card-body">
        
        @if (citas.length === 0) {
          <div class="alert alert-warning mb-0">Esta mascota no tiene citas pendientes para hoy. Agende una en Citas.</div>
        } @else {
        <form [formGroup]="formulario" (ngSubmit)="enviar()">
          
          <!-- Cita que se atiende -->
          <div class="mb-3">
            <label class="form-label">Cita</label>
            <select class="form-select" formControlName="citaId">
              <option [ngValue]="0">Seleccione una cita...</option>
              @for (cita of citas; track cita.id) {
                <option [ngValue]="cita.id">{{ cita.fecha | fechaTexto }} - {{ cita.hora }}</option>
              }
            </select>
            @if (campoInvalido('citaId')) {
              <div class="text-danger small mt-1">Debe seleccionar una cita.</div>
            }
          </div>

          <!-- Veterinario ID -->
          <div class="mb-3">
            <label class="form-label">Médico Veterinario</label>
            <select class="form-select" formControlName="veterinarioId">
              <option [ngValue]="0">Seleccione un veterinario...</option>
              @for (vet of veterinarios; track vet.id) {
                <option [ngValue]="vet.id">{{ vet.nombreCompleto }} ({{ vet.especialidad }})</option>
              }
            </select>
            @if (campoInvalido('veterinarioId')) {
              <div class="text-danger small mt-1">Debe seleccionar un veterinario.</div>
            }
          </div>

          <!-- Fecha y motivo: se cargan desde la cita y no se editan -->
          <div class="mb-3">
            <label class="form-label">Fecha de atención</label>
            <input type="text" class="form-control" readonly [value]="citaSeleccionada ? (citaSeleccionada.fecha | fechaTexto) : ''">
          </div>

          <div class="mb-3">
            <label class="form-label">Motivo de consulta</label>
            <input type="text" class="form-control" readonly [value]="citaSeleccionada?.motivo ?? ''">
          </div>

          <!-- Diagnóstico -->
          <div class="mb-3">
            <label class="form-label">Diagnóstico</label>
            <textarea class="form-control" formControlName="diagnostico" rows="2" placeholder="Ingrese el diagnóstico clínico..."></textarea>
            @if (campoInvalido('diagnostico')) {
              <div class="text-danger small mt-1">El diagnóstico es obligatorio (mínimo 3 caracteres).</div>
            }
          </div>

          <!-- Tratamiento -->
          <div class="mb-3">
            <label class="form-label">Tratamiento</label>
            <textarea class="form-control" formControlName="tratamiento" rows="2" placeholder="Detalle los medicamentos o indicaciones (mínimo 5 caracteres)..."></textarea>
            @if (campoInvalido('tratamiento')) {
              <div class="text-danger small mt-1">El tratamiento es obligatorio (mínimo 5 caracteres).</div>
            }
          </div>

          <!-- Botón de Envío -->
          <button type="submit" class="btn btn-success w-100">
            Guardar atención
          </button>

        </form>
        }

      </div>
    </div>
  `,
})
export class AtencionForm implements OnChanges {
  private fb = inject(FormBuilder);

  @Input({ required: true }) mascotaId = 0;
  @Input({ required: true }) citas: Cita[] = [];
  @Input({ required: true }) veterinarios: Veterinario[] = [];
  @Output() guardado = new EventEmitter<DatosAtencion>();

  formulario = this.fb.nonNullable.group({
    citaId: [0, [Validators.required, Validators.min(1)]],
    veterinarioId: [0, [Validators.required, Validators.min(1)]],
    diagnostico: ['', [Validators.required, Validators.minLength(3), sinEspacios]],
    tratamiento: ['', [Validators.required, Validators.minLength(5), sinEspacios]],
  });

  // Ciclo de vida: al cambiar de mascota, se limpia lo que se había escrito
  ngOnChanges(cambios: SimpleChanges): void {
    if (cambios['mascotaId']) {
      this.limpiar();
    }
  }

  get citaSeleccionada(): Cita | undefined {
    return this.citas.find((c) => c.id === this.formulario.controls.citaId.value);
  }

  campoInvalido(campo: keyof typeof this.formulario.controls): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && (control.dirty || control.touched);
  }

  enviar(): void {
    const cita = this.citaSeleccionada;
    if (this.formulario.invalid || !cita) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardado.emit({
      ...this.formulario.getRawValue(),
      mascotaId: this.mascotaId,
      fecha: cita.fecha,
      motivo: cita.motivo,
    });
    this.limpiar();
  }

  private limpiar(): void {
    this.formulario.reset({ citaId: 0, veterinarioId: 0, diagnostico: '', tratamiento: '' });
  }
}
