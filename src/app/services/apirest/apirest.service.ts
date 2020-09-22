import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const url = 'https://datos.gob.es/apidata/catalog/distribution';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getItems(headers: HttpHeaders): Observable<any> {
    return this.http.get(url, {
      headers
    });
  }
}
