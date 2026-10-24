import { Component } from '@angular/core';
import { EncabezadoPagina } from '../../shared/components/encabezado-pagina/encabezado-pagina';
import { MascotaForm } from '../mascota-form/mascota-form';

/**
 * TAREA DE ROSMERY: página de mascotas.
 * Modelo a copiar: src/app/duenos/duenos-pagina/
 *
 * Pasos:
 * 1. Inyectar MascotaService y DuenoService en el constructor.
 * 2. get mascotas(): Mascota[]  -> this.mascotaService.listar()
 *    get duenos(): Dueno[]      -> this.duenoService.listar()
 * 3. registrar(datos: DatosMascota): llama a mascotaService.registrar y muestra un mensaje.
 * 4. nombreDueno(id: number): string -> busca con duenoService.buscarPorId(id)?.nombreCompleto
 * 5. eliminar(mascota: Mascota): llama a mascotaService.eliminar(mascota.id).
 * 6. verHistorial(mascota: Mascota): navegar con Router a /historial/{id}
 *    (this.router.navigate(['/historial', mascota.id])).
 * 7. En el HTML: el formulario a la izquierda y, a la derecha, un @for con
 *    <app-tarjeta-mascota> (ya está hecho en ../tarjeta-mascota, solo se usa).
 */
@Component({
  selector: 'app-mascotas-pagina',
  imports: [EncabezadoPagina, MascotaForm],
  templateUrl: './mascotas-pagina.html',
})
export class MascotasPagina {}
