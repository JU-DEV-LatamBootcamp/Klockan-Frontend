import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomFormComponent } from './classroom-form.component';

describe('ClassroomFormComponent', () => {
  let component: ClassroomFormComponent;
  let fixture: ComponentFixture<ClassroomFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomFormComponent]
    });
    fixture = TestBed.createComponent(ClassroomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
