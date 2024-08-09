import { Routes } from '@angular/router';
import { AutoresComponent } from './Components/autores/autores.component';
import { CategoriasComponent } from './Components/categorias/categorias.component';
import { LibrosComponent } from './Components/libros/libros.component';
import { UsuariosComponent } from './Components/usuarios/usuarios.component';
import { EmpleadosComponent } from './Components/empleados/empleados.component';
import { PrestamosComponent } from './Components/prestamos/prestamos.component';
import { AuditoriaComponent } from './Components/auditoria/auditoria.component';

export const routes: Routes = [
  { path: 'autores', component: AutoresComponent},
  {path: 'categorias', component: CategoriasComponent},
  {path: 'libros', component: LibrosComponent},
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'empleados', component: EmpleadosComponent},
  {path: 'prestamos', component: PrestamosComponent},
  {path: 'auditorias', component: AuditoriaComponent}
];