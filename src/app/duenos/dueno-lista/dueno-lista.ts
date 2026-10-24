import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dueno } from '../dueno.model';

/**
 * Tabla de dueños con buscador y modal de confirmación (Bootstrap).
 * Recibe la lista con @Input y avisa con @Output cuando se quiere eliminar.
 */
@Component({
  selector: 'app-dueno-lista',
  templateUrl: './dueno-lista.html',
})
export class DuenoLista {
  @Input({ required: true }) duenos: Dueno[] = [];
  @Output() eliminar = new EventEmitter<Dueno>();

  busqueda = '';
  seleccionado: Dueno | null = null;

  /** Filtra por nombre o DNI según lo que se escribe en el buscador. */
  get duenosFiltrados(): Dueno[] {
    const texto = this.busqueda.trim().toLowerCase();
    return this.duenos.filter(
      (d) => d.nombreCompleto.toLowerCase().includes(texto) || d.dni.includes(texto),
    );
  }

  buscar(evento: Event): void {
    this.busqueda = (evento.target as HTMLInputElement).value;
  }

  confirmarEliminar(): void {
    if (this.seleccionado) {
      this.eliminar.emit(this.seleccionado);
      this.seleccionado = null;
    }
  }
}
