import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {ProduitComponent} from './produit/produit.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProduitResolver} from './produit/produit.resolver';

export const appRoutes: Routes = [
  {path: 'produit', component: ProduitComponent,  resolve: { produits : ProduitResolver} } ,
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' } , ProduitResolver]
,
  exports: [RouterModule]
})

export class AppRoutingModule {

}
