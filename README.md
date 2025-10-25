# 🚀 Aplicación Rick and Morty - Next.js

Aplicación web que implementa diferentes estrategias de renderizado (SSG, ISR, CSR) usando Next.js y la API de Rick and Morty.

## 🔗 Links

- **Repositorio GitHub:** https://github.com/Anjelisahori/LAB10-DWA.git
- **Aplicación en Vercel:** laboratorio-10-dwa.vercel.app

## 📋 Características Implementadas

### ✅ Página Principal (SSG - Static Site Generation)
- Lista completa de personajes
- Forzado de caché con `cache: "force-cache"`
- Lazy Loading de imágenes con `loading="lazy"`
- Obtiene TODOS los personajes mediante paginación automática

**¿Por qué SSG?**
La lista completa de personajes no cambia con frecuencia, por lo que generarla estáticamente en tiempo de build mejora el rendimiento significativamente. Los usuarios obtienen páginas pre-renderizadas instantáneamente.

### 🔍 Búsqueda en Tiempo Real (CSR - Client Side Rendering)
- Filtros por: nombre, status, gender y species
- Búsqueda dinámica con debounce de 500ms
- Uso de `useState` y `useEffect`
- Actualización en tiempo real sin recargar la página

**¿Por qué CSR?**
La búsqueda requiere interactividad inmediata y cambios basados en la entrada del usuario. CSR permite actualizar la UI instantáneamente sin hacer peticiones al servidor de Next.js, solo a la API.

### 👤 Detalle de Personaje (ISR - Incremental Static Regeneration)
- Páginas pre-generadas para todos los personajes con `generateStaticParams`
- Revalidación cada 10 días: `revalidate: 864000`
- Metadata dinámica para SEO
- Información completa: estado, especie, origen, ubicación, episodios

**¿Por qué ISR?**
Los detalles de personajes son mayormente estáticos pero pueden actualizarse ocasionalmente. ISR combina lo mejor de SSG (velocidad) con la capacidad de actualizar datos sin rebuild completo. La revalidación cada 10 días asegura datos frescos sin sobrecarga.

## 🛠️ Tecnologías Utilizadas

- **Next.js 15** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **React Icons** - Iconografía
- **Rick and Morty API** - Fuente de datos

## 📦 Instalación Local
```bash
# Clonar repositorio
git clone https://github.com/Anjelisahori/LAB10-DWA.git

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start
```

## 📊 Estrategias de Renderizado

| Ruta | Estrategia | Revalidación | Justificación |
|------|-----------|--------------|---------------|
| `/rickandmorty` | SSG | - | Datos estáticos, máximo rendimiento |
| `/rickandmorty/search` | CSR | - | Interactividad en tiempo real |
| `/rickandmorty/[id]` | ISR | 10 días | Balance entre velocidad y actualidad |

## 🎨 Características Adicionales

- ✅ Responsive Design
- ✅ Lazy Loading de imágenes
- ✅ Debounce en búsqueda
- ✅ Indicadores de estado (vivo/muerto)
- ✅ Navegación fluida con Link
- ✅ Error Handling
- ✅ Loading states
- ✅ SEO optimizado
