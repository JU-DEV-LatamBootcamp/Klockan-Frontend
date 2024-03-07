interface Profile {
  email: string;
  familyName: string;
  givenName: string;
  userName: string;
  country: string;
  city: string;
  birthday: string;
  image: string;
}

type ProfileKey =
  | 'email'
  | 'familyName'
  | 'givenName'
  | 'userName'
  | 'country'
  | 'city'
  | 'birthday';

interface ProfileField {
  title: string;
  key: ProfileKey;
}
