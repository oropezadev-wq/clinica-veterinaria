import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EncabezadoPagina } from '../../shared/components/encabezado-pagina/encabezado-pagina';
import { AtencionForm } from '../atencion-form/atencion-form';
import { AtencionService } from '../atencion.service';
import { VeterinarioService } from '../veterinario.service';
import { MascotaService } from '../../mascotas/mascota.service';
import { EtiquetaMascotaPipe } from '../../mascotas/etiqueta-mascota.pipe';
import { Cita } from '../../citas/cita.model';
import { CitaService } from '../../citas/cita.service';
import { Mascota } from '../../mascotas/mascota.model';
import { Atencion, DatosAtencion } from '../atencion.model';
import { Veterinario } from '../veterinario.model';
import { FechaTextoPipe } from '../../shared/pipes/fecha-texto.pipe';

@Component({
  selector: 'app-historial-pagina',
  standalone: true,
  imports: [CommonModule, EncabezadoPagina, AtencionForm, FechaTextoPipe, EtiquetaMascotaPipe],
  template: `
    <app-encabezado-pagina titulo="Historial" subtitulo="Atenciones de cada mascota" icono="📋" />
    
    <!-- Selector de mascota -->
    <div class="row mb-4">
      <div class="col-md-6">
        <label class="form-label fw-bold">Seleccionar Mascota:</label>
        <select class="form-select" (change)="onSeleccionarMascota($event)">
          <option value="0" disabled [selected]="mascotaId === 0">-- Elija una mascota --</option>
          @for (m of mascotas; track m.id) {
            <option [value]="m.id" [selected]="m.id === mascotaId">{{ m | etiquetaMascota }}</option>
          }
        </select>
      </div>
    </div>

    @if (mascotaId > 0 && mascotaActual) {
      <div class="row g-4">
        <!-- Columna Izquierda: Historial y Atenciones -->
        <div class="col-lg-8">
          <div class="card shadow-sm mb-4">
            <div class="card-body">
              <h5 class="card-title text-primary">🐾 {{ mascotaActual.nombre }}</h5>
              <p class="text-muted mb-1">Especie: {{ mascotaActual.especie }} | Raza: {{ mascotaActual.raza }}</p>
              <p class="text-muted">Peso: {{ mascotaActual.pesoKg }} kg</p>
            </div>
          </div>

          <!-- Acordeón de atenciones -->
          <div class="accordion" id="accordionAtenciones">
            @for (atencion of atenciones; track atencion.id; let i = $index) {
              <div class="accordion-item">
                <h2 class="accordion-header" [id]="'heading' + i">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" [attr.data-bs-target]="'#collapse' + i" aria-expanded="false" [aria-controls]="'collapse' + i">
                    📅 {{ atencion.fecha | fechaTexto }} &nbsp;-&nbsp; 🩺 Dr(a). {{ nombreVeterinario(atencion.veterinarioId) }}
                  </button>
                </h2>
                <div [id]="'collapse' + i" class="accordion-collapse collapse" [aria-labelledby]="'heading' + i" data-bs-parent="#accordionAtenciones">
                  <div class="accordion-body">
                    <p><strong>Motivo:</strong> {{ atencion.motivo }}</p>
                    <p><strong>Diagnóstico:</strong> {{ atencion.diagnostico }}</p>
                    <p class="mb-0"><strong>Tratamiento:</strong> {{ atencion.tratamiento }}</p>
                  </div>
                </div>
              </div>
            } @empty {
              <div class="alert alert-warning text-center">No hay atenciones registradas para esta mascota.</div>
            }
          </div>
        </div>

        <!-- Columna Derecha: Formulario para nueva atención -->
        <div class="col-lg-4">
          <app-atencion-form 
            [mascotaId]="mascotaId" 
            [citas]="citasParaAtender" 
            [veterinarios]="veterinarios" 
            (guardado)="registrar($event)" />
        </div>
      </div>
    } @else {
      <div class="alert alert-info">Por favor, seleccione una mascota para ver su historial médico y atenciones.</div>
    }
  `,
})
export class HistorialPagina implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private mascotaService: MascotaService = inject(MascotaService);
  private atencionService: AtencionService = inject(AtencionService);
  private citaService: CitaService = inject(CitaService);
  private veterinarioService: VeterinarioService = inject(VeterinarioService);

  mascotaId: number = 0;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.mascotaId = Number(params.get('mascotaId')) || 0;
    });
  }

  get mascotas(): Mascota[] {
    return this.mascotaService.listar();
  }

  get mascotaActual(): Mascota | undefined {
    return this.mascotaService.buscarPorId(this.mascotaId);
  }

  get atenciones(): Atencion[] {
    return this.atencionService.historialDe(this.mascotaId);
  }

  get citasParaAtender(): Cita[] {
    return this.citaService.paraAtender(this.mascotaId);
  }

  get veterinarios(): Veterinario[] {
    return this.veterinarioService.listar();
  }

  onSeleccionarMascota(event: Event): void {
    const id = (event.target as HTMLSelectElement).value;
    this.router.navigate(['/historial', id]);
  }

  nombreVeterinario(id: number): string {
    const vet = this.veterinarioService.buscarPorId(id);
    return vet ? vet.nombreCompleto : 'Desconocido';
  }

  registrar(datos: DatosAtencion): void {
    this.atencionService.registrar(datos);
    this.citaService.cambiarEstado(datos.citaId, 'atendida');
    alert('¡Atención médica registrada con éxito!');
  }
}
