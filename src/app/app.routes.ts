import {SearchComponent} from './components/search/search.component';
import {UserDetailComponent} from './components/user-detail/user-detail.component';
import {HomeComponent} from './components/home/home.component';
import {Routes} from '@angular/router';

export const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'user-detail', component: UserDetailComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];
