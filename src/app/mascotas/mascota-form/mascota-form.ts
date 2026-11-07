import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ESPECIES, DatosMascota, Sexo } from '../mascota.model';
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
      otraEspecie: [''],
      raza: ['', [Validators.required, sinEspacios]],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', [Validators.required, fechaNoFutura]],
      pesoKg: [0, [Validators.required, Validators.min(0.1), Validators.max(150)]],
      duenoId: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get esOtro(): boolean {
    return this.formulario.controls.especie.value === 'Otro';
  }

  /** La especie escrita a mano solo es obligatoria cuando se elige "Otro". */
  cambioEspecie(): void {
    const otra = this.formulario.controls.otraEspecie;
    if (this.esOtro) {
      otra.setValidators([Validators.required, sinEspacios]);
    } else {
      otra.clearValidators();
      otra.setValue('');
    }
    otra.updateValueAndValidity();
  }

  campoInvalido(campo: keyof DatosMascota | 'otraEspecie'): boolean {
    const control = this.formulario.controls[campo];
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const datos = this.formulario.getRawValue();
    this.guardado.emit({
      nombre: datos.nombre,
      especie: this.esOtro ? datos.otraEspecie.trim() : datos.especie,
      raza: datos.raza,
      sexo: datos.sexo as Sexo,
      fechaNacimiento: datos.fechaNacimiento,
      pesoKg: datos.pesoKg,
      duenoId: datos.duenoId,
    });
    this.formulario.reset();
    this.cambioEspecie();
  }
}
