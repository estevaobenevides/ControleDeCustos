import * as moment from 'moment';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { API_BASE_URL, ListResultDtoOfRoleDto, ServiceProxy } from './service-proxies';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FuncionarioServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

  constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : '';
  }

  /**
   * @input (optional)
   * @return Success
   */
  create(input: CreateFuncionarioDto | null | undefined): Observable<FuncionarioDto> {
    let url_ = this.baseUrl + '/api/services/app/Funcionario/Create';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(input);

    const options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.request('post', url_, options_).flatMap((response_: any) => {
      return this.processCreate(response_);
    }).catch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processCreate(<any>response_);
        } catch (e) {
          return <Observable<FuncionarioDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<FuncionarioDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processCreate(response: HttpResponseBase): Observable<FuncionarioDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    };
    if (status === 200) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        let result200: any = null;
        const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 ? FuncionarioDto.fromJS(resultData200) : new FuncionarioDto();
        return Observable.of(result200);
      });
    } else if (status === 401) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status === 403) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Observable.of<FuncionarioDto>(<any>null);
  }

  /**
   * @input (optional)
   * @return Success
   */
  update(input: FuncionarioDto | null | undefined): Observable<FuncionarioDto> {
    let url_ = this.baseUrl + '/api/services/app/Funcionario/Update';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(input);

    const options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.request('put', url_, options_).flatMap((response_: any) => {
      return this.processUpdate(response_);
    }).catch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processUpdate(<any>response_);
        } catch (e) {
          return <Observable<FuncionarioDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<FuncionarioDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processUpdate(response: HttpResponseBase): Observable<FuncionarioDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) { _headers[key] = response.headers.get(key); }
    };
    if (status === 200) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        let result200: any = null;
        const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 ? FuncionarioDto.fromJS(resultData200) : new FuncionarioDto();
        return Observable.of(result200);
      });
    } else if (status === 401) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status === 403) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Observable.of<FuncionarioDto>(<any>null);
  }

  /**
   * @return Success
   */
  delete(id: number): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/Funcionario/Delete?';
    if (id === undefined || id === null) {
      throw new Error('The parameter \'id\' must be defined and cannot be null.');
    } else {
      url_ += 'Id=' + encodeURIComponent('' + id) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');

    const options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };

    return this.http.request('delete', url_, options_).flatMap((response_: any) => {
      return this.processDelete(response_);
    }).catch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processDelete(<any>response_);
        } catch (e) {
          return <Observable<void>><any>Observable.throw(e);
        }
      } else {
        return <Observable<void>><any>Observable.throw(response_);
      }
    });
  }

  protected processDelete(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) { _headers[key] = response.headers.get(key); }
    };
    if (status === 200) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return Observable.of<void>(<any>null);
      });
    } else if (status === 401) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status === 403) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Observable.of<void>(<any>null);
  }

  /**
   * @return Success
   */
  get(id: number): Observable<FuncionarioDto> {
    let url_ = this.baseUrl + '/api/services/app/Funcionario/Get?';
    if (id === undefined || id === null) {
      throw new Error('The parameter \'id\' must be defined and cannot be null.');
    } else {
      url_ += 'Id=' + encodeURIComponent('' + id) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');

    const options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.request('get', url_, options_).flatMap((response_: any) => {
      return this.processGet(response_);
    }).catch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGet(<any>response_);
        } catch (e) {
          return <Observable<FuncionarioDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<FuncionarioDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processGet(response: HttpResponseBase): Observable<FuncionarioDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) { _headers[key] = response.headers.get(key); }
    };
    if (status === 200) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        let result200: any = null;
        const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 ? FuncionarioDto.fromJS(resultData200) : new FuncionarioDto();
        return Observable.of(result200);
      });
    } else if (status === 401) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status === 403) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Observable.of<FuncionarioDto>(<any>null);
  }

  /**
   * @return Success
   */
  getAll(skipCount: number, maxResultCount: number): Observable<PagedResultDtoOfFuncionarioDto> {
    let url_ = this.baseUrl + '/api/services/app/Funcionario/GetAll?';
    if (skipCount === undefined || skipCount === null) {
      throw new Error('The parameter \'skipCount\' must be defined and cannot be null.');
    } else {
      url_ += 'SkipCount=' + encodeURIComponent('' + skipCount) + '&';
    }
    if (maxResultCount === undefined || maxResultCount === null) {
      throw new Error('The parameter \'maxResultCount\' must be defined and cannot be null.');
    } else {
      url_ += 'MaxResultCount=' + encodeURIComponent('' + maxResultCount) + '&';
    }
    url_ = url_.replace(/[?&]$/, '');

    const options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };

    return this.http.request('get', url_, options_).flatMap((response_: any) => {
      return this.processGetAll(response_);
    }).catch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetAll(<any>response_);
        } catch (e) {
          return <Observable<PagedResultDtoOfFuncionarioDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<PagedResultDtoOfFuncionarioDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfFuncionarioDto> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse ? response.body :
        (<any>response).error instanceof Blob ? (<any>response).error : undefined;

    const _headers: any = {};
    if (response.headers) {
      for (const key of response.headers.keys()) { _headers[key] = response.headers.get(key); }
    };
    if (status === 200) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        let result200: any = null;
        const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 ? PagedResultDtoOfFuncionarioDto.fromJS(resultData200) : new PagedResultDtoOfFuncionarioDto();
        return Observable.of(result200);
      });
    } else if (status === 401) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status === 403) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('A server error occurred.', status, _responseText, _headers);
      });
    } else if (status !== 200 && status !== 204) {
      return ServiceProxy.blobToText(responseBlob).flatMap(_responseText => {
        return ServiceProxy.throwException('An unexpected server error occurred.', status, _responseText, _headers);
      });
    }
    return Observable.of<PagedResultDtoOfFuncionarioDto>(<any>null);
  }
}

export class CreateFuncionarioDto implements ICreateFuncionarioDto {
  nome: string;

  static fromJS(data: any): CreateFuncionarioDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateFuncionarioDto();
    result.init(data);
    return result;
  }

  constructor(data?: ICreateFuncionarioDto) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.nome = data['nome'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['nome'] = this.nome;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new CreateFuncionarioDto();
    result.init(json);
    return result;
  }
}

export interface ICreateFuncionarioDto {
  nome: string;
}

export class FuncionarioDto implements IFuncionarioDto {
  nome: string;
  funcionarios: string[] | undefined;
  id: number | undefined;

  static fromJS(data: any): FuncionarioDto {
    data = typeof data === 'object' ? data : {};
    const result = new FuncionarioDto();
    result.init(data);
    return result;
  }

  constructor(data?: IFuncionarioDto) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.nome = data['nome'];
      if (data['funcionarios'] && data['funcionarios'].constructor === Array) {
        this.funcionarios = [];
        for (const item of data['funcionarios']) {
          this.funcionarios.push(item);
        }
      }
      this.id = data['id'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['nome'] = this.nome;
    if (this.funcionarios && this.funcionarios.constructor === Array) {
      data['funcionarios'] = [];
      for (const item of this.funcionarios) {
        data['funcionarios'].push(item);
      }
    }
    data['id'] = this.id;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new FuncionarioDto();
    result.init(json);
    return result;
  }
}

export interface IFuncionarioDto {
  nome: string;
  funcionarios: string[] | undefined;
  id: number | undefined;
}

export class PagedResultDtoOfFuncionarioDto implements IPagedResultDtoOfFuncionarioDto {
  totalCount: number | undefined;
  items: FuncionarioDto[] | undefined;

  static fromJS(data: any): PagedResultDtoOfFuncionarioDto {
    data = typeof data === 'object' ? data : {};
    const result = new PagedResultDtoOfFuncionarioDto();
    result.init(data);
    return result;
  }

  constructor(data?: IPagedResultDtoOfFuncionarioDto) {
    if (data) {
      for (const property in data) {
        if (data.hasOwnProperty(property)) {
          (<any>this)[property] = (<any>data)[property];
        }
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.totalCount = data['totalCount'];
      if (data['items'] && data['items'].constructor === Array) {
        this.items = [];
        for (const item of data['items']) {
          this.items.push(FuncionarioDto.fromJS(item));
        }
      }
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['totalCount'] = this.totalCount;
    if (this.items && this.items.constructor === Array) {
      data['items'] = [];
      for (const item of this.items) {
        data['items'].push(item.toJSON());
      }
    }
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new PagedResultDtoOfFuncionarioDto();
    result.init(json);
    return result;
  }
}

export interface IPagedResultDtoOfFuncionarioDto {
  totalCount: number | undefined;
  items: FuncionarioDto[] | undefined;
}
