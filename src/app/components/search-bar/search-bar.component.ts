import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { REGIONS, Region } from '../../models/region.model';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() onSearch = new EventEmitter<{ summonerName: string; region: string }>();
  @Output() onRegionChange = new EventEmitter<string>();

  summonerName = signal<string>('');
  selectedRegion = signal<string>('euw1');
  regions: Region[] = REGIONS;

  handleSearch(): void {
    const name = this.summonerName().trim();
    
    if (name) {
      this.onSearch.emit({
        summonerName: name,
        region: this.selectedRegion()
      });
    }
  }

  updateSummonerName(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.summonerName.set(input.value);
  }

  updateRegion(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedRegion.set(select.value);
    this.onRegionChange.emit(select.value);
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }
}
