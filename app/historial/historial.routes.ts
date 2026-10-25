import { Routes } from '@angular/router';
import { HistorialPagina } from './historial-pagina/historial-pagina';

/** Rutas del módulo de historial: /historial y /historial/:mascotaId */
export const HISTORIAL_ROUTES: Routes = [
  { path: '', component: HistorialPagina },
  { path: ':mascotaId', component: HistorialPagina },
];
