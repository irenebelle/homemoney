import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryEventsComponent } from './history-events.component';

describe('HistoryEventsComponent', () => {
  let component: HistoryEventsComponent;
  let fixture: ComponentFixture<HistoryEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
