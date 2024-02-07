import {
  TableComponentCommonHeaders,
  TableComponentHeaders,
} from 'src/app/shared/components/table/table.component';
import { Course } from 'src/app/shared/models/Courses';

export const courseHeaders: TableComponentHeaders<Course>[] = [
  'id',
  'name',
  'description',
  'sessions',
  'duration',
  TableComponentCommonHeaders.actions,
];
