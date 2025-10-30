import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Summoner } from '../../models/summoner.model';
import { ChampionMastery } from '../../models/champion-mastery.model';
import { RiotApiService } from '../../services/riot-api.service';
import { DataDragonService } from '../../services/data-dragon.service';
import { MatchHistoryComponent } from '../match-history/match-history.component';

@Component({
  selector: 'app-summoner-details',
  standalone: true,
  imports: [CommonModule, MatchHistoryComponent],
  templateUrl: './summoner-details.component.html',
  styleUrls: ['./summoner-details.component.css']
})
export class SummonerDetailsComponent implements OnInit {
  @Input() summoner!: Summoner;
  @Input() region: string = 'euw1';

  championMastery = signal<ChampionMastery[]>([]);
  championNames = signal<{ [key: number]: string }>({});
  totalMasteryScore = signal<number>(0);
  isLoadingMastery = signal<boolean>(false);
  activeTab = signal<string>('overview');

  constructor(
    private riotApiService: RiotApiService,
    private dataDragonService: DataDragonService
  ) {}

  ngOnInit(): void {
    this.loadChampionMastery();
    this.loadTotalMasteryScore();
    this.loadChampionNames();
  }

  loadChampionNames(): void {
    this.dataDragonService.getChampionData().subscribe({
      next: (champions) => {
        const nameMap: { [key: number]: string } = {};
        Object.values(champions).forEach(champ => {
          nameMap[parseInt(champ.key)] = champ.id;
        });
        this.championNames.set(nameMap);
      },
      error: (error) => {
        console.error('Error loading champion names:', error);
      }
    });
  }

  loadChampionMastery(): void {
    this.isLoadingMastery.set(true);
    this.riotApiService.getChampionMastery(this.summoner.puuid, this.region, 5)
      .subscribe({
        next: (mastery) => {
          this.championMastery.set(mastery);
          this.isLoadingMastery.set(false);
        },
        error: (error) => {
          console.error('Error loading champion mastery:', error);
          this.isLoadingMastery.set(false);
        }
      });
  }

  loadTotalMasteryScore(): void {
    this.riotApiService.getTotalMasteryScore(this.summoner.puuid, this.region)
      .subscribe({
        next: (score) => {
          this.totalMasteryScore.set(score);
        },
        error: (error) => {
          console.error('Error loading total mastery score:', error);
        }
      });
  }

  getSummonerIconUrl(): string {
    return this.dataDragonService.getSummonerIconUrlSync(this.summoner.profileIconId);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://ddragon.leagueoflegends.com/cdn/14.21.1/img/profileicon/29.png';
  }

  getChampionIconUrl(championId: number): string {
    const championName = this.championNames()[championId] || 'Aatrox';
    return this.dataDragonService.getChampionIconUrlSync(championName);
  }

  getChampionName(championId: number): string {
    return this.championNames()[championId] || `Campeón #${championId}`;
  }

  formatMasteryPoints(points: number): string {
    if (points >= 1000000) {
      return `${(points / 1000000).toFixed(1)}M`;
    } else if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}K`;
    }
    return points.toString();
  }

  formatLastPlayed(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Hoy';
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else if (diffDays < 30) {
      return `Hace ${Math.floor(diffDays / 7)} semanas`;
    } else {
      return `Hace ${Math.floor(diffDays / 30)} meses`;
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  getSoloQueueRank() {
    return this.summoner.rankedStats?.find(rank => rank.queueType === 'RANKED_SOLO_5x5') || null;
  }

  getFlexQueueRank() {
    return this.summoner.rankedStats?.find(rank => rank.queueType === 'RANKED_FLEX_SR') || null;
  }

  calculateWinrate(wins: number, losses: number): number {
    const total = wins + losses;
    return total > 0 ? Math.round((wins / total) * 100) : 0;
  }
}
