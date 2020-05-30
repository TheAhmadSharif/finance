import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DueBillComponent } from './due-bill.component';

describe('DueBillComponent', () => {
  let component: DueBillComponent;
  let fixture: ComponentFixture<DueBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DueBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DueBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
