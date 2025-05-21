import { Routes } from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {InfoComponent} from './components/info/info.component';
import {AddUpdateComponent} from './components/add-update/add-update.component';

export const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'UserInfo/:id', component: InfoComponent },
  { path: 'UpdateUser/:id', component: AddUpdateComponent},
  { path: 'CreateUser', component: AddUpdateComponent}
];
