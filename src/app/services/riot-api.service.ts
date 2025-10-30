import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { Summoner, RankedStats } from '../models/summoner.model';
import { Match } from '../models/match.model';
import { ChampionMastery } from '../models/champion-mastery.model';
import { REGIONS } from '../models/region.model';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {
  private apiKey = environment.riotApiKey;

  constructor(private http: HttpClient) {}

  /**
   * Buscar invocador por nombre usando Account API v1 + Summoner v4
   * Ahora requiere nombre#tagline (Riot ID)
   */
  searchSummonerByName(gameName: string, tagLine: string, region: string): Observable<Summoner> {
    // Primero obtener el PUUID desde Account API
    const accountUrl = `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
    const headers = new HttpHeaders({
      'X-Riot-Token': this.apiKey
    });

    return this.http.get<{puuid: string, gameName: string, tagLine: string}>(accountUrl, { headers }).pipe(
      map(account => ({
        puuid: account.puuid,
        name: `${account.gameName}#${account.tagLine}`
      })),
      // Luego obtener datos del summoner usando el PUUID
      map(account => 
        this.searchSummonerByPuuid(account.puuid, region).pipe(
          map(summoner => ({
            ...summoner,
            name: account.name
          }))
        )
      ),
      // Aplanar el Observable anidado
      switchMap(obs => obs),
      catchError(this.handleError)
    );
  }

  /**
   * Buscar invocador por PUUID
   */
  searchSummonerByPuuid(puuid: string, region: string): Observable<Summoner> {
    const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const headers = new HttpHeaders({
      'X-Riot-Token': this.apiKey
    });

    return this.http.get<Summoner>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtener información de ranking del invocador
   */
  getSummonerRankedStats(summonerId: string, region: string): Observable<RankedStats[]> {
    const url = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`;
    const headers = new HttpHeaders({
      'X-Riot-Token': this.apiKey
    });

    return this.http.get<RankedStats[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtener IDs del historial de partidas
   */
  getMatchHistory(puuid: string, region: string, count: number = 20, start: number = 0): Observable<string[]> {
    const platformRegion = this.getPlatformRegion(region);
    const url = `https://${platformRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}`;
    const headers = new HttpHeaders({
      'X-Riot-Token': this.apiKey
    });

    return this.http.get<string[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtener detalles de una partida específica
   */
  getMatchDetails(matchId: string, region: string): Observable<Match> {
    const platformRegion = this.getPlatformRegion(region);
    const url = `https://${platformRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    const headers = new HttpHeaders({
      'X-Riot-Token': this.apiKey
    });

    return this.http.get<Match>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtener maestría de campeones del invocador
   */
  getChampionMastery(puuid: string, region: string, count: number = 10): Observable<ChampionMastery[]> {
    const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=${count}`;
    const headers = new HttpHeaders({
      'X-Riot-Token': this.apiKey
    });

    return this.http.get<ChampionMastery[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtener maestría total de un invocador
   */
  getTotalMasteryScore(puuid: string, region: string): Observable<number> {
    const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/scores/by-puuid/${puuid}`;
    const headers = new HttpHeaders({
      'X-Riot-Token': this.apiKey
    });

    return this.http.get<number>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Obtener la región de plataforma para Match-v5
   * Las regiones de Match-v5 son diferentes a las regiones de servidor
   */
  private getPlatformRegion(region: string): string {
    const regionData = REGIONS.find(r => r.code === region);
    return regionData ? regionData.platform : 'europe';
  }

  /**
   * Manejo de errores HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      switch (error.status) {
        case 400:
          errorMessage = 'Solicitud incorrecta. Verifica los datos ingresados.';
          break;
        case 401:
          errorMessage = 'API Key inválida o expirada. Por favor, verifica tu API Key en environment.development.ts';
          break;
        case 403:
          errorMessage = 'Acceso denegado. Verifica tu API Key y los permisos.';
          break;
        case 404:
          errorMessage = 'Invocador no encontrado. Verifica el Riot ID (nombre#tagline) y la región. Ejemplo: Parragons#EUW';
          break;
        case 429:
          errorMessage = 'Demasiadas peticiones. Por favor, espera un momento antes de intentar de nuevo.';
          break;
        case 500:
          errorMessage = 'Error interno del servidor de Riot. Intenta de nuevo más tarde.';
          break;
        case 503:
          errorMessage = 'Servicio no disponible. La API de Riot puede estar en mantenimiento.';
          break;
        default:
          errorMessage = `Error del servidor: ${error.status} - ${error.message}`;
      }
    }

    console.error('Error en RiotApiService:', error);
    return throwError(() => new Error(errorMessage));
  }
}
