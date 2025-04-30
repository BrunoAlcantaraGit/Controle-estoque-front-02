import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaCreateComponent } from './saida-create.component';

describe('SaidaCreateComponent', () => {
  let component: SaidaCreateComponent;
  let fixture: ComponentFixture<SaidaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
