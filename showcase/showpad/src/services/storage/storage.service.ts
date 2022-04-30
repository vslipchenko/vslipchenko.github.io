import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  saveToList(key: string, pokemonName: string): void {
    const data = localStorage.getItem(key);

    if (!data) return localStorage.setItem(key, JSON.stringify([pokemonName]));

    const list = JSON.parse(data);

    list.push(pokemonName);

    localStorage.setItem(key, JSON.stringify(list));
  }

  getList(key: string): Array<string> {
    const data = localStorage.getItem(key);

    if (!data) return [];

    return JSON.parse(data);
  }

  resetList(key: string): void {
    localStorage.removeItem(key);
  }
}
