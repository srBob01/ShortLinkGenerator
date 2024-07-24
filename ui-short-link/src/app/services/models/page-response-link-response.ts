/* tslint:disable */
/* eslint-disable */
import { LinkResponse } from '../models/link-response';
export interface PageResponseLinkResponse {
  content?: Array<LinkResponse>;
  first?: boolean;
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
}
