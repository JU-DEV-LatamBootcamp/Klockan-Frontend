import { User, UserFlat } from '../models/User';

export function mapUserToFlatObject({
  id,
  firstName,
  lastName,
  avatar,
  email,
  birthdate,
  city: { name: cityName, code: cityCode },
  country: { name: countryName, code: countryCode },
  role: { name: roleName },
}: User): UserFlat {
  return {
    id,
    firstName,
    lastName,
    avatar,
    email,
    birthdate,
    cityName,
    cityCode,
    countryName,
    countryCode,
    roleName,
  };
}
