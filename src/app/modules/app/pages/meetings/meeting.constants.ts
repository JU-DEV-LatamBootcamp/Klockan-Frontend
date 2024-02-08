import {
  TableComponentCommonColumns,
  TableComponentTypeColumn,
} from 'src/app/shared/components/table/table-component';
import { Meeting } from 'src/app/shared/models/Meetings';

export const meetingTypeColumns: TableComponentTypeColumn<Meeting>[] = [
  {
    selector: 'id',
    header: 'ID',
  },
  {
    selector: 'date',
    width: '25%',
  },
  {
    selector: 'time',
    width: '25%',
  },
  {
    selector: 'sessions',
    width: '25%',
  },
  {
    selector: 'classroom',
    width: '25%',
  },
];

export const meetingCommonColumns: TableComponentCommonColumns = {
  actions: {
    options: {
      delete: true,
      edit: true,
    },
  },
};
