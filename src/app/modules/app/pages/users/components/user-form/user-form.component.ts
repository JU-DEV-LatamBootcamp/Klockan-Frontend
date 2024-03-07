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
import { formatDate } from 'src/app/shared/utils/date-formatter';
import { KeycloakService } from 'src/app/core/services/keycloak/keycloak.service';

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
  userRoles: string[] | undefined;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly countriesService: CountriesService,
    private readonly keycloakService: KeycloakService,
    private readonly dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.userRoles = this.keycloakService.getUserDetails()?.roles;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchCountries();
  }

  initializeForm(): void {
    this.userForm = this.formBuilder.group({
      id: [this.data?.id],
      firstName: [this.data ? this.data.firstName : '', Validators.required],
      lastName: [this.data ? this.data.lastName : '', Validators.required],
      birthdate: [this.data ? this.data.birthdate : '', Validators.required],
      email: [this.data ? this.data.email : '', Validators.required],
      country: [this.data ? this.data.country : '', Validators.required],
      cityId: [this.data ? this.data.city : '', Validators.required],
      roleId: [this.data ? this.data.role : '', Validators.required],
    });
  }

  fetchCountries(): void {
    this.countriesService.getAll().subscribe({
      next: v => (this.countries = v),
    });
  }

  updateCities(id: number): void {
    const country = this.countries.find(c => c.id === id);
    if (country) this.cities = country.cities;
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
      if (this.data) {
        this.updateUser();
      } else {
        this.createUser();
      }
    } else this.userForm.markAllAsTouched();
  }

  private createUser(): void {
    const user = this.userForm.value;
    const formattedBirthdate = formatDate(user.birthdate);
    user.birthdate = formattedBirthdate;
    this.userService.create(user).subscribe({
      next: user => {
        this.dialogRef.close(user);
      },
      error: error => {
        console.error('Error creating user ', error);
      },
    });
  }

  private updateUser(): void {
    const user = this.userForm.value;
    console.log(user);
    const formattedBirthdate = formatDate(user.birthdate);
    user.birthdate = formattedBirthdate;
    delete user.country;
    console.log(user);
    this.userService.edit(user).subscribe({
      next: user => {
        this.dialogRef.close(user);
      },
      error: error => {
        console.error('Error creating user ', error);
      },
    });
  }
}
