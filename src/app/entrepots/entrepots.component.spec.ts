import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrepotsComponent } from './entrepots.component';

describe('EntrepotsComponent', () => {
  let component: EntrepotsComponent;
  let fixture: ComponentFixture<EntrepotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrepotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrepotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
