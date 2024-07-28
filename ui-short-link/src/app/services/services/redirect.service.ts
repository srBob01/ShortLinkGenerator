/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { redirectToLongLink } from '../fn/redirect/redirect-to-long-link';
import { RedirectToLongLink$Params } from '../fn/redirect/redirect-to-long-link';

@Injectable({ providedIn: 'root' })
export class RedirectService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `redirectToLongLink()` */
  static readonly RedirectToLongLinkPath = '/{shortLink}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `redirectToLongLink()` instead.
   *
   * This method doesn't expect any request body.
   */
  redirectToLongLink$Response(params: RedirectToLongLink$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return redirectToLongLink(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `redirectToLongLink$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  redirectToLongLink(params: RedirectToLongLink$Params, context?: HttpContext): Observable<void> {
    return this.redirectToLongLink$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
