import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { weekdayOptions } from 'src/app/shared/constants/weekday-options';
import { SelectOption } from 'src/app/shared/interfaces/select-options';
import { OPanelService } from 'src/app/shared/layouts/app-layout/services/o-panel/o-panel.service';
import { Classroom } from 'src/app/shared/models/Classroom';
import { Schedule } from 'src/app/shared/models/Schedule';
import { ClassroomService } from 'src/app/shared/services/classroom.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { ProgramService } from 'src/app/shared/services/program.service';
import { transform12TimeTo24Time } from 'src/app/shared/utils/time-mapper';
import { ClassroomFormComponent } from '../classroom-form/classroom-form.component';
import { map, tap } from 'rxjs';
import { ClassroomUser } from 'src/app/shared/models/ClassroomUser';
import { UserService } from 'src/app/shared/services/user.service';
import { roleOptions } from 'src/app/shared/constants/role-options';

export type UpdateUsersForm = FormGroup<{
  id: FormControl<string | null>;
  userId: FormControl<string | null>;
  roleId: FormControl<string | null>;
}>;

export type UpdateUsersFormData = {
  classroom?: Classroom;
  onSuccess?: (classroom: Classroom) => void;
  onError?: (error: unknown) => void;
};

@Component({
  selector: 'app-add-users-form',
  templateUrl: './update-users-form.component.html',
  styleUrls: ['./update-users-form.component.sass'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class UpdateUsersFormComponent {
  roleOptions = roleOptions;
  usersForm!: FormGroup;
  userOptions: SelectOption[] = [];
  data?: UpdateUsersFormData;

  constructor(
    private readonly formBuilder: FormBuilder,
    public readonly classroomService: ClassroomService,
    public readonly programService: ProgramService,
    public readonly courseService: CourseService,
    public readonly userService: UserService,
    public readonly panelService: OPanelService
  ) {}

  async ngOnInit(): Promise<void> {
    this.data = this.panelService.data as UpdateUsersFormData;
    this.initializeForm();

    await this.fetchClassroomUsers();
    await this.fetchUserOptions();
  }

  fetchUserOptions() {
    this.userService
      .getAll()
      .pipe(
        map((users): SelectOption[] =>
          users.map(({ firstName, lastName, id }) => ({
            label: firstName + ' ' + lastName,
            value: id.toString(),
          }))
        )
      )
      .subscribe(options => {
        this.userOptions = options;
      });
  }

  private fetchClassroomUsers() {
    if (!this.data?.classroom) return;

    this.classroomService
      .getUsers(this.data.classroom.id)
      .pipe(
        tap(users => {
          users.forEach(user => {
            this.addUser(user);
          });
        })
      )
      .subscribe();
  }

  private initializeForm(): void {
    this.usersForm = this.formBuilder.group({
      users: new FormArray<UpdateUsersForm>([]),
    });
  }

  get users(): FormArray {
    return this.usersForm.get('users') as FormArray<UpdateUsersForm>;
  }

  addUser(user: ClassroomUser | null = null) {
    const userGroup: UpdateUsersForm = this.formBuilder.group({
      id: [user?.id ? user.id.toString() : ''],
      userId: [user ? user.userId.toString() : '', [Validators.required]],
      roleId: [user ? user.roleId.toString() : '', [Validators.required]],
    });

    this.users.push(userGroup);
  }

  get userControls(): FormGroup[] {
    return this.users.controls as FormGroup[];
  }

  public getFieldError(field: string): string | null {
    const control = this.usersForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required.';
    } else if (control?.hasError('maxlength')) {
      const errors = control.errors ? control.errors['maxlength'] : null;
      const maxLength = errors ? errors.requiredLength : 0;
      return `This field cannot be longer than ${maxLength} characters.`;
    }
    return null;
  }

  onSubmit() {
    if (!this.data?.classroom?.id) return;

    const users = this.getClassroomUsersFromForm();
    this.classroomService
      .updateUsers(this.data.classroom.id, users)
      .subscribe(newUsers => {
        // TODO: show snackbar
        console.log(newUsers);
      });
    this.openClassroomForm();
  }

  getClassroomUsersFromForm(): ClassroomUser[] {
    return this.userControls.map(group => ({
      id: (group.get('id')?.value as number) || 0,
      userId: group.get('userId')?.value as number,
      roleId: group.get('roleId')?.value as number,
    }));
  }

  get requestHandler() {
    return {
      next: (classroom: Classroom) => {
        this.panelService.close();
        if (this.data?.onSuccess) {
          this.data?.onSuccess(classroom);
        }
      },
      error: (error: Error) => {
        if (this.data?.onError) {
          this.data?.onError(error);
        }
      },
    };
  }

  openClassroomForm() {
    this.panelService.openFromComponent(ClassroomFormComponent);
  }
}
