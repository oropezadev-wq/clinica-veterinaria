import { Component, Input } from '@angular/core';

/**
 * Componente reutilizable: título de cada página.
 * Uso: <app-encabezado-pagina titulo="Dueños" subtitulo="..." icono="👤" />
 */
@Component({
  selector: 'app-encabezado-pagina',
  template: `
    <div class="mb-4 border-bottom pb-2">
      <h1 class="h3 mb-1">{{ icono }} {{ titulo }}</h1>
      @if (subtitulo) {
        <p class="text-body-secondary mb-0">{{ subtitulo }}</p>
      }
    </div>
  `,
})
export class EncabezadoPagina {
  @Input({ required: true }) titulo = '';
  @Input() subtitulo = '';
  @Input() icono = '';
}
