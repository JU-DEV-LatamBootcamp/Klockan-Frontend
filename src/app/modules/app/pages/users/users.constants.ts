import {
  TableComponentCommonColumns,
  TableComponentTypeColumn,
} from 'src/app/shared/components/table/table-component';
import { User } from '../../../../shared/models/User';

export const userTypeColumns: TableComponentTypeColumn<User>[] = [
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
    selector: 'city',
  },
  {
    selector: 'role',
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
