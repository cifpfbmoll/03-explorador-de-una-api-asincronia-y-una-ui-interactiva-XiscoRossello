import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummonerSearchComponent } from './components/summoner-search/summoner-search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SummonerSearchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'League of Legends Explorer';
}
