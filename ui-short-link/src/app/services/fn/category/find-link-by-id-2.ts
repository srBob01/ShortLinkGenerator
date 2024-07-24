/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CategoryResponse } from '../../models/category-response';

export interface FindLinkById2$Params {
  id: number;
}

export function findLinkById2(http: HttpClient, rootUrl: string, params: FindLinkById2$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryResponse>> {
  const rb = new RequestBuilder(rootUrl, findLinkById2.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<CategoryResponse>;
    })
  );
}

findLinkById2.PATH = '/categories/{id}';
