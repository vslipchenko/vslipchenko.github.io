import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IveCaughtComponent } from './ive-caught.component';

describe('IveCaughtComponent', () => {
  let component: IveCaughtComponent;
  let fixture: ComponentFixture<IveCaughtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IveCaughtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IveCaughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
