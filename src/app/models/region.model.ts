export interface Region {
  code: string;
  name: string;
  platform: string;
}

export const REGIONS: Region[] = [
  { code: 'euw1', name: 'Europa Oeste', platform: 'europe' },
  { code: 'eun1', name: 'Europa Nórdica y Este', platform: 'europe' },
  { code: 'na1', name: 'Norteamérica', platform: 'americas' },
  { code: 'kr', name: 'Corea', platform: 'asia' },
  { code: 'br1', name: 'Brasil', platform: 'americas' },
  { code: 'la1', name: 'Latinoamérica Norte', platform: 'americas' },
  { code: 'la2', name: 'Latinoamérica Sur', platform: 'americas' },
  { code: 'oc1', name: 'Oceanía', platform: 'sea' },
  { code: 'tr1', name: 'Turquía', platform: 'europe' },
  { code: 'ru', name: 'Rusia', platform: 'europe' },
  { code: 'jp1', name: 'Japón', platform: 'asia' },
  { code: 'ph2', name: 'Filipinas', platform: 'sea' },
  { code: 'sg2', name: 'Singapur', platform: 'sea' },
  { code: 'th2', name: 'Tailandia', platform: 'sea' },
  { code: 'tw2', name: 'Taiwán', platform: 'sea' },
  { code: 'vn2', name: 'Vietnam', platform: 'sea' }
];

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: ChampionInfo;
  image: ChampionImage;
  tags: string[];
  partype: string;
  stats: ChampionStats;
}

export interface ChampionInfo {
  attack: number;
  defense: number;
  magic: number;
  difficulty: number;
}

export interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface ChampionStats {
  hp: number;
  hpperlevel: number;
  mp: number;
  mpperlevel: number;
  movespeed: number;
  armor: number;
  armorperlevel: number;
  spellblock: number;
  spellblockperlevel: number;
  attackrange: number;
  hpregen: number;
  hpregenperlevel: number;
  mpregen: number;
  mpregenperlevel: number;
  crit: number;
  critperlevel: number;
  attackdamage: number;
  attackdamageperlevel: number;
  attackspeedperlevel: number;
  attackspeed: number;
}
