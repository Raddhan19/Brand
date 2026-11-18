# Jun.dev

Requiere Python 3.8 o posterior para generar el sitio. Desde esta carpeta:

    python build.py
    python -m http.server 8000 --directory dist

Abre http://localhost:8000. Para cambiar los textos edita los HTML en src/pages.
La estructura general vive en src/layout.html. La paleta, la tipografía y los
puntos de adaptación están en src/assets/style.css. El tema y los detalles de
Piixpal se controlan desde src/assets/app.js. La lista PAGES de build.py define
el explorador y las pestañas. Ejecuta el generador después de cada cambio.

El contenido de dist se puede publicar como sitio estático, también en la raíz
de un repositorio de GitHub Pages. El navegador solo necesita los archivos de
dist. Los componentes de Piixpal se sirven localmente y conservan su licencia
en assets/vendor/LICENSE.txt.

El cielo y sus animaciones se editan en src/assets/sky.css. El mosaico de estrellas
está en src/assets/stars.svg y el dibujo inspirado en Lupus en src/pages/inicio.html.
Las animaciones respetan la preferencia de movimiento reducido del sistema.
