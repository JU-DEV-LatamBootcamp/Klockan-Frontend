import {
  TableComponentCommonColumns,
  TableComponentTypeColumn,
} from 'src/app/shared/components/table/table-component';
import { Course } from 'src/app/shared/models/Courses';

export const courseTypeColumns: TableComponentTypeColumn<Course>[] = [
  {
    selector: 'id',
  },
  {
    selector: 'name',
  },
  {
    selector: 'description',
  },
  {
    selector: 'sessions',
  },
  {
    selector: 'duration',
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
