import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'ng-zorro',
    loadChildren: () => import("./modules/ng-zorro/ng-zorro.module")
    .then(m => m.NgZorroModule)
  },
  {
    path: 'prime-ng',
    loadChildren: () => import("./modules/prime-ng/prime-ng.module")
    .then(m => m.PrimeNgModule)
  },
  {
    path: '',
    redirectTo: 'ng-zorro',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
