import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * TAREA DE ABRAHAM: formulario reactivo para registrar una atención (agrega al historial).
 * Modelo a copiar: src/app/duenos/dueno-form/
 *
 * Pasos:
 * 1. @Input({ required: true }) mascotaId = 0;
 *    @Input({ required: true }) veterinarios: Veterinario[] = [];
 *    @Output() guardado = new EventEmitter<DatosAtencion>();
 * 2. Campos (this.fb.nonNullable.group):
 *      veterinarioId -> Validators.required          (<select>, número)
 *      fecha         -> Validators.required          (valor inicial: hoyTexto())
 *      motivo        -> Validators.required
 *      diagnostico   -> Validators.required
 *      tratamiento   -> Validators.required, Validators.minLength(5)  (<textarea>)
 * 3. En enviar(): emitir { ...this.formulario.getRawValue(), mascotaId: this.mascotaId }.
 * 4. Copiar campoInvalido() de dueno-form.ts.
 */
@Component({
  selector: 'app-atencion-form',
  imports: [ReactiveFormsModule],
  template: `
    <div class="card shadow-sm">
      <div class="card-header bg-success-subtle fw-semibold">Registrar atención</div>
      <div class="card-body">
        <!-- TAREA DE ABRAHAM: armar el formulario aquí (ver pasos en atencion-form.ts) -->
        <p class="text-body-secondary mb-0">Formulario en construcción.</p>
      </div>
    </div>
  `,
})
export class AtencionForm {}
