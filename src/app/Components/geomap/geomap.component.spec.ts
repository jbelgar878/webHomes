import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeomapComponent } from './geomap.component';

describe('GeomapComponent', () => {
  let component: GeomapComponent;
  let fixture: ComponentFixture<GeomapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeomapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeomapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
