import { City } from './City';
import { Classroom } from './Classroom';
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

export interface ClassroomUser {
  classroom: Classroom;
  user: User;
  role: Role;
}

export interface UserFlat {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  birthdate: string;
  city: string;
  cityCode: string;
  country: string;
  countryCode: string;
  role: string;
  cityId: number;
  countryId: number;
  roleId: number;
}
