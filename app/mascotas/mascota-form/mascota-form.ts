import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ESPECIES, DatosMascota } from '../mascota.model'; 


@Component({
  selector: 'app-mascota-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mascota-form.html',
})
export class MascotaForm {
  @Output() guardado = new EventEmitter<DatosMascota>();

  @Input({ required: true }) duenos: any[] = [];

  
  especiesList = ESPECIES;

  formulario;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.nonNullable.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      pesoKg: [0, [Validators.required, Validators.min(0.1)]],
      duenoId: [0, [Validators.required, Validators.min(1)]],
    });
  }

  // 2. Función de ayuda para pintar en rojo los campos con error
  campoInvalido(campo: keyof DatosMascota): boolean {
    const control = this.formulario.controls[campo];
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // 3. Al enviar: valida, emite el evento con getRawValue() y limpia el formulario
  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.guardado.emit(this.formulario.getRawValue() as DatosMascota);
    this.formulario.reset();
  }
}