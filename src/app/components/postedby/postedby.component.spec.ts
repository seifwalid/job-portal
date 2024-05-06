import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedbyComponent } from './postedby.component';

describe('PostedbyComponent', () => {
  let component: PostedbyComponent;
  let fixture: ComponentFixture<PostedbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostedbyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostedbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
