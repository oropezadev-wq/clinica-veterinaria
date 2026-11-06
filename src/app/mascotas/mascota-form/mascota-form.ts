import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ESPECIES, DatosMascota } from '../mascota.model';
import { fechaNoFutura, sinEspacios } from '../../shared/validators/validadores';
import { Dueno } from '../../duenos/dueno.model';

@Component({
  selector: 'app-mascota-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mascota-form.html',
})
export class MascotaForm {
  @Output() guardado = new EventEmitter<DatosMascota>();
  @Input({ required: true }) duenos: Dueno[] = [];

  especiesList = ESPECIES;

  formulario;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.nonNullable.group({
      nombre: ['', [Validators.required, Validators.minLength(2), sinEspacios]],
      especie: ['', Validators.required],
      raza: ['', [Validators.required, sinEspacios]],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, fechaNoFutura]],
      pesoKg: [0, [Validators.required, Validators.min(0.1), Validators.max(150)]],
      duenoId: [0, [Validators.required, Validators.min(1)]],
    });
  }

  campoInvalido(campo: keyof DatosMascota): boolean {
    const control = this.formulario.controls[campo];
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.guardado.emit(this.formulario.getRawValue() as DatosMascota);
    this.formulario.reset();
  }
}
