import { EstadoCitaPipe } from '../../citas/estado-cita.pipe';
import { EdadPipe } from './edad.pipe';
import { FechaTextoPipe } from './fecha-texto.pipe';

describe('FechaTextoPipe', () => {
  const pipe = new FechaTextoPipe();

  it('formato corto', () => {
    expect(pipe.transform('2026-10-28', 'corta')).toBe('28/10/2026');
  });

  it('formato largo incluye el día y el mes en texto', () => {
    const texto = pipe.transform('2026-10-28');
    expect(texto).toContain('miércoles');
    expect(texto).toContain('octubre');
  });

  it('valor vacío devuelve texto vacío', () => {
    expect(pipe.transform('')).toBe('');
  });
});

describe('EdadPipe', () => {
  const pipe = new EdadPipe();
  const hoy = new Date(2026, 9, 28); // 28 de octubre de 2026

  it('muestra años', () => {
    expect(pipe.transform('2021-03-15', hoy)).toBe('5 años');
  });

  it('muestra meses si tiene menos de un año', () => {
    expect(pipe.transform('2026-02-10', hoy)).toBe('8 meses');
  });
});

describe('EstadoCitaPipe', () => {
  const pipe = new EstadoCitaPipe();

  it('devuelve el texto del estado', () => {
    expect(pipe.transform('pendiente')).toBe('Pendiente');
  });

  it('devuelve la clase de Bootstrap', () => {
    expect(pipe.transform('atendida', 'clase')).toBe('badge text-bg-success');
  });
});
