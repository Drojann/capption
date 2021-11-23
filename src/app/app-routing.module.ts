import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventarioComponent } from './inventario/inventario.component';
import { LoginComponent } from './login/login.component';
import { NavegacionComponent } from './navegacion/navegacion.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: DashboardComponent},
  { path: 'navegacion', component: NavegacionComponent},
  { path: 'inventario', component: InventarioComponent},
  //{ path: '**', pathMatch: 'full', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
