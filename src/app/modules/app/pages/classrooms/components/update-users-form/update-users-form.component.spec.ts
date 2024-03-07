import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsersFormComponent } from './update-users-form.component';

describe('UpdateUsersFormComponent', () => {
  let component: UpdateUsersFormComponent;
  let fixture: ComponentFixture<UpdateUsersFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateUsersFormComponent],
    });
    fixture = TestBed.createComponent(UpdateUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
