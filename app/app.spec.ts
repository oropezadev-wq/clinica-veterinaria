import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('se crea la aplicación', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra el menú con las 5 opciones', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const enlaces = (fixture.nativeElement as HTMLElement).querySelectorAll('.nav-link');
    expect(enlaces.length).toBe(5);
  });
});
