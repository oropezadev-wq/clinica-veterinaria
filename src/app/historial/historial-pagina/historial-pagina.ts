import { Component } from '@angular/core';
import { EncabezadoPagina } from '../../shared/components/encabezado-pagina/encabezado-pagina';
import { AtencionForm } from '../atencion-form/atencion-form';

/**
 * TAREA DE ABRAHAM: historial de atención por mascota.
 * Rutas: /historial (elegir mascota) y /historial/3 (historial de la mascota 3).
 *
 * Pasos:
 * 1. Inyectar ActivatedRoute, Router, MascotaService, AtencionService y VeterinarioService.
 * 2. get mascotaId(): number { return Number(this.route.snapshot.paramMap.get('mascotaId')) || 0; }
 *    (si se navega entre mascotas, mejor suscribirse a this.route.paramMap en ngOnInit)
 * 3. Un <select> con todas las mascotas; al cambiar: this.router.navigate(['/historial', id]).
 * 4. Si hay mascota elegida:
 *    - mostrar <app-tarjeta-mascota [mascota]="..." [mostrarAcciones]="false" />
 *    - lista de atenciones: atencionService.historialDe(mascotaId), con
 *      {{ atencion.fecha | fechaTexto }}, veterinario (veterinarioService.buscarPorId) y
 *      diagnóstico/tratamiento. Sugerencia: acordeón de Bootstrap (accordion).
 *    - <app-atencion-form [mascotaId]="mascotaId" [veterinarios]="..." (guardado)="registrar($event)" />
 * 5. registrar(datos: DatosAtencion): atencionService.registrar(datos) y mensaje de éxito.
 */
@Component({
  selector: 'app-historial-pagina',
  imports: [EncabezadoPagina, AtencionForm],
  template: `
    <app-encabezado-pagina titulo="Historial" subtitulo="Atenciones de cada mascota" icono="📋" />
    <!-- TAREA DE ABRAHAM: selector de mascota e historial (ver pasos en historial-pagina.ts) -->
    <div class="row g-4">
      <div class="col-lg-8"><div class="alert alert-info">Historial en construcción.</div></div>
      <div class="col-lg-4"><app-atencion-form /></div>
    </div>
  `,
})
export class HistorialPagina {}
