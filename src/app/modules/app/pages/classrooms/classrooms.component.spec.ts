import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomsComponent } from './classrooms.component';

describe('ClassroomsComponent', () => {
  let component: ClassroomsComponent;
  let fixture: ComponentFixture<ClassroomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomsComponent]
    });
    fixture = TestBed.createComponent(ClassroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
