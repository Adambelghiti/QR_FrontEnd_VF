import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricantsComponent } from './fabricants.component';

describe('FabricantsComponent', () => {
  let component: FabricantsComponent;
  let fixture: ComponentFixture<FabricantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabricantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
