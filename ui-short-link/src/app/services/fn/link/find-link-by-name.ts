/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LinkResponse } from '../../models/link-response';

export interface FindLinkByName$Params {
  linkname: string;
}

export function findLinkByName(http: HttpClient, rootUrl: string, params: FindLinkByName$Params, context?: HttpContext): Observable<StrictHttpResponse<LinkResponse>> {
  const rb = new RequestBuilder(rootUrl, findLinkByName.PATH, 'get');
  if (params) {
    rb.path('linkname', params.linkname, {});
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

findLinkByName.PATH = '/links/name/{linkname}';
