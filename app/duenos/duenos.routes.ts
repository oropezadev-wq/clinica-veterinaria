import { Routes } from '@angular/router';
import { DuenosPagina } from './duenos-pagina/duenos-pagina';

/** Rutas del módulo de dueños. Se cargan solo cuando se entra a /duenos. */
export const DUENOS_ROUTES: Routes = [{ path: '', component: DuenosPagina }];
