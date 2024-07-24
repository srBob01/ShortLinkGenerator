/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { CategoryResponse } from '../models/category-response';
import { findLinkById1 } from '../fn/category/find-link-by-id-1';
import { FindLinkById1$Params } from '../fn/category/find-link-by-id-1';
import { findLinkById2 } from '../fn/category/find-link-by-id-2';
import { FindLinkById2$Params } from '../fn/category/find-link-by-id-2';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findLinkById1()` */
  static readonly FindLinkById1Path = '/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLinkById1()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLinkById1$Response(params?: FindLinkById1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryResponse>>> {
    return findLinkById1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findLinkById1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLinkById1(params?: FindLinkById1$Params, context?: HttpContext): Observable<Array<CategoryResponse>> {
    return this.findLinkById1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryResponse>>): Array<CategoryResponse> => r.body)
    );
  }

  /** Path part for operation `findLinkById2()` */
  static readonly FindLinkById2Path = '/categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLinkById2()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLinkById2$Response(params: FindLinkById2$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryResponse>> {
    return findLinkById2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findLinkById2$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLinkById2(params: FindLinkById2$Params, context?: HttpContext): Observable<CategoryResponse> {
    return this.findLinkById2$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryResponse>): CategoryResponse => r.body)
    );
  }

}
