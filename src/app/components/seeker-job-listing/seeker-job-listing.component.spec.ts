import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerJobListingComponent } from './seeker-job-listing.component';

describe('SeekerJobListingComponent', () => {
  let component: SeekerJobListingComponent;
  let fixture: ComponentFixture<SeekerJobListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeekerJobListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeekerJobListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
