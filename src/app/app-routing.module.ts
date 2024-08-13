import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { EntrepotsComponent } from './entrepots/entrepots.component';
import { EntrepotFormComponent } from './entrepot-form/entrepot-form.component';
import { FabricantsComponent } from './fabricants/fabricants.component';
import { FabricantFormComponent } from './fabricant-form/fabricant-form.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { FournisseurFormComponent } from './fournisseur-form/fournisseur-form.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ArticleComponent } from './article/article.component';  // Add this import


export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/new', component: ArticleFormComponent },
  { path: 'articles/edit/:id', component: ArticleFormComponent },
  { path: 'articles/view/:id', component: ArticleComponent },
  { path: 'entrepots', component: EntrepotsComponent },
  { path: 'entrepots/new', component: EntrepotFormComponent },
  { path: 'entrepots/edit/:id', component: EntrepotFormComponent },
  { path: 'fabricants', component: FabricantsComponent },
  { path: 'fabricants/new', component: FabricantFormComponent },
  { path: 'fabricants/edit/:id', component: FabricantFormComponent },
  { path: 'fournisseurs', component: FournisseursComponent },
  { path: 'fournisseurs/new', component: FournisseurFormComponent },
  { path: 'fournisseurs/edit/:id', component: FournisseurFormComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
