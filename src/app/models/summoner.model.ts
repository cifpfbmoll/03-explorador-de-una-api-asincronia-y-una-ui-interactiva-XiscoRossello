export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  // Campos adicionales para la UI
  name?: string;
  rankedStats?: RankedStats[];
}

export interface RankedStats {
  leagueId: string;
  queueType: string; // RANKED_SOLO_5x5, RANKED_FLEX_SR
  tier: string; // IRON, BRONZE, SILVER, GOLD, PLATINUM, EMERALD, DIAMOND, MASTER, GRANDMASTER, CHALLENGER
  rank: string; // I, II, III, IV
  summonerId: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}
