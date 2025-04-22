import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasReadComponent } from './vendas-read.component';

describe('VendasReadComponent', () => {
  let component: VendasReadComponent;
  let fixture: ComponentFixture<VendasReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VendasReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendasReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
