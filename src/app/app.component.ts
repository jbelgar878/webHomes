import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { HousingLocationComponent } from './Components/housing-location/housing-location.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HousingLocationComponent, RouterModule, RouterLink],
  template: ` <main>
  <a [routerLink]="['/']">
    <header class="brand-name">
      <img class="brand-logo" src="/assets/homes.png" alt="logo" aria-hidden="true">
      
    </header>
  </a>

  <section>
      <button [routerLink]="'/geoMap'">ver tu ubicacion</button>
    </section>
  <section class="content">
    
    
    <router-outlet></router-outlet>
  </section>
</main>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'homes';
}
