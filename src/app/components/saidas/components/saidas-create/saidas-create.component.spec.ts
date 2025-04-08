import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidasCreateComponent } from './saidas-create.component';

describe('SaidasCreateComponent', () => {
  let component: SaidasCreateComponent;
  let fixture: ComponentFixture<SaidasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidasCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
