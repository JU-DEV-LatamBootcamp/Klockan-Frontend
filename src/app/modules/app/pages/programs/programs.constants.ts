import {
  TableComponentCommonHeaders,
  TableComponentHeaders,
} from 'src/app/shared/components/table/table.component';
import { Program } from 'src/app/shared/models/Programs';

export const programHeaders: TableComponentHeaders<Program>[] = [
  'id',
  'name',
  'description',
  TableComponentCommonHeaders.actions,
];
