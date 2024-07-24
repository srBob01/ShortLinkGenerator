/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LinkFilter } from '../../models/link-filter';
import { PageResponseLinkResponse } from '../../models/page-response-link-response';

export interface FindAllLinkByFilter$Params {
  page?: number;
  size?: number;
  filter: LinkFilter;
}

export function findAllLinkByFilter(http: HttpClient, rootUrl: string, params: FindAllLinkByFilter$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseLinkResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllLinkByFilter.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
    rb.query('filter', params.filter, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<PageResponseLinkResponse>;
    })
  );
}

findAllLinkByFilter.PATH = '/links/filter';
