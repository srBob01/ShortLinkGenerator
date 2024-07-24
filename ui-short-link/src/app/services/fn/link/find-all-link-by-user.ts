/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PageResponseLinkResponse } from '../../models/page-response-link-response';

export interface FindAllLinkByUser$Params {
  page?: number;
  size?: number;
}

export function findAllLinkByUser(http: HttpClient, rootUrl: string, params?: FindAllLinkByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseLinkResponse>> {
  const rb = new RequestBuilder(rootUrl, findAllLinkByUser.PATH, 'get');
  if (params) {
    rb.query('page', params.page, {});
    rb.query('size', params.size, {});
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

findAllLinkByUser.PATH = '/links/user';
