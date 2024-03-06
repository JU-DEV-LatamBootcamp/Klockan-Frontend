import { Component, OnInit } from '@angular/core';
import { BASE_PROFILE, PROFILE_FIELDS } from '../profile/profile.constants';
import { Router } from '@angular/router';
import { KeycloakService } from 'src/app/core/services/keycloak/keycloak.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
interface User {
  email: string;
  name: string;
  userName: string;
  birthday: Date | string;
  image: string;
  password: string;
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass'],
})
export class EditProfileComponent implements OnInit {
  userDetails: Profile = BASE_PROFILE;
  originalUserDetails: Profile = BASE_PROFILE;
  infoFields: ProfileField[] = PROFILE_FIELDS;

  excludedFields = ['Email', 'Country', 'City', 'Address'];

  constructor(
    private readonly router: Router,
    private readonly keycloakService: KeycloakService,
    private readonly userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeUserProfile();
  }
  private initializeUserProfile(): void {
    if (!this.keycloakService.getToken) {
      this.router.navigate(['/auth']);
    } else {
      this.setUserDetails();
    }
  }
  private setUserDetails(): void {
    const userDetails = this.keycloakService.getUserDetails();
    if (userDetails) {
      this.userDetails = { ...this.userDetails, ...userDetails };
      this.originalUserDetails = {
        ...this.originalUserDetails,
        ...userDetails,
      };
    }
  }

  submitForm() {
    const user: Partial<User> = {};
    user.email = this.userDetails.email;

    console.log('Profile changed');
    if (this.userDetails.name != this.originalUserDetails.name) {
      user.name = this.userDetails.name;
    }
    if (this.userDetails.userName != this.originalUserDetails.userName) {
      user.userName = this.userDetails.userName;
    }
    if (this.userDetails.birthday != this.originalUserDetails.birthday) {
      user.birthday = this.userDetails.birthday;
      const fechaNormal = new Date(this.userDetails.birthday);
      user.birthday = fechaNormal.toISOString();
    }
    if (this.userDetails.image != this.originalUserDetails.image) {
      user.image = this.userDetails.image;
    }

    this.userService.edit(user);
  }
}
