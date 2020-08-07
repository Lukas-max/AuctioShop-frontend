/* tslint:disable:semicolon */
import { Product } from './product';

export interface ResponseProduct {
  content: {
    product: Product[];
  },
  pageable: {
    pageSize: number;
    pageNumber: number;
  },
  totalElements: number;
  totalPages: number;
}
