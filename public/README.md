# Directorio de Assets

Esta carpeta contiene recursos estáticos para la aplicación.

## Estructura Recomendada

```
public/
├── images/
│   ├── logo.png
│   └── champion-placeholder.png
├── icons/
│   └── favicon.ico
└── fonts/
    └── (fuentes personalizadas si es necesario)
```

## Recursos Necesarios

### Favicon
Puedes generar un favicon en: https://favicon.io/
Coloca `favicon.ico` en la raíz de `public/`

### Placeholder para Campeones
Si las imágenes de Data Dragon fallan, se puede usar un placeholder.
Dimensiones recomendadas: 120x120px

### Logo
Logo opcional para el header de la aplicación.

## Nota
Los assets de esta carpeta se copiarán automáticamente a la carpeta de distribución cuando se ejecute `ng build`.

## Data Dragon
La mayoría de las imágenes (iconos de campeones, items, etc.) se cargan directamente desde Data Dragon de Riot Games, por lo que no es necesario almacenarlas localmente.

URL base: https://ddragon.leagueoflegends.com/cdn/
