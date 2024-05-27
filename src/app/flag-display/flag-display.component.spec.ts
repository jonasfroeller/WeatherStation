import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FlagDisplayComponent} from './flag-display.component';

describe('FlagDisplayComponent', () => {
  let component: FlagDisplayComponent;
  let fixture: ComponentFixture<FlagDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagDisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlagDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
