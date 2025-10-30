import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Summoner, RankedStats } from '../../models/summoner.model';
import { DataDragonService } from '../../services/data-dragon.service';

@Component({
  selector: 'app-summoner-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summoner-card.component.html',
  styleUrls: ['./summoner-card.component.css']
})
export class SummonerCardComponent {
  @Input() summoner!: Summoner;
  @Input() region: string = 'euw1';
  @Output() onViewDetails = new EventEmitter<Summoner>();

  constructor(private dataDragonService: DataDragonService) {}

  getSummonerIconUrl(): string {
    return this.dataDragonService.getSummonerIconUrlSync(this.summoner.profileIconId);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    // Usar un icono por defecto si falla
    img.src = 'https://ddragon.leagueoflegends.com/cdn/14.21.1/img/profileicon/29.png';
  }

  getSoloQueueRank(): RankedStats | null {
    return this.summoner.rankedStats?.find(rank => rank.queueType === 'RANKED_SOLO_5x5') || null;
  }

  getFlexQueueRank(): RankedStats | null {
    return this.summoner.rankedStats?.find(rank => rank.queueType === 'RANKED_FLEX_SR') || null;
  }

  calculateWinrate(rank: RankedStats): number {
    const total = rank.wins + rank.losses;
    return total > 0 ? Math.round((rank.wins / total) * 100) : 0;
  }

  getRankDisplay(rank: RankedStats): string {
    return `${rank.tier} ${rank.rank}`;
  }

  getRankClass(tier: string): string {
    return tier.toLowerCase();
  }

  viewDetails(): void {
    this.onViewDetails.emit(this.summoner);
  }
}
