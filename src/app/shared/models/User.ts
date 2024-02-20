import { City } from './City';
import { Country } from './Country';
import { Role } from './Role';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  birthdate: string;
  city: City;
  country: Country;
  role: Role;
}

export interface UserFlat {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  birthdate: string;
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  roleName: string;
}
