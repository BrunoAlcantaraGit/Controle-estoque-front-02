import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidasUpdateComponent } from './saidas-update.component';

describe('SaidasUpdateComponent', () => {
  let component: SaidasUpdateComponent;
  let fixture: ComponentFixture<SaidasUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaidasUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaidasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
