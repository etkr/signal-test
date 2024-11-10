import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, Observable } from 'rxjs';

interface CatFactResponse {
  data: CatFact[]
}

export interface CatFact {
  fact: string
  length: number
}


@Injectable({ providedIn: 'root' })
export class CatFactService {
  public readonly http = inject(HttpClient);

  public getCatFact(): Observable<CatFact[]> {
    return this.http.get<CatFactResponse>('https://catfact.ninja/facts').pipe(
      delay(2000),
      map(response => response.data)
    );
  }

}