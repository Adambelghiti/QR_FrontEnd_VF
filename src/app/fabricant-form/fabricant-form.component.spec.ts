import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricantFormComponent } from './fabricant-form.component';

describe('FabricantFormComponent', () => {
  let component: FabricantFormComponent;
  let fixture: ComponentFixture<FabricantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FabricantFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FabricantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
