import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * TAREA DE ABRAHAM: formulario reactivo para agendar una cita.
 * Modelo a copiar: src/app/duenos/dueno-form/
 *
 * Pasos:
 * 1. @Input({ required: true }) mascotas: Mascota[] = [];   (para el <select>)
 *    @Output() guardado = new EventEmitter<DatosCita>();
 * 2. Inyectar CitaService (solo para consultar horas libres).
 * 3. Campos del formulario (this.fb.nonNullable.group):
 *      mascotaId -> Validators.required        (número, valor inicial 0)
 *      fecha     -> Validators.required        (<input type="date" [min]="hoy">)
 *      hora      -> Validators.required        (<select>)
 *      motivo    -> Validators.required, Validators.minLength(3)
 * 4. get horasLibres(): string[] {
 *      return this.citaService.horasDisponibles(this.formulario.controls.fecha.value);
 *    }
 *    En el <select> de hora: @for (hora of horasLibres; track hora) { <option>... }
 *    Si no hay horas libres, mostrar "No hay horarios disponibles ese día".
 * 5. Copiar campoInvalido() y enviar() de dueno-form.ts.
 */
@Component({
  selector: 'app-cita-form',
  imports: [ReactiveFormsModule],
  templateUrl: './cita-form.html',
})
export class CitaForm {}
