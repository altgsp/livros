import { LivroFormComponent } from './componentes/livro-form/livro-form.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './componentes/card/card.component';

const routes: Routes = [
  {path:'lista', component:ListaComponent},
  {path:'add', component:LivroFormComponent},
  {path:'edit/:id', component:LivroFormComponent},
  {path:'cards', component:CardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
