import { CitaService } from './citas/cita.service';
import { Dueno } from './duenos/dueno.model';
import { DuenoService } from './duenos/dueno.service';
import { Veterinario } from './historial/veterinario.model';
import { Persona } from './shared/models/persona';
import { hoyTexto, sumarDias } from './shared/utils/fechas';

describe('DuenoService', () => {
  it('registra un dueño con un id nuevo', () => {
    const servicio = new DuenoService();
    const nuevo = servicio.registrar({
      nombres: 'Pedro',
      apellidos: 'Castillo Luna',
      dni: '12345678',
      telefono: '911222333',
      email: 'pedro@correo.com',
      direccion: 'Av. Siempre Viva 123',
    });
    expect(nuevo.id).toBe(4);
    expect(servicio.listar().length).toBe(4);
    expect(servicio.existeDni('12345678')).toBe(true);
  });

  it('elimina un dueño', () => {
    const servicio = new DuenoService();
    expect(servicio.eliminar(1)).toBe(true);
    expect(servicio.buscarPorId(1)).toBeUndefined();
  });
});

describe('CitaService', () => {
  it('no deja agendar en una hora ocupada', () => {
    const servicio = new CitaService();
    const cita = servicio.registrar({
      mascotaId: 1,
      fecha: hoyTexto(),
      hora: '09:00',
      motivo: 'Prueba',
      costo: 30,
    });
    expect(cita).toBeNull();
  });

  it('agenda en una hora libre y la quita de las disponibles', () => {
    const servicio = new CitaService();
    const fecha = sumarDias(hoyTexto(), 10);
    const cita = servicio.registrar({ mascotaId: 1, fecha, hora: '10:00', motivo: 'Prueba', costo: 30 });
    expect(cita?.estado).toBe('pendiente');
    expect(servicio.horasDisponibles(fecha)).not.toContain('10:00');
  });
});

describe('Herencia y polimorfismo', () => {
  it('cada Persona se describe a su manera', () => {
    const personas: Persona[] = [
      new Dueno(1, {
        nombres: 'Ana',
        apellidos: 'Paz',
        dni: '1',
        telefono: '9',
        email: 'ana@correo.com',
        direccion: 'x',
      }),
      new Veterinario(2, 'Jorge', 'Vega', '2', '9', 'Cirugía'),
    ];
    expect(personas.map((p) => p.describir())).toEqual([
      'Dueño · ana@correo.com',
      'Veterinario · Cirugía',
    ]);
    expect(personas[1].nombreCompleto).toBe('Jorge Vega');
  });
});
