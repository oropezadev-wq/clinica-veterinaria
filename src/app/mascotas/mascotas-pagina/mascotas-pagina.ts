import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EncabezadoPagina } from '../../shared/components/encabezado-pagina/encabezado-pagina';
import { MascotaForm } from '../mascota-form/mascota-form';
import { TarjetaMascota } from '../tarjeta-mascota/tarjeta-mascota';
import { MascotaService } from '../mascota.service';
import { DuenoService } from '../../duenos/dueno.service';
import { CitaService } from '../../citas/cita.service';
import { Mascota, DatosMascota } from '../mascota.model';
import { Dueno } from '../../duenos/dueno.model';

@Component({
  selector: 'app-mascotas-pagina',
  standalone: true,
  imports: [CommonModule, EncabezadoPagina, MascotaForm, TarjetaMascota],
  templateUrl: './mascotas-pagina.html',
})
export class MascotasPagina {
  private mascotaService: MascotaService = inject(MascotaService);
  private duenoService: DuenoService = inject(DuenoService);
  private citaService: CitaService = inject(CitaService);
  private router: Router = inject(Router);

  // 1 y 2. Getters para listar mascotas y dueños
  get mascotas(): Mascota[] {
    return this.mascotaService.listar();
  }

  get duenos(): Dueno[] {
    return this.duenoService.listar();
  }

  // 3. Registrar una nueva mascota
  registrar(datos: DatosMascota): void {
    this.mascotaService.registrar(datos);
    alert('¡Mascota registrada con éxito!');
  }

  // 4. Obtener el nombre del dueño por su ID
  nombreDueno(id: number): string {
    const dueno = this.duenoService.buscarPorId(id);
    return dueno ? (dueno.nombreCompleto || dueno.nombres || 'Desconocido') : 'Desconocido';
  }

  // 5. Eliminar una mascota
  eliminar(mascota: Mascota): void {
    if (this.citaService.tienePendientes(mascota.id)) {
      alert(`${mascota.nombre} tiene citas pendientes; no se puede eliminar.`);
      return;
    }
    if (confirm(`¿Estás seguro de eliminar a ${mascota.nombre}?`)) {
      this.mascotaService.eliminar(mascota.id);
    }
  }

  // 6. Navegar al historial médico de la mascota
  verHistorial(mascota: Mascota): void {
    this.router.navigate(['/historial', mascota.id]);
  }
}
