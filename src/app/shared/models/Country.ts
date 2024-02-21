import { City } from './City';

export interface Country {
  id: number;
  name: string;
  code: string;
  cities: Array<City>;
}
