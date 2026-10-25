import { Injectable } from '@angular/core';
import { RepositorioMemoria } from '../shared/services/repositorio-memoria';
import { DatosMascota, Mascota } from './mascota.model';

@Injectable({ providedIn: 'root' })
export class MascotaService extends RepositorioMemoria<Mascota> {
  protected override datosIniciales(): Mascota[] {
    return [
      {
        id: 1,
        nombre: 'Firulais',
        especie: 'Perro',
        raza: 'Labrador',
        sexo: 'Macho',
        fechaNacimiento: '2021-03-15',
        pesoKg: 28,
        duenoId: 1,
      },
      {
        id: 2,
        nombre: 'Michi',
        especie: 'Gato',
        raza: 'Siamés',
        sexo: 'Hembra',
        fechaNacimiento: '2022-07-02',
        pesoKg: 4.2,
        duenoId: 1,
      },
      {
        id: 3,
        nombre: 'Rocky',
        especie: 'Perro',
        raza: 'Bulldog francés',
        sexo: 'Macho',
        fechaNacimiento: '2019-11-20',
        pesoKg: 12.5,
        duenoId: 2,
      },
      {
        id: 4,
        nombre: 'Pelusa',
        especie: 'Conejo',
        raza: 'Mini lop',
        sexo: 'Hembra',
        fechaNacimiento: '2025-01-10',
        pesoKg: 1.8,
        duenoId: 3,
      },
    ];
  }

  registrar(datos: DatosMascota): Mascota {
    return this.guardar({ id: this.siguienteId(), ...datos });
  }

  listarPorDueno(duenoId: number): Mascota[] {
    return this.datos.filter((m) => m.duenoId === duenoId);
  }
}
