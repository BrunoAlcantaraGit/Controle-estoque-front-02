import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelReadComponent } from './painel-read.component';

describe('PainelReadComponent', () => {
  let component: PainelReadComponent;
  let fixture: ComponentFixture<PainelReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
