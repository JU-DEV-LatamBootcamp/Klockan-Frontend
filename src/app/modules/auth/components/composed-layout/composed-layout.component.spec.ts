import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposedLayoutComponent } from './composed-layout.component';

describe('ComposedLayoutComponent', () => {
  let component: ComposedLayoutComponent;
  let fixture: ComponentFixture<ComposedLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComposedLayoutComponent],
    });
    fixture = TestBed.createComponent(ComposedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
