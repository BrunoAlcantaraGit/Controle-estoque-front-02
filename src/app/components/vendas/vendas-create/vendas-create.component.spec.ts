import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasCreateComponent } from './vendas-create.component';

describe('VendasCreateComponent', () => {
  let component: VendasCreateComponent;
  let fixture: ComponentFixture<VendasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendasCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
