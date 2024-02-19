import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { HousingService } from '../../housing.service';
import { HousingLocation } from '../../housinglocation';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MapasComponent } from "../mapas/mapas.component";
import { WeatherComponent } from "../weather/weather.component";




@Component({
    selector: 'app-details',
    standalone: true,
    template: `
  <article>
    <img class="listing-photo" [src]="housingLocation?.photo"
      alt="Exterior photo of {{housingLocation?.name}}"/>
    <section class="listing-description">
      <h2 class="listing-heading">{{housingLocation?.name}}</h2>
      <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>
    </section>


    
    <section class="listing-features">
      <h2 class="section-heading">About this housing location</h2>
      <ul>
        <li>Units available: {{housingLocation?.availableUnits}}</li>
        <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
        <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
      </ul>
      
    </section>

    <section>
      <app-weather></app-weather>
    </section>
    
    <section>
      <app-mapas></app-mapas>
    </section>
    <section class="listing-apply">
      <h2 class="section-heading">Apply now to live here</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">First Name</label>
        <input id="first-name" type="text" formControlName="firstName" ngModel required>
        <div *ngIf="applyForm.get('first-name')?.errors && applyForm.get('first-name')?.dirty">
          <p class="error">First name is required</p>
        </div> 
        <label for="last-name">Last Name</label>
        <input id="last-name" type="text" formControlName="lastName" ngModel required>
        <div *ngIf="applyForm.get('last-name')?.errors && applyForm.get('last-name')?.dirty">
          <p class="error">First name is required</p>
        </div> 
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email" ngModel required>
        <div *ngIf="applyForm.get('email')?.errors && applyForm.get('email')?.dirty">
          <p class="error">email is required</p>
          <p class="error" *ngIf="applyForm.get('email')?.errors?.['email']">Email is invalid</p>
        </div>
        <button type="submit" class="primary"  [disabled]="applyForm.invalid">>Apply now</button>
      </form>
    </section>
  </article>
`,
    styleUrl: './details.component.css',
    imports: [CommonModule, RouterOutlet, ReactiveFormsModule, MapasComponent, WeatherComponent]
})

export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor(public fb: FormBuilder) {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });

    this.applyForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

  }

  submitApplication() {
    
    const formData = {
      firstName: this.applyForm.value.firstName ?? '',
      lastName: this.applyForm.value.lastName ?? '',
      email: this.applyForm.value.email ?? ''
    };
  
    localStorage.setItem('applicationData', JSON.stringify(formData));
  
    this.housingService.submitApplication(
      formData.firstName,
      formData.lastName,
      formData.email
    );
  }
  
    devolverCasa() {
      return this.housingLocation;
    }
}
