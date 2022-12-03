import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, RequestOptionsArgs } from '@angular/http';
import { TokenService } from '../../modules/auth/services/token.service';

@Injectable()
export class HttpClientService {

  constructor(private http: Http, private Token: TokenService) { }
  createAuthorizationHeader(headers) {
    headers.append('Authorization', 'Bearer ' + this.Token.get());
  }

  get(url, extraHeaders?: Headers) {
    let headers:Headers  = extraHeaders || new Headers();
    let options: RequestOptionsArgs = {} as RequestOptionsArgs;
    if (extraHeaders) {
      headers.append('Accept', 'application/pdf')
      headers.append('Content-Type', 'application/pdf')
      options.responseType = ResponseContentType.Blob;
    }
    this.createAuthorizationHeader(headers);
    options.headers = headers;
    return this.http.get(url, options);
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers
    });
  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers
    });
  }

  delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers
    });
  }
}
