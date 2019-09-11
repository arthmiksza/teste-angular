import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UserComponent } from "./pages/user/user.component";
import { UserRegistryComponent } from "./pages/user/userregistry/userregistry.component";


const routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      state: 'Users'
    }
  },
  {
    path: 'registry',
    component: UserRegistryComponent,
    data: {
      state: 'User Registry'
    }
  },
  {
    path: 'registry/:id',
    component: UserRegistryComponent,
    data: {
      state: 'User Registry'
    }
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}