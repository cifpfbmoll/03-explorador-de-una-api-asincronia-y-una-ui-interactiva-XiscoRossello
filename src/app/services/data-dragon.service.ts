import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, shareReplay, switchMap } from 'rxjs/operators';
import { Champion } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class DataDragonService {
  private readonly BASE_URL = 'https://ddragon.leagueoflegends.com';
  private latestVersion$?: Observable<string>;
  private championsData$?: Observable<{ [key: string]: Champion }>;
  private cachedVersion: string = '14.21.1'; // Versión por defecto actualizada

  constructor(private http: HttpClient) {
    // Cachear la versión al inicializar
    this.getLatestVersion().subscribe(version => {
      this.cachedVersion = version;
    });
  }

  /**
   * Obtener la versión más reciente de Data Dragon
   */
  getLatestVersion(): Observable<string> {
    if (!this.latestVersion$) {
      this.latestVersion$ = this.http.get<string[]>(`${this.BASE_URL}/api/versions.json`).pipe(
        map(versions => versions[0]),
        shareReplay(1),
        catchError(() => of(this.cachedVersion))
      );
    }
    return this.latestVersion$;
  }

  /**
   * Obtener datos de todos los campeones
   */
  getChampionData(language: string = 'es_ES'): Observable<{ [key: string]: Champion }> {
    if (!this.championsData$) {
      this.championsData$ = this.getLatestVersion().pipe(
        switchMap(version => 
          this.http.get<any>(`${this.BASE_URL}/cdn/${version}/data/${language}/champion.json`)
        ),
        map((data: any) => data.data),
        shareReplay(1),
        catchError(() => of({}))
      );
    }
    return this.championsData$;
  }

  /**
   * Obtener URL de la imagen del icono de invocador
   */
  getSummonerIconUrl(iconId: number, version?: string): Observable<string> {
    if (version) {
      return of(`${this.BASE_URL}/cdn/${version}/img/profileicon/${iconId}.png`);
    }
    return this.getLatestVersion().pipe(
      map(v => `${this.BASE_URL}/cdn/${v}/img/profileicon/${iconId}.png`)
    );
  }

  /**
   * Obtener URL de la imagen del icono de invocador (síncrono)
   */
  getSummonerIconUrlSync(iconId: number): string {
    return `${this.BASE_URL}/cdn/${this.cachedVersion}/img/profileicon/${iconId}.png`;
  }

  /**
   * Obtener URL de la imagen de un campeón
   */
  getChampionIconUrl(championName: string, version?: string): Observable<string> {
    if (version) {
      return of(`${this.BASE_URL}/cdn/${version}/img/champion/${championName}.png`);
    }
    return this.getLatestVersion().pipe(
      map(v => `${this.BASE_URL}/cdn/${v}/img/champion/${championName}.png`)
    );
  }

  /**
   * Obtener URL de la imagen de un campeón (síncrono)
   */
  getChampionIconUrlSync(championName: string): string {
    return `${this.BASE_URL}/cdn/${this.cachedVersion}/img/champion/${championName}.png`;
  }

  /**
   * Obtener URL de la imagen de un campeón por ID
   */
  getChampionIconUrlById(championId: number): Observable<string> {
    return this.getChampionData().pipe(
      map(champions => {
        const champion = Object.values(champions).find(
          c => parseInt(c.key) === championId
        );
        return champion ? champion.id : 'Unknown';
      }),
      switchMap(championName => this.getLatestVersion().pipe(
        map(v => `${this.BASE_URL}/cdn/${v}/img/champion/${championName}.png`)
      )),
      catchError(() => of(''))
    );
  }

  /**
   * Obtener nombre de campeón por ID
   */
  getChampionNameById(championId: number): Observable<string> {
    return this.getChampionData().pipe(
      map(champions => {
        const champion = Object.values(champions).find(
          c => parseInt(c.key) === championId
        );
        return champion ? champion.name : 'Desconocido';
      }),
      catchError(() => of('Desconocido'))
    );
  }

  /**
   * Obtener URL del splash art de un campeón
   */
  getChampionSplashUrl(championId: string, skinNum: number = 0): Observable<string> {
    return of(`${this.BASE_URL}/cdn/img/champion/splash/${championId}_${skinNum}.jpg`);
  }

  /**
   * Obtener URL del loading screen de un campeón
   */
  getChampionLoadingUrl(championId: string, skinNum: number = 0): Observable<string> {
    return of(`${this.BASE_URL}/cdn/img/champion/loading/${championId}_${skinNum}.jpg`);
  }

  /**
   * Obtener URL de la imagen de un item
   */
  getItemIconUrl(itemId: number, version?: string): Observable<string> {
    if (version) {
      return of(`${this.BASE_URL}/cdn/${version}/img/item/${itemId}.png`);
    }
    return this.getLatestVersion().pipe(
      map(v => `${this.BASE_URL}/cdn/${v}/img/item/${itemId}.png`)
    );
  }

  /**
   * Obtener URL de la imagen de un item (síncrono)
   */
  getItemIconUrlSync(itemId: number): string {
    return `${this.BASE_URL}/cdn/${this.cachedVersion}/img/item/${itemId}.png`;
  }

  /**
   * Obtener URL de la imagen de un hechizo de invocador
   */
  getSummonerSpellIconUrl(spellId: number, version?: string): Observable<string> {
    const spellNames: { [key: number]: string } = {
      1: 'SummonerBoost', // Cleanse
      3: 'SummonerExhaust', // Exhaust
      4: 'SummonerFlash', // Flash
      6: 'SummonerHaste', // Ghost
      7: 'SummonerHeal', // Heal
      11: 'SummonerSmite', // Smite
      12: 'SummonerTeleport', // Teleport
      13: 'SummonerMana', // Clarity
      14: 'SummonerDot', // Ignite
      21: 'SummonerBarrier', // Barrier
      30: 'SummonerPoroRecall', // To the King!
      31: 'SummonerPoroThrow', // Poro Toss
      32: 'SummonerSnowball' // Mark/Dash
    };

    const spellName = spellNames[spellId] || 'SummonerFlash';

    if (version) {
      return of(`${this.BASE_URL}/cdn/${version}/img/spell/${spellName}.png`);
    }
    return this.getLatestVersion().pipe(
      map(v => `${this.BASE_URL}/cdn/${v}/img/spell/${spellName}.png`)
    );
  }

  /**
   * Limpiar caché
   */
  clearCache(): void {
    this.latestVersion$ = undefined;
    this.championsData$ = undefined;
  }
}
