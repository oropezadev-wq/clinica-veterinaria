import { Injectable } from '@angular/core';
import { RepositorioMemoria } from '../shared/services/repositorio-memoria';
import { hoyTexto, sumarDias } from '../shared/utils/fechas';
import { Atencion, DatosAtencion } from './atencion.model';

@Injectable({ providedIn: 'root' })
export class AtencionService extends RepositorioMemoria<Atencion> {
  protected override datosIniciales(): Atencion[] {
    const hoy = hoyTexto();
    return [
      {
        id: 1,
        citaId: 7,
        mascotaId: 1,
        veterinarioId: 1,
        fecha: sumarDias(hoy, -120),
        motivo: 'Vómitos',
        diagnostico: 'Gastritis leve',
        tratamiento: 'Dieta blanda por 5 días y omeprazol',
      },
      {
        id: 2,
        citaId: 1,
        mascotaId: 1,
        veterinarioId: 1,
        fecha: sumarDias(hoy, -7),
        motivo: 'Vacuna antirrábica',
        diagnostico: 'Sano',
        tratamiento: 'Vacuna aplicada; próxima dosis en un año',
      },
      {
        id: 3,
        citaId: 8,
        mascotaId: 3,
        veterinarioId: 2,
        fecha: sumarDias(hoy, -60),
        motivo: 'Cojera pata trasera',
        diagnostico: 'Esguince',
        tratamiento: 'Reposo 10 días y antiinflamatorio',
      },
    ];
  }

  registrar(datos: DatosAtencion): Atencion {
    return this.guardar({ id: this.siguienteId(), ...datos });
  }

  /** Historial de una mascota, de la atención más reciente a la más antigua. */
  historialDe(mascotaId: number): Atencion[] {
    return this.datos
      .filter((a) => a.mascotaId === mascotaId)
      .sort((a, b) => b.fecha.localeCompare(a.fecha));
  }
}
