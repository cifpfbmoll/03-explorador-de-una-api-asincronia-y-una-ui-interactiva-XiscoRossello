# 📖 Instrucciones Adicionales - League of Legends Explorer

## 🎓 Para el profesor

Este proyecto ha sido desarrollado siguiendo los requisitos establecidos en el README principal. A continuación se detallan aspectos importantes de la implementación.

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
api-league-web/
├── src/
│   ├── app/
│   │   ├── components/              # Componentes standalone
│   │   │   ├── search-bar/          # Barra de búsqueda con región
│   │   │   ├── summoner-card/       # Tarjeta de invocador
│   │   │   ├── summoner-search/     # Componente principal
│   │   │   ├── summoner-details/    # Vista detallada
│   │   │   └── match-history/       # Historial de partidas
│   │   ├── models/                  # Interfaces TypeScript
│   │   │   ├── summoner.model.ts
│   │   │   ├── match.model.ts
│   │   │   ├── champion-mastery.model.ts
│   │   │   └── region.model.ts
│   │   ├── services/                # Servicios API
│   │   │   ├── riot-api.service.ts
│   │   │   └── data-dragon.service.ts
│   │   ├── app.component.*          # Componente raíz
│   │   ├── app.config.ts            # Configuración de la app
│   │   └── app.routes.ts            # Rutas (configurables)
│   ├── environments/                # Configuración de entornos
│   │   └── environment.example.ts
│   ├── styles.css                   # Estilos globales
│   ├── index.html                   # HTML principal
│   └── main.ts                      # Punto de entrada
├── angular.json                     # Configuración de Angular
├── package.json                     # Dependencias
├── tsconfig.json                    # Configuración TypeScript
├── README.md                        # Documentación principal
└── SETUP.md                         # Guía de inicio rápido
```

## 🎯 Conceptos de Angular Implementados

### 1. **Signals** (Angular 20.3+)
Utilizados para gestión de estado reactivo:

```typescript
// Ejemplo en summoner-search.component.ts
summoners = signal<Summoner[]>([]);
isLoading = signal<boolean>(false);
errorMessage = signal<string | null>(null);
```

**Ventajas:**
- Reactividadautomática
- Mejor rendimiento que Zone.js
- Código más limpio y predecible

### 2. **Standalone Components**
Todos los componentes son standalone (no requieren módulos):

```typescript
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html'
})
```

**Ventajas:**
- Menos boilerplate
- Mejor tree-shaking
- Más fácil de mantener

### 3. **Directivas de Control de Flujo Modernas**
Uso de `@if`, `@for`, `@else`:

```html
@if (isLoading()) {
  <div class="loading">...</div>
}

@for (summoner of summoners(); track summoner.id) {
  <app-summoner-card [summoner]="summoner" />
}
```

**Ventajas:**
- Sintaxis más clara
- Mejor performance
- Type-safety mejorado

### 4. **HttpClient para API Calls**
Servicio `RiotApiService` con manejo completo de errores:

```typescript
searchSummonerByName(name: string, region: string): Observable<Summoner> {
  return this.http.get<Summoner>(url, { headers }).pipe(
    catchError(this.handleError)
  );
}
```

### 5. **RxJS Operators**
Uso de operadores como `map`, `catchError`, `forkJoin`:

```typescript
forkJoin(matchRequests).subscribe({
  next: (matchesData) => {
    // Procesar múltiples partidas en paralelo
  }
});
```

## 🎨 Diseño y UX

### Tema Visual
- **Inspirado en League of Legends:** Colores oro (#c89b3c) y azul oscuro (#0a1428)
- **Responsive:** Mobile-first design
- **Animaciones:** Transiciones suaves y feedback visual
- **Accesibilidad:** Focus states y aria-labels

### Estados de la UI
1. **Loading:** Spinner animado con mensaje
2. **Error:** Mensaje claro con opción de reintentar
3. **Empty:** Estado vacío con sugerencias
4. **Success:** Resultados con información completa

## 🔌 Integración con API de Riot Games

### Endpoints Utilizados

1. **Summoner-v4:** Búsqueda de invocadores
   ```
   GET /lol/summoner/v4/summoners/by-name/{name}
   ```

2. **League-v4:** Información de ranking
   ```
   GET /lol/league/v4/entries/by-summoner/{id}
   ```

3. **Match-v5:** Historial de partidas
   ```
   GET /lol/match/v5/matches/by-puuid/{puuid}/ids
   GET /lol/match/v5/matches/{matchId}
   ```

4. **Champion-Mastery-v4:** Maestría de campeones
   ```
   GET /lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}/top
   ```

### Data Dragon
API estática para imágenes y datos de campeones:
```
https://ddragon.leagueoflegends.com/cdn/{version}/img/...
```

## 🧪 Testing (Preparado para implementar)

### Unit Tests
Estructura preparada en cada componente:
```typescript
describe('SearchBarComponent', () => {
  it('should emit search event with correct data', () => {
    // Test implementation
  });
});
```

### E2E Tests
Configuración lista en `angular.json`

## 📊 Comparación: GitHub API vs Riot API

| Aspecto | GitHub API | Riot Games API |
|---------|-----------|----------------|
| **Autenticación** | Opcional para públicas | Requerida (API Key) |
| **Rate Limits** | 60/hora sin auth, 5000/hora con auth | 20/seg Development, más con Production |
| **Complejidad de datos** | Repositorios, usuarios, issues | Invocadores, partidas, rankings, maestría |
| **Regiones** | Global | Múltiples regiones (EUW, NA, KR, etc.) |
| **Casos de uso** | Buscar repos, ver commits, stats | Ver estadísticas de jugadores, historial |
| **Documentación** | Excelente | Muy buena, con ejemplos |

## 🚀 Características Destacadas

### 1. Manejo Robusto de Errores
- Detección de códigos HTTP específicos (403, 404, 429, 503)
- Mensajes de error personalizados y útiles
- Retry logic preparado para rate limiting

### 2. Performance
- Uso de `shareReplay` para cachear datos de Data Dragon
- Lazy loading preparado
- Optimización de imágenes

### 3. Código Limpio
- Separación de responsabilidades (services, components, models)
- Interfaces TypeScript para type-safety
- Comentarios JSDoc en funciones complejas

### 4. Escalabilidad
- Fácil añadir nuevos endpoints
- Componentes reutilizables
- Configuración centralizada

## 📝 Notas para la Evaluación

### Requisitos Cumplidos

✅ **Framework:** Angular 20.3.0 con componentes standalone
✅ **Signals:** Implementados para estado reactivo
✅ **API Integration:** Riot Games API completamente integrada
✅ **HttpClient:** Configurado con interceptores
✅ **Componentes:**
  - ✅ search-bar (entrada de usuario)
  - ✅ summoner-card (tarjetas de resultados)
  - ✅ summoner-search (componente principal)
  - ✅ summoner-details (vista detallada)
  - ✅ match-history (historial de partidas)

✅ **Servicios:**
  - ✅ riot-api.service.ts (llamadas API)
  - ✅ data-dragon.service.ts (recursos estáticos)

✅ **Plantillas:** Uso de @if, @for, eventos, binding
✅ **Estilos:** CSS moderno con variables y responsive design
✅ **Manejo de Errores:** Códigos HTTP 403, 404, 429, 503
✅ **Estados:** Loading, error, empty, success

### Características Adicionales Implementadas

🌟 **Filtrado:** Por región (16 regiones disponibles)
🌟 **Detalles:** Modal con tabs (Overview, Champions, Matches)
🌟 **Notificaciones:** Uso de signals para updates en tiempo real
🌟 **Maestría de Campeones:** Top 5 campeones con niveles y puntos
🌟 **Historial Detallado:** 10 últimas partidas con KDA, items, duración
🌟 **Responsive Design:** Funciona en móvil, tablet y desktop
🌟 **Animaciones:** Transiciones suaves y feedback visual
🌟 **Accesibilidad:** Focus states y keyboard navigation

## 🔄 Diferencias con el Ejemplo de Reddit

| Aspecto | Reddit Client | LoL Explorer |
|---------|---------------|--------------|
| **API** | Reddit JSON | Riot Games API |
| **Autenticación** | No requerida | API Key requerida |
| **Estructura** | Subreddits → Posts | Invocadores → Stats |
| **Datos** | Texto, imágenes | Estadísticas de juego |
| **Actualización** | Polling | On-demand |
| **Complejidad** | Media | Alta (múltiples endpoints) |

## 💡 Consejos para Ejecutar

1. **Obtener API Key primero** - Es esencial antes de ejecutar
2. **Usar nombres de invocadores reales** - Prueba con "Faker" en región KR
3. **Respetar rate limits** - Espera entre búsquedas si usas Development Key
4. **Revisar consola** - Los errores se loguean para debugging

## 🎓 Aprendizajes Clave

Este proyecto demuestra:
- Integración con APIs externas reales
- Manejo de autenticación y rate limiting
- Gestión de estado con Signals
- Componentes reutilizables y escalables
- Buenas prácticas de Angular moderno
- UX profesional con feedback visual
- TypeScript avanzado con interfaces complejas

---

**¿Preguntas?** Consulta el README.md principal o SETUP.md para más detalles.
