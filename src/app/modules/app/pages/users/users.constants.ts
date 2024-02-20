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
    selector: 'roleName',
  },
  {
    selector: 'cityName',
  },
  {
    selector: 'countryName',
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
