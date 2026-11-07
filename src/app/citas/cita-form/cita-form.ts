import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatosCita } from '../cita.model';
import { Mascota } from '../../mascotas/mascota.model';
import { CitaService } from '../cita.service';
import { EtiquetaMascotaPipe } from '../../mascotas/etiqueta-mascota.pipe';
import { horaActual, hoyTexto } from '../../shared/utils/fechas';
import { fechaNoPasada } from '../../shared/validators/validadores';

interface OpcionMotivo {
  titulo: string;
  costo: number;
}

@Component({
  selector: 'app-cita-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EtiquetaMascotaPipe],
  templateUrl: './cita-form.html',
})
export class CitaForm {
  private fb = inject(FormBuilder);
  private citaService = inject(CitaService);

  @Input({ required: true }) mascotas: Mascota[] = [];
  @Output() guardado = new EventEmitter<DatosCita>();

  // Servicios de la clínica con su precio
  readonly motivos: OpcionMotivo[] = [
    { titulo: 'Control de peso', costo: 20 },
    { titulo: 'Corte de uñas', costo: 20 },
    { titulo: 'Desparasitación', costo: 25 },
    { titulo: 'Consulta general', costo: 30 },
    { titulo: 'Vacunación', costo: 35 },
    { titulo: 'Revisión de oídos', costo: 40 },
    { titulo: 'Baño medicado', costo: 45 },
  ];

  get hoy(): string {
    return hoyTexto();
  }

  formulario = this.fb.nonNullable.group({
    mascotaId: [0, [Validators.required, Validators.min(1)]],
    fecha: [hoyTexto(), [Validators.required, fechaNoPasada]],
    hora: ['', Validators.required],
    motivo: ['', Validators.required],
    costo: [0, [Validators.required, Validators.min(20), Validators.max(45)]],
  });

  get horasLibres(): string[] {
    const fechaSeleccionada = this.formulario.controls.fecha.value;
    const libres = this.citaService.horasDisponibles(fechaSeleccionada);
    // Si la cita es para hoy, solo se ofrecen las horas que todavía no pasaron
    return fechaSeleccionada === hoyTexto() ? libres.filter((h) => h > horaActual()) : libres;
  }

  /** Al cambiar de fecha, la hora elegida puede ya no estar libre. */
  limpiarHora(): void {
    this.formulario.controls.hora.setValue('');
  }

  /** Al elegir el motivo, se carga su precio. */
  actualizarCosto(): void {
    const elegido = this.motivos.find((m) => m.titulo === this.formulario.controls.motivo.value);
    this.formulario.controls.costo.setValue(elegido ? elegido.costo : 0);
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
      costo: 0,
    });
  }
}
