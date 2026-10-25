import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';

/**
 * Cada funcionalidad (dueños, mascotas, citas, historial) es un módulo con sus propias rutas.
 * loadChildren carga ese módulo solo cuando el usuario entra (carga diferida o "lazy loading").
 */
export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: Inicio, title: 'Inicio · Huellitas' },
  {
    path: 'duenos',
    title: 'Dueños · Huellitas',
    loadChildren: () => import('./duenos/duenos.routes').then((m) => m.DUENOS_ROUTES),
  },
  {
    path: 'mascotas',
    title: 'Mascotas · Huellitas',
    loadChildren: () => import('./mascotas/mascotas.routes').then((m) => m.MASCOTAS_ROUTES),
  },
  {
    path: 'citas',
    title: 'Citas · Huellitas',
    loadChildren: () => import('./citas/citas.routes').then((m) => m.CITAS_ROUTES),
  },
  {
    path: 'historial',
    title: 'Historial · Huellitas',
    loadChildren: () => import('./historial/historial.routes').then((m) => m.HISTORIAL_ROUTES),
  },
  { path: '**', redirectTo: 'inicio' },
];
