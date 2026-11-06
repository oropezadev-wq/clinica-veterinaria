import { FormControl } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { Agenda } from './citas/agenda/agenda';
import { CitaForm } from './citas/cita-form/cita-form';
import { Cita } from './citas/cita.model';
import { CitaService } from './citas/cita.service';
import { DatosAtencion } from './historial/atencion.model';
import { AtencionForm } from './historial/atencion-form/atencion-form';
import { EtiquetaMascotaPipe } from './mascotas/etiqueta-mascota.pipe';
import { Mascota } from './mascotas/mascota.model';
import { hoyTexto, sumarDias } from './shared/utils/fechas';
import { fechaNoFutura, fechaNoPasada, sinEspacios } from './shared/validators/validadores';

const cita: Cita = {
  id: 9,
  mascotaId: 1,
  fecha: hoyTexto(),
  hora: '10:00',
  motivo: 'Control',
  costo: 30,
  estado: 'pendiente',
};

describe('Validadores propios', () => {
  it('sinEspacios rechaza un texto que solo tiene espacios', () => {
    expect(sinEspacios(new FormControl('   '))).toEqual({ soloEspacios: true });
    expect(sinEspacios(new FormControl('Luna'))).toBeNull();
  });

  it('fechaNoFutura rechaza mañana y acepta hoy', () => {
    expect(fechaNoFutura(new FormControl(sumarDias(hoyTexto(), 1)))).toEqual({ fechaFutura: true });
    expect(fechaNoFutura(new FormControl(hoyTexto()))).toBeNull();
  });

  it('fechaNoPasada rechaza ayer y acepta hoy', () => {
    expect(fechaNoPasada(new FormControl(sumarDias(hoyTexto(), -1)))).toEqual({ fechaPasada: true });
    expect(fechaNoPasada(new FormControl(hoyTexto()))).toBeNull();
  });
});

describe('EtiquetaMascotaPipe', () => {
  it('pone el DNI del dueño antes del nombre', () => {
    const pipe = TestBed.runInInjectionContext(() => new EtiquetaMascotaPipe());
    const mascota = { nombre: 'Firulais', especie: 'Perro', duenoId: 1 } as Mascota;
    expect(pipe.transform(mascota)).toBe('45871236 - Firulais (Perro)');
  });
});

describe('Formulario de cita', () => {
  it('exige un costo mayor que 0', () => {
    const { formulario } = TestBed.createComponent(CitaForm).componentInstance;
    formulario.controls.costo.setValue(0);
    expect(formulario.controls.costo.valid).toBe(false);
    formulario.controls.costo.setValue(40);
    expect(formulario.controls.costo.valid).toBe(true);
  });
});

describe('Formulario de atención', () => {
  function crear(citas: Cita[]) {
    const f = TestBed.createComponent(AtencionForm);
    f.componentRef.setInput('mascotaId', 1);
    f.componentRef.setInput('citas', citas);
    f.componentRef.setInput('veterinarios', []);
    f.detectChanges();
    return f;
  }

  it('toma la fecha y el motivo de la cita elegida', () => {
    const f = crear([cita]);
    const form = f.componentInstance.formulario;
    let enviado: DatosAtencion | undefined;
    f.componentInstance.guardado.subscribe((d) => (enviado = d));
    form.setValue({ citaId: 9, veterinarioId: 1, diagnostico: 'Sano', tratamiento: 'Reposo' });
    f.componentInstance.enviar();
    expect(enviado).toMatchObject({ citaId: 9, fecha: cita.fecha, motivo: 'Control', mascotaId: 1 });
  });

  it('no envía nada si no se eligió una cita', () => {
    const f = crear([cita]);
    let enviado = false;
    f.componentInstance.guardado.subscribe(() => (enviado = true));
    f.componentInstance.formulario.patchValue({ veterinarioId: 1, diagnostico: 'Sano', tratamiento: 'Reposo' });
    f.componentInstance.enviar();
    expect(enviado).toBe(false);
  });

  it('avisa cuando la mascota no tiene citas para atender', () => {
    const f = crear([]);
    expect(f.nativeElement.textContent).toContain('no tiene citas pendientes');
    expect(f.nativeElement.querySelector('form')).toBeNull();
  });
});

describe('Agenda', () => {
  function botones(c: Cita): string[] {
    const f = TestBed.createComponent(Agenda);
    f.componentRef.setInput('citas', [c]);
    f.detectChanges();
    const lista: HTMLButtonElement[] = Array.from(f.nativeElement.querySelectorAll('.card-body button'));
    return lista.map((b) => (b.textContent ?? '').trim());
  }

  it('deja atender o cancelar una cita pendiente de hoy', () => {
    expect(botones(cita)).toEqual(['Atender', 'Cancelar']);
  });

  it('una cita futura se puede cancelar pero todavía no atender', () => {
    expect(botones({ ...cita, fecha: sumarDias(hoyTexto(), 1) })).toEqual(['Cancelar']);
  });
});

describe('CitaService al atender', () => {
  it('solo ofrece citas pendientes de hoy o anteriores de esa mascota', () => {
    const servicio = new CitaService();
    expect(servicio.paraAtender(3).map((c) => c.id)).toEqual([2]);
    expect(servicio.paraAtender(4)).toEqual([]); // su cita es mañana
    servicio.cambiarEstado(2, 'atendida');
    expect(servicio.paraAtender(3)).toEqual([]);
  });

  it('detecta si una mascota tiene citas pendientes', () => {
    const servicio = new CitaService();
    expect(servicio.tienePendientes(4)).toBe(true);
    servicio.cambiarEstado(4, 'cancelada');
    expect(servicio.tienePendientes(4)).toBe(false);
  });
});
