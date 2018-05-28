import { PagedResultDtoOfFuncionarioDto } from './funcionario-proxy';
import * as moment from 'moment';
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { API_BASE_URL, ListResultDtoOfRoleDto, ServiceProxy } from './service-proxies';
import { Observable } from 'rxjs/Observable';
import { FuncionarioDto } from '@shared/service-proxies/funcionario-proxy';

@Injectable()
export class DepartamentoServiceProxy {
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
  create(input: CreateDepartamentoDto | null | undefined): Observable<DepartamentoDto> {
    let url_ = this.baseUrl + '/api/services/app/Departamento/Create';
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
          return <Observable<DepartamentoDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<DepartamentoDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processCreate(response: HttpResponseBase): Observable<DepartamentoDto> {
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
        result200 = resultData200 ? DepartamentoDto.fromJS(resultData200) : new DepartamentoDto();
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
    return Observable.of<DepartamentoDto>(<any>null);
  }

  /**
   * @input (optional)
   * @return Success
   */
  update(input: DepartamentoDto | null | undefined): Observable<DepartamentoDto> {
    let url_ = this.baseUrl + '/api/services/app/Departamento/Update';
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
          return <Observable<DepartamentoDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<DepartamentoDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processUpdate(response: HttpResponseBase): Observable<DepartamentoDto> {
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
        result200 = resultData200 ? DepartamentoDto.fromJS(resultData200) : new DepartamentoDto();
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
    return Observable.of<DepartamentoDto>(<any>null);
  }

  /**
   * @return Success
   */
  delete(id: number): Observable<void> {
    let url_ = this.baseUrl + '/api/services/app/Departamento/Delete?';
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
  get(id: number): Observable<DepartamentoDto> {
    let url_ = this.baseUrl + '/api/services/app/Departamento/Get?';
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
          return <Observable<DepartamentoDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<DepartamentoDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processGet(response: HttpResponseBase): Observable<DepartamentoDto> {
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
        result200 = resultData200 ? DepartamentoDto.fromJS(resultData200) : new DepartamentoDto();
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
    return Observable.of<DepartamentoDto>(<any>null);
  }

  /**
   * @return Success
   */
  getAll(skipCount: number, maxResultCount: number): Observable<PagedResultDtoOfDepartamentoDto> {
    let url_ = this.baseUrl + '/api/services/app/Departamento/GetAll?';
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
          return <Observable<PagedResultDtoOfDepartamentoDto>><any>Observable.throw(e);
        }
      } else {
        return <Observable<PagedResultDtoOfDepartamentoDto>><any>Observable.throw(response_);
      }
    });
  }

  protected processGetAll(response: HttpResponseBase): Observable<PagedResultDtoOfDepartamentoDto> {
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
        result200 = resultData200 ? PagedResultDtoOfDepartamentoDto.fromJS(resultData200) : new PagedResultDtoOfDepartamentoDto();
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
    return Observable.of<PagedResultDtoOfDepartamentoDto>(<any>null);
  }/**
   * @return Success
   */
  getFuncionarios(id: number): Observable<FuncionarioDto[]> {
    let url_ = this.baseUrl + '/api/services/app/Departamento/GetFuncionarios?';
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
      return this.processGetFuncionarios(response_);
    }).catch((response_: any) => {
      if (response_ instanceof HttpResponseBase) {
        try {
          return this.processGetFuncionarios(<any>response_);
        } catch (e) {
          return <Observable<FuncionarioDto[]>><any>Observable.throw(e);
        }
      } else {
        return <Observable<FuncionarioDto[]>><any>Observable.throw(response_);
      }
    });
  }

  protected processGetFuncionarios(response: HttpResponseBase): Observable<FuncionarioDto[]> {
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
        result200 = resultData200 ? FuncionarioDto.fromJS(resultData200) : [];
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
    return Observable.of<FuncionarioDto[]>(<any>null);
  }
}

export class CreateDepartamentoDto implements ICreateDepartamentoDto {
  nome: string;

  static fromJS(data: any): CreateDepartamentoDto {
    data = typeof data === 'object' ? data : {};
    const result = new CreateDepartamentoDto();
    result.init(data);
    return result;
  }

  constructor(data?: ICreateDepartamentoDto) {
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
    const result = new CreateDepartamentoDto();
    result.init(json);
    return result;
  }
}

export interface ICreateDepartamentoDto {
  nome: string;
}

export class DepartamentoDto implements IDepartamentoDto {
  nome: string;
  quantidadeFuncionarios: number;
  id: number | undefined;

  static fromJS(data: any): DepartamentoDto {
    data = typeof data === 'object' ? data : {};
    const result = new DepartamentoDto();
    result.init(data);
    return result;
  }

  constructor(data?: IDepartamentoDto) {
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
      this.quantidadeFuncionarios = data['quantidadeFuncionarios'];
      this.id = data['id'];
    }
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['nome'] = this.nome;
    data['quantidadeFuncionarios'] = this.quantidadeFuncionarios;
    data['id'] = this.id;
    return data;
  }

  clone() {
    const json = this.toJSON();
    const result = new DepartamentoDto();
    result.init(json);
    return result;
  }
}

export interface IDepartamentoDto {
  nome: string;
  quantidadeFuncionarios: number;
  id: number | undefined;
}

export class PagedResultDtoOfDepartamentoDto implements IPagedResultDtoOfDepartamentoDto {
  totalCount: number | undefined;
  items: DepartamentoDto[] | undefined;

  static fromJS(data: any): PagedResultDtoOfDepartamentoDto {
    data = typeof data === 'object' ? data : {};
    const result = new PagedResultDtoOfDepartamentoDto();
    result.init(data);
    return result;
  }

  constructor(data?: IPagedResultDtoOfDepartamentoDto) {
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
          this.items.push(DepartamentoDto.fromJS(item));
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
    const result = new PagedResultDtoOfDepartamentoDto();
    result.init(json);
    return result;
  }
}

export interface IPagedResultDtoOfDepartamentoDto {
  totalCount: number | undefined;
  items: DepartamentoDto[] | undefined;
}
