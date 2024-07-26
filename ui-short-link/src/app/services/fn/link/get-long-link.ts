/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LongLinkRedirectResponse } from '../../models/long-link-redirect-response';

export interface GetLongLink$Params {
  shortLink: string;
}

export function getLongLink(http: HttpClient, rootUrl: string, params: GetLongLink$Params, context?: HttpContext): Observable<StrictHttpResponse<LongLinkRedirectResponse>> {
  const rb = new RequestBuilder(rootUrl, getLongLink.PATH, 'get');
  if (params) {
    rb.path('shortLink', params.shortLink, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LongLinkRedirectResponse>;
    })
  );
}

getLongLink.PATH = '/links/redirect/{shortLink}';
