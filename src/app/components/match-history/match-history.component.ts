import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { RiotApiService } from '../../services/riot-api.service';
import { DataDragonService } from '../../services/data-dragon.service';
import { Match, Participant } from '../../models/match.model';

interface MatchDisplay {
  match: Match;
  participant: Participant;
  gameDate: Date;
  gameDurationMin: number;
}

@Component({
  selector: 'app-match-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit {
  @Input() summonerPuuid!: string;
  @Input() region: string = 'euw1';

  matches = signal<MatchDisplay[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private riotApiService: RiotApiService,
    private dataDragonService: DataDragonService
  ) {}

  ngOnInit(): void {
    this.loadMatches();
  }

  loadMatches(): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.riotApiService.getMatchHistory(this.summonerPuuid, this.region, 10)
      .subscribe({
        next: (matchIds) => {
          if (matchIds.length === 0) {
            this.matches.set([]);
            this.isLoading.set(false);
            return;
          }

          // Obtener detalles de las primeras 10 partidas
          const matchRequests = matchIds.slice(0, 10).map(matchId =>
            this.riotApiService.getMatchDetails(matchId, this.region)
          );

          forkJoin(matchRequests).subscribe({
            next: (matchesData) => {
              const displayMatches: MatchDisplay[] = matchesData.map(match => {
                const participant = match.info.participants.find(
                  p => p.puuid === this.summonerPuuid
                )!;

                return {
                  match,
                  participant,
                  gameDate: new Date(match.info.gameCreation),
                  gameDurationMin: Math.floor(match.info.gameDuration / 60)
                };
              });

              this.matches.set(displayMatches);
              this.isLoading.set(false);
            },
            error: (error) => {
              console.error('Error loading match details:', error);
              this.errorMessage.set('Error al cargar los detalles de las partidas');
              this.isLoading.set(false);
            }
          });
        },
        error: (error) => {
          console.error('Error loading match history:', error);
          this.errorMessage.set(error.message);
          this.isLoading.set(false);
        }
      });
  }

  getChampionIconUrl(championName: string): string {
    return this.dataDragonService.getChampionIconUrlSync(championName);
  }

  getItemIconUrl(itemId: number): string {
    return this.dataDragonService.getItemIconUrlSync(itemId);
  }

  calculateKDA(participant: Participant): string {
    const kda = participant.deaths === 0
      ? 'Perfect'
      : ((participant.kills + participant.assists) / participant.deaths).toFixed(2);
    return kda;
  }

  getKDAClass(participant: Participant): string {
    const kdaValue = participant.deaths === 0
      ? 10
      : (participant.kills + participant.assists) / participant.deaths;

    if (kdaValue >= 5) return 'kda-perfect';
    if (kdaValue >= 3) return 'kda-good';
    if (kdaValue >= 2) return 'kda-average';
    return 'kda-poor';
  }

  formatGameDuration(minutes: number): string {
    return `${minutes}m`;
  }

  formatGameDate(date: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      return `Hace ${diffHours}h`;
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else {
      return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
  }

  getGameMode(queueId: number): string {
    const queueMap: { [key: number]: string } = {
      0: 'Custom',
      400: 'Normal Draft',
      420: 'Ranked Solo/Duo',
      430: 'Normal Blind',
      440: 'Ranked Flex',
      450: 'ARAM',
      700: 'Clash',
      900: 'ARURF',
      1020: 'One For All',
      1300: 'Nexus Blitz'
    };
    return queueMap[queueId] || 'Unknown';
  }

  getItems(participant: Participant): number[] {
    return [
      participant.item0,
      participant.item1,
      participant.item2,
      participant.item3,
      participant.item4,
      participant.item5,
      participant.item6
    ].filter(item => item > 0);
  }

  getTeamKills(match: Match, teamId: number): number {
    const team = match.info.teams.find(t => t.teamId === teamId);
    return team?.objectives?.champion?.kills || 0;
  }

  onChampionImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Usar imagen por defecto de Aatrox
    img.src = 'https://ddragon.leagueoflegends.com/cdn/14.21.1/img/champion/Aatrox.png';
  }

  onItemImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Ocultar la imagen si falla
    img.style.display = 'none';
  }

  reload(): void {
    this.loadMatches();
  }
}
