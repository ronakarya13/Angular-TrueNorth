import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      // { path: 'home', component: HomeViewComponent },
      // { path: 'catalog', component: CatalogViewComponent },
      { path: '**', redirectTo: '' },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
