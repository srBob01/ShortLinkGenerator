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
import { findAllCategories } from '../fn/category/find-all-categories';
import { FindAllCategories$Params } from '../fn/category/find-all-categories';
import { findCategoryById } from '../fn/category/find-category-by-id';
import { FindCategoryById$Params } from '../fn/category/find-category-by-id';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `findAllCategories()` */
  static readonly FindAllCategoriesPath = '/categories';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findAllCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCategories$Response(params?: FindAllCategories$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CategoryResponse>>> {
    return findAllCategories(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findAllCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findAllCategories(params?: FindAllCategories$Params, context?: HttpContext): Observable<Array<CategoryResponse>> {
    return this.findAllCategories$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CategoryResponse>>): Array<CategoryResponse> => r.body)
    );
  }

  /** Path part for operation `findCategoryById()` */
  static readonly FindCategoryByIdPath = '/categories/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `findCategoryById()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategoryById$Response(params: FindCategoryById$Params, context?: HttpContext): Observable<StrictHttpResponse<CategoryResponse>> {
    return findCategoryById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `findCategoryById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  findCategoryById(params: FindCategoryById$Params, context?: HttpContext): Observable<CategoryResponse> {
    return this.findCategoryById$Response(params, context).pipe(
      map((r: StrictHttpResponse<CategoryResponse>): CategoryResponse => r.body)
    );
  }

}
