# 📸 Guía Visual y Ejemplos de Uso

## 🎯 Flujos de Usuario

### Flujo 1: Búsqueda Básica de Invocador

**Pasos:**
1. El usuario abre la aplicación en http://localhost:4200
2. Ve el formulario de búsqueda en la parte superior
3. Ingresa un nombre de invocador (ej: "Faker")
4. Selecciona la región (ej: "Corea - KR")
5. Hace clic en "Buscar" o presiona Enter
6. Ve un spinner de carga con el mensaje "Buscando invocador..."
7. Aparece una tarjeta con la información del invocador

**Captura esperada:**
```
┌─────────────────────────────────────────────────────┐
│  ⚔️ League of Legends Explorer                     │
│  Explora estadísticas de invocadores...             │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  🔍 Nombre de Invocador    🌍 Región                │
│  [Faker____________]       [Corea (kr)  ▼]   ⚔️ BUSCAR│
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  ✨ Resultados de la búsqueda    🔄 Nueva búsqueda  │
│                                                      │
│  ┌───────────────────────────────────────────────┐  │
│  │  [👤]  Faker                                  │  │
│  │        Nivel 567                               │  │
│  │  ─────────────────────────────────────────────│  │
│  │  🏆 Solo/Duo                                  │  │
│  │  CHALLENGER I                                 │  │
│  │  1,234 LP                                     │  │
│  │  567V - 234D                                  │  │
│  │  71% WR                                       │  │
│  │  ─────────────────────────────────────────────│  │
│  │  👥 Flex                                      │  │
│  │  MASTER I                                     │  │
│  │  345 LP                                       │  │
│  │  123V - 67D                                   │  │
│  │  65% WR                                       │  │
│  │  ─────────────────────────────────────────────│  │
│  │           [Ver Detalles →]                    │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Flujo 2: Ver Detalles del Invocador

**Pasos:**
1. Usuario hace clic en "Ver Detalles" en una tarjeta
2. Se abre un modal/overlay con información detallada
3. Ve tres tabs: Resumen, Campeones, Partidas
4. Por defecto está en "Resumen"
5. Puede cambiar entre tabs para ver más información

**Vista de Resumen:**
```
┌─────────────────────────────────────────────────────────────┐
│ ✕                                                           │
│                                                             │
│     [👤 Icono]  Faker                                       │
│                 Nivel 567                                   │
│                 🏅 2.4M puntos de maestría                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  📊 Resumen   ⚔️ Campeones   🎮 Partidas                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Clasificación                                              │
│  ──────────────────────────────────────────────────────     │
│                                                             │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  │
│  │  🏆 Solo/Duo            │  │  👥 Flex                │  │
│  │  CHALLENGER I           │  │  MASTER I               │  │
│  │  1,234 LP               │  │  345 LP                 │  │
│  │  567V - 234D            │  │  123V - 67D             │  │
│  │  71% WR                 │  │  65% WR                 │  │
│  │  🔥 En racha            │  │                         │  │
│  └─────────────────────────┘  └─────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Vista de Campeones:**
```
┌─────────────────────────────────────────────────────────────┐
│  Top Campeones                                              │
│  ──────────────────────────────────────────────────────     │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 1  [🎭 Icono]  Yasuo                 Nivel 7          │  │
│  │              567K puntos           ⭐⭐⭐              │  │
│  │              🎖️ 2 tokens                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 2  [🗡️ Icono]  Zed                  Nivel 7          │  │
│  │              432K puntos           ⭐⭐⭐              │  │
│  │              🎖️ 3 tokens                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  (... más campeones)                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Vista de Partidas:**
```
┌─────────────────────────────────────────────────────────────────┐
│  Historial de Partidas Recientes                               │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ VICTORIA  │ [🎭]  │ 12/3/8   │ CS:234  │ [items] │ 25m    ││
│  │ Ranked    │ Yasuo │ 4.67 KDA │ 12.3k💰 │         │ Ayer   ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ DERROTA   │ [⚔️]  │ 5/7/4    │ CS:189  │ [items] │ 32m    ││
│  │ Ranked    │ Zed   │ 1.29 KDA │ 9.8k💰  │         │ Ayer   ││
│  └────────────────────────────────────────────────────────────┘│
│                                                                 │
│  (... más partidas)                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Flujo 3: Manejo de Errores

**Error: Invocador no encontrado**
```
┌─────────────────────────────────────────────────────┐
│  ⚠️                                                  │
│  Error en la búsqueda                               │
│  Invocador no encontrado. Verifica el nombre        │
│  y la región.                                       │
│            [Intentar de nuevo]                       │
└─────────────────────────────────────────────────────┘
```

**Error: API Key inválida**
```
┌─────────────────────────────────────────────────────┐
│  ⚠️                                                  │
│  Error en la búsqueda                               │
│  API Key inválida o expirada. Por favor,           │
│  actualiza tu API Key.                              │
│            [Intentar de nuevo]                       │
└─────────────────────────────────────────────────────┘
```

**Error: Rate Limit**
```
┌─────────────────────────────────────────────────────┐
│  ⚠️                                                  │
│  Error en la búsqueda                               │
│  Demasiadas peticiones. Por favor, espera          │
│  un momento antes de intentar de nuevo.             │
│            [Intentar de nuevo]                       │
└─────────────────────────────────────────────────────┘
```

## 💡 Ejemplos de Código

### Ejemplo 1: Búsqueda de Invocador

```typescript
// En summoner-search.component.ts
handleSearch(searchData: { summonerName: string; region: string }): void {
  this.isLoading.set(true);
  this.errorMessage.set(null);
  
  this.riotApiService.searchSummonerByName(searchData.summonerName, searchData.region)
    .subscribe({
      next: (summoner) => {
        // Obtener información de ranking
        this.riotApiService.getSummonerRankedStats(summoner.id, searchData.region)
          .subscribe({
            next: (rankedStats) => {
              summoner.rankedStats = rankedStats;
              this.summoners.set([summoner]);
              this.isLoading.set(false);
            }
          });
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.isLoading.set(false);
      }
    });
}
```

### Ejemplo 2: Uso de Signals

```typescript
// Declaración
summoners = signal<Summoner[]>([]);
isLoading = signal<boolean>(false);

// Actualización
this.summoners.set([newSummoner]);
this.isLoading.set(true);

// Lectura (en template)
@if (isLoading()) {
  <div>Loading...</div>
}

@for (summoner of summoners(); track summoner.id) {
  <app-summoner-card [summoner]="summoner" />
}
```

### Ejemplo 3: Manejo de Errores

```typescript
private handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'Ha ocurrido un error desconocido';
  
  switch (error.status) {
    case 404:
      errorMessage = 'Invocador no encontrado. Verifica el nombre y la región.';
      break;
    case 429:
      errorMessage = 'Demasiadas peticiones. Por favor, espera un momento.';
      break;
    case 403:
      errorMessage = 'API Key inválida o expirada. Actualiza tu API Key.';
      break;
  }
  
  return throwError(() => new Error(errorMessage));
}
```

## 🎨 Componentes Visuales

### Color Palette
```css
:root {
  --primary-color: #0a1428;      /* Azul muy oscuro */
  --secondary-color: #0e1c2f;    /* Azul oscuro */
  --accent-color: #c89b3c;       /* Oro LoL */
  --text-primary: #f0e6d2;       /* Beige claro */
  --text-secondary: #a09b8c;     /* Gris */
  --success-color: #00d4aa;      /* Verde */
  --error-color: #e84057;        /* Rojo */
}
```

### Rank Colors
```css
--iron: #6d6868;
--bronze: #cd7f32;
--silver: #c0c0c0;
--gold: #ffd700;
--platinum: #00c9a7;
--emerald: #50c878;
--diamond: #b9f2ff;
--master: #e652f9;
--grandmaster: #ff4444;
--challenger: #f4c430;
```

## 📱 Responsive Examples

### Mobile (< 640px)
```
┌────────────────────┐
│  ⚔️ LoL Explorer  │
├────────────────────┤
│  🔍 [Input______]  │
│  🌍 [Region__▼]    │
│  [⚔️ Buscar]       │
├────────────────────┤
│  ┌──────────────┐  │
│  │  [Summoner]  │  │
│  │  Card        │  │
│  └──────────────┘  │
└────────────────────┘
```

### Desktop (> 1024px)
```
┌──────────────────────────────────────────────────────────┐
│  ⚔️ League of Legends Explorer                          │
├──────────────────────────────────────────────────────────┤
│  🔍 [Input_______] 🌍 [Region▼]  [⚔️ Buscar]            │
├──────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │Summoner 1│  │Summoner 2│  │Summoner 3│              │
│  └──────────┘  └──────────┘  └──────────┘              │
└──────────────────────────────────────────────────────────┘
```

## 🧪 Casos de Prueba

### Test 1: Búsqueda Exitosa
**Input:** Nombre: "Faker", Región: "kr"
**Expected:** Tarjeta con información de Faker aparece

### Test 2: Invocador No Encontrado
**Input:** Nombre: "xyz123nonexistent", Región: "euw1"
**Expected:** Mensaje de error "Invocador no encontrado"

### Test 3: Rate Limit
**Input:** 25 búsquedas rápidas consecutivas
**Expected:** Mensaje "Demasiadas peticiones"

### Test 4: API Key Inválida
**Input:** API Key incorrecta en environment
**Expected:** Mensaje "API Key inválida o expirada"

### Test 5: Cambio de Región
**Input:** Cambiar de "euw1" a "na1"
**Expected:** Búsquedas futuras usan la nueva región

## 🎯 Invocadores de Prueba Recomendados

### Europa Oeste (euw1)
- Rekkles
- Caps
- Jankos
- Perkz
- Wunder

### Corea (kr)
- Faker
- ShowMaker
- Chovy
- Keria
- Zeus

### Norteamérica (na1)
- Doublelift
- Bjergsen
- CoreJJ
- Sneaky
- Meteos

## 📊 Métricas de UX

### Tiempos Esperados
- **Carga inicial:** < 2 segundos
- **Búsqueda de invocador:** 1-3 segundos
- **Carga de detalles:** 2-4 segundos
- **Cambio de tabs:** < 0.5 segundos

### Feedback Visual
- ✅ Spinner durante carga
- ✅ Mensajes de error claros
- ✅ Estados hover en botones
- ✅ Animaciones suaves
- ✅ Colores significativos

## 🎓 Demostración en Clase

### Guión Recomendado (5-10 minutos)

1. **Introducción (1 min)**
   - Presentar el proyecto
   - Explicar la API de Riot Games
   - Mostrar la documentación

2. **Búsqueda Básica (2 min)**
   - Buscar un invocador famoso (ej: Faker)
   - Mostrar la tarjeta de resultados
   - Explicar la información mostrada

3. **Vista de Detalles (3 min)**
   - Abrir el modal de detalles
   - Navegar por las tabs
   - Mostrar ranking, campeones y partidas

4. **Características Técnicas (2 min)**
   - Mostrar el código de signals
   - Explicar la estructura de componentes
   - Demostrar el manejo de errores

5. **Responsive Design (1 min)**
   - Redimensionar la ventana
   - Mostrar adaptación mobile

6. **Preguntas (1-2 min)**

## 🎁 Bonus: Easter Eggs

### Sugerencias de Búsqueda
En el estado vacío, se muestran nombres famosos como sugerencias:
- Faker
- Rekkles
- Caps
- Perkz

### Hot Streak Badge
Si un invocador está en racha (hotStreak: true), aparece un badge especial:
```
🔥 En racha
```
Con animación pulsante.

### Perfect KDA
Si un jugador tiene 0 muertes en una partida, el KDA muestra:
```
Perfect KDA
```
En lugar del número.

## 📚 Recursos de Aprendizaje

### Para Estudiantes
1. Lee el README.md primero
2. Sigue la guía SETUP.md
3. Explora el código componente por componente
4. Intenta modificar estilos y comportamientos
5. Añade nuevas características

### Para el Profesor
1. Revisa INSTRUCCIONES.md
2. Consulta RESUMEN.md para estadísticas
3. Ejecuta el proyecto con ./install.sh
4. Prueba diferentes casos de uso
5. Evalúa según los criterios establecidos

---

**¡El proyecto está listo para usar y demostrar!** 🎮⚡
