import { Component } from '@angular/core';
import { EncabezadoPagina } from '../../shared/components/encabezado-pagina/encabezado-pagina';
import { MascotaService } from '../../mascotas/mascota.service';
import { DuenoForm } from '../dueno-form/dueno-form';
import { DuenoLista } from '../dueno-lista/dueno-lista';
import { DatosDueno, Dueno } from '../dueno.model';
import { DuenoService } from '../dueno.service';

/**
 * Página "padre": usa el formulario y la tabla (componentes "hijos")
 * y es la única que habla con los servicios.
 */
@Component({
  selector: 'app-duenos-pagina',
  imports: [EncabezadoPagina, DuenoForm, DuenoLista],
  templateUrl: './duenos-pagina.html',
})
export class DuenosPagina {
  mensaje = '';
  error = '';

  constructor(
    private duenoService: DuenoService,
    private mascotaService: MascotaService,
  ) {}

  get duenos(): Dueno[] {
    return this.duenoService.listar();
  }

  registrar(datos: DatosDueno): void {
    this.limpiarAvisos();
    if (this.duenoService.existeDni(datos.dni)) {
      this.error = `Ya existe un dueño con DNI ${datos.dni}.`;
      return;
    }
    const nuevo = this.duenoService.registrar(datos);
    this.mensaje = `Se registró a ${nuevo.nombreCompleto}.`;
  }

  eliminar(dueno: Dueno): void {
    this.limpiarAvisos();
    if (this.mascotaService.listarPorDueno(dueno.id).length > 0) {
      this.error = `${dueno.nombreCompleto} tiene mascotas registradas; no se puede eliminar.`;
      return;
    }
    this.duenoService.eliminar(dueno.id);
    this.mensaje = `Se eliminó a ${dueno.nombreCompleto}.`;
  }

  private limpiarAvisos(): void {
    this.mensaje = '';
    this.error = '';
  }
}
