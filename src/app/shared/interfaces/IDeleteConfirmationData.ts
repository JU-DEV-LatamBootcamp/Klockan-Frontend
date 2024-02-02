import { BaseService } from '../services/base.service';

export interface IDeleteConfirmationData<T> {
  item: T;
  service: BaseService<T>;
}
