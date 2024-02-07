import {
  TableComponentCommonColumns,
  TableComponentTypeColumn,
} from 'src/app/shared/components/table/table-component';
import { Program } from 'src/app/shared/models/Programs';

export const programTypeColumns: TableComponentTypeColumn<Program>[] = [
  {
    selector: 'id',
    header: 'ID',
  },
  {
    selector: 'name',
  },
  {
    selector: 'description',
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
