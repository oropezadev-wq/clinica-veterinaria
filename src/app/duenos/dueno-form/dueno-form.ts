import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosDueno } from '../dueno.model';
import { SOLO_LETRAS, sinEspacios } from '../../shared/validators/validadores';

/**
 * EJEMPLO RESUELTO de formulario reactivo (ReactiveForms).
 * Úsenlo como modelo para los formularios de mascota, cita y atención.
 *
 * Este componente NO guarda nada: solo valida y avisa al padre con @Output.
 * Así se puede reutilizar (el padre decide qué hacer con los datos).
 */
@Component({
  selector: 'app-dueno-form',
  imports: [ReactiveFormsModule],
  templateUrl: './dueno-form.html',
})
export class DuenoForm {
  /** Evento que se emite cuando el formulario es válido y se presiona "Registrar". */
  @Output() guardado = new EventEmitter<DatosDueno>();

  // 1. Se define el formulario con sus campos y validaciones
  formulario;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.nonNullable.group({
      nombres: ['', [Validators.required, Validators.minLength(2), Validators.pattern(SOLO_LETRAS), sinEspacios]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.pattern(SOLO_LETRAS), sinEspacios]],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      telefono: ['', [Validators.required, Validators.pattern('^9[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required, sinEspacios]],
    });
  }

  // 2. Función de ayuda para pintar en rojo los campos con error
  campoInvalido(campo: keyof DatosDueno): boolean {
    const control = this.formulario.controls[campo];
    return control.invalid && control.touched;
  }

  // 3. Al enviar: si hay errores se muestran; si no, se emite el evento y se limpia
  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.guardado.emit(this.formulario.getRawValue());
    this.formulario.reset();
  }
}
