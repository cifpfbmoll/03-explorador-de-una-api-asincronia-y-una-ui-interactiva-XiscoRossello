# 🚀 Guía de Inicio Rápido - League of Legends Explorer

Esta guía te ayudará a configurar y ejecutar el proyecto en tu máquina local.

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v18 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene con Node.js)
- **Angular CLI** (v20.3.0 o superior)
- **Riot Games API Key** - [Obtener aquí](https://developer.riotgames.com/)

## 🔧 Instalación

### 1. Instalar Angular CLI globalmente

```bash
npm install -g @angular/cli@20.3.0
```

### 2. Instalar dependencias del proyecto

```bash
npm install
```

## 🔑 Configuración de la API Key

### 1. Obtener tu API Key de Riot Games

1. Ve a [https://developer.riotgames.com/](https://developer.riotgames.com/)
2. Inicia sesión con tu cuenta de Riot Games
3. Crea una nueva aplicación o usa una existente
4. Copia tu **Development API Key** (válida por 24 horas)

### 2. Configurar el archivo de entorno

1. Copia el archivo de ejemplo:
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.development.ts
   ```

2. Abre `src/environments/environment.development.ts` y reemplaza `RGAPI-YOUR-API-KEY-HERE` con tu API Key:
   ```typescript
   export const environment = {
     production: false,
     riotApiKey: 'RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
     defaultRegion: 'euw1'
   };
   ```

3. **IMPORTANTE:** Nunca subas este archivo a Git. Ya está incluido en `.gitignore`

### 3. Para producción

Crea también `src/environments/environment.ts`:
```typescript
export const environment = {
  production: true,
  riotApiKey: 'TU-API-KEY-DE-PRODUCCION',
  defaultRegion: 'euw1'
};
```

## ▶️ Ejecutar el proyecto

### Modo desarrollo

```bash
ng serve
```

O usando npm:

```bash
npm start
```

La aplicación estará disponible en: **http://localhost:4200**

### Build para producción

```bash
ng build --configuration production
```

Los archivos compilados estarán en la carpeta `dist/`

## 🧪 Testing

### Ejecutar tests unitarios

```bash
ng test
```

### Ejecutar tests e2e

```bash
ng e2e
```

## 📝 Uso de la aplicación

### 1. Búsqueda básica

1. Ingresa el nombre de un invocador (ej: "Faker", "Rekkles")
2. Selecciona la región (ej: EUW, KR, NA)
3. Haz clic en "Buscar"

### 2. Ver detalles

1. Haz clic en cualquier tarjeta de invocador
2. Navega por las pestañas:
   - **Resumen:** Información de ranking
   - **Campeones:** Top campeones por maestría
   - **Partidas:** Historial de partidas recientes

### 3. Regiones disponibles

- **EUW** (euw1): Europa Oeste
- **EUNE** (eun1): Europa Nórdica y Este
- **NA** (na1): Norteamérica
- **KR** (kr): Corea
- **BR** (br1): Brasil
- **LAN** (la1): Latinoamérica Norte
- **LAS** (la2): Latinoamérica Sur
- Y más...

## ⚠️ Limitaciones de la API

### Development API Key

- **20 requests/segundo**
- **100 requests/2 minutos**
- Válida por **24 horas**
- Solo para desarrollo y testing

### Production API Key

Si necesitas más requests, solicita una Production API Key en el portal de desarrolladores de Riot.

## 🐛 Solución de problemas

### Error: API Key inválida o expirada

**Solución:**
1. Verifica que tu API Key esté correctamente copiada en `environment.development.ts`
2. Las Development API Keys expiran cada 24 horas. Genera una nueva en el portal de desarrolladores
3. Asegúrate de que no haya espacios extras al copiar la key

### Error: Invocador no encontrado

**Solución:**
1. Verifica que el nombre del invocador esté escrito correctamente
2. Asegúrate de seleccionar la región correcta
3. Los nombres son sensibles a mayúsculas/minúsculas en algunas regiones

### Error: Demasiadas peticiones (429)

**Solución:**
1. Has superado el límite de rate limit
2. Espera unos segundos antes de hacer más búsquedas
3. Si persiste, considera espaciar las búsquedas o solicitar una Production API Key

### Error: Cannot find module '@angular/...'

**Solución:**
1. Asegúrate de haber ejecutado `npm install`
2. Si el error persiste, elimina `node_modules` y vuelve a instalar:
   ```bash
   rm -rf node_modules
   npm install
   ```

### Error: Service Unavailable (503)

**Solución:**
1. La API de Riot puede estar en mantenimiento
2. Intenta de nuevo más tarde
3. Verifica el estado de la API en [status.riotgames.com](https://status.riotgames.com)

## 📚 Recursos adicionales

- [Documentación de Angular](https://angular.dev)
- [Riot Games API Docs](https://developer.riotgames.com/apis)
- [Data Dragon Documentation](https://developer.riotgames.com/docs/lol#data-dragon)
- [Riot API Discord](https://discord.gg/riotgamesdevrel)

## 🎯 Características implementadas

✅ Búsqueda de invocadores por nombre y región
✅ Visualización de información de ranking (Solo/Duo y Flex)
✅ Top campeones por maestría
✅ Historial de partidas con detalles (KDA, items, duración)
✅ Diseño responsive y moderno
✅ Manejo de errores y estados de carga
✅ Uso de Angular Signals para estado reactivo
✅ Componentes standalone
✅ Tema visual inspirado en League of Legends

## 🔜 Mejoras futuras

- [ ] Live game tracking
- [ ] Filtros avanzados de partidas
- [ ] Comparador de invocadores
- [ ] Gráficos de estadísticas
- [ ] Análisis de builds
- [ ] Recomendaciones de campeones
- [ ] Notificaciones push
- [ ] Cache de datos con localStorage
- [ ] Modo offline con PWA

## 📄 Licencia

Este proyecto es con fines educativos para el curso IFC33 - 2º Cliente.

## 👨‍💻 Autor

Proyecto desarrollado como parte del curso IFC33.

---

**¡Disfruta explorando el mundo de League of Legends!** 🎮⚡

## 🆘 ¿Necesitas ayuda?

Si tienes problemas o preguntas:
1. Revisa esta guía de inicio rápido
2. Consulta la documentación oficial de Riot Games API
3. Revisa los issues del proyecto
4. Contacta con el profesor del curso

**Happy coding!** 🚀
