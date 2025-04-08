import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidasFormComponent } from './saidas-form.component';

describe('SaidasFormComponent', () => {
  let component: SaidasFormComponent;
  let fixture: ComponentFixture<SaidasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidasFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
