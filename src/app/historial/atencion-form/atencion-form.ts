import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosAtencion } from '../atencion.model'; // Ajusta la ruta si es necesario
import { Veterinario } from '../veterinario.model'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-atencion-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card shadow-sm">
      <div class="card-header bg-success-subtle fw-semibold">Registrar atención</div>
      <div class="card-body">
        
        <form [formGroup]="formulario" (ngSubmit)="enviar()">
          
          <!-- Veterinario ID -->
          <div class="mb-3">
            <label class="form-label">Médico Veterinario</label>
            <select class="form-select" formControlName="veterinarioId">
              <option [value]="0">Seleccione un veterinario...</option>
              @for (vet of veterinarios; track vet.id) {
                <option [value]="vet.id">{{ vet.nombres }} {{ vet.apellidos }} ({{ vet.especialidad }})</option>
              }
            </select>
            @if (campoInvalido('veterinarioId')) {
              <div class="text-danger small mt-1">Debe seleccionar un veterinario.</div>
            }
          </div>

          <!-- Fecha -->
          <div class="mb-3">
            <label class="form-label">Fecha de atención</label>
            <input type="date" class="form-control" formControlName="fecha">
            @if (campoInvalido('fecha')) {
              <div class="text-danger small mt-1">La fecha es obligatoria.</div>
            }
          </div>

          <!-- Motivo -->
          <div class="mb-3">
            <label class="form-label">Motivo de consulta</label>
            <input type="text" class="form-control" formControlName="motivo" placeholder="Ej. Control general, vacunación">
            @if (campoInvalido('motivo')) {
              <div class="text-danger small mt-1">El motivo es obligatorio.</div>
            }
          </div>

          <!-- Diagnóstico -->
          <div class="mb-3">
            <label class="form-label">Diagnóstico</label>
            <textarea class="form-control" formControlName="diagnostico" rows="2" placeholder="Ingrese el diagnóstico clínico..."></textarea>
            @if (campoInvalido('diagnostico')) {
              <div class="text-danger small mt-1">El diagnóstico es obligatorio.</div>
            }
          </div>

          <!-- Tratamiento -->
          <div class="mb-3">
            <label class="form-label">Tratamiento / Receta</label>
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

      </div>
    </div>
  `,
})
export class AtencionForm {
  private fb = inject(FormBuilder);

  // Paso 1: @Input y @Output requeridos
  @Input({ required: true }) mascotaId = 0;
  @Input({ required: true }) veterinarios: Veterinario[] = [];
  @Output() guardado = new EventEmitter<DatosAtencion>();

  // Función de ayuda para la fecha de hoy en formato texto (YYYY-MM-DD)
  private hoyTexto(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  // Paso 2: Definición del formulario con nonNullable y validadores
  formulario = this.fb.nonNullable.group({
    veterinarioId: [0, [Validators.required, Validators.min(1)]],
    fecha: [this.hoyTexto(), Validators.required],
    motivo: ['', Validators.required],
    diagnostico: ['', Validators.required],
    tratamiento: ['', [Validators.required, Validators.minLength(5)]],
  });

  // Paso 4: Función de ayuda para validaciones (copiada del esquema de dueno-form)
  campoInvalido(campo: keyof DatosAtencion): boolean {
    const control = this.formulario.controls[campo as keyof typeof this.formulario.controls];
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // Paso 3: Al enviar se emite el objeto combinado incluyendo el mascotaId
  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const atencionData: DatosAtencion = {
      ...this.formulario.getRawValue(),
      mascotaId: this.mascotaId,
    };

    this.guardado.emit(atencionData);
    this.formulario.reset({
      veterinarioId: 0,
      fecha: this.hoyTexto(),
      motivo: '',
      diagnostico: '',
      tratamiento: '',
    });
  }
}