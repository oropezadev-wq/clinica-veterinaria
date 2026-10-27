import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosCita } from '../cita.model';
import { Mascota } from '../../mascotas/mascota.model';
import { CitaService } from '../cita.service';
import { hoyTexto } from '../../shared/utils/fechas';

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cita-form.html',
})
export class CitaForm {
  private fb = inject(FormBuilder);
  private citaService = inject(CitaService);

  @Input({ required: true }) mascotas: Mascota[] = [];
  @Output() guardado = new EventEmitter<DatosCita>();

  get hoy(): string {
    return hoyTexto();
  }

  formulario = this.fb.nonNullable.group({
    mascotaId: [0, [Validators.required, Validators.min(1)]],
    fecha: [hoyTexto(), Validators.required],
    hora: ['', Validators.required],
    motivo: ['', [Validators.required, Validators.minLength(3)]],
  });

  get horasLibres(): string[] {
    const fechaSeleccionada = this.formulario.controls.fecha.value;
    return this.citaService.horasDisponibles(fechaSeleccionada);
  }

  campoInvalido(campo: keyof DatosCita): boolean {
    const control = this.formulario.controls[campo as keyof typeof this.formulario.controls];
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  enviar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.guardado.emit(this.formulario.getRawValue());
    this.formulario.reset({
      mascotaId: 0,
      fecha: hoyTexto(),
      hora: '',
      motivo: '',
    });
  }
}