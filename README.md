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
- Funciona sin conexión después de la primera visita (service worker) y se puede instalar como app.

## Cómo usarlo

**Opción recomendada: GitHub Pages (enlace para el celular y la computadora)**

1. En GitHub: *Settings → Pages → Build and deployment → Source: Deploy from a branch*.
2. Elige la rama `main` y la carpeta `/ (root)`, y guarda.
3. En un par de minutos estará en `https://<tu-usuario>.github.io/Python-course/`.
4. En el celular, abre el enlace y usa *Añadir a pantalla de inicio* para tenerlo como app.

**En local**

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```

La primera vez descarga Python (unos 12 MB desde jsDelivr); después queda en caché.

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
sw.js, manifest.webmanifest, icons/   PWA
```
