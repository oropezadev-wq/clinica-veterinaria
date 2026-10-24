import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * TAREA DE ROSMERY: formulario reactivo para registrar una mascota.
 * Modelo a copiar: src/app/duenos/dueno-form/ (mismo esquema).
 *
 * Pasos:
 * 1. Agregar @Output() guardado = new EventEmitter<DatosMascota>();
 * 2. Agregar @Input({ required: true }) duenos: Dueno[] = [];  (para el <select> de dueño)
 * 3. En el constructor, crear el formulario con this.fb.nonNullable.group({...}) y estos campos:
 *      nombre          -> Validators.required, Validators.minLength(2)
 *      especie         -> Validators.required  (opciones: ESPECIES de mascota.model.ts)
 *      raza            -> Validators.required
 *      sexo            -> Validators.required  ('Macho' | 'Hembra')
 *      fechaNacimiento -> Validators.required  (<input type="date">)
 *      pesoKg          -> Validators.required, Validators.min(0.1)
 *      duenoId         -> Validators.required  (<select> con los dueños, valor = dueno.id)
 *    Ojo: pesoKg y duenoId son números (valor inicial 0).
 * 4. Copiar campoInvalido() y enviar() de dueno-form.ts.
 * 5. En el HTML: un <select> para especie y otro para dueño, usando @for.
 */
@Component({
  selector: 'app-mascota-form',
  imports: [ReactiveFormsModule],
  templateUrl: './mascota-form.html',
})
export class MascotaForm {}
