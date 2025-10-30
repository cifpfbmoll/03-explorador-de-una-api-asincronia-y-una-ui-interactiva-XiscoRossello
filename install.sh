#!/bin/bash

# Script de instalación rápida para League of Legends Explorer
# Autor: IFC33 - 2º Cliente

echo "🎮 League of Legends Explorer - Instalación Rápida"
echo "=================================================="
echo ""

# Verificar Node.js
echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado."
    echo "Por favor, instala Node.js desde: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js instalado: $NODE_VERSION"
echo ""

# Verificar npm
echo "📦 Verificando npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm no está instalado."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm instalado: $NPM_VERSION"
echo ""

# Instalar Angular CLI
echo "🔧 Instalando Angular CLI..."
npm install -g @angular/cli@20.3.0
echo "✅ Angular CLI instalado"
echo ""

# Instalar dependencias
echo "📚 Instalando dependencias del proyecto..."
npm install
echo "✅ Dependencias instaladas"
echo ""

# Configurar environment file
echo "🔑 Configurando archivo de entorno..."
if [ ! -f "src/environments/environment.development.ts" ]; then
    cp src/environments/environment.example.ts src/environments/environment.development.ts
    echo "✅ Archivo environment.development.ts creado"
    echo ""
    echo "⚠️  IMPORTANTE: Edita src/environments/environment.development.ts"
    echo "   y añade tu API Key de Riot Games"
    echo ""
    echo "   Obtén tu API Key en: https://developer.riotgames.com/"
else
    echo "⚠️  El archivo environment.development.ts ya existe"
    echo ""
fi

# Instrucciones finales
echo "=================================================="
echo "✅ ¡Instalación completada!"
echo ""
echo "📝 Próximos pasos:"
echo ""
echo "1. Obtén tu API Key de Riot Games:"
echo "   https://developer.riotgames.com/"
echo ""
echo "2. Edita el archivo de configuración:"
echo "   src/environments/environment.development.ts"
echo ""
echo "3. Reemplaza 'RGAPI-YOUR-API-KEY-HERE' con tu API Key"
echo ""
echo "4. Ejecuta el proyecto:"
echo "   npm start"
echo ""
echo "5. Abre tu navegador en:"
echo "   http://localhost:4200"
echo ""
echo "=================================================="
echo "🎮 ¡Disfruta explorando League of Legends!"
echo ""
