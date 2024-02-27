import {
  TableComponentCommonColumns,
  TableComponentTypeColumn,
} from 'src/app/shared/components/table/table-component';
import { UserFlat } from '../../../../shared/models/User';

export const userTypeColumns: TableComponentTypeColumn<UserFlat>[] = [
  {
    selector: 'id',
    header: 'ID',
    sort: {
      active: true,
      direction: 'asc',
    },
  },
  {
    selector: 'firstName',
  },
  {
    selector: 'lastName',
  },
  {
    selector: 'email',
  },
  {
    selector: 'role',
  },
  {
    selector: 'city',
  },
  {
    selector: 'country',
  },
];

export const userCommonColumns: TableComponentCommonColumns = {
  actions: {
    options: {
      delete: true,
      edit: true,
    },
  },
};

// This is to skip the actions column for trainers
export const userTrainerColumns: TableComponentCommonColumns = {};

export const userRoles = [
  { id: 1, name: 'Admin' },
  { id: 2, name: 'Trainer' },
  { id: 3, name: 'Student' },
  { id: 4, name: 'Guest' },
];
