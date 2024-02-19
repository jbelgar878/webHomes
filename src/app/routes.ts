import { Routes } from '@angular/router';
import { HomeComponent } from '../app/Components/home/home.component';
import { DetailsComponent } from './Components/details/details.component';
import { GeomapComponent } from './Components/geomap/geomap.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page'
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details'
    },
    {
      path: 'geoMap',
      component: GeomapComponent,
      title: 'GeoMap'
    }
  ];
  
  export default routeConfig;