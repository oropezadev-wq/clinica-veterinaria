import { Routes } from '@angular/router';
import { CitasPagina } from './citas-pagina/citas-pagina';

/** Rutas del módulo de citas. Se cargan solo cuando se entra a /citas. */
export const CITAS_ROUTES: Routes = [{ path: '', component: CitasPagina }];
