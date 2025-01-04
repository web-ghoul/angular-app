import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundSectionComponent } from './not-found-section.component';

describe('NotFoundSectionComponent', () => {
  let component: NotFoundSectionComponent;
  let fixture: ComponentFixture<NotFoundSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotFoundSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
