import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SummonerCardComponent } from '../summoner-card/summoner-card.component';
import { SummonerDetailsComponent } from '../summoner-details/summoner-details.component';
import { RiotApiService } from '../../services/riot-api.service';
import { Summoner } from '../../models/summoner.model';

@Component({
  selector: 'app-summoner-search',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, SummonerCardComponent, SummonerDetailsComponent],
  templateUrl: './summoner-search.component.html',
  styleUrls: ['./summoner-search.component.css']
})
export class SummonerSearchComponent {
  summoners = signal<Summoner[]>([]);
  selectedSummoner = signal<Summoner | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  selectedRegion = signal<string>('euw1');
  hasSearched = signal<boolean>(false);

  constructor(private riotApiService: RiotApiService) {}

  handleSearch(searchData: { summonerName: string; region: string }): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.selectedSummoner.set(null);
    this.hasSearched.set(true);

    // Separar gameName y tagLine
    let gameName = searchData.summonerName;
    let tagLine = searchData.region.toUpperCase(); // Por defecto usar la región como tagline
    
    // Si incluye #, separar nombre y tagline
    if (searchData.summonerName.includes('#')) {
      const parts = searchData.summonerName.split('#');
      gameName = parts[0].trim();
      tagLine = parts[1].trim();
    }

    this.riotApiService.searchSummonerByName(gameName, tagLine, searchData.region)
      .subscribe({
        next: (summoner) => {
          // Obtener información de ranking
          this.riotApiService.getSummonerRankedStats(summoner.id, searchData.region)
            .subscribe({
              next: (rankedStats) => {
                summoner.rankedStats = rankedStats;
                this.summoners.set([summoner]);
                this.isLoading.set(false);
              },
              error: (error) => {
                // Incluso si falla el ranking, mostramos el invocador
                console.warn('Error obteniendo ranking:', error);
                this.summoners.set([summoner]);
                this.isLoading.set(false);
              }
            });
        },
        error: (error) => {
          this.errorMessage.set(error.message);
          this.summoners.set([]);
          this.isLoading.set(false);
        }
      });
  }

  handleRegionChange(region: string): void {
    this.selectedRegion.set(region);
  }

  handleViewDetails(summoner: Summoner): void {
    this.selectedSummoner.set(summoner);
  }

  handleCloseDetails(): void {
    this.selectedSummoner.set(null);
  }

  clearSearch(): void {
    this.summoners.set([]);
    this.selectedSummoner.set(null);
    this.errorMessage.set(null);
    this.hasSearched.set(false);
  }
}
