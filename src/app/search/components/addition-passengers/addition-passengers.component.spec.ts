import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionPassengersComponent } from './addition-passengers.component';

describe('AdditionPassengersComponent', () => {
  let component: AdditionPassengersComponent;
  let fixture: ComponentFixture<AdditionPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionPassengersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
