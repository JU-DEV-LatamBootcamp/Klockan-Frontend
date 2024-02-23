export default function getTimeOnlyFromString(timeString: string): string {
  const timeParts = timeString.split(' ');

  let time = timeParts[0];

  const meridian = timeParts[1];

  if (meridian === 'AM') {
    const [hours, minutes] = time.split(':');
    time = `${hours.padStart(2, '0')}:${minutes}`;
  }

  time += ':00';

  return time;
}
