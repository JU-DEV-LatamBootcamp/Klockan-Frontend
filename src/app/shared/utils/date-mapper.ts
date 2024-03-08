import * as moment from 'moment';

export function transformStringDateToDateOnly(stringDate: string): string {
  return moment.utc(stringDate).format('YYYY-MM-DD');
}
