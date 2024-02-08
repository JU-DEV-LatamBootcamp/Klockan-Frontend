import {
  TableComponentCommonColumns,
  TableComponentTypeColumn,
} from 'src/app/shared/components/table/table-component';
import { Course } from 'src/app/shared/models/Courses';

export const courseTypeColumns: TableComponentTypeColumn<Course>[] = [
  {
    selector: 'id',
    header: 'ID',
  },
  {
    selector: 'name',
    width: '30%',
  },
  {
    selector: 'description',
    width: '40%',
  },
  {
    selector: 'sessions',
    width: '15%',
  },
  {
    selector: 'duration',
    width: '15%',
  },
];

export const courseCommonColumns: TableComponentCommonColumns = {
  actions: {
    options: {
      delete: true,
      edit: true,
    },
  },
};
