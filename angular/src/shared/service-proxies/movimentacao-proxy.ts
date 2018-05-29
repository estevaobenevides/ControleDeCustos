import * as moment from 'moment';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { API_BASE_URL, ListResultDtoOfRoleDto, ServiceProxy } from './service-proxies';
import { Observable } from 'rxjs/Observable';
import { PagedResultDtoOfFuncionarioDto } from '@shared/service-proxies/funcionario-proxy';

@Injectable()
export class MovimentacaoServiceProxy {
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
  create(input: CreateMovimentacaoDto | null | undefined): Observable<MovimentacaoDto> {
    let url_ = this.baseUrl + '/api/services/app/Movimentacao/Create';
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
          return <Observable<MovimentacaoDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<MovimentacaoDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processCreate(response: HttpResponseBase): Observable<MovimentacaoDto> {
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
        result200 = resultData200 ? MovimentacaoDto.fromJS(resultData200) : new MovimentacaoDto();
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
    return Observable.of<MovimentacaoDto>(<any>null);
  }

  /**
   * @input (optional)
   * @return Success
   */
  update(input: MovimentacaoDto | null | undefined): Observable<MovimentacaoDto> {
    let url_ = this.baseUrl + '/api/services/app/Movimentacao/Update';
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
          return <Observable<MovimentacaoDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<MovimentacaoDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processUpdate(response: HttpResponseBase): Observable<MovimentacaoDto> {
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
        result200 = resultData200 ? MovimentacaoDto.fromJS(resultData200) : new MovimentacaoDto();
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
    return Observable.of<MovimentacaoDto>(<any>null);
  }

  /**
   * @return Success
   */
  delete(id: number): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/Movimentacao/Delete?';
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
  get(id: number): Observable<MovimentacaoDto> {
    let url_ = this.baseUrl + '/api/services/app/Movimentacao/Get?';
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
          return <Observable<MovimentacaoDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<MovimentacaoDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processGet(response: HttpResponseBase): Observable<MovimentacaoDto> {
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
        result200 = resultData200 ? MovimentacaoDto.fromJS(resultData200) : new MovimentacaoDto();
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
    return Observable.of<MovimentacaoDto>(<any>null);
  }

  /**
   * @return Success
   */
  getAll(skipCount: number, maxResultCount: number): Observable<PagedResultDtoOfMovimentacaoDto> {
    let url_ = this.baseUrl + '/api/services/app/Movimentacao/GetAll?';
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
          return <Observable<PagedResultDtoOfMovimentacaoDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<PagedResultDtoOfMovimentacaoDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfMovimentacaoDto> {
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
        result200 = resultData200 ? PagedResultDtoOfMovimentacaoDto.fromJS(resultData200) : new PagedResultDtoOfMovimentacaoDto();
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
    return Observable.of<PagedResultDtoOfMovimentacaoDto>(<any>null);
  }

  /**
   * @return Success
   */
  getFuncionarios(): Observable<PagedResultDtoOfFuncionarioDto> {
    let url_ = this.baseUrl + '/api/services/app/Movimentacao/GetAllFuncionarios';
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
      return this.processGetFuncionarios(response_);
    }).catch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetFuncionarios(<any>response_);
        } catch (e) {
          return <Observable<PagedResultDtoOfFuncionarioDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<PagedResultDtoOfFuncionarioDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processGetFuncionarios(response: HttpResponseBase): Observable<PagedResultDtoOfFuncionarioDto> {
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

export class CreateMovimentacaoDto implements ICreateMovimentacaoDto {
  descricao: string;
  valor: number;

  static fromJS(data: any): CreateMovimentacaoDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateMovimentacaoDto();
    result.init(data);
    return result;
  }

  constructor(data?: ICreateMovimentacaoDto) {
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
      this.descricao = data['descricao'];
      this.valor = data['valor'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['descricao'] = this.descricao;
    data['valor'] = this.valor;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new CreateMovimentacaoDto();
    result.init(json);
    return result;
  }
}

export interface ICreateMovimentacaoDto {
  descricao: string;
  valor: number;
}

export class MovimentacaoDto implements IMovimentacaoDto {
  descricao: string;
  valor: number;
  funcionario: string;
  id: number | undefined;

  static fromJS(data: any): MovimentacaoDto {
    data = typeof data === 'object' ? data : {};
    const result = new MovimentacaoDto();
    result.init(data);
    return result;
  }

  constructor(data?: IMovimentacaoDto) {
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
      this.descricao = data['descricao'];
      this.valor = data['valor'];
      this.funcionario = data['funcionario'];
      this.id = data['id'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['descricao'] = this.descricao;
    data['valor'] = this.valor;
    data['funcionario'] = this.funcionario;
    data['id'] = this.id;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new MovimentacaoDto();
    result.init(json);
    return result;
  }
}

export interface IMovimentacaoDto {
  descricao: string;
  valor: number;
  funcionario: string;
  id: number | undefined;
}

export class PagedResultDtoOfMovimentacaoDto implements IPagedResultDtoOfMovimentacaoDto {
  totalCount: number | undefined;
  items: MovimentacaoDto[] | undefined;

  static fromJS(data: any): PagedResultDtoOfMovimentacaoDto {
    data = typeof data === 'object' ? data : {};
    const result = new PagedResultDtoOfMovimentacaoDto();
    result.init(data);
    return result;
  }

  constructor(data?: IPagedResultDtoOfMovimentacaoDto) {
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
          this.items.push(MovimentacaoDto.fromJS(item));
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
    const result = new PagedResultDtoOfMovimentacaoDto();
    result.init(json);
    return result;
  }
}

export interface IPagedResultDtoOfMovimentacaoDto {
  totalCount: number | undefined;
  items: MovimentacaoDto[] | undefined;
}
