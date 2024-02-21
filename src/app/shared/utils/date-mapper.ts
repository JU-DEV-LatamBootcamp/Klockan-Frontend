export function transformDateToDateOnly(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${date.getFullYear()}-${month > 9 ? '' : '0'}${month}-${
    day > 9 ? '' : '0'
  }${day}`;
}

export function transform24TimeTo12Time(time: string): string {
  const chunks = time.split(' ');
  const seconds = ':00';
  const indicator = chunks[1];

  if (!indicator) return time + seconds;

  const am = indicator.toLowerCase() === 'am';
  const time24 = chunks[0].split(':');
  const hours = am ? time24[0].padStart(2, '0') : `${parseInt(time24[0]) + 12}`;

  return hours + ':' + time24[1] + seconds;
}
