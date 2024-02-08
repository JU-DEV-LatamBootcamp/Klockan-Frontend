import {
  TableComponentCommonColumns,
  TableComponentTypeColumn,
} from 'src/app/shared/components/table/table-component';
import { Program } from 'src/app/shared/models/Programs';

export const programTypeColumns: TableComponentTypeColumn<Program>[] = [
  {
    selector: 'id',
    header: 'ID',
    sort: {
      active: true,
      direction: 'asc',
    },
  },
  {
    selector: 'name',
    width: '40%',
  },
  {
    selector: 'description',
    width: '60%',
  },
];

export const programCommonColumns: TableComponentCommonColumns = {
  actions: {
    options: {
      delete: true,
      edit: true,
    },
  },
};
