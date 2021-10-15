import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaisesCreateComponent } from './components/paises/paises-create/paises-create.component';
import { PaisesViewComponent } from './components/paises/paises-view/paises-view.component';
import { HomeComponent } from './components/views/home/home.component';
import { LoginComponent } from './components/views/login/login.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "paises", component: PaisesViewComponent },
  { path: "paises/create", component: PaisesCreateComponent },
  { path: "paises/update/:id", component: PaisesCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
