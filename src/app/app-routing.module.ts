import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ViewItemsComponent} from './components/view-items/view-items.component';

const routes: Routes = [
  {
    path: '',
    component: ViewItemsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
