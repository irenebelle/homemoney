import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningPageComponent } from './planning-page.component';

describe('PlanningPageComponent', () => {
  let component: PlanningPageComponent;
  let fixture: ComponentFixture<PlanningPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanningPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
