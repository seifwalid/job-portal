import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerPageComponent } from './seeker-page.component';

describe('SeekerPageComponent', () => {
  let component: SeekerPageComponent;
  let fixture: ComponentFixture<SeekerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeekerPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
