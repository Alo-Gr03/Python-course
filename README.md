# Python Rápido: curso interactivo de Python

Curso completo de Python en español, pensado para aprender en poco tiempo **escribiendo código desde el primer minuto**. Es una web app (PWA) que funciona igual en el celular y en la computadora: Python se ejecuta dentro del navegador con [Pyodide](https://pyodide.org), sin instalar nada.

## Qué incluye

- **13 módulos y 41 lecciones** (unas 5 horas de práctica): print y variables, strings, funciones, decisiones, bucles, listas, diccionarios/tuplas/sets, funciones avanzadas, errores, módulos de la biblioteca estándar, POO, archivos y generadores, y buenas prácticas.
- **4 proyectos finales**: analizador de texto, gestor de tareas con clases, juego de adivinar con búsqueda binaria e inventario con reportes CSV.
- Cada lección tiene teoría corta, un **ejemplo ejecutable y editable**, un **reto con corrección automática** (pruebas que dicen exactamente qué falla), pista, solución y un mini test.
- Mensajes de error traducidos con la línea exacta y una pista de cómo arreglarlo. Los bucles infinitos se cortan solos a los 5 segundos.
- Editor con resaltado de sintaxis, números de línea y sangría automática. En el celular aparece una barra con `( ) [ ] : " = #` y Tab.
- **Zona libre** para experimentar y **chuleta** con buscador.
- Progreso, XP y racha de días guardados en el dispositivo; se puede exportar e importar a otro dispositivo.
- Funciona 100% sin conexión: abriendo `index.html` directamente desde la computadora, o instalada como app en el celular.

## Cómo usarlo

Todo funciona **100% sin conexión**: Python (Pyodide 0.26.4) va incluido en `vendor/pyodide/`, así que no se descarga nada de internet.

### En la computadora, sin instalar nada

1. En GitHub pulsa **Code → Download ZIP** (en la rama donde esté el curso) y descomprímelo.
2. Abre `index.html` con doble clic (Chrome, Edge, Firefox o Safari).

Listo: funciona sin internet. El progreso se guarda en ese navegador.

### En el celular (como app)

1. Publica el curso con GitHub Pages: *Settings → Pages → Source: Deploy from a branch*, elige la rama con el curso y la carpeta `/ (root)`.
2. Abre `https://<tu-usuario>.github.io/Python-course/` **una vez con internet**. En esa visita se guarda todo el curso, Python incluido (unos 18 MB).
3. Instálala: en Android, menú ⋮ → **Instalar app**; en iPhone, Safari → Compartir → **Añadir a pantalla de inicio**.

Desde entonces se abre desde el ícono y funciona en modo avión.

### Con un servidor local (opcional)

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

## Editar o añadir lecciones

El contenido está en `contenido/*.md` con un formato sencillo (ver la cabecera de `tools/build.py`). Después de editar:

```bash
python3 tools/build.py
```

El script ejecuta **cada solución contra sus pruebas**, comprueba que el código inicial no pase solo y que los ejemplos funcionen, y genera `js/curso-datos.js`. Si algo falla, no genera el archivo.

## Estructura

```
index.html            página principal
css/styles.css        estilos (tema claro y oscuro)
js/app.js             la aplicación: rutas, editor, ejecución, progreso
js/curso-datos.js     generado a partir de contenido/
contenido/            lecciones en markdown
tools/runner.py       motor que ejecuta y corrige el código (navegador y build)
tools/build.py        valida y compila el contenido
sw.js, manifest.webmanifest, icons/   PWA (instalable y sin conexión)
vendor/pyodide/       Python para el navegador, incluido (tools/vendor_pyodide.py lo regenera)
```
