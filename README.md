# Explorador de League of Legends - API con eventos y UI interactiva

## Descripción del Proyecto

Una aplicación web que permite a los usuarios buscar y explorar información de invocadores (summoners) de League of Legends utilizando la API de Riot Games. Incluye una interfaz interactiva para ingresar nombres de invocadores, mostrar resultados en tarjetas detalladas, y manejar estados como carga, errores o resultados vacíos.

Esta aplicación es similar al cliente de Reddit visto en clase, pero enfocada en la **API de Riot Games** para practicar conceptos como solicitudes HTTP, manejo de datos asíncronos y gestión de estado reactivo con signals.

## Objetivo

Ampliar el conocimiento básico de Angular, reforzando habilidades en:
- Frontend development
- API integration con servicios externos
- Gestión de estado reactivo usando **signals**
- Manejo de errores y estados de carga
- Diseño de interfaces dinámicas y responsivas

## Requisitos Técnicos

### Framework
- **Angular ~20.3.0**
- Énfasis en **módulos standalone** para componentes reutilizables
- TypeScript para type safety

### Características Principales
- ✨ **Signals** para actualizaciones reactivas del estado
- 🔧 **Servicios** para encapsular la lógica de negocio y llamadas API
- 🎨 **Plantillas Angular** para UI dinámica con directivas de control de flujo
- 🌐 **HttpClientModule** para manejar solicitudes HTTP a la API de Riot

### Dependencias
```json
{
  "@angular/core": "~20.3.0",
  "@angular/common": "~20.3.0",
  "@angular/common/http": "~20.3.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0"
}
```

### API: Riot Games API

**Endpoint base**: `https://[region].api.riotgames.com`

**Regiones disponibles**:
- `euw1` - Europe West
- `eun1` - Europe Nordic & East
- `na1` - North America
- `kr` - Korea
- `br1` - Brazil
- Y más...

**Características de la API**:
- Requiere **API Key** (gratuita para desarrollo)
- Rate limits: 20 requests/segundo (Development Key)
- Documentación completa: https://developer.riotgames.com/

**Endpoints principales a utilizar**:

1. **Buscar Invocador por nombre**
   ```
   GET /lol/summoner/v4/summoners/by-name/{summonerName}
   ```

2. **Obtener información de clasificación**
   ```
   GET /lol/league/v4/entries/by-summoner/{encryptedSummonerId}
   ```

3. **Obtener historial de partidas**
   ```
   GET /lol/match/v5/matches/by-puuid/{puuid}/ids
   GET /lol/match/v5/matches/{matchId}
   ```

4. **Obtener maestría de campeones**
   ```
   GET /lol/champion-mastery/v4/champion-masteries/by-summoner/{encryptedSummonerId}
   ```

**Obtener API Key**:
1. Registrarse en https://developer.riotgames.com/
2. Crear una aplicación
3. Copiar la Development API Key (válida 24h)

## Estructura del Proyecto

```
api-league-web/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── summoner-search/
│   │   │   │   ├── summoner-search.component.ts
│   │   │   │   ├── summoner-search.component.html
│   │   │   │   └── summoner-search.component.css
│   │   │   ├── summoner-card/
│   │   │   │   ├── summoner-card.component.ts
│   │   │   │   ├── summoner-card.component.html
│   │   │   │   └── summoner-card.component.css
│   │   │   ├── summoner-details/
│   │   │   │   ├── summoner-details.component.ts
│   │   │   │   ├── summoner-details.component.html
│   │   │   │   └── summoner-details.component.css
│   │   │   ├── match-history/
│   │   │   │   ├── match-history.component.ts
│   │   │   │   ├── match-history.component.html
│   │   │   │   └── match-history.component.css
│   │   │   └── search-bar/
│   │   │       ├── search-bar.component.ts
│   │   │       ├── search-bar.component.html
│   │   │       └── search-bar.component.css
│   │   ├── services/
│   │   │   ├── riot-api.service.ts
│   │   │   └── data-dragon.service.ts
│   │   ├── models/
│   │   │   ├── summoner.model.ts
│   │   │   ├── ranked-stats.model.ts
│   │   │   ├── match.model.ts
│   │   │   └── champion-mastery.model.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   └── app.config.ts
│   ├── assets/
│   │   └── images/
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.development.ts
│   └── styles.css
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Componentes Principales

### 1. `summoner-search.component.ts`
Componente principal que coordina la búsqueda y visualización de invocadores.

**Responsabilidades**:
- Gestionar el estado de búsqueda con signals
- Coordinar llamadas al servicio de Riot API
- Manejar estados de carga, error y éxito
- Mostrar resultados en tarjetas

**Signals principales**:
```typescript
summoners = signal<Summoner[]>([]);
isLoading = signal<boolean>(false);
errorMessage = signal<string | null>(null);
selectedRegion = signal<string>('euw1');
```

### 2. `search-bar.component.ts`
Componente reutilizable para la entrada de usuario.

**Características**:
- Input para nombre de invocador
- Selector de región
- Botón de búsqueda
- Validación de entrada
- Emit de eventos al componente padre

### 3. `summoner-card.component.ts`
Muestra información resumida de un invocador en formato tarjeta.

**Información mostrada**:
- Icono del invocador
- Nombre y nivel
- Ranking (Solo/Duo, Flex)
- Win rate
- Botón para ver detalles

### 4. `summoner-details.component.ts`
Vista detallada de un invocador al hacer clic.

**Secciones**:
- Información completa de ranking
- Top campeones (maestría)
- Historial de partidas recientes
- Estadísticas detalladas

### 5. `match-history.component.ts`
Muestra el historial de partidas de un invocador.

**Características**:
- Lista de partidas recientes (últimas 20)
- Resultado (Victoria/Derrota)
- Campeón jugado
- KDA (Kills/Deaths/Assists)
- Duración de partida
- Fecha y hora

## Servicios

### 1. `riot-api.service.ts`
Servicio principal para interactuar con la API de Riot Games.

**Métodos principales**:
```typescript
// Buscar invocador por nombre
searchSummoner(summonerName: string, region: string): Observable<Summoner>

// Obtener información de ranking
getSummonerRankedStats(summonerId: string, region: string): Observable<RankedStats[]>

// Obtener historial de partidas
getMatchHistory(puuid: string, region: string, count: number): Observable<string[]>

// Obtener detalles de una partida
getMatchDetails(matchId: string, region: string): Observable<Match>

// Obtener maestría de campeones
getChampionMastery(summonerId: string, region: string): Observable<ChampionMastery[]>
```

**Manejo de errores**:
- Rate limiting (429): Reintentar con backoff exponencial
- Invocador no encontrado (404): Mensaje amigable al usuario
- API Key inválida (403): Instrucciones para renovar
- Timeout: Mensaje de conexión

**Ejemplo de implementación**:
```typescript
searchSummoner(summonerName: string, region: string): Observable<Summoner> {
  const url = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURIComponent(summonerName)}`;
  
  return this.http.get<Summoner>(url, {
    headers: { 'X-Riot-Token': this.apiKey }
  }).pipe(
    catchError(error => {
      if (error.status === 404) {
        return throwError(() => new Error('Invocador no encontrado'));
      }
      if (error.status === 429) {
        return throwError(() => new Error('Demasiadas peticiones. Espera un momento.'));
      }
      return throwError(() => new Error('Error al buscar invocador'));
    })
  );
}
```

### 2. `data-dragon.service.ts`
Servicio para obtener recursos estáticos (imágenes, datos de campeones).

**Data Dragon de Riot**:
- URL base: `https://ddragon.leagueoflegends.com`
- No requiere API Key
- Proporciona imágenes y datos de campeones, items, runas, etc.

**Métodos**:
```typescript
// Obtener versión actual
getLatestVersion(): Observable<string>

// URL de imagen de campeón
getChampionIconUrl(championName: string): string

// URL de imagen de invocador
getSummonerIconUrl(iconId: number): string

// Datos de todos los campeones
getChampionData(): Observable<any>
```

## Modelos de Datos

### `summoner.model.ts`
```typescript
export interface Summoner {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
  revisionDate: number;
}
```

### `ranked-stats.model.ts`
```typescript
export interface RankedStats {
  queueType: string; // RANKED_SOLO_5x5, RANKED_FLEX_SR
  tier: string; // IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER
  rank: string; // I, II, III, IV
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}
```

### `match.model.ts`
```typescript
export interface Match {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    participants: Participant[];
  };
}

export interface Participant {
  puuid: string;
  summonerName: string;
  championName: string;
  championId: number;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  // ... más campos
}
```

## Plantillas y Directivas

### Uso de directivas de control de flujo modernas

**@if - Manejo de estados de carga y error**:
```html
@if (isLoading()) {
  <div class="loading-spinner">
    <span>Buscando invocador...</span>
  </div>
}

@if (errorMessage()) {
  <div class="error-message">
    <p>{{ errorMessage() }}</p>
  </div>
}

@if (summoners().length > 0 && !isLoading()) {
  <div class="summoners-grid">
    @for (summoner of summoners(); track summoner.id) {
      <app-summoner-card [summoner]="summoner" />
    }
  </div>
}
```

**@for - Iteración sobre colecciones**:
```html
<div class="ranked-stats">
  @for (rank of rankedStats(); track rank.queueType) {
    <div class="rank-card" [class.solo-queue]="rank.queueType === 'RANKED_SOLO_5x5'">
      <h3>{{ getRankName(rank.queueType) }}</h3>
      <p class="tier">{{ rank.tier }} {{ rank.rank }}</p>
      <p class="lp">{{ rank.leaguePoints }} LP</p>
      <p class="winrate">{{ calculateWinrate(rank) }}% WR</p>
    </div>
  }
}
```

### Eventos y binding

```html
<app-search-bar 
  (onSearch)="handleSearch($event)"
  (onRegionChange)="handleRegionChange($event)"
/>

<app-summoner-card 
  [summoner]="summoner"
  (click)="showDetails(summoner.id)"
/>
```

## Estilos CSS

### Ejemplo de diseño moderno

```css
/* Variables CSS para tema */
:root {
  --primary-color: #0a1428;
  --secondary-color: #0e1c2f;
  --accent-color: #c89b3c;
  --text-primary: #f0e6d2;
  --text-secondary: #a09b8c;
  --success-color: #1f8ecd;
  --error-color: #e84057;
}

.summoners-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.summoner-card {
  background: var(--secondary-color);
  border: 2px solid var(--accent-color);
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.summoner-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(200, 155, 60, 0.3);
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: var(--accent-color);
}
```

## Características Adicionales

### 1. Filtrado de Invocadores
- **Por rango**: Iron, Bronze, Silver, Gold, Platinum, Diamond, Master+
- **Por región**: EUW, EUNE, NA, KR, etc.
- **Por win rate**: >50%, >60%, >70%

```typescript
filteredSummoners = computed(() => {
  const summoners = this.summoners();
  const rankFilter = this.selectedRankFilter();
  
  return summoners.filter(summoner => {
    const rankedStats = summoner.rankedStats;
    return rankedStats?.tier === rankFilter || rankFilter === 'ALL';
  });
});
```

### 2. Vista de Detalles Expandida
Al hacer clic en una tarjeta de invocador:
- Modal o ruta dedicada con información completa
- Tabs para diferentes secciones (Overview, Matches, Champions, Live Game)
- Animaciones de transición

### 3. Notificaciones en Tiempo Real
Usando signals para actualizaciones:
```typescript
// Notificación cuando un invocador sube de rango
rankUpNotification = signal<string | null>(null);

// Actualizar cada X minutos
setInterval(() => {
  this.refreshSummonerData();
}, 300000); // 5 minutos
```

### 4. Comparador de Invocadores
- Seleccionar múltiples invocadores
- Comparar estadísticas lado a lado
- Gráficos comparativos (win rate, KDA, etc.)

### 5. Búsqueda por Campeón
- Filtrar historial por campeón específico
- Estadísticas por campeón
- Builds más usadas

### 6. Modo Oscuro/Claro
Toggle para cambiar tema visual usando signals:
```typescript
isDarkMode = signal<boolean>(true);
```

## Configuración del Proyecto

### 1. Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd api-league-web

# Instalar dependencias
npm install
```

### 2. Configurar API Key

Crear archivo `src/environments/environment.development.ts`:
```typescript
export const environment = {
  production: false,
  riotApiKey: 'TU-API-KEY-AQUI',
  defaultRegion: 'euw1'
};
```

⚠️ **IMPORTANTE**: NO subir la API Key al repositorio. Añadir al `.gitignore`:
```
# API Keys
src/environments/environment.development.ts
src/environments/environment.ts
```

### 3. Ejecutar la aplicación

```bash
# Modo desarrollo
ng serve

# La aplicación estará disponible en http://localhost:4200
```

### 4. Build para producción

```bash
ng build --configuration production
```

## Manejo de Errores HTTP

### Códigos de respuesta comunes

| Código | Significado | Acción |
|--------|-------------|--------|
| 200 | OK | Procesar respuesta normalmente |
| 400 | Bad Request | Validar parámetros de entrada |
| 403 | Forbidden | API Key inválida o expirada |
| 404 | Not Found | Invocador no existe |
| 429 | Rate Limit | Esperar y reintentar |
| 500 | Server Error | Mostrar error genérico |
| 503 | Service Unavailable | API de Riot en mantenimiento |

### Implementación de retry logic

```typescript
import { retry, catchError } from 'rxjs/operators';

this.http.get(url).pipe(
  retry({
    count: 3,
    delay: (error, retryCount) => {
      if (error.status === 429) {
        return timer(retryCount * 1000); // Backoff exponencial
      }
      throw error;
    }
  }),
  catchError(this.handleError)
);
```

## Testing

### Unit Tests
```bash
ng test
```

### E2E Tests
```bash
ng e2e
```

### Ejemplos de tests a implementar
- Búsqueda de invocador válido
- Manejo de invocador no encontrado
- Rate limiting
- Actualización reactiva con signals
- Renderizado de componentes

## Recursos Adicionales

### Documentación
- 📚 [Riot Games API Docs](https://developer.riotgames.com/apis)
- 📚 [Angular Signals Guide](https://angular.dev/guide/signals)
- 📚 [Data Dragon Documentation](https://developer.riotgames.com/docs/lol#data-dragon)

### Comunidad
- 💬 [Riot API Discord](https://discord.gg/riotgamesdevrel)
- 💬 [Angular Discord](https://discord.gg/angular)

### Herramientas útiles
- 🛠️ [Postman](https://www.postman.com/) - Para probar endpoints
- 🛠️ [Riot API Explorer](https://developer.riotgames.com/apis) - Explorador interactivo

## Roadmap

### Fase 1: MVP ✅
- [x] Búsqueda básica de invocadores
- [x] Visualización de información básica
- [x] Manejo de errores básico

### Fase 2: Funcionalidad Extendida 🚧
- [ ] Historial de partidas detallado
- [ ] Maestría de campeones
- [ ] Filtros avanzados
- [ ] Comparador de invocadores

### Fase 3: Características Avanzadas 📅
- [ ] Live game tracking
- [ ] Notificaciones push
- [ ] Análisis de builds
- [ ] Recomendaciones de campeones
- [ ] Integración con partida en vivo

## Contribución

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es con fines educativos para el curso IFC33.

## Notas Importantes

⚠️ **Rate Limits**: La Development API Key tiene límite de 20 requests/segundo y 100 requests/2 minutos. Para uso en producción, solicitar una Production API Key.

⚠️ **Regiones**: Las regiones de la API son diferentes para Match-v5. Por ejemplo, EUW1 usa "europe" como región de plataforma.

⚠️ **Nombres de Invocador**: Los nombres pueden contener espacios y caracteres especiales. Usar `encodeURIComponent()` al hacer requests.

## Autor

Proyecto desarrollado para el curso IFC33 - 2º Cliente

---

**¡Disfruta explorando el mundo de League of Legends con Angular!** 🎮⚡
