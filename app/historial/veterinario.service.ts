import { Injectable } from '@angular/core';
import { RepositorioMemoria } from '../shared/services/repositorio-memoria';
import { Veterinario } from './veterinario.model';

@Injectable({ providedIn: 'root' })
export class VeterinarioService extends RepositorioMemoria<Veterinario> {
  protected override datosIniciales(): Veterinario[] {
    return [
      new Veterinario(1, 'María', 'Gonzales Paz', '40123456', '999111222', 'Medicina general'),
      new Veterinario(2, 'Jorge', 'Salazar Vega', '42789654', '999333444', 'Cirugía'),
    ];
  }
}
