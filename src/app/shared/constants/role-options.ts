import { SelectOption } from '../interfaces/select-options';

export const roleOptions: SelectOption[] = [
  {
    label: 'Admin',
    value: '1',
  },
  {
    label: 'Trainer',
    value: '2',
  },
  {
    label: 'Student',
    value: '3',
  },
  {
    label: 'Guest',
    value: '4',
  },
];

export const classroomRoleOptions = roleOptions.filter(
  role => role.label !== 'Admin'
);
