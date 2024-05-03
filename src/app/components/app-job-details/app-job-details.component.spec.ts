import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppJobDetailsComponent } from './app-job-details.component';

describe('AppJobDetailsComponent', () => {
  let component: AppJobDetailsComponent;
  let fixture: ComponentFixture<AppJobDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppJobDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppJobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
