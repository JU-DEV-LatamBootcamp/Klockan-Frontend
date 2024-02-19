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
