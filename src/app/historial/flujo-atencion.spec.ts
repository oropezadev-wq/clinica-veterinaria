import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { CitaService } from '../citas/cita.service';
import { AtencionForm } from './atencion-form/atencion-form';
import { AtencionService } from './atencion.service';
import { HistorialPagina } from './historial-pagina/historial-pagina';
import { By } from '@angular/platform-browser';

describe('Flujo de atención', () => {
  it('atender una cita la suma al historial y la marca como Atendida', async () => {
    vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: 'historial/:mascotaId', component: HistorialPagina }])],
    });
    const harness = await RouterTestingHarness.create('/historial/3');
    const texto = harness.routeNativeElement as HTMLElement;

    // La lista muestra la mascota de la ruta, con el DNI de su dueño
    const lista = texto.querySelector('select') as HTMLSelectElement;
    expect(lista.selectedOptions[0].textContent).toContain('70125489 - Rocky');

    const citas = TestBed.inject(CitaService);
    const atenciones = TestBed.inject(AtencionService);
    const previas = atenciones.historialDe(3).length;
    const cita = citas.paraAtender(3)[0];

    const form = harness.fixture.debugElement.query(By.directive(AtencionForm))
      .componentInstance as AtencionForm;
    form.formulario.setValue({
      citaId: cita.id,
      veterinarioId: 2,
      diagnostico: 'Peso adecuado',
      tratamiento: 'Mantener dieta',
    });
    form.enviar();
    harness.detectChanges();

    const nueva = atenciones.historialDe(3)[0];
    expect(atenciones.historialDe(3).length).toBe(previas + 1);
    expect(nueva).toMatchObject({ fecha: cita.fecha, motivo: cita.motivo, veterinarioId: 2 });
    expect(citas.buscarPorId(cita.id)?.estado).toBe('atendida');
    expect(texto.textContent).toContain('no tiene citas pendientes');
  });
});
