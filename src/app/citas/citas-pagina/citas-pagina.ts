import { Component } from '@angular/core';
import { EncabezadoPagina } from '../../shared/components/encabezado-pagina/encabezado-pagina';
import { Agenda } from '../agenda/agenda';
import { CitaForm } from '../cita-form/cita-form';

/**
 * TAREA DE ABRAHAM: página de citas.
 * Modelo a copiar: src/app/duenos/duenos-pagina/
 *
 * Pasos:
 * 1. Inyectar CitaService y MascotaService.
 * 2. get citas(): Cita[] y get mascotas(): Mascota[].
 * 3. registrar(datos: DatosCita): citaService.registrar(datos) devuelve null si la hora
 *    está ocupada -> mostrar error; si no, mensaje de éxito.
 * 4. nombreMascota = (id: number): string => this.mascotaService.buscarPorId(id)?.nombre ?? '';
 *    (función flecha para poder pasarla como @Input a la agenda)
 * 5. cambiarEstado(evento): citaService.cambiarEstado(evento.id, evento.estado).
 * 6. HTML: formulario arriba o a la izquierda y la agenda debajo.
 */
@Component({
  selector: 'app-citas-pagina',
  imports: [EncabezadoPagina, CitaForm, Agenda],
  template: `
    <app-encabezado-pagina titulo="Citas" subtitulo="Agenda de atención por semana" icono="📅" />
    <div class="row g-4">
      <div class="col-lg-4"><app-cita-form /></div>
      <div class="col-lg-8"><app-agenda /></div>
    </div>
  `,
})
export class CitasPagina {}
