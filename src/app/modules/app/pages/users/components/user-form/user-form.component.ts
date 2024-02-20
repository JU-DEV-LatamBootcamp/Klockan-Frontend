import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { City } from 'src/app/shared/models/City';
import { Country } from 'src/app/shared/models/Country';
import { Role } from 'src/app/shared/models/Role';
import { User } from 'src/app/shared/models/User';
import { CountriesService } from 'src/app/shared/services/countries.service';
import { UserService } from 'src/app/shared/services/user.service';
import { userRoles } from '../../users.constants';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.sass'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
  ],
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  countries: Country[] = [];
  cities: City[] = [];
  roles: Role[] = userRoles;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly countriesService: CountriesService,
    private readonly dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.fetchCountries();
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      id: [this.data?.id],
      firstName: [this.data ? this.data.firstName : '', Validators.required],
      lastName: [this.data ? this.data.lastName : '', Validators.required],
      birthdate: [
        this.data ? this.data.birthdate : new Date(),
        Validators.required,
      ],
      email: [this.data ? this.data.email : '', Validators.required],
      country: [this.data ? this.data.country : '', Validators.required],
      city: [this.data ? this.data.city : '', Validators.required],
      role: [this.data ? this.data.role : '', Validators.required],
    });
  }

  fetchCountries(): void {
    this.countriesService.getAll().subscribe({
      next: v => (this.countries = v),
    });
  }

  public getFieldError(field: string): string | null {
    const control = this.userForm.get(field);
    if (control?.hasError('required')) {
      return 'This field is required.';
    } else if (control?.hasError('maxlength')) {
      const errors = control.errors ? control.errors['maxlength'] : null;
      const maxLength = errors ? errors.requiredLength : 0;
      return `This field cannot be longer than ${maxLength} characters.`;
    }
    return null;
  }

  public onSubmit(): void {
    if (this.userForm.valid) {
      this.createUser();
    } else this.userForm.markAllAsTouched();
  }

  private createUser(): void {
    this.userService.create(this.userForm.value).subscribe({
      next: user => {
        this.dialogRef.close(user);
      },
      error: error => {
        console.error('Error creating user ', error);
      },
    });
  }
}
