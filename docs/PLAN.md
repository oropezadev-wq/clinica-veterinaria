# Plan de trabajo

Grupo: Wali, Rosmery y Abraham. El 28/10 también se entrega el parcial de Patrones, así que el avance del 28/10 se mantiene corto.

## Etapa 1 — Avance (miércoles 28/10)

Qué se muestra: el documento de las partes 1 y 2, y la aplicación corriendo con su estructura completa.

| Tarea | Responsable | Fecha | Estado |
|---|---|---|---|
| Proyecto Angular creado con Bootstrap, menú y rutas por módulo | Wali | 23/10 | Hecho |
| Modelos, clase `Persona`, servicios con arreglos y datos de ejemplo | Wali | 23/10 | Hecho |
| Pipes `fechaTexto`, `edad`, `estadoCita` y directiva `appResaltarFecha` | Wali | 23/10 | Hecho |
| Página de inicio y módulo Dueños completo (formulario de ejemplo) | Wali | 23/10 | Hecho |
| Pruebas básicas y README | Wali | 23/10 | Hecho |
| Documento parte 1: usuarios, necesidades, problemas y cómo los resuelve la app | Rosmery | 26/10 | Hecho |
| Documento parte 2: bocetos de pantallas (Paint o similar) | Abraham | 26/10 | Hecho |
| Documento parte 2: flujos de usuario (registrar mascota, agendar cita, ver historial) | Rosmery | 26/10 | Hecho |
| Revisar y unir el documento en Word/PDF | Wali | 27/10 | Hecho |
| Repositorio en GitHub con los 3 invitados y el docente con acceso | Wali | 27/10 | Hecho |

## Etapa 2 — Entrega final (fecha por confirmar)

| Tarea | Responsable | Archivos |
|---|---|---|
| Formulario de mascota | Rosmery | `mascotas/mascota-form/` |
| Lista de mascotas con la tarjeta reutilizable | Rosmery | `mascotas/mascotas-pagina/` |
| Formulario de cita con horas libres | Abraham | `citas/cita-form/` |
| Agenda semanal | Abraham | `citas/agenda/`, `citas/citas-pagina/` |
| Historial por mascota y formulario de atención | Abraham | `historial/` |
| Revisar que todo funcione en celular | Wali | — |
| Capturas en el README y de las pruebas | Wali | `README.md` |
| Preparar la sustentación (cada uno explica su parte) | Todos | — |

El módulo Dueños (`src/app/duenos/`) es el modelo que siguen los demás módulos.

## Cómo trabajar

1. Clonar el repositorio y correr `npm ci` y `npm start`.
2. Crear una rama para su parte: `git checkout -b mascotas` (o `citas`, `historial`).
3. Antes de subir, comprobar que `npm test -- --watch=false` y `npm run build` no den error.
4. Subir la rama y abrir un Pull Request; Wali lo revisa y lo une a `main`.

## Para la sustentación

- **Estructura:** una carpeta por funcionalidad, `shared` para lo común, rutas con `loadChildren`.
- **TypeScript:** interfaces para los datos, tipos con valores fijos (`EstadoCita`), clase abstracta `Persona` con herencia y polimorfismo (`describir()`), clase genérica `RepositorioMemoria<T>`.
- **Angular:** componentes que se comunican con `@Input`/`@Output`, formularios reactivos con validaciones, pipes y una directiva propios.
- **Mejora para la clínica:** citas solo en horarios libres, agenda visible por semana, historial a un clic, sin llamadas ni cuadernos.
