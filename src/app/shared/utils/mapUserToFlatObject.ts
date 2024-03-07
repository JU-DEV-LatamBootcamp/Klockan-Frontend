import { User, UserFlat } from '../models/User';

export function mapUserToFlatObject({
  id,
  firstName,
  lastName,
  avatar,
  email,
  birthdate,
  city: { id: cityId, name: cityName, code: cityCode },
  country: { id: countryId, name: countryName, code: countryCode },
  role: { id: roleId, name: roleName },
}: User): UserFlat {
  return {
    id,
    firstName,
    lastName,
    avatar,
    email,
    birthdate,
    city: cityName,
    cityCode,
    cityId,
    country: countryName,
    countryCode,
    countryId,
    role: roleName,
    roleId,
  };
}
