import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cita } from '../citas/cita.model';
import { CitaService } from '../citas/cita.service';
import { EstadoCitaPipe } from '../citas/estado-cita.pipe';
import { DuenoService } from '../duenos/dueno.service';
import { MascotaService } from '../mascotas/mascota.service';
import { VeterinarioService } from '../historial/veterinario.service';
import { EncabezadoPagina } from '../shared/components/encabezado-pagina/encabezado-pagina';
import { ResaltarFechaDirective } from '../shared/directives/resaltar-fecha.directive';
import { Persona } from '../shared/models/persona';
import { FechaTextoPipe } from '../shared/pipes/fecha-texto.pipe';
import { hoyTexto } from '../shared/utils/fechas';

interface Resumen {
  titulo: string;
  valor: number;
  ruta: string;
}

/** Página de inicio: resumen del día. */
@Component({
  selector: 'app-inicio',
  imports: [RouterLink, EncabezadoPagina, FechaTextoPipe, EstadoCitaPipe, ResaltarFechaDirective],
  templateUrl: './inicio.html',
})
export class Inicio {
  hoy = hoyTexto();

  constructor(
    private duenoService: DuenoService,
    private mascotaService: MascotaService,
    private citaService: CitaService,
    private veterinarioService: VeterinarioService,
  ) {}

  get resumen(): Resumen[] {
    return [
      { titulo: 'Dueños', valor: this.duenoService.listar().length, ruta: '/duenos' },
      { titulo: 'Mascotas', valor: this.mascotaService.listar().length, ruta: '/mascotas' },
      {
        titulo: 'Citas de hoy',
        valor: this.citaService.citasDelDia(this.hoy).length,
        ruta: '/citas',
      },
      { titulo: 'Citas pendientes', valor: this.citaService.proximas().length, ruta: '/citas' },
    ];
  }

  get proximasCitas(): Cita[] {
    return this.citaService.proximas().slice(0, 5);
  }

  /** Polimorfismo: dueños y veterinarios en una sola lista de Persona; cada uno se describe a su manera. */
  get personas(): Persona[] {
    return [...this.veterinarioService.listar(), ...this.duenoService.listar()];
  }

  nombreMascota(id: number): string {
    return this.mascotaService.buscarPorId(id)?.nombre ?? '—';
  }
}
