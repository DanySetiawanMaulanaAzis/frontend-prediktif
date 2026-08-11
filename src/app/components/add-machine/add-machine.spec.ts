import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMachine } from './add-machine';

describe('AddMachine', () => {
  let component: AddMachine;
  let fixture: ComponentFixture<AddMachine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMachine],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMachine);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
