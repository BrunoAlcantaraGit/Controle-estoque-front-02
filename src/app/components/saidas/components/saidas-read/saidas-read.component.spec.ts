import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidasReadComponent } from './saidas-read.component';

describe('SaidasReadComponent', () => {
  let component: SaidasReadComponent;
  let fixture: ComponentFixture<SaidasReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidasReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidasReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
