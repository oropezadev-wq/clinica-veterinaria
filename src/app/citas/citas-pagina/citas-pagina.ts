import { Component, inject } from '@angular/core';
import { EncabezadoPagina } from '../../shared/components/encabezado-pagina/encabezado-pagina';
import { Agenda } from '../agenda/agenda';
import { CitaForm } from '../cita-form/cita-form';
import { CitaService } from '../cita.service';
import { MascotaService } from '../../mascotas/mascota.service';
import { DatosCita, Cita, EstadoCita } from '../cita.model';
import { Mascota } from '../../mascotas/mascota.model';

@Component({
  selector: 'app-citas-pagina',
  standalone: true,
  imports: [EncabezadoPagina, CitaForm, Agenda],
  template: `
    <app-encabezado-pagina titulo="Citas" subtitulo="Agenda de atención por semana" icono="📅" />
    
    <div class="row g-4">
      <!-- Formulario para agendar nueva cita -->
      <div class="col-lg-4">
        <app-cita-form [mascotas]="mascotas" (guardado)="registrar($event)" />
      </div>

      <!-- Agenda semanal con el listado y botones de acción -->
      <div class="col-lg-8">
        <app-agenda 
          [citas]="citas" 
          [nombreMascota]="nombreMascota" 
          (cambiarEstado)="cambiarEstado($event)" />
      </div>
    </div>
  `,
})
export class CitasPagina {
  private citaService = inject(CitaService);
  private mascotaService = inject(MascotaService);

  // Obtener todas las citas registradas
  get citas(): Cita[] {
    return this.citaService.listar();
  }

  // Obtener la lista de mascotas
  get mascotas(): Mascota[] {
    return this.mascotaService.listar();
  }

  // Registrar nueva cita validando si la hora está libre
  registrar(datos: DatosCita): void {
    const resultado = this.citaService.registrar(datos);
    if (resultado === null) {
      alert('Error: La hora seleccionada ya está ocupada para esa fecha.');
    } else {
      alert('¡Cita agendada con éxito!');
    }
  }

  // Función flecha para buscar el nombre de la mascota por su ID
  nombreMascota = (id: number): string => {
    const mascota = this.mascotaService.buscarPorId(id);
    return mascota ? mascota.nombre : 'Desconocida';
  };

  // Cambiar el estado de una cita (Atendida / Cancelada)
  cambiarEstado(evento: { id: number; estado: EstadoCita }): void {
    this.citaService.cambiarEstado(evento.id, evento.estado);
  }
}