import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorReadComponent } from './fornecedor-read.component';

describe('FornecedorReadComponent', () => {
  let component: FornecedorReadComponent;
  let fixture: ComponentFixture<FornecedorReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedorReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FornecedorReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
