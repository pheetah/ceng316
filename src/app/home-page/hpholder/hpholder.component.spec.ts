import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HpholderComponent } from './hpholder.component';

describe('HpholderComponent', () => {
  let component: HpholderComponent;
  let fixture: ComponentFixture<HpholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HpholderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HpholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
