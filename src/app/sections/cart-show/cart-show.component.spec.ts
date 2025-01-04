import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartShowComponent } from './cart-show.component';

describe('CartShowComponent', () => {
  let component: CartShowComponent;
  let fixture: ComponentFixture<CartShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
