import { Injectable } from '@angular/core';
import { RepositorioMemoria } from '../shared/services/repositorio-memoria';
import { DatosDueno, Dueno } from './dueno.model';

/**
 * Servicio de dueños. HEREDA listar, buscarPorId y eliminar de RepositorioMemoria.
 * providedIn: 'root' => hay una sola instancia para toda la app,
 * así todos los componentes ven el mismo arreglo.
 */
@Injectable({ providedIn: 'root' })
export class DuenoService extends RepositorioMemoria<Dueno> {
  protected override datosIniciales(): Dueno[] {
    return [
      new Dueno(1, {
        nombres: 'Lucía',
        apellidos: 'Ramírez Torres',
        dni: '45871236',
        telefono: '987654321',
        email: 'lucia.ramirez@correo.com',
        direccion: 'Av. Arequipa 1250, Lince',
      }),
      new Dueno(2, {
        nombres: 'Carlos',
        apellidos: 'Mendoza Ríos',
        dni: '70125489',
        telefono: '956321478',
        email: 'carlos.mendoza@correo.com',
        direccion: 'Jr. Huancavelica 340, Cercado de Lima',
      }),
      new Dueno(3, {
        nombres: 'Ana',
        apellidos: 'Quispe Huamán',
        dni: '41236587',
        telefono: '912345678',
        email: 'ana.quispe@correo.com',
        direccion: 'Calle Los Pinos 85, San Juan de Lurigancho',
      }),
    ];
  }

  registrar(datos: DatosDueno): Dueno {
    return this.guardar(new Dueno(this.siguienteId(), datos));
  }

  existeDni(dni: string): boolean {
    return this.datos.some((d) => d.dni === dni);
  }
}
