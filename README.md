# Clínica Veterinaria Huellitas

Aplicación web en **Angular** y **TypeScript** para digitalizar la atención de una clínica veterinaria:

- Registrar dueños y sus mascotas.
- Agendar citas y verlas en una agenda semanal, solo en horarios libres.
- Consultar el historial de atención de cada mascota.

Proyecto del curso **Desarrollo de Interfaces 3** (IDAT). Los datos se guardan en arreglos dentro de los servicios (no hay base de datos): al recargar la página vuelven los datos de ejemplo.

## Integrantes

| Integrante | Parte del proyecto |
|---|---|
| Wali Jhonatan Oropeza Ávila | Estructura del proyecto, menú, inicio, modelos y servicios, carpeta `shared` (pipes, directiva, componentes), módulo Dueños, README |
| Rosmery Espinoza | Módulo Mascotas, documento de análisis y diseño (necesidades, problemas, flujos) |
| Abraham Lopez Marmanillo | Módulo Citas (formulario y agenda) y módulo Historial, bocetos de pantallas |

## Tecnologías

| Herramienta | Versión |
|---|---|
| Node.js | 20.19 o superior |
| Angular | 21 |
| TypeScript | 5.9 |
| Bootstrap | 5.3 |
| Vitest (pruebas) | 4 |

## Instalación

```bash
git clone <enlace-del-repositorio>
cd clinica-veterinaria
npm ci
```

> Si `npm ci` falla con el error `Cannot read properties of null (reading 'edgesOut')`, es un error de npm 10.8. Se soluciona con `npx npm@11 ci`.

## Ejecución

```bash
npm start
```

Abrir <http://localhost:4200>.

## Pruebas

```bash
npm test -- --watch=false
```

Prueban los pipes (fechas, edad, estado de cita, etiqueta de mascota), los servicios (registrar, eliminar, horario ocupado), los validadores propios, los formularios de cita y atención, los botones de la agenda, el flujo completo de atención y la herencia de `Persona`.

<!-- Pegar aquí la captura del resultado de las pruebas -->

## Estructura del proyecto

```
src/app/
├── shared/                  Lo que usan todos los módulos
│   ├── models/persona.ts        Clase abstracta Persona
│   ├── services/repositorio-memoria.ts   Clase base genérica (arreglo en memoria)
│   ├── pipes/                   fechaTexto, edad
│   ├── validators/              sinEspacios, fechaNoFutura, fechaNoPasada
│   ├── directives/              appResaltarFecha (resalta lo de hoy)
│   ├── components/              menú y encabezado de página
│   └── utils/fechas.ts          funciones para fechas "AAAA-MM-DD"
├── inicio/                  Resumen del día
├── duenos/                  Módulo Dueños (modelo, servicio, formulario, tabla, página, rutas)
├── mascotas/                Módulo Mascotas (incluye la tarjeta reutilizable)
├── citas/                   Módulo Citas (pipe estadoCita, formulario, agenda)
└── historial/               Módulo Historial (atenciones y veterinarios)
```

Cada módulo tiene su archivo `*.routes.ts` y se carga cuando el usuario entra a esa sección (`loadChildren` en `app.routes.ts`).

## Qué se aplicó de la rúbrica

| Criterio | Dónde está |
|---|---|
| Tipos, interfaces y funciones tipadas | `*.model.ts` (interfaces `Mascota`, `Cita`, `Atencion`; tipos `Especie`, `EstadoCita`) |
| POO: herencia, abstracción, polimorfismo, encapsulamiento | `Persona` (abstracta) → `Dueno` y `Veterinario`; `RepositorioMemoria<T>` → todos los servicios; `datos` es `protected` |
| Arquitectura modular | Una carpeta por funcionalidad + `shared`, con rutas propias |
| Componentes con `@Input` / `@Output` | `DuenoForm`, `DuenoLista`, `TarjetaMascota`, `EncabezadoPagina` |
| Pipes y directivas personalizados | `fechaTexto`, `edad`, `estadoCita`, `appResaltarFecha` |
| Bootstrap | Navbar adaptable, cards, tablas, alertas, modal de confirmación, formularios con validación |
| ReactiveForms | `DuenoForm` (y los formularios de mascota, cita y atención) |

## Capturas

<!-- Agregar capturas de cada pantalla al terminar -->
