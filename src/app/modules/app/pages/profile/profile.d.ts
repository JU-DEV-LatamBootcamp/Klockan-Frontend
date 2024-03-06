interface Profile {
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

type ProfileKey =
  | 'name'
  | 'email'
  | 'userName'
  | 'country'
  | 'city'
  | 'address'
  | 'birthday'
  | 'image';

interface ProfileField {
  title: string;
  key: ProfileKey;
}
