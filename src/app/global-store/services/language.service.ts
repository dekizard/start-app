import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { Language } from '../models/language';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  constructor(private httpClient: HttpClient) {       
  }

  getLanguageTranslation(id: string | undefined) : Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'hide-loader': 'true' }) };
    return this.httpClient
      .get<any>(`./assets/resources/${id}.json`, httpOptions);
  }

  getLanguagesDefault(): Observable<Array<Language>> {      
    const defaultLanguageId = this.getAllLanguages().find(t => t.default)?.id;
    return of(this.getAllLanguages().filter(t => t.type == defaultLanguageId));
  }

  getLanguagesByType(type: string): Observable<Array<Language>> {          
    return of(this.getAllLanguages().filter(t => t.type == type));
  }

  getLanguageNameByType(type: string | undefined): string | undefined {
    return this.getAllLanguages().find(t => t.id == type && t.type == type)?.name;
  }

  getAllLanguages() : Array<Language> {
       return [
        {
            id: 'en-US',
            name: "English",
            default: true,
            type: 'en-US'
        },
        {
            id: 'fr-FR',
            name: "France",
            default: false,
            type: 'en-US'
        },
        {
            id: 'es-ES',
            name: "Spain",
            default: false,
            type: 'en-US'
        },
        {
            id: 'en-US',
            name: "Anglaise",
            default: true,
            type: 'fr-FR'
        },
        {
            id: 'fr-FR',
            name: "La France",
            default: false,
            type: 'fr-FR'
        },
        {
            id: 'es-ES',
            name: "Espagne",
            default: false,
            type: 'fr-FR'
        },
        {
            id: 'en-US',
            name: "Inglesa",
            default: true,
            type: 'es-ES'
        },
        {
            id: 'fr-FR',
            name: "Francia",
            default: false,
            type: 'es-ES'
        },
        {
            id: 'es-ES',
            name: "España",
            default: false,
            type: 'es-ES'
        }]
   }
}
