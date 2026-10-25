import { Routes } from '@angular/router';
import { MascotasPagina } from './mascotas-pagina/mascotas-pagina';

/** Rutas del módulo de mascotas. Se cargan solo cuando se entra a /mascotas. */
export const MASCOTAS_ROUTES: Routes = [{ path: '', component: MascotasPagina }];
