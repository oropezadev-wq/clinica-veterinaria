import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface OpcionMenu {
  ruta: string;
  texto: string;
}

/** Barra de navegación de Bootstrap. En celular se pliega con el botón ☰. */
@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
})
export class Menu {
  opciones: OpcionMenu[] = [
    { ruta: '/inicio', texto: 'Inicio' },
    { ruta: '/duenos', texto: 'Dueños' },
    { ruta: '/mascotas', texto: 'Mascotas' },
    { ruta: '/citas', texto: 'Citas' },
    { ruta: '/historial', texto: 'Historial' },
  ];
}
