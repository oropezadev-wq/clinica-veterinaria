import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosCita } from '../cita.model'; // Ajusta la ruta si es necesario
import { Mascota } from '../../mascotas/mascota.model'; // Ajusta la ruta según tu estructura
import { CitaService } from '../cita.service'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cita-form.html',
})
export class CitaForm {
  private fb = inject(FormBuilder);
  private citaService = inject(CitaService);

  // Paso 1: @Input de mascotas y @Output de guardado
  @Input({ required: true }) mascotas: Mascota[] = [];
  @Output() guardado = new EventEmitter<DatosCita>();

  // Función de ayuda para la fecha de hoy en formato texto (YYYY-MM-DD)
  private hoyTexto(): string {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  }

  // Getter para el atributo [min] del input de fecha
  get hoy(): string {
    return this.hoyTexto();
  }

  // 3. Definición del formulario con nonNullable y validaciones
  formulario = this.fb.nonNullable.group({
    mascotaId: [0, [Validators.required, Validators.min(1)]],
    fecha: [this.hoyTexto(), Validators.required],
    hora: ['', Validators.required],
    motivo: ['', [Validators.required, Validators.minLength(3)]],
  });

  // 4. Getter para obtener las horas libres según la fecha seleccionada usando el CitaService
  get horasLibres(): string[] {
    const fechaSeleccionada = this.formulario.controls.fecha.value;
    return this.citaService.horasDisponibles(fechaSeleccionada);
  }

  // 5. Función de ayuda para pintar en rojo los campos con error (copiada de dueno-form)
  campoInvalido(campo: keyof DatosCita): boolean {
    const control = this.formulario.controls[campo as keyof typeof this.formulario.controls];
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  // 5. Al enviar: valida, emite el evento y limpia el formulario
  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.guardado.emit(this.formulario.getRawValue());
    this.formulario.reset({
      mascotaId: 0,
      fecha: this.hoyTexto(),
      hora: '',
      motivo: '',
    });
  }
}