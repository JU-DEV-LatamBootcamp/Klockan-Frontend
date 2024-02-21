export interface Profile {
  name: string;
  email: string;
  familyName: string;
  givenName: string;
  userName: string;
  country: string;
  city: string;
  address: string;
  birthday: string;
  image: string;
}

export type ProfileKey =
  | 'name'
  | 'email'
  | 'userName'
  | 'country'
  | 'city'
  | 'address'
  | 'birthday';

export interface ProfileField {
  title: string;
  key: ProfileKey;
}
