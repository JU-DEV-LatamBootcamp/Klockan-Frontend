export function transform12TimeTo24Time(time: string): string {
  const chunks = time.split(' ');
  const seconds = ':00';
  const indicator = chunks[1];

  if (!indicator) return time + seconds;

  const am = indicator.toLowerCase() === 'am';
  const time24 = chunks[0].split(':');
  const hours = am ? time24[0].padStart(2, '0') : `${parseInt(time24[0]) + 12}`;

  return hours + ':' + time24[1] + seconds;
}

export function transformDateTimeToTimePickerString(dateTime: string) {
  // HH:MM:SS => HH:MM
  const chunks = dateTime.split(':');
  return chunks[0] + ':' + chunks[1];
}
