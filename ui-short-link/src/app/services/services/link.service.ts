/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteLink } from '../fn/link/delete-link';
import { DeleteLink$Params } from '../fn/link/delete-link';
import { findAllLink } from '../fn/link/find-all-link';
import { FindAllLink$Params } from '../fn/link/find-all-link';
import { findAllLinkByFilter } from '../fn/link/find-all-link-by-filter';
import { FindAllLinkByFilter$Params } from '../fn/link/find-all-link-by-filter';
import { findAllLinkByUser } from '../fn/link/find-all-link-by-user';
import { FindAllLinkByUser$Params } from '../fn/link/find-all-link-by-user';
import { findLinkById } from '../fn/link/find-link-by-id';
import { FindLinkById$Params } from '../fn/link/find-link-by-id';
import { findLinkByName } from '../fn/link/find-link-by-name';
import { FindLinkByName$Params } from '../fn/link/find-link-by-name';
import { getLongLink } from '../fn/link/get-long-link';
import { GetLongLink$Params } from '../fn/link/get-long-link';
import { LinkResponse } from '../models/link-response';
import { LongLinkRedirectResponse } from '../models/long-link-redirect-response';
import { PageResponseLinkResponse } from '../models/page-response-link-response';
import { saveLink } from '../fn/link/save-link';
import { SaveLink$Params } from '../fn/link/save-link';
import { updateLink } from '../fn/link/update-link';
import { UpdateLink$Params } from '../fn/link/update-link';

@Injectable({ providedIn: 'root' })
export class LinkService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findLinkById()` */
  static readonly FindLinkByIdPath = '/links/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLinkById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLinkById$Response(params: FindLinkById$Params, context?: HttpContext): Observable<StrictHttpResponse<LinkResponse>> {
    return findLinkById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findLinkById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLinkById(params: FindLinkById$Params, context?: HttpContext): Observable<LinkResponse> {
    return this.findLinkById$Response(params, context).pipe(
      map((r: StrictHttpResponse<LinkResponse>): LinkResponse => r.body)
    );
  }

  /** Path part for operation `updateLink()` */
  static readonly UpdateLinkPath = '/links/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateLink()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLink$Response(params: UpdateLink$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return updateLink(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateLink$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateLink(params: UpdateLink$Params, context?: HttpContext): Observable<number> {
    return this.updateLink$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `deleteLink()` */
  static readonly DeleteLinkPath = '/links/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLink()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLink$Response(params: DeleteLink$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return deleteLink(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLink$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLink(params: DeleteLink$Params, context?: HttpContext): Observable<number> {
    return this.deleteLink$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `saveLink()` */
  static readonly SaveLinkPath = '/links';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `saveLink()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLink$Response(params: SaveLink$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return saveLink(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `saveLink$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  saveLink(params: SaveLink$Params, context?: HttpContext): Observable<number> {
    return this.saveLink$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /** Path part for operation `findAllLinkByUser()` */
  static readonly FindAllLinkByUserPath = '/links/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLinkByUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLinkByUser$Response(params?: FindAllLinkByUser$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseLinkResponse>> {
    return findAllLinkByUser(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLinkByUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLinkByUser(params?: FindAllLinkByUser$Params, context?: HttpContext): Observable<PageResponseLinkResponse> {
    return this.findAllLinkByUser$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseLinkResponse>): PageResponseLinkResponse => r.body)
    );
  }

  /** Path part for operation `getLongLink()` */
  static readonly GetLongLinkPath = '/links/redirect/{shortLink}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getLongLink()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLongLink$Response(params: GetLongLink$Params, context?: HttpContext): Observable<StrictHttpResponse<LongLinkRedirectResponse>> {
    return getLongLink(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getLongLink$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getLongLink(params: GetLongLink$Params, context?: HttpContext): Observable<LongLinkRedirectResponse> {
    return this.getLongLink$Response(params, context).pipe(
      map((r: StrictHttpResponse<LongLinkRedirectResponse>): LongLinkRedirectResponse => r.body)
    );
  }

  /** Path part for operation `findLinkByName()` */
  static readonly FindLinkByNamePath = '/links/name/{linkname}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findLinkByName()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLinkByName$Response(params: FindLinkByName$Params, context?: HttpContext): Observable<StrictHttpResponse<LinkResponse>> {
    return findLinkByName(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findLinkByName$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findLinkByName(params: FindLinkByName$Params, context?: HttpContext): Observable<LinkResponse> {
    return this.findLinkByName$Response(params, context).pipe(
      map((r: StrictHttpResponse<LinkResponse>): LinkResponse => r.body)
    );
  }

  /** Path part for operation `findAllLinkByFilter()` */
  static readonly FindAllLinkByFilterPath = '/links/filter';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLinkByFilter()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLinkByFilter$Response(params: FindAllLinkByFilter$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseLinkResponse>> {
    return findAllLinkByFilter(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLinkByFilter$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLinkByFilter(params: FindAllLinkByFilter$Params, context?: HttpContext): Observable<PageResponseLinkResponse> {
    return this.findAllLinkByFilter$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseLinkResponse>): PageResponseLinkResponse => r.body)
    );
  }

  /** Path part for operation `findAllLink()` */
  static readonly FindAllLinkPath = '/links/all';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllLink()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLink$Response(params?: FindAllLink$Params, context?: HttpContext): Observable<StrictHttpResponse<PageResponseLinkResponse>> {
    return findAllLink(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllLink$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllLink(params?: FindAllLink$Params, context?: HttpContext): Observable<PageResponseLinkResponse> {
    return this.findAllLink$Response(params, context).pipe(
      map((r: StrictHttpResponse<PageResponseLinkResponse>): PageResponseLinkResponse => r.body)
    );
  }

}
