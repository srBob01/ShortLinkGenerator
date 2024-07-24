/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LinkResponse } from '../../models/link-response';

export interface FindLinkById$Params {
  id: number;
}

export function findLinkById(http: HttpClient, rootUrl: string, params: FindLinkById$Params, context?: HttpContext): Observable<StrictHttpResponse<LinkResponse>> {
  const rb = new RequestBuilder(rootUrl, findLinkById.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LinkResponse>;
    })
  );
}

findLinkById.PATH = '/links/{id}';
