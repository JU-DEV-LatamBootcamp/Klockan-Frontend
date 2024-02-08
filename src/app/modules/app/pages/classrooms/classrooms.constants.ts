import {
  TableComponentCommonColumns,
  TableComponentTypeColumn,
} from 'src/app/shared/components/table/table-component';
import { Classroom } from 'src/app/shared/models/Classroom';

export const classroomTypeColumns: TableComponentTypeColumn<Classroom>[] = [
  {
    selector: 'id',
    header: 'ID',
  },
  {
    selector: 'course',
    width: '40%',
  },
  {
    selector: 'program',
    width: '40%',
  },
  {
    selector: 'starts',
    width: '20%',
  },
];

export const classroomCommonColumns: TableComponentCommonColumns = {
  actions: {
    options: {
      delete: true,
      edit: true,
    },
  },
};
