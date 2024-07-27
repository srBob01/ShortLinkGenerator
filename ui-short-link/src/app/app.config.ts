import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {interceptorInterceptor} from "./services/interceptor/interceptor.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([interceptorInterceptor])), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
  ],
};
