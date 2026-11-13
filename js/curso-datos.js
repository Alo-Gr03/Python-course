// Archivo generado por tools/build.py a partir de contenido/*.md. No editar a mano.
window.COURSE = {
 "modules": [
  {
   "title": "Primeros pasos",
   "icon": "🚀",
   "desc": "print, variables, tipos y operaciones",
   "lessons": [
    {
     "id": "hola",
     "title": "Hola, Python",
     "minutes": 4,
     "teoria": "Python ejecuta tu código **de arriba hacia abajo, línea por línea**. La primera herramienta que necesitas es `print()`, que muestra algo en pantalla.\n\n```python\nprint(\"Hola, mundo\")\nprint(2 + 3)\nprint(\"Tengo\", 25, \"años\")   # varios valores separados por comas\n```\n\n- El texto va entre comillas: `\"así\"` o `'así'`.\n- Los números van sin comillas.\n- Todo lo que va después de `#` es un **comentario**: Python lo ignora. Sirve para explicar tu código.\n\n> 💡 Cómo usar este curso: lee la teoría (corta), ejecuta el ejemplo, cámbialo y rómpelo a propósito. Después resuelve el reto. Aprender programando es mucho más rápido que solo leyendo.\n",
     "ejemplo": "# Pulsa ▶ Ejecutar. Luego cambia los textos y vuelve a ejecutar.\nprint(\"Hola, mundo\")\nprint(\"Python es fácil de leer\")\nprint(10 * 3)\nprint(\"El resultado es\", 7 + 8)\n",
     "ejercicio": "Haz que tu programa imprima **exactamente** estas dos líneas:\n\n```\nHola, mundo\nEstoy aprendiendo Python\n```\n",
     "codigo": "# Escribe tus dos print() aquí\n",
     "prueba": "lineas = salida.strip().splitlines()\nassert len(lineas) >= 2, \"Deben salir al menos 2 líneas. ¿Usaste dos print()?\"\nassert lineas[0].strip() == \"Hola, mundo\", f\"La primera línea debe ser 'Hola, mundo' y salió {lineas[0]!r}\"\nassert lineas[1].strip() == \"Estoy aprendiendo Python\", f\"La segunda línea debe ser 'Estoy aprendiendo Python' y salió {lineas[1]!r}\"\n",
     "pista": "Cada `print()` imprime una línea. Fíjate en mayúsculas, comas y que el texto vaya entre comillas.\n",
     "solucion": "print(\"Hola, mundo\")\nprint(\"Estoy aprendiendo Python\")\n",
     "quiz": [
      {
       "q": "¿Qué hace Python con una línea que empieza con #?",
       "options": [
        "La imprime en pantalla",
        "La ignora: es un comentario",
        "Da un error"
       ],
       "answer": 1,
       "explain": "Los comentarios son notas para las personas; Python no los ejecuta."
      },
      {
       "q": "¿Qué imprime print(\"2 + 3\")?",
       "options": [
        "2 + 3",
        "5",
        "Un error"
       ],
       "answer": 0,
       "explain": "Entre comillas es texto, así que se imprime tal cual. Sin comillas, print(2 + 3) imprimiría 5."
      }
     ]
    },
    {
     "id": "variables",
     "title": "Variables y tipos",
     "minutes": 6,
     "teoria": "Una **variable** es un nombre que guarda un valor. Se crea con `=`:\n\n```python\nnombre = \"Ana\"      # str  (texto)\nedad = 30           # int  (número entero)\naltura = 1.68       # float (número decimal)\nes_estudiante = True  # bool (True o False)\n```\n\nPuedes cambiar su valor cuando quieras: `edad = 31`. Para saber el tipo de un valor usa `type()`:\n\n```python\nprint(type(edad))   # <class 'int'>\n```\n\n**Reglas para nombres:** letras, números y `_`, sin empezar por número ni usar espacios. La costumbre en Python es `snake_case`: `precio_total`, `nombre_usuario`. Mayúsculas y minúsculas son distintas: `Edad` y `edad` son dos variables diferentes.\n\n| Tipo | Ejemplo | Para qué |\n|---|---|---|\n| `int` | `42`, `-7` | contar, enteros |\n| `float` | `3.14`, `2.0` | decimales |\n| `str` | `\"hola\"` | texto |\n| `bool` | `True`, `False` | sí / no |\n",
     "ejemplo": "ciudad = \"Lima\"\nhabitantes = 10_000_000   # el _ solo ayuda a leer números grandes\ntemperatura = 18.5\nllueve = False\n\nprint(ciudad, habitantes, temperatura, llueve)\nprint(type(ciudad), type(habitantes), type(temperatura), type(llueve))\n\ntemperatura = 21.0   # reasignar\nprint(\"Ahora hace\", temperatura, \"grados\")\n",
     "ejercicio": "Crea estas cuatro variables con valores **de tu elección**, respetando el tipo:\n\n- `nombre`: un texto\n- `edad`: un número entero\n- `altura`: un número decimal (por ejemplo `1.75`)\n- `programador`: `True`\n",
     "codigo": "# Crea aquí tus variables\n",
     "prueba": "for v in (\"nombre\", \"edad\", \"altura\", \"programador\"):\n    assert v in dir(), f\"No encuentro la variable '{v}'. Revisa que esté bien escrita.\"\nassert isinstance(nombre, str), \"nombre debe ser texto (entre comillas)\"\nassert type(edad) is int, \"edad debe ser un entero, sin comillas ni decimales\"\nassert type(altura) is float, \"altura debe tener decimales, como 1.75\"\nassert programador is True, \"programador debe valer True (con T mayúscula, sin comillas)\"\n",
     "pista": "`True` se escribe con T mayúscula y sin comillas. Si escribes `\"30\"` con comillas, es texto, no un número.\n",
     "solucion": "nombre = \"Ana\"\nedad = 30\naltura = 1.68\nprogramador = True\n",
     "quiz": [
      {
       "q": "¿De qué tipo es el valor \"25\"?",
       "options": [
        "int",
        "float",
        "str"
       ],
       "answer": 2,
       "explain": "Las comillas lo convierten en texto, aunque contenga dígitos."
      },
      {
       "q": "¿Cuál de estos nombres de variable es válido?",
       "options": [
        "2precio",
        "precio total",
        "precio_total"
       ],
       "answer": 2,
       "explain": "No pueden empezar con número ni tener espacios."
      }
     ]
    },
    {
     "id": "operaciones",
     "title": "Operaciones con números",
     "minutes": 6,
     "teoria": "| Operador | Significado | Ejemplo | Resultado |\n|---|---|---|---|\n| `+` `-` `*` | suma, resta, multiplicación | `7 * 3` | `21` |\n| `/` | división (siempre da float) | `7 / 2` | `3.5` |\n| `//` | división entera | `7 // 2` | `3` |\n| `%` | resto (módulo) | `7 % 2` | `1` |\n| `**` | potencia | `2 ** 3` | `8` |\n\nSe respeta el orden matemático: primero `**`, luego `* / // %`, luego `+ -`. Usa paréntesis para dejarlo claro: `(2 + 3) * 4`.\n\n**Atajos de asignación:** `x += 1` equivale a `x = x + 1`. También existen `-=`, `*=`, `/=`.\n\nFunciones útiles: `abs(-5)` da `5`, `round(3.14159, 2)` da `3.14`, `max(3, 9, 2)` da `9`, `min(...)`.\n\n> 💡 `%` es muy útil: `n % 2 == 0` te dice si un número es par.\n",
     "ejemplo": "print(17 / 5)    # 3.4\nprint(17 // 5)   # 3  (cuántas veces cabe)\nprint(17 % 5)    # 2  (lo que sobra)\nprint(2 ** 10)   # 1024\n\nsaldo = 100\nsaldo -= 30\nsaldo *= 2\nprint(\"Saldo:\", saldo)\nprint(round(10 / 3, 2))\n",
     "ejercicio": "Tienes `segundos = 3725`. Calcula usando `//` y `%`:\n\n- `horas`: horas completas (3600 segundos cada una)\n- `minutos`: minutos completos que sobran\n- `resto`: segundos que sobran al final\n\nPara 3725 el resultado es 1 hora, 2 minutos y 5 segundos.\n",
     "codigo": "segundos = 3725\n\nhoras = 0\nminutos = 0\nresto = 0\n\nprint(horas, \"h\", minutos, \"min\", resto, \"s\")\n",
     "prueba": "assert horas == 1, f\"horas debería ser 1, pero vale {horas}\"\nassert minutos == 2, f\"minutos debería ser 2, pero vale {minutos}\"\nassert resto == 5, f\"resto debería ser 5, pero vale {resto}\"\n",
     "pista": "`horas = segundos // 3600`. Lo que sobra es `segundos % 3600`; de eso, `// 60` son los minutos y `% 60` los segundos.\n",
     "solucion": "segundos = 3725\n\nhoras = segundos // 3600\nminutos = (segundos % 3600) // 60\nresto = segundos % 60\n\nprint(horas, \"h\", minutos, \"min\", resto, \"s\")\n",
     "quiz": [
      {
       "q": "¿Cuánto vale 10 // 3?",
       "options": [
        "3.33",
        "3",
        "1"
       ],
       "answer": 1,
       "explain": "// es división entera: descarta la parte decimal."
      },
      {
       "q": "¿Cuánto vale 10 % 3?",
       "options": [
        "1",
        "3",
        "0"
       ],
       "answer": 0,
       "explain": "3 cabe 3 veces en 10 (9) y sobra 1."
      },
      {
       "q": "¿Qué hace x += 5?",
       "options": [
        "Compara x con 5",
        "Suma 5 al valor de x y lo guarda en x",
        "Crea una variable llamada x+5"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    },
    {
     "id": "textos",
     "title": "Textos (strings)",
     "minutes": 6,
     "teoria": "Los textos se llaman **strings** (`str`). Algunas operaciones:\n\n```python\nsaludo = \"Hola\" + \" \" + \"Ana\"   # concatenar: \"Hola Ana\"\nrisa = \"ja\" * 3                   # repetir: \"jajaja\"\nlen(\"Python\")                     # longitud: 6\n```\n\n**No puedes sumar texto y número directamente.** Convierte primero:\n\n```python\nedad = 30\nprint(\"Tengo \" + str(edad) + \" años\")   # str() pasa a texto\n```\n\nAl revés, para hacer cálculos con un texto que contiene un número:\n\n| Función | Convierte a | Ejemplo |\n|---|---|---|\n| `int(\"42\")` | entero | `42` |\n| `float(\"3.5\")` | decimal | `3.5` |\n| `str(99)` | texto | `\"99\"` |\n\nPara textos con varias líneas usa triple comilla `\"\"\"...\"\"\"`. Dentro de un texto, `\\n` es un salto de línea.\n",
     "ejemplo": "nombre = \"Python\"\nprint(len(nombre))\nprint(nombre + \"!\" * 3)\n\nprecio_texto = \"19.99\"\nprecio = float(precio_texto)\nprint(precio * 2)\n\nprint(\"Línea 1\\nLínea 2\")\nprint(str(2024) + \" es un año\")\n",
     "ejercicio": "Llegan datos como texto desde un formulario: `precio = \"12.50\"` y `cantidad = \"4\"`.\n\n1. Calcula `total` como número (precio × cantidad).\n2. Crea `mensaje` con el texto exacto `Total: 50.0` usando concatenación y `str()`.\n3. Imprime `mensaje`.\n",
     "codigo": "precio = \"12.50\"\ncantidad = \"4\"\n\ntotal = 0\nmensaje = \"\"\nprint(mensaje)\n",
     "prueba": "assert isinstance(total, (int, float)), \"total debe ser un número, no texto. Usa float() e int().\"\nassert total == 50.0, f\"total debería valer 50.0 y vale {total!r}\"\nassert mensaje == \"Total: 50.0\", f\"mensaje debe ser exactamente 'Total: 50.0' y es {mensaje!r}\"\nassert \"Total: 50.0\" in salida, \"Falta imprimir el mensaje\"\n",
     "pista": "`total = float(precio) * int(cantidad)`. Luego `mensaje = \"Total: \" + str(total)`.\n",
     "solucion": "precio = \"12.50\"\ncantidad = \"4\"\n\ntotal = float(precio) * int(cantidad)\nmensaje = \"Total: \" + str(total)\nprint(mensaje)\n",
     "quiz": [
      {
       "q": "¿Qué produce \"5\" + \"5\"?",
       "options": [
        "10",
        "\"55\"",
        "Un error"
       ],
       "answer": 1,
       "explain": "Con textos, + concatena."
      },
      {
       "q": "¿Qué pasa con \"Edad: \" + 30?",
       "options": [
        "Imprime Edad: 30",
        "Da TypeError: no se puede sumar str e int",
        "Convierte 30 a texto automáticamente"
       ],
       "answer": 1,
       "explain": "Hay que convertir con str(30) o usar un f-string."
      }
     ]
    },
    {
     "id": "fstrings",
     "title": "f-strings e input()",
     "minutes": 6,
     "teoria": "La forma moderna y más cómoda de mezclar texto y valores es el **f-string**: pon una `f` antes de las comillas y escribe las variables entre llaves.\n\n```python\nnombre = \"Ana\"\nedad = 30\nprint(f\"Hola {nombre}, el año que viene tendrás {edad + 1} años\")\n```\n\nDentro de `{}` puedes poner cualquier expresión: `{precio * 1.21}`, `{nombre.upper()}`.\n\n**Pedir datos al usuario** con `input()`. Siempre devuelve **texto**, así que convierte si necesitas un número:\n\n```python\nnombre = input(\"¿Cómo te llamas? \")\nedad = int(input(\"¿Edad? \"))\n```\n\n> 💡 Aquí `input()` abre una ventanita del navegador. En los retos usaremos variables fijas para que se puedan comprobar automáticamente.\n",
     "ejemplo": "nombre = input(\"¿Cómo te llamas? \")\nanio = int(input(\"¿En qué año naciste? \"))\nprint(f\"Hola {nombre}. En 2030 tendrás unos {2030 - anio} años.\")\n",
     "ejercicio": "Con las variables dadas, imprime usando un **f-string** exactamente:\n\n```\nHola Lucía, el año que viene tendrás 29 años\n```\n\n(el 29 debe calcularse a partir de `edad`, no escribirse a mano)\n",
     "codigo": "nombre = \"Lucía\"\nedad = 28\n",
     "prueba": "assert salida.strip() == \"Hola Lucía, el año que viene tendrás 29 años\", f\"Salió {salida.strip()!r}\"\n",
     "pista": "`print(f\"Hola {nombre}, el año que viene tendrás {edad + 1} años\")`\n",
     "solucion": "nombre = \"Lucía\"\nedad = 28\nprint(f\"Hola {nombre}, el año que viene tendrás {edad + 1} años\")\n",
     "quiz": [
      {
       "q": "¿Qué tipo devuelve siempre input()?",
       "options": [
        "int",
        "str",
        "Depende de lo que escriba el usuario"
       ],
       "answer": 1,
       "explain": "Siempre texto. Para números usa int() o float()."
      },
      {
       "q": "¿Qué imprime print(f\"{2 * 5} manzanas\")?",
       "options": [
        "10 manzanas",
        "{2 * 5} manzanas",
        "2 * 5 manzanas"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m1"
  },
  {
   "title": "Textos a fondo",
   "icon": "🔤",
   "desc": "formato, métodos y cortes de strings",
   "lessons": [
    {
     "id": "formato",
     "title": "Formatear números",
     "minutes": 5,
     "teoria": "Dentro de las llaves de un f-string puedes indicar **cómo** mostrar un valor con `:`.\n\n| Formato | Ejemplo | Resultado |\n|---|---|---|\n| `.2f` | `f\"{3.14159:.2f}\"` | `3.14` |\n| `,` | `f\"{1234567:,}\"` | `1,234,567` |\n| `,.2f` | `f\"{1234.5:,.2f}\"` | `1,234.50` |\n| `%` | `f\"{0.256:.1%}\"` | `25.6%` |\n| `>8` | `f\"{'hola':>8}\"` | `    hola` (derecha) |\n| `<8` / `^8` | izquierda / centrado | |\n| `03d` | `f\"{7:03d}\"` | `007` |\n\nTruco para depurar: `f\"{x=}\"` imprime el nombre y el valor, por ejemplo `x=5`.\n",
     "ejemplo": "precio = 1234.5678\nprint(f\"Precio: ${precio:,.2f}\")\nprint(f\"Descuento: {0.15:.0%}\")\nfor producto, valor in [(\"Café\", 2.5), (\"Tarta\", 4.75)]:\n    print(f\"{producto:<10}{valor:>8.2f}\")\nx = 42\nprint(f\"{x=}\")\n",
     "ejercicio": "Con `precio = 1499.9` y `iva = 0.21`:\n\n- Calcula `total = precio * (1 + iva)`.\n- Imprime exactamente: `Total con IVA (21%): 1,814.88`\n\nUsa formato para el porcentaje (`.0%`) y para el total (`,.2f`).\n",
     "codigo": "precio = 1499.9\niva = 0.21\n",
     "prueba": "assert abs(total - 1814.879) < 0.01, \"total no es correcto\"\nassert salida.strip() == \"Total con IVA (21%): 1,814.88\", f\"Salió {salida.strip()!r}\"\n",
     "pista": "`print(f\"Total con IVA ({iva:.0%}): {total:,.2f}\")`\n",
     "solucion": "precio = 1499.9\niva = 0.21\ntotal = precio * (1 + iva)\nprint(f\"Total con IVA ({iva:.0%}): {total:,.2f}\")\n",
     "quiz": [
      {
       "q": "¿Qué imprime f\"{2/3:.2f}\"?",
       "options": [
        "0.6",
        "0.67",
        "0.66"
       ],
       "answer": 1,
       "explain": "Redondea a 2 decimales."
      }
     ]
    },
    {
     "id": "metodos_str",
     "title": "Métodos de texto",
     "minutes": 7,
     "teoria": "Los strings traen funciones propias (métodos) que se usan con punto: `texto.metodo()`. **Nunca modifican el original**: devuelven un texto nuevo.\n\n| Método | Qué hace | Ejemplo → resultado |\n|---|---|---|\n| `.upper()` / `.lower()` | mayúsculas / minúsculas | `\"Hola\".upper()` → `\"HOLA\"` |\n| `.capitalize()` / `.title()` | primera letra / cada palabra | `\"ana gil\".title()` → `\"Ana Gil\"` |\n| `.strip()` | quita espacios en los extremos | `\"  hi \".strip()` → `\"hi\"` |\n| `.replace(a, b)` | reemplaza | `\"gato\".replace(\"g\", \"p\")` → `\"pato\"` |\n| `.split(sep)` | corta en una lista | `\"a,b,c\".split(\",\")` → `['a','b','c']` |\n| `sep.join(lista)` | une una lista | `\"-\".join(['a','b'])` → `\"a-b\"` |\n| `.count(x)` | cuenta apariciones | `\"banana\".count(\"a\")` → `3` |\n| `.find(x)` | posición (o -1) | `\"hola\".find(\"l\")` → `2` |\n| `.startswith(x)` / `.endswith(x)` | ¿empieza/termina con? | `True` / `False` |\n\n`.split()` sin argumentos corta por cualquier espacio, ideal para contar palabras. Los métodos se pueden encadenar: `texto.strip().lower()`.\n\nPara saber si algo está dentro de un texto usa `in`: `\"py\" in \"python\"` → `True`.\n",
     "ejemplo": "frase = \"   Python es GENIAL y Python es fácil   \"\nlimpia = frase.strip().lower()\nprint(limpia)\nprint(limpia.count(\"python\"))\npalabras = limpia.split()\nprint(palabras, len(palabras))\nprint(\" | \".join(palabras))\nprint(limpia.replace(\"python\", \"🐍\"))\nprint(\"genial\" in limpia)\n",
     "ejercicio": "Tienes `entrada = \"   mARía   lóPEZ  \"`. Crea:\n\n- `nombre_limpio`: sin espacios en los extremos y con formato título → `\"María López\"`\n- `usuario`: en minúsculas, con `.` en lugar del espacio → `\"maría.lópez\"`\n- `iniciales`: `\"ML\"`\n",
     "codigo": "entrada = \"   mARía   lóPEZ  \"\n\nnombre_limpio = \"\"\nusuario = \"\"\niniciales = \"\"\n",
     "prueba": "assert nombre_limpio == \"María López\", f\"nombre_limpio es {nombre_limpio!r}\"\nassert usuario == \"maría.lópez\", f\"usuario es {usuario!r}\"\nassert iniciales == \"ML\", f\"iniciales es {iniciales!r}\"\n",
     "pista": "Ojo: entre las palabras hay varios espacios. `entrada.split()` te da `['mARía', 'lóPEZ']` sin espacios. Luego `\" \".join(...)`, `.title()`, y `palabras[0][0]` es la primera letra.\n",
     "solucion": "entrada = \"   mARía   lóPEZ  \"\npartes = entrada.split()\nnombre_limpio = \" \".join(partes).title()\nusuario = \".\".join(partes).lower()\niniciales = partes[0][0].upper() + partes[1][0].upper()\n",
     "quiz": [
      {
       "q": "Si s = \"hola\", ¿qué vale s después de s.upper()?",
       "options": [
        "\"hola\" (los métodos no cambian el original)",
        "\"HOLA\"",
        "None"
       ],
       "answer": 0,
       "explain": "Debes guardar el resultado: s = s.upper()."
      },
      {
       "q": "¿Qué devuelve \"a b  c\".split()?",
       "options": [
        "['a', 'b', '', 'c']",
        "['a', 'b', 'c']",
        "\"abc\""
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    },
    {
     "id": "slicing",
     "title": "Índices y cortes",
     "minutes": 6,
     "teoria": "Cada carácter tiene una posición (**índice**) que empieza en **0**. Los índices negativos cuentan desde el final.\n\n```\n P  y  t  h  o  n\n 0  1  2  3  4  5\n-6 -5 -4 -3 -2 -1\n```\n\n```python\ns = \"Python\"\ns[0]     # 'P'\ns[-1]    # 'n'  (el último)\ns[0:3]   # 'Pyt' (del 0 al 3, SIN incluir el 3)\ns[2:]    # 'thon' (desde el 2 hasta el final)\ns[:2]    # 'Py'\ns[::2]   # 'Pto' (de 2 en 2)\ns[::-1]  # 'nohtyP' (al revés)\n```\n\nLa regla de oro del corte `[inicio:fin:paso]`: incluye `inicio`, **excluye** `fin`. Esto mismo funciona con listas, como verás pronto.\n\nLos strings son **inmutables**: `s[0] = \"J\"` da error. Crea uno nuevo: `\"J\" + s[1:]`.\n",
     "ejemplo": "s = \"Programar\"\nprint(s[0], s[-1])\nprint(s[:3])\nprint(s[3:])\nprint(s[::-1])\nprint(s[1:-1])\nemail = \"ana@correo.com\"\narroba = email.find(\"@\")\nprint(\"Usuario:\", email[:arroba], \"Dominio:\", email[arroba + 1:])\n",
     "ejercicio": "Con `palabra = \"reconocer\"` crea:\n\n- `primeras`: las 3 primeras letras\n- `ultima`: la última letra (usa índice negativo)\n- `al_reves`: la palabra invertida\n- `es_palindromo`: `True` si se lee igual al revés (compara con `==`)\n",
     "codigo": "palabra = \"reconocer\"\n",
     "prueba": "assert primeras == \"rec\", f\"primeras es {primeras!r}\"\nassert ultima == \"r\", f\"ultima es {ultima!r}\"\nassert al_reves == \"reconocer\", f\"al_reves es {al_reves!r}\"\nassert es_palindromo is True, \"es_palindromo debería ser True\"\n",
     "pista": "`palabra[:3]`, `palabra[-1]`, `palabra[::-1]` y `palabra == al_reves`.\n",
     "solucion": "palabra = \"reconocer\"\nprimeras = palabra[:3]\nultima = palabra[-1]\nal_reves = palabra[::-1]\nes_palindromo = palabra == al_reves\n",
     "quiz": [
      {
       "q": "Si s = \"abcdef\", ¿qué es s[1:4]?",
       "options": [
        "\"abcd\"",
        "\"bcd\"",
        "\"bcde\""
       ],
       "answer": 1,
       "explain": "Empieza en 1 e incluye hasta 3 (el 4 queda fuera)."
      },
      {
       "q": "¿Qué es s[-2] para s = \"hola\"?",
       "options": [
        "\"o\"",
        "\"l\"",
        "\"a\""
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m2"
  },
  {
   "title": "Funciones",
   "icon": "🧩",
   "desc": "crea tus propias herramientas reutilizables",
   "lessons": [
    {
     "id": "funciones",
     "title": "Definir funciones",
     "minutes": 7,
     "teoria": "Una **función** es un bloque de código con nombre que puedes reutilizar. Se define con `def`, recibe **parámetros** y devuelve un resultado con `return`.\n\n```python\ndef area_rectangulo(base, altura):\n    resultado = base * altura\n    return resultado\n\na = area_rectangulo(3, 4)   # llamar a la función\nprint(a)                    # 12\n```\n\nClaves:\n\n- La línea de `def` termina en **dos puntos** `:`.\n- El cuerpo va **sangrado con 4 espacios**. La sangría define qué pertenece a la función.\n- `return` termina la función y entrega el valor. Sin `return` la función devuelve `None`.\n\n**`return` no es lo mismo que `print`.** `print` solo muestra; `return` entrega el valor para que lo uses después (sumarlo, guardarlo, compararlo). En casi todos los retos tus funciones deben usar `return`.\n\n> 💡 A partir de aquí casi todos los retos piden una función. Así se puede probar tu código con muchos casos distintos.\n",
     "ejemplo": "def saludar(nombre):\n    return f\"¡Hola, {nombre}!\"\n\ndef celsius_a_fahrenheit(c):\n    return c * 9 / 5 + 32\n\nprint(saludar(\"Ana\"))\nprint(saludar(\"Luis\"))\nprint(celsius_a_fahrenheit(100))\ntemperatura = celsius_a_fahrenheit(25)\nprint(f\"25 °C son {temperatura} °F\")\n",
     "ejercicio": "Escribe la función `precio_final(precio, descuento)` que devuelva el precio tras aplicar un descuento en porcentaje.\n\n- `precio_final(100, 20)` → `80.0`\n- `precio_final(50, 10)` → `45.0`\n",
     "codigo": "def precio_final(precio, descuento):\n    # tu código aquí\n    pass\n\nprint(precio_final(100, 20))\n",
     "prueba": "assert \"precio_final\" in dir(), \"No encuentro la función precio_final\"\nr = precio_final(100, 20)\nassert r is not None, \"La función devuelve None. ¿Olvidaste el return?\"\nassert abs(r - 80) < 1e-9, f\"precio_final(100, 20) debería ser 80 y dio {r}\"\nassert abs(precio_final(50, 10) - 45) < 1e-9, \"precio_final(50, 10) debería ser 45\"\nassert abs(precio_final(200, 0) - 200) < 1e-9, \"Con descuento 0 el precio no cambia\"\n",
     "pista": "El descuento en dinero es `precio * descuento / 100`. Devuelve `precio - eso`.\n",
     "solucion": "def precio_final(precio, descuento):\n    return precio - precio * descuento / 100\n\nprint(precio_final(100, 20))\n",
     "quiz": [
      {
       "q": "¿Qué devuelve una función que no tiene return?",
       "options": [
        "0",
        "\"\"",
        "None"
       ],
       "answer": 2,
       "explain": ""
      },
      {
       "q": "¿Qué define qué líneas pertenecen a una función?",
       "options": [
        "Las llaves { }",
        "La sangría (los espacios al inicio)",
        "La palabra end"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    },
    {
     "id": "parametros",
     "title": "Parámetros con valor por defecto",
     "minutes": 6,
     "teoria": "Un parámetro puede tener un **valor por defecto**, que se usa si no lo pasas:\n\n```python\ndef saludar(nombre, saludo=\"Hola\"):\n    return f\"{saludo}, {nombre}\"\n\nsaludar(\"Ana\")              # 'Hola, Ana'\nsaludar(\"Ana\", \"Buenas\")    # 'Buenas, Ana'\nsaludar(saludo=\"Hey\", nombre=\"Leo\")  # argumentos por nombre, en cualquier orden\n```\n\nLos parámetros con valor por defecto van **después** de los obligatorios.\n\nUna función puede devolver **varios valores** separándolos por comas, y los recibes igual:\n\n```python\ndef min_max(a, b, c):\n    return min(a, b, c), max(a, b, c)\n\nmenor, mayor = min_max(4, 9, 1)\n```\n\nDocumenta tus funciones con un texto entre triples comillas justo debajo del `def` (docstring).\n",
     "ejemplo": "def potencia(base, exponente=2):\n    \"\"\"Eleva base a exponente (por defecto, al cuadrado).\"\"\"\n    return base ** exponente\n\nprint(potencia(5))\nprint(potencia(2, 10))\nprint(potencia(exponente=3, base=2))\n\ndef dividir(a, b):\n    return a // b, a % b\n\ncociente, resto = dividir(17, 5)\nprint(cociente, resto)\n",
     "ejercicio": "Escribe `formatear_precio(cantidad, moneda=\"€\", decimales=2)` que devuelva un texto con la cantidad y la moneda:\n\n- `formatear_precio(5)` → `\"5.00 €\"`\n- `formatear_precio(3.14159, \"$\", 3)` → `\"3.142 $\"`\n- `formatear_precio(10, decimales=0)` → `\"10 €\"`\n",
     "codigo": "def formatear_precio(cantidad, moneda, decimales):\n    pass\n",
     "prueba": "assert formatear_precio(5) == \"5.00 €\", f\"formatear_precio(5) dio {formatear_precio(5)!r}\"\nassert formatear_precio(3.14159, \"$\", 3) == \"3.142 $\", f\"dio {formatear_precio(3.14159, '$', 3)!r}\"\nassert formatear_precio(10, decimales=0) == \"10 €\", f\"dio {formatear_precio(10, decimales=0)!r}\"\n",
     "pista": "Pon los valores por defecto en la firma. Para usar una variable como número de decimales en un f-string: `f\"{cantidad:.{decimales}f}\"`.\n",
     "solucion": "def formatear_precio(cantidad, moneda=\"€\", decimales=2):\n    return f\"{cantidad:.{decimales}f} {moneda}\"\n",
     "quiz": [
      {
       "q": "¿Cuál de estas definiciones es válida?",
       "options": [
        "def f(a=1, b):",
        "def f(a, b=1):",
        "def f(a=1, b=):"
       ],
       "answer": 1,
       "explain": "Los parámetros opcionales van al final."
      }
     ]
    }
   ],
   "id": "m3"
  },
  {
   "title": "Decisiones",
   "icon": "🔀",
   "desc": "comparaciones, if, elif, else y lógica",
   "lessons": [
    {
     "id": "comparaciones",
     "title": "Comparaciones y booleanos",
     "minutes": 5,
     "teoria": "Una comparación da `True` o `False` (tipo `bool`).\n\n| Operador | Significa |\n|---|---|\n| `==` | igual (¡dos signos! `=` solo asigna) |\n| `!=` | distinto |\n| `<` `>` `<=` `>=` | menor, mayor, menor o igual, mayor o igual |\n| `in` | está dentro de (texto, lista...) |\n\nCombinar condiciones:\n\n- `and`: verdadero si **ambas** lo son\n- `or`: verdadero si **al menos una** lo es\n- `not`: invierte\n\n```python\nedad = 20\ntiene_entrada = True\npuede_pasar = edad >= 18 and tiene_entrada   # True\n```\n\nPython permite encadenar: `0 <= nota <= 10`. Los textos también se comparan: `\"a\" < \"b\"` es `True`, y `\"Hola\" == \"hola\"` es `False` (distingue mayúsculas).\n",
     "ejemplo": "x = 7\nprint(x > 5, x == 7, x != 7)\nprint(x > 5 and x < 10)\nprint(x < 0 or x > 100)\nprint(not x > 5)\nprint(1 <= x <= 10)\nprint(\"py\" in \"python\", \"z\" in \"python\")\n",
     "ejercicio": "Escribe `puede_conducir(edad, tiene_licencia, alcohol)` que devuelva `True` solo si la persona tiene **18 o más**, **tiene licencia** y su nivel de `alcohol` es **menor que 0.5**.\n\nHazlo en una sola línea con `return` y `and`.\n",
     "codigo": "def puede_conducir(edad, tiene_licencia, alcohol):\n    pass\n",
     "prueba": "casos = [((20, True, 0.0), True), ((17, True, 0.0), False), ((30, False, 0.0), False),\n         ((30, True, 0.5), False), ((18, True, 0.49), True)]\nfor args, esperado in casos:\n    r = puede_conducir(*args)\n    assert r == esperado, f\"puede_conducir{args} debería ser {esperado} y dio {r}\"\n",
     "pista": "`return edad >= 18 and tiene_licencia and alcohol < 0.5`\n",
     "solucion": "def puede_conducir(edad, tiene_licencia, alcohol):\n    return edad >= 18 and tiene_licencia and alcohol < 0.5\n",
     "quiz": [
      {
       "q": "¿Qué diferencia hay entre = y ==?",
       "options": [
        "= asigna un valor; == compara",
        "Son lo mismo",
        "== asigna; = compara"
       ],
       "answer": 0,
       "explain": ""
      },
      {
       "q": "¿Qué da True or False and False?",
       "options": [
        "True",
        "False"
       ],
       "answer": 0,
       "explain": "and se evalúa antes que or: True or (False and False) → True or False → True."
      }
     ]
    },
    {
     "id": "if_elif",
     "title": "if, elif, else",
     "minutes": 7,
     "teoria": "`if` ejecuta un bloque solo si la condición es verdadera. `elif` (si no, si...) prueba otra condición y `else` cubre todo lo demás.\n\n```python\nnota = 7.5\nif nota >= 9:\n    print(\"Sobresaliente\")\nelif nota >= 7:\n    print(\"Notable\")\nelif nota >= 5:\n    print(\"Aprobado\")\nelse:\n    print(\"Suspenso\")\n```\n\n- Cada línea `if/elif/else` termina en `:` y su bloque va sangrado.\n- Python revisa de arriba hacia abajo y entra **solo en el primer** bloque que se cumpla. Por eso el orden importa.\n- `elif` y `else` son opcionales.\n\nDentro de una función puedes usar `return` en cada rama.\n",
     "ejemplo": "def clasificar_temperatura(t):\n    if t < 0:\n        return \"helada\"\n    elif t < 15:\n        return \"frío\"\n    elif t < 25:\n        return \"agradable\"\n    else:\n        return \"calor\"\n\nfor t in [-5, 10, 20, 35]:\n    print(t, clasificar_temperatura(t))\n",
     "ejercicio": "Escribe `calcular_imc(peso, altura)` que calcule `imc = peso / altura ** 2` y devuelva:\n\n- `\"bajo\"` si imc < 18.5\n- `\"normal\"` si imc < 25\n- `\"sobrepeso\"` si imc < 30\n- `\"obesidad\"` en otro caso\n",
     "codigo": "def calcular_imc(peso, altura):\n    imc = peso / altura ** 2\n    # completa con if / elif / else\n\nprint(calcular_imc(70, 1.75))\n",
     "prueba": "casos = [(50, 1.80, \"bajo\"), (70, 1.75, \"normal\"), (85, 1.75, \"sobrepeso\"), (110, 1.70, \"obesidad\"), (75, 1.7320508, \"sobrepeso\"), (72, 1.7320508, \"normal\")]\nfor p, a, esp in casos:\n    r = calcular_imc(p, a)\n    assert r == esp, f\"calcular_imc({p}, {a}) debería ser {esp!r} y dio {r!r}\"\n",
     "pista": "Ordena las condiciones de menor a mayor y usa `return` en cada rama: `if imc < 18.5: return \"bajo\"`...\n",
     "solucion": "def calcular_imc(peso, altura):\n    imc = peso / altura ** 2\n    if imc < 18.5:\n        return \"bajo\"\n    elif imc < 25:\n        return \"normal\"\n    elif imc < 30:\n        return \"sobrepeso\"\n    else:\n        return \"obesidad\"\n\nprint(calcular_imc(70, 1.75))\n",
     "quiz": [
      {
       "q": "Si x = 15, ¿qué imprime? if x > 10: print(\"A\") elif x > 5: print(\"B\")",
       "options": [
        "Solo A",
        "A y B",
        "Solo B"
       ],
       "answer": 0,
       "explain": "Entra en el primer bloque que se cumple y salta el resto."
      }
     ]
    },
    {
     "id": "logica",
     "title": "Valores verdaderos y atajos",
     "minutes": 6,
     "teoria": "En un `if` cualquier valor se interpreta como verdadero o falso (**truthiness**). Son **falsos**: `0`, `0.0`, `\"\"` (texto vacío), `[]`, `{}`, `None` y `False`. Todo lo demás es verdadero.\n\n```python\nnombre = \"\"\nif not nombre:\n    print(\"Falta el nombre\")\n```\n\n**Expresión condicional (ternario)**, un if en una línea:\n\n```python\nestado = \"mayor\" if edad >= 18 else \"menor\"\n```\n\n**`in` con varias opciones** en lugar de muchos `or`:\n\n```python\nif dia in (\"sábado\", \"domingo\"):\n    print(\"¡Finde!\")\n```\n\n**`None`** representa \"sin valor\". Se compara con `is`: `if resultado is None:`.\n\nCon `match` (Python 3.10+) puedes elegir entre muchos casos de forma limpia:\n\n```python\nmatch comando:\n    case \"salir\":\n        ...\n    case \"ayuda\" | \"?\":\n        ...\n    case _:\n        ...   # cualquier otro\n```\n",
     "ejemplo": "for valor in [0, 1, \"\", \"hola\", [], [1, 2], None]:\n    print(repr(valor), \"→\", \"verdadero\" if valor else \"falso\")\n\ndef tipo_dia(dia):\n    match dia.lower():\n        case \"sábado\" | \"domingo\":\n            return \"fin de semana\"\n        case \"lunes\" | \"martes\" | \"miércoles\" | \"jueves\" | \"viernes\":\n            return \"laborable\"\n        case _:\n            return \"no es un día\"\n\nprint(tipo_dia(\"Domingo\"), tipo_dia(\"martes\"), tipo_dia(\"pizza\"))\n",
     "ejercicio": "El clásico **FizzBuzz** para un solo número. Escribe `fizzbuzz(n)` que devuelva:\n\n- `\"FizzBuzz\"` si n es divisible por 3 **y** por 5\n- `\"Fizz\"` si solo por 3\n- `\"Buzz\"` si solo por 5\n- el número como texto en otro caso (`str(n)`)\n",
     "codigo": "def fizzbuzz(n):\n    pass\n",
     "prueba": "esperado = {1: \"1\", 3: \"Fizz\", 5: \"Buzz\", 15: \"FizzBuzz\", 9: \"Fizz\", 10: \"Buzz\", 30: \"FizzBuzz\", 7: \"7\"}\nfor n, e in esperado.items():\n    r = fizzbuzz(n)\n    assert r == e, f\"fizzbuzz({n}) debería ser {e!r} y dio {r!r}\"\n",
     "pista": "Comprueba primero el caso de 15 (`n % 15 == 0` o `n % 3 == 0 and n % 5 == 0`); si lo pones al final, nunca se alcanzará.\n",
     "solucion": "def fizzbuzz(n):\n    if n % 15 == 0:\n        return \"FizzBuzz\"\n    elif n % 3 == 0:\n        return \"Fizz\"\n    elif n % 5 == 0:\n        return \"Buzz\"\n    return str(n)\n",
     "quiz": [
      {
       "q": "¿Cuál de estos valores es falso en un if?",
       "options": [
        "\"0\"",
        "[0]",
        "\"\""
       ],
       "answer": 2,
       "explain": "\"0\" y [0] no están vacíos, así que son verdaderos."
      },
      {
       "q": "¿Qué vale x = \"par\" if 4 % 2 == 0 else \"impar\"?",
       "options": [
        "\"par\"",
        "\"impar\"",
        "True"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m4"
  },
  {
   "title": "Bucles",
   "icon": "🔁",
   "desc": "repetir sin copiar y pegar",
   "lessons": [
    {
     "id": "while",
     "title": "Bucle while",
     "minutes": 6,
     "teoria": "`while` repite un bloque **mientras** la condición sea verdadera.\n\n```python\ncuenta = 3\nwhile cuenta > 0:\n    print(cuenta)\n    cuenta -= 1      # ¡sin esto, el bucle no termina nunca!\nprint(\"¡Despegue!\")\n```\n\nÚsalo cuando **no sabes cuántas vueltas** darás: repetir hasta que el usuario acierte, hasta que un saldo se acabe, etc.\n\n> ⚠️ Si la condición nunca se vuelve falsa tienes un **bucle infinito**. Aquí el código se detiene solo a los 5 segundos.\n",
     "ejemplo": "ahorro = 0\nmeses = 0\nwhile ahorro < 1000:\n    ahorro += 150\n    meses += 1\nprint(f\"Llegas a {ahorro} en {meses} meses\")\n\nn = 27\npasos = 0\nwhile n != 1:          # conjetura de Collatz\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\n    pasos += 1\nprint(\"Pasos:\", pasos)\n",
     "ejercicio": "Escribe `anios_para_duplicar(capital, interes)` que devuelva cuántos años hacen falta para que el capital **llegue o supere el doble**, aplicando cada año `capital = capital * (1 + interes / 100)`.\n\n- `anios_para_duplicar(1000, 10)` → `8`\n- `anios_para_duplicar(500, 100)` → `1`\n",
     "codigo": "def anios_para_duplicar(capital, interes):\n    objetivo = capital * 2\n    anios = 0\n    # usa while\n    return anios\n",
     "prueba": "assert anios_para_duplicar(1000, 10) == 8, f\"(1000, 10) debería ser 8 y dio {anios_para_duplicar(1000, 10)}\"\nassert anios_para_duplicar(500, 100) == 1, \"(500, 100) debería ser 1\"\nassert anios_para_duplicar(100, 7) == 11, f\"(100, 7) debería ser 11 y dio {anios_para_duplicar(100, 7)}\"\n",
     "pista": "`while capital < objetivo:` y dentro actualiza `capital` y suma 1 a `anios`.\n",
     "solucion": "def anios_para_duplicar(capital, interes):\n    objetivo = capital * 2\n    anios = 0\n    while capital < objetivo:\n        capital = capital * (1 + interes / 100)\n        anios += 1\n    return anios\n",
     "quiz": [
      {
       "q": "¿Cuántas veces se imprime? i = 0; while i < 3: print(i); i += 1",
       "options": [
        "2",
        "3",
        "4"
       ],
       "answer": 1,
       "explain": "Imprime 0, 1 y 2."
      }
     ]
    },
    {
     "id": "for_range",
     "title": "Bucle for y range()",
     "minutes": 7,
     "teoria": "`for` recorre **cada elemento** de algo iterable: un texto, una lista, un rango de números...\n\n```python\nfor letra in \"hola\":\n    print(letra)\n```\n\n`range()` genera números:\n\n| Llamada | Números |\n|---|---|\n| `range(5)` | 0, 1, 2, 3, 4 |\n| `range(2, 6)` | 2, 3, 4, 5 |\n| `range(0, 10, 2)` | 0, 2, 4, 6, 8 |\n| `range(5, 0, -1)` | 5, 4, 3, 2, 1 |\n\nComo en los cortes, el final **no se incluye**.\n\n**Patrón acumulador**, la base de muchísimos programas:\n\n```python\ntotal = 0\nfor n in range(1, 101):\n    total += n\nprint(total)   # 5050\n```\n\nUsa `for` cuando sabes qué recorrer, y `while` cuando depende de una condición.\n",
     "ejemplo": "for i in range(1, 6):\n    print(f\"{i} x 7 = {i * 7}\")\n\nvocales = 0\nfor letra in \"programación en python\":\n    if letra in \"aeiouáéíóú\":\n        vocales += 1\nprint(\"Vocales:\", vocales)\n\nfor i in range(1, 5):\n    print(\"*\" * i)\n",
     "ejercicio": "Escribe `suma_pares(n)` que devuelva la suma de todos los números **pares** entre 1 y n (incluido n).\n\n- `suma_pares(10)` → `30` (2+4+6+8+10)\n- `suma_pares(1)` → `0`\n",
     "codigo": "def suma_pares(n):\n    total = 0\n\n    return total\n",
     "prueba": "for n, e in [(10, 30), (1, 0), (2, 2), (7, 12), (100, 2550)]:\n    r = suma_pares(n)\n    assert r == e, f\"suma_pares({n}) debería ser {e} y dio {r}\"\n",
     "pista": "`for i in range(2, n + 1, 2): total += i`, o recorre todos y usa `if i % 2 == 0`.\n",
     "solucion": "def suma_pares(n):\n    total = 0\n    for i in range(2, n + 1, 2):\n        total += i\n    return total\n",
     "quiz": [
      {
       "q": "¿Qué números genera range(3, 8, 2)?",
       "options": [
        "3, 5, 7",
        "3, 5, 7, 9",
        "3, 4, 5, 6, 7, 8"
       ],
       "answer": 0,
       "explain": ""
      },
      {
       "q": "¿Cuántas vueltas da for i in range(10)?",
       "options": [
        "9",
        "10",
        "11"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    },
    {
     "id": "break_continue",
     "title": "break, continue y bucles anidados",
     "minutes": 6,
     "teoria": "- `break` **sale** del bucle inmediatamente.\n- `continue` **salta** al siguiente ciclo, sin ejecutar el resto del bloque.\n\n```python\nfor n in range(1, 100):\n    if n % 7 == 0:\n        print(\"Primer múltiplo de 7:\", n)\n        break\n```\n\nUn bucle puede ir dentro de otro (**anidado**). El interior se completa entero en cada vuelta del exterior:\n\n```python\nfor fila in range(1, 4):\n    for col in range(1, 4):\n        print(fila * col, end=\"\\t\")\n    print()   # salto de línea al terminar la fila\n```\n\n`print(..., end=\"\")` cambia lo que se pone al final (por defecto un salto de línea).\n\nUn `return` dentro de un bucle en una función también lo corta: es la forma más limpia de \"buscar y devolver\".\n",
     "ejemplo": "for n in range(10):\n    if n % 2 == 0:\n        continue      # salta los pares\n    print(n, end=\" \")\nprint()\n\ndef primer_negativo(numeros):\n    for n in numeros:\n        if n < 0:\n            return n\n    return None\n\nprint(primer_negativo([4, 8, -3, 5, -9]))\nprint(primer_negativo([1, 2]))\n",
     "ejercicio": "Escribe `es_primo(n)` que devuelva `True` si n es primo (solo divisible por 1 y por sí mismo) y `False` si no. Los números menores que 2 no son primos.\n\nPista de eficiencia: basta con probar divisores desde 2 hasta la raíz cuadrada de n (`int(n ** 0.5) + 1`).\n",
     "codigo": "def es_primo(n):\n    pass\n",
     "prueba": "primos = [2, 3, 5, 7, 11, 13, 97, 7919]\nno_primos = [-3, 0, 1, 4, 9, 15, 21, 100, 7917]\nfor p in primos:\n    assert es_primo(p) is True, f\"{p} es primo y tu función dijo {es_primo(p)}\"\nfor p in no_primos:\n    assert es_primo(p) is False, f\"{p} no es primo y tu función dijo {es_primo(p)}\"\n",
     "pista": "Si `n < 2` devuelve False. Recorre `range(2, int(n ** 0.5) + 1)`; si algún `n % d == 0`, devuelve False. Si termina el bucle, devuelve True.\n",
     "solucion": "def es_primo(n):\n    if n < 2:\n        return False\n    for d in range(2, int(n ** 0.5) + 1):\n        if n % d == 0:\n            return False\n    return True\n",
     "quiz": [
      {
       "q": "¿Qué hace continue?",
       "options": [
        "Termina el programa",
        "Sale del bucle",
        "Pasa a la siguiente vuelta del bucle"
       ],
       "answer": 2,
       "explain": ""
      },
      {
       "q": "En dos bucles anidados, ¿de cuál sale un break?",
       "options": [
        "Solo del bucle donde está escrito (el más interno)",
        "De los dos",
        "De ninguno"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m5"
  },
  {
   "title": "Listas",
   "icon": "📋",
   "desc": "guardar y procesar muchos valores",
   "lessons": [
    {
     "id": "listas",
     "title": "Crear y usar listas",
     "minutes": 6,
     "teoria": "Una **lista** guarda varios valores en orden, entre corchetes:\n\n```python\nfrutas = [\"manzana\", \"pera\", \"uva\"]\nnumeros = [4, 8, 15, 16, 23, 42]\nmezcla = [\"Ana\", 30, True]   # se pueden mezclar tipos\nvacia = []\n```\n\nFunciona igual que con los textos: índices desde 0, negativos y cortes.\n\n```python\nfrutas[0]      # 'manzana'\nfrutas[-1]     # 'uva'\nnumeros[1:3]   # [8, 15]\nlen(frutas)    # 3\n\"pera\" in frutas  # True\n```\n\nA diferencia de los textos, **las listas se pueden modificar**:\n\n```python\nfrutas[1] = \"kiwi\"   # ['manzana', 'kiwi', 'uva']\n```\n\nFunciones muy útiles con listas de números: `sum()`, `max()`, `min()`, `sorted()`.\n",
     "ejemplo": "notas = [7, 9, 5, 10, 6]\nprint(\"Primera:\", notas[0], \"Última:\", notas[-1])\nprint(\"Cantidad:\", len(notas))\nprint(\"Media:\", sum(notas) / len(notas))\nprint(\"Mejor:\", max(notas), \"Peor:\", min(notas))\nprint(\"Ordenadas:\", sorted(notas))\nnotas[2] = 8\nprint(notas)\n",
     "ejercicio": "Escribe `resumen(numeros)` que reciba una lista no vacía y devuelva un texto con este formato exacto:\n\n`\"n=5 min=2 max=9 media=5.4\"`\n\n(la media con 1 decimal)\n",
     "codigo": "def resumen(numeros):\n    pass\n\nprint(resumen([3, 9, 2, 7, 6]))\n",
     "prueba": "r = resumen([3, 9, 2, 7, 6])\nassert r == \"n=5 min=2 max=9 media=5.4\", f\"Para [3, 9, 2, 7, 6] dio {r!r}\"\nr = resumen([10])\nassert r == \"n=1 min=10 max=10 media=10.0\", f\"Para [10] dio {r!r}\"\n",
     "pista": "`f\"n={len(numeros)} min={min(numeros)} max={max(numeros)} media={sum(numeros) / len(numeros):.1f}\"`\n",
     "solucion": "def resumen(numeros):\n    media = sum(numeros) / len(numeros)\n    return f\"n={len(numeros)} min={min(numeros)} max={max(numeros)} media={media:.1f}\"\n\nprint(resumen([3, 9, 2, 7, 6]))\n",
     "quiz": [
      {
       "q": "Si a = [10, 20, 30, 40], ¿qué es a[1:3]?",
       "options": [
        "[20, 30]",
        "[10, 20, 30]",
        "[20, 30, 40]"
       ],
       "answer": 0,
       "explain": ""
      },
      {
       "q": "¿Cuál de estas operaciones da error?",
       "options": [
        "lista[0] = 5 (con lista = [1, 2])",
        "texto[0] = \"x\" (con texto = \"hola\")",
        "len([])"
       ],
       "answer": 1,
       "explain": "Los strings son inmutables; las listas no."
      }
     ]
    },
    {
     "id": "metodos_lista",
     "title": "Añadir, quitar y ordenar",
     "minutes": 6,
     "teoria": "| Método | Qué hace |\n|---|---|\n| `.append(x)` | añade x al final |\n| `.insert(i, x)` | inserta x en la posición i |\n| `.extend(otra)` | añade todos los elementos de otra lista |\n| `.remove(x)` | quita la primera aparición de x |\n| `.pop()` / `.pop(i)` | quita y **devuelve** el último / el de la posición i |\n| `.index(x)` | posición de x |\n| `.count(x)` | cuántas veces aparece x |\n| `.sort()` | ordena **la misma lista** (`reverse=True` para descendente) |\n| `.reverse()` | invierte la misma lista |\n\nOjo con la diferencia: `lista.sort()` modifica la lista y devuelve `None`; `sorted(lista)` devuelve una lista **nueva** ordenada.\n\n> ⚠️ `b = a` no copia la lista: ambos nombres apuntan a la misma. Para copiar usa `b = a.copy()` o `b = a[:]`.\n",
     "ejemplo": "tareas = [\"estudiar\", \"comprar\"]\ntareas.append(\"correr\")\ntareas.insert(0, \"despertar\")\nprint(tareas)\nhecha = tareas.pop(0)\nprint(\"Hecha:\", hecha, \"Quedan:\", tareas)\ntareas.remove(\"comprar\")\ntareas.sort()\nprint(tareas)\n\na = [1, 2, 3]\nb = a          # mismo objeto\nc = a.copy()   # copia\na.append(4)\nprint(b, c)\n",
     "ejercicio": "Escribe `sin_duplicados(lista)` que devuelva una **lista nueva** con los elementos sin repetir, **manteniendo el orden** de la primera aparición. No modifiques la lista original.\n\n`sin_duplicados([3, 1, 3, 2, 1])` → `[3, 1, 2]`\n",
     "codigo": "def sin_duplicados(lista):\n    resultado = []\n\n    return resultado\n",
     "prueba": "original = [3, 1, 3, 2, 1]\nr = sin_duplicados(original)\nassert r == [3, 1, 2], f\"Para [3, 1, 3, 2, 1] dio {r}\"\nassert original == [3, 1, 3, 2, 1], \"¡Modificaste la lista original!\"\nassert sin_duplicados([]) == [], \"Para una lista vacía debe devolver []\"\nassert sin_duplicados(list(\"banana\")) == [\"b\", \"a\", \"n\"], \"Falla con ['b','a','n','a','n','a']\"\n",
     "pista": "Recorre la lista con `for x in lista:` y haz `resultado.append(x)` solo `if x not in resultado`.\n",
     "solucion": "def sin_duplicados(lista):\n    resultado = []\n    for x in lista:\n        if x not in resultado:\n            resultado.append(x)\n    return resultado\n",
     "quiz": [
      {
       "q": "¿Qué imprime print([3, 1, 2].sort())?",
       "options": [
        "[1, 2, 3]",
        "None",
        "[3, 1, 2]"
       ],
       "answer": 1,
       "explain": "sort() ordena en el sitio y devuelve None. Usa sorted() si quieres el resultado."
      },
      {
       "q": "¿Qué hace lista.pop()?",
       "options": [
        "Borra toda la lista",
        "Quita el último elemento y lo devuelve",
        "Añade un elemento"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    },
    {
     "id": "recorrer",
     "title": "enumerate, zip y patrones",
     "minutes": 6,
     "teoria": "Formas idiomáticas de recorrer listas:\n\n```python\nnombres = [\"Ana\", \"Luis\", \"Eva\"]\nedades = [30, 25, 35]\n\nfor nombre in nombres:                 # cada elemento\n    ...\nfor i, nombre in enumerate(nombres):   # posición + elemento\n    print(i, nombre)\nfor i, nombre in enumerate(nombres, start=1):  # empezando en 1\n    ...\nfor nombre, edad in zip(nombres, edades):      # dos listas en paralelo\n    print(nombre, edad)\n```\n\n**Patrones que usarás siempre:**\n\n- **Filtrar**: crear una lista vacía y hacer `append` solo de lo que cumple una condición.\n- **Transformar**: crear una lista nueva aplicando una operación a cada elemento.\n- **Buscar el mejor**: guardar el mejor hasta ahora y compararlo con cada uno.\n",
     "ejemplo": "productos = [\"pan\", \"leche\", \"huevos\"]\nprecios = [1.2, 0.95, 2.5]\n\nfor i, (p, precio) in enumerate(zip(productos, precios), start=1):\n    print(f\"{i}. {p:<8} {precio:.2f} €\")\n\ncaros = []\nfor p, precio in zip(productos, precios):\n    if precio > 1:\n        caros.append(p)\nprint(\"Más de 1 €:\", caros)\n\nmas_caro = productos[0]\nfor p, precio in zip(productos, precios):\n    if precio > precios[productos.index(mas_caro)]:\n        mas_caro = p\nprint(\"El más caro:\", mas_caro)\n",
     "ejercicio": "Escribe `mejor_alumno(nombres, notas)` que devuelva el **nombre** con la nota más alta. Si hay empate, el primero que aparezca.\n\n`mejor_alumno([\"Ana\", \"Luis\", \"Eva\"], [8, 9.5, 9.5])` → `\"Luis\"`\n",
     "codigo": "def mejor_alumno(nombres, notas):\n    pass\n",
     "prueba": "assert mejor_alumno([\"Ana\", \"Luis\", \"Eva\"], [8, 9.5, 9.5]) == \"Luis\", \"Debería ser Luis\"\nassert mejor_alumno([\"Ana\"], [3]) == \"Ana\", \"Con un solo alumno debe devolverlo\"\nassert mejor_alumno([\"A\", \"B\", \"C\"], [1, 2, 10]) == \"C\", \"Debería ser C\"\nassert mejor_alumno([\"A\", \"B\"], [-1, -5]) == \"A\", \"Funciona también con notas negativas\"\n",
     "pista": "Empieza con `mejor = nombres[0]` y `mejor_nota = notas[0]`. Recorre con `zip` y actualiza solo si `nota > mejor_nota` (mayor estricto para respetar empates).\n",
     "solucion": "def mejor_alumno(nombres, notas):\n    mejor, mejor_nota = nombres[0], notas[0]\n    for nombre, nota in zip(nombres, notas):\n        if nota > mejor_nota:\n            mejor, mejor_nota = nombre, nota\n    return mejor\n",
     "quiz": [
      {
       "q": "¿Qué da list(enumerate([\"a\", \"b\"]))?",
       "options": [
        "[(0, 'a'), (1, 'b')]",
        "['a', 'b']",
        "[(1, 'a'), (2, 'b')]"
       ],
       "answer": 0,
       "explain": ""
      },
      {
       "q": "¿Qué hace zip(a, b)?",
       "options": [
        "Comprime las listas",
        "Recorre ambas en paralelo, emparejando elementos",
        "Une las dos listas en una"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    },
    {
     "id": "comprensiones",
     "title": "List comprehensions",
     "minutes": 7,
     "teoria": "Una **comprensión de lista** crea una lista en una sola línea. Es de lo más \"pythónico\" que hay.\n\n```python\n# Forma larga\ncuadrados = []\nfor n in range(5):\n    cuadrados.append(n ** 2)\n\n# Comprensión\ncuadrados = [n ** 2 for n in range(5)]    # [0, 1, 4, 9, 16]\n```\n\nCon filtro al final:\n\n```python\npares = [n for n in range(10) if n % 2 == 0]\n```\n\nCon transformación condicional (el if/else va **antes** del for):\n\n```python\netiquetas = [\"par\" if n % 2 == 0 else \"impar\" for n in range(4)]\n```\n\nLéelo así: \"**[qué quiero** for **cada elemento** in **colección** if **condición]**\".\n\nÚtiles con ellas: `sum(x for x in ...)`, `any(...)` (¿alguno cumple?) y `all(...)` (¿todos cumplen?).\n",
     "ejemplo": "palabras = [\"Python\", \"es\", \"un\", \"lenguaje\", \"genial\"]\nprint([p.upper() for p in palabras])\nprint([p for p in palabras if len(p) > 3])\nprint([len(p) for p in palabras])\nprint(sum(len(p) for p in palabras))\nprint(any(p.startswith(\"g\") for p in palabras))\nprint(all(len(p) > 1 for p in palabras))\nprecios = [10, 25, 8]\nprint([round(p * 1.21, 2) for p in precios])\n",
     "ejercicio": "Escribe **en una línea cada una** usando comprensiones:\n\n- `aprobados(notas)`: devuelve solo las notas >= 5\n- `en_celsius(lista_f)`: convierte grados Fahrenheit a Celsius con `(f - 32) * 5 / 9`, redondeando a 1 decimal\n- `longitudes(texto)`: devuelve la longitud de cada palabra del texto\n",
     "codigo": "def aprobados(notas):\n    pass\n\ndef en_celsius(lista_f):\n    pass\n\ndef longitudes(texto):\n    pass\n",
     "prueba": "assert aprobados([3, 5, 7.5, 4.9, 10]) == [5, 7.5, 10], f\"aprobados dio {aprobados([3, 5, 7.5, 4.9, 10])}\"\nassert en_celsius([32, 212, 100]) == [0.0, 100.0, 37.8], f\"en_celsius dio {en_celsius([32, 212, 100])}\"\nassert longitudes(\"hola que tal estás\") == [4, 3, 3, 5], f\"longitudes dio {longitudes('hola que tal estás')}\"\n",
     "pista": "`[n for n in notas if n >= 5]`, `[round((f - 32) * 5 / 9, 1) for f in lista_f]`, `[len(p) for p in texto.split()]`\n",
     "solucion": "def aprobados(notas):\n    return [n for n in notas if n >= 5]\n\ndef en_celsius(lista_f):\n    return [round((f - 32) * 5 / 9, 1) for f in lista_f]\n\ndef longitudes(texto):\n    return [len(p) for p in texto.split()]\n",
     "quiz": [
      {
       "q": "¿Qué da [x * 2 for x in [1, 2, 3] if x != 2]?",
       "options": [
        "[2, 6]",
        "[2, 4, 6]",
        "[1, 3]"
       ],
       "answer": 0,
       "explain": ""
      },
      {
       "q": "¿Qué devuelve all([True, 1, \"a\"])?",
       "options": [
        "True",
        "False",
        "\"a\""
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m6"
  },
  {
   "title": "Diccionarios y más",
   "icon": "🗂️",
   "desc": "tuplas, diccionarios y conjuntos",
   "lessons": [
    {
     "id": "tuplas",
     "title": "Tuplas y desempaquetado",
     "minutes": 5,
     "teoria": "Una **tupla** es como una lista pero **inmutable**, con paréntesis:\n\n```python\npunto = (3, 4)\ncolor = (\"rojo\", 255, 0, 0)\npunto[0]      # 3\n```\n\nÚsalas para datos que van juntos y no deben cambiar (coordenadas, registros, fechas).\n\n**Desempaquetado**: asignar cada elemento a una variable.\n\n```python\nx, y = punto\nnombre, *resto = [\"Ana\", 1, 2, 3]   # resto = [1, 2, 3]\na, b = b, a                          # intercambiar valores ¡en una línea!\n```\n\nLo usaste ya sin saberlo: `for i, x in enumerate(...)` y `return a, b` trabajan con tuplas.\n",
     "ejemplo": "alumnos = [(\"Ana\", 8.5), (\"Luis\", 6.0), (\"Eva\", 9.2)]\nfor nombre, nota in alumnos:\n    print(f\"{nombre}: {nota}\")\n\na, b = 1, 2\na, b = b, a\nprint(a, b)\n\nprimero, *medio, ultimo = range(6)\nprint(primero, medio, ultimo)\n",
     "ejercicio": "Escribe `distancia(p1, p2)` que reciba dos puntos como tuplas `(x, y)` y devuelva la distancia entre ellos:\n√((x2 − x1)² + (y2 − y1)²). Usa desempaquetado.\n\n`distancia((0, 0), (3, 4))` → `5.0`\n",
     "codigo": "def distancia(p1, p2):\n    pass\n",
     "prueba": "assert distancia((0, 0), (3, 4)) == 5.0, f\"distancia((0,0),(3,4)) dio {distancia((0, 0), (3, 4))}\"\nassert abs(distancia((1, 1), (4, 5)) - 5) < 1e-9, \"Falla con (1,1) y (4,5)\"\nassert distancia((2, 2), (2, 2)) == 0, \"La distancia de un punto a sí mismo es 0\"\n",
     "pista": "`x1, y1 = p1`, `x2, y2 = p2`, y `return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5`\n",
     "solucion": "def distancia(p1, p2):\n    x1, y1 = p1\n    x2, y2 = p2\n    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5\n",
     "quiz": [
      {
       "q": "¿Qué diferencia principal hay entre lista y tupla?",
       "options": [
        "La tupla solo guarda números",
        "La tupla no se puede modificar",
        "No hay diferencia"
       ],
       "answer": 1,
       "explain": ""
      },
      {
       "q": "Tras a, b = 5, 9 y luego a, b = b, a, ¿cuánto vale a?",
       "options": [
        "9",
        "5",
        "14"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    },
    {
     "id": "diccionarios",
     "title": "Diccionarios",
     "minutes": 8,
     "teoria": "Un **diccionario** (`dict`) guarda pares **clave: valor**. Buscas por clave, no por posición.\n\n```python\npersona = {\"nombre\": \"Ana\", \"edad\": 30, \"ciudad\": \"Quito\"}\n\npersona[\"nombre\"]              # 'Ana'\npersona[\"edad\"] = 31           # modificar\npersona[\"email\"] = \"a@x.com\"   # añadir\ndel persona[\"ciudad\"]          # borrar\n\"edad\" in persona              # True (busca en las claves)\npersona.get(\"tel\", \"sin tel\")  # valor por defecto si no existe\n```\n\nLas claves deben ser únicas e inmutables (textos, números, tuplas). Los valores pueden ser cualquier cosa, incluso listas u otros diccionarios.\n\nRecorrerlos:\n\n```python\nfor clave in persona: ...\nfor valor in persona.values(): ...\nfor clave, valor in persona.items(): ...\n```\n\n**Contar con un diccionario** es un patrón clásico:\n\n```python\nconteo = {}\nfor x in datos:\n    conteo[x] = conteo.get(x, 0) + 1\n```\n",
     "ejemplo": "stock = {\"manzana\": 10, \"pera\": 0, \"uva\": 25}\nstock[\"kiwi\"] = 7\nstock[\"manzana\"] -= 3\n\nfor fruta, cantidad in stock.items():\n    estado = \"agotado\" if cantidad == 0 else f\"{cantidad} uds\"\n    print(f\"{fruta:<8} {estado}\")\n\nprint(stock.get(\"mango\", 0))\nprint(list(stock.keys()))\n\ncolores = {}\nfor c in [\"rojo\", \"azul\", \"rojo\", \"verde\", \"rojo\"]:\n    colores[c] = colores.get(c, 0) + 1\nprint(colores)\n",
     "ejercicio": "Escribe `frecuencia_palabras(texto)` que devuelva un diccionario con cuántas veces aparece cada palabra, **en minúsculas**.\n\n`frecuencia_palabras(\"Hola hola mundo\")` → `{\"hola\": 2, \"mundo\": 1}`\n",
     "codigo": "def frecuencia_palabras(texto):\n    conteo = {}\n\n    return conteo\n",
     "prueba": "assert frecuencia_palabras(\"Hola hola mundo\") == {\"hola\": 2, \"mundo\": 1}, f\"dio {frecuencia_palabras('Hola hola mundo')}\"\nassert frecuencia_palabras(\"\") == {}, \"Un texto vacío debe dar {}\"\nr = frecuencia_palabras(\"el gato y EL perro y el pez\")\nassert r == {\"el\": 3, \"gato\": 1, \"y\": 2, \"perro\": 1, \"pez\": 1}, f\"dio {r}\"\n",
     "pista": "Recorre `texto.lower().split()` y usa `conteo[p] = conteo.get(p, 0) + 1`.\n",
     "solucion": "def frecuencia_palabras(texto):\n    conteo = {}\n    for p in texto.lower().split():\n        conteo[p] = conteo.get(p, 0) + 1\n    return conteo\n",
     "quiz": [
      {
       "q": "¿Qué pasa con d[\"x\"] si \"x\" no es clave de d?",
       "options": [
        "Devuelve None",
        "Lanza KeyError",
        "Crea la clave"
       ],
       "answer": 1,
       "explain": "Usa d.get(\"x\") si no estás seguro de que exista."
      },
      {
       "q": "¿Qué devuelve d.items()?",
       "options": [
        "Solo las claves",
        "Solo los valores",
        "Pares (clave, valor)"
       ],
       "answer": 2,
       "explain": ""
      }
     ]
    },
    {
     "id": "anidados",
     "title": "Datos anidados (listas de diccionarios)",
     "minutes": 7,
     "teoria": "Los datos reales casi siempre son **listas de diccionarios** (así llegan, por ejemplo, desde una API en JSON):\n\n```python\nusuarios = [\n    {\"nombre\": \"Ana\", \"edad\": 30, \"lenguajes\": [\"Python\", \"SQL\"]},\n    {\"nombre\": \"Luis\", \"edad\": 22, \"lenguajes\": [\"JavaScript\"]},\n]\n\nusuarios[0][\"nombre\"]           # 'Ana'\nusuarios[0][\"lenguajes\"][1]     # 'SQL'\n```\n\nSe combinan con todo lo que ya sabes:\n\n```python\nnombres = [u[\"nombre\"] for u in usuarios]\njovenes = [u for u in usuarios if u[\"edad\"] < 25]\n```\n\n**Comprensión de diccionario**:\n\n```python\nedades = {u[\"nombre\"]: u[\"edad\"] for u in usuarios}   # {'Ana': 30, 'Luis': 22}\n```\n",
     "ejemplo": "pedidos = [\n    {\"cliente\": \"Ana\", \"total\": 45.0, \"pagado\": True},\n    {\"cliente\": \"Luis\", \"total\": 120.5, \"pagado\": False},\n    {\"cliente\": \"Ana\", \"total\": 30.0, \"pagado\": True},\n]\npendientes = [p[\"cliente\"] for p in pedidos if not p[\"pagado\"]]\nprint(\"Pendientes:\", pendientes)\nprint(\"Facturado:\", sum(p[\"total\"] for p in pedidos if p[\"pagado\"]))\n\npor_cliente = {}\nfor p in pedidos:\n    por_cliente[p[\"cliente\"]] = por_cliente.get(p[\"cliente\"], 0) + p[\"total\"]\nprint(por_cliente)\n",
     "ejercicio": "Escribe `gasto_por_categoria(gastos)` que reciba una lista de diccionarios con claves `\"categoria\"` y `\"monto\"` y devuelva un diccionario con el total por categoría.\n\n```python\ngastos = [{\"categoria\": \"comida\", \"monto\": 20},\n          {\"categoria\": \"ocio\", \"monto\": 15},\n          {\"categoria\": \"comida\", \"monto\": 5}]\ngasto_por_categoria(gastos)  # {\"comida\": 25, \"ocio\": 15}\n```\n",
     "codigo": "def gasto_por_categoria(gastos):\n    pass\n",
     "prueba": "g = [{\"categoria\": \"comida\", \"monto\": 20}, {\"categoria\": \"ocio\", \"monto\": 15}, {\"categoria\": \"comida\", \"monto\": 5}]\nassert gasto_por_categoria(g) == {\"comida\": 25, \"ocio\": 15}, f\"dio {gasto_por_categoria(g)}\"\nassert gasto_por_categoria([]) == {}, \"Sin gastos debe devolver {}\"\n",
     "pista": "Igual que contar palabras, pero sumando `g[\"monto\"]` en lugar de 1: `totales[cat] = totales.get(cat, 0) + g[\"monto\"]`.\n",
     "solucion": "def gasto_por_categoria(gastos):\n    totales = {}\n    for g in gastos:\n        cat = g[\"categoria\"]\n        totales[cat] = totales.get(cat, 0) + g[\"monto\"]\n    return totales\n",
     "quiz": [
      {
       "q": "Con datos = {\"a\": [1, 2, 3]}, ¿cómo obtienes el 3?",
       "options": [
        "datos[a][2]",
        "datos[\"a\"][2]",
        "datos[\"a\"](2)"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    },
    {
     "id": "sets",
     "title": "Conjuntos (sets)",
     "minutes": 5,
     "teoria": "Un **set** es una colección **sin orden y sin repetidos**. Se escribe con llaves (o `set()` para uno vacío, porque `{}` es un diccionario).\n\n```python\ncolores = {\"rojo\", \"verde\", \"rojo\"}   # {'rojo', 'verde'}\nunicos = set([1, 2, 2, 3])             # {1, 2, 3}\ncolores.add(\"azul\")\ncolores.discard(\"verde\")\n```\n\nBrillan en dos cosas:\n\n1. **Comprobar pertenencia** muy rápido (`x in conjunto`).\n2. **Operaciones de conjuntos**:\n\n| Operación | Símbolo | Resultado |\n|---|---|---|\n| Unión | `a \\| b` | lo que está en alguno |\n| Intersección | `a & b` | lo que está en ambos |\n| Diferencia | `a - b` | lo que está en a pero no en b |\n| Diferencia simétrica | `a ^ b` | lo que está en uno solo |\n",
     "ejemplo": "python = {\"Ana\", \"Luis\", \"Eva\", \"Iker\"}\nsql = {\"Eva\", \"Iker\", \"Marta\"}\nprint(\"Ambos:\", python & sql)\nprint(\"Alguno:\", python | sql)\nprint(\"Solo Python:\", python - sql)\nprint(\"Solo uno:\", python ^ sql)\nprint(\"Distintas letras en 'mississippi':\", len(set(\"mississippi\")))\n",
     "ejercicio": "Escribe `comparar_listas(a, b)` que devuelva una tupla de tres **listas ordenadas**:\n\n1. elementos comunes\n2. los que solo están en `a`\n3. los que solo están en `b`\n\n`comparar_listas([1, 2, 3, 3], [2, 3, 4])` → `([2, 3], [1], [4])`\n",
     "codigo": "def comparar_listas(a, b):\n    pass\n",
     "prueba": "r = comparar_listas([1, 2, 3, 3], [2, 3, 4])\nassert r == ([2, 3], [1], [4]), f\"dio {r}\"\nr = comparar_listas([\"x\"], [\"y\"])\nassert r == ([], [\"x\"], [\"y\"]), f\"dio {r}\"\n",
     "pista": "Convierte a sets: `sa, sb = set(a), set(b)`. Luego `sorted(sa & sb)`, `sorted(sa - sb)`, `sorted(sb - sa)`.\n",
     "solucion": "def comparar_listas(a, b):\n    sa, sb = set(a), set(b)\n    return sorted(sa & sb), sorted(sa - sb), sorted(sb - sa)\n",
     "quiz": [
      {
       "q": "¿Qué crea x = {}?",
       "options": [
        "Un set vacío",
        "Un diccionario vacío",
        "Un error"
       ],
       "answer": 1,
       "explain": "Para un set vacío usa set()."
      },
      {
       "q": "¿Cuánto vale len({1, 1, 2, 2, 3})?",
       "options": [
        "3",
        "5",
        "2"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m7"
  },
  {
   "title": "Funciones pro",
   "icon": "⚙️",
   "desc": "*args, **kwargs, alcance, lambda y ordenar",
   "lessons": [
    {
     "id": "args_kwargs",
     "title": "*args y **kwargs",
     "minutes": 6,
     "teoria": "A veces no sabes cuántos argumentos recibirá una función.\n\n- `*args` recoge los argumentos **posicionales** extra en una **tupla**.\n- `**kwargs` recoge los argumentos **con nombre** extra en un **diccionario**.\n\n```python\ndef sumar(*numeros):\n    return sum(numeros)\n\nsumar(1, 2, 3, 4)   # 10\n\ndef perfil(nombre, **datos):\n    print(nombre, datos)\n\nperfil(\"Ana\", edad=30, ciudad=\"Lima\")   # Ana {'edad': 30, 'ciudad': 'Lima'}\n```\n\nEl asterisco también sirve al **llamar**, para \"desempaquetar\":\n\n```python\nnumeros = [3, 7, 1]\nprint(*numeros)          # igual que print(3, 7, 1)\nconfig = {\"sep\": \" - \", \"end\": \"!\\n\"}\nprint(\"a\", \"b\", **config)  # a - b!\n```\n\nOrden en la firma: normales, `*args`, con valor por defecto, `**kwargs`.\n",
     "ejemplo": "def promedio(*valores):\n    if not valores:\n        return 0\n    return sum(valores) / len(valores)\n\nprint(promedio(4, 8, 6))\nprint(promedio())\n\ndef etiqueta_html(etiqueta, contenido, **atributos):\n    attrs = \"\".join(f' {k}=\"{v}\"' for k, v in atributos.items())\n    return f\"<{etiqueta}{attrs}>{contenido}</{etiqueta}>\"\n\nprint(etiqueta_html(\"a\", \"Python\", href=\"https://python.org\", target=\"_blank\"))\n",
     "ejercicio": "Escribe `crear_pedido(cliente, *productos, **opciones)` que devuelva un diccionario:\n\n```python\ncrear_pedido(\"Ana\", \"pan\", \"leche\", urgente=True)\n# {\"cliente\": \"Ana\", \"productos\": [\"pan\", \"leche\"], \"urgente\": True}\n```\n\nEs decir: `cliente`, `productos` como **lista** y además cada opción como clave propia.\n",
     "codigo": "def crear_pedido(cliente, *productos, **opciones):\n    pass\n",
     "prueba": "r = crear_pedido(\"Ana\", \"pan\", \"leche\", urgente=True)\nassert r == {\"cliente\": \"Ana\", \"productos\": [\"pan\", \"leche\"], \"urgente\": True}, f\"dio {r}\"\nr = crear_pedido(\"Luis\")\nassert r == {\"cliente\": \"Luis\", \"productos\": []}, f\"Sin productos ni opciones dio {r}\"\nr = crear_pedido(\"Eva\", \"té\", envio=\"casa\", pago=\"tarjeta\")\nassert r == {\"cliente\": \"Eva\", \"productos\": [\"té\"], \"envio\": \"casa\", \"pago\": \"tarjeta\"}, f\"dio {r}\"\n",
     "pista": "`pedido = {\"cliente\": cliente, \"productos\": list(productos)}` y luego `pedido.update(opciones)` (o `{**pedido, **opciones}`).\n",
     "solucion": "def crear_pedido(cliente, *productos, **opciones):\n    pedido = {\"cliente\": cliente, \"productos\": list(productos)}\n    pedido.update(opciones)\n    return pedido\n",
     "quiz": [
      {
       "q": "Dentro de def f(*args), ¿de qué tipo es args?",
       "options": [
        "list",
        "tuple",
        "dict"
       ],
       "answer": 1,
       "explain": ""
      },
      {
       "q": "Dentro de def f(**kwargs), ¿de qué tipo es kwargs?",
       "options": [
        "tuple",
        "dict",
        "set"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    },
    {
     "id": "alcance",
     "title": "Alcance de variables",
     "minutes": 5,
     "teoria": "Las variables creadas **dentro** de una función son **locales**: solo existen ahí y desaparecen al terminar.\n\n```python\ndef f():\n    secreto = 42\nf()\nprint(secreto)   # NameError\n```\n\nUna función **puede leer** variables globales (las de fuera), pero si **asigna** una variable con el mismo nombre, crea una local nueva.\n\n```python\ncontador = 0\ndef sumar():\n    contador += 1     # UnboundLocalError\n```\n\nExiste `global contador` para forzarlo, pero es mala práctica. La forma limpia: **recibe por parámetro y devuelve con return**.\n\n```python\ndef sumar(contador):\n    return contador + 1\ncontador = sumar(contador)\n```\n\n> 💡 Funciones que solo dependen de sus parámetros y devuelven un valor son fáciles de probar y de reutilizar. Es el estilo que estás practicando en cada reto.\n",
     "ejemplo": "IVA = 0.21          # constante global (en MAYÚSCULAS por convención)\n\ndef con_iva(precio):\n    return precio * (1 + IVA)     # leer una global está bien\n\ndef aplicar_descuento(precios, porcentaje):\n    nuevos = []                   # variable local\n    for p in precios:\n        nuevos.append(p * (1 - porcentaje / 100))\n    return nuevos\n\ncarrito = [10, 20, 30]\ncarrito = aplicar_descuento(carrito, 10)\nprint(carrito)\nprint([round(con_iva(p), 2) for p in carrito])\n",
     "ejercicio": "Este código tiene un error de alcance. Arréglalo **sin usar `global`**: `registrar(visitas)` debe recibir el número actual de visitas y devolverlo incrementado en 1.\n",
     "codigo": "visitas = 0\n\ndef registrar():\n    visitas += 1\n\nregistrar()\nregistrar()\nprint(visitas)\n",
     "prueba": "assert registrar(0) == 1 and registrar(41) == 42, \"registrar(n) debe devolver n + 1\"\nassert visitas == 2, f\"Al final visitas debe valer 2 y vale {visitas}. ¿Guardas lo que devuelve: visitas = registrar(visitas)?\"\n",
     "pista": "`def registrar(visitas): return visitas + 1` y al llamar: `visitas = registrar(visitas)`.\n",
     "solucion": "visitas = 0\n\ndef registrar(visitas):\n    return visitas + 1\n\nvisitas = registrar(visitas)\nvisitas = registrar(visitas)\nprint(visitas)\n",
     "quiz": [
      {
       "q": "¿Qué pasa con una variable creada dentro de una función cuando esta termina?",
       "options": [
        "Desaparece (era local)",
        "Se vuelve global",
        "Se guarda para la próxima llamada"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    },
    {
     "id": "lambda_sorted",
     "title": "lambda, sorted y key",
     "minutes": 7,
     "teoria": "Una **lambda** es una función anónima de una sola expresión:\n\n```python\ndoble = lambda x: x * 2\ndoble(5)   # 10\n```\n\nSu uso estrella: el parámetro `key` de `sorted()`, `max()` y `min()`, que indica **por qué** comparar.\n\n```python\npalabras = [\"kiwi\", \"banana\", \"uva\"]\nsorted(palabras, key=len)                      # ['uva', 'kiwi', 'banana']\nsorted(palabras, key=len, reverse=True)\n\nalumnos = [(\"Ana\", 8), (\"Luis\", 9.5), (\"Eva\", 7)]\nsorted(alumnos, key=lambda a: a[1])            # por nota\nmax(alumnos, key=lambda a: a[1])               # ('Luis', 9.5)\n```\n\nPara ordenar por varios criterios, devuelve una tupla: `key=lambda p: (p[\"edad\"], p[\"nombre\"])`.\n\nTambién existen `map(f, lista)` y `filter(f, lista)`, aunque normalmente una comprensión es más legible.\n",
     "ejemplo": "productos = [\n    {\"nombre\": \"Teclado\", \"precio\": 25, \"stock\": 10},\n    {\"nombre\": \"Ratón\", \"precio\": 15, \"stock\": 0},\n    {\"nombre\": \"Monitor\", \"precio\": 180, \"stock\": 3},\n]\nfor p in sorted(productos, key=lambda p: p[\"precio\"], reverse=True):\n    print(p[\"nombre\"], p[\"precio\"])\n\nbarato = min(productos, key=lambda p: p[\"precio\"])\nprint(\"Más barato:\", barato[\"nombre\"])\nprint(list(map(lambda p: p[\"nombre\"].upper(), productos)))\nprint(sorted([\"b\", \"A\", \"c\"], key=str.lower))\n",
     "ejercicio": "Escribe `ranking(jugadores)` que reciba una lista de diccionarios `{\"nombre\": ..., \"puntos\": ...}` y devuelva la **lista de nombres** ordenada por puntos de **mayor a menor**. En caso de empate, por nombre alfabéticamente.\n\n`ranking([{\"nombre\": \"Eva\", \"puntos\": 50}, {\"nombre\": \"Ana\", \"puntos\": 50}, {\"nombre\": \"Leo\", \"puntos\": 80}])` → `[\"Leo\", \"Ana\", \"Eva\"]`\n",
     "codigo": "def ranking(jugadores):\n    pass\n",
     "prueba": "j = [{\"nombre\": \"Eva\", \"puntos\": 50}, {\"nombre\": \"Ana\", \"puntos\": 50}, {\"nombre\": \"Leo\", \"puntos\": 80}]\nassert ranking(j) == [\"Leo\", \"Ana\", \"Eva\"], f\"dio {ranking(j)}\"\nassert ranking([]) == [], \"Lista vacía → []\"\nj2 = [{\"nombre\": \"B\", \"puntos\": 1}, {\"nombre\": \"A\", \"puntos\": 2}, {\"nombre\": \"C\", \"puntos\": 3}]\nassert ranking(j2) == [\"C\", \"A\", \"B\"], f\"dio {ranking(j2)}\"\n",
     "pista": "Truco: para mayor a menor en puntos pero alfabético en nombre, usa `key=lambda j: (-j[\"puntos\"], j[\"nombre\"])`. Luego extrae los nombres con una comprensión.\n",
     "solucion": "def ranking(jugadores):\n    ordenados = sorted(jugadores, key=lambda j: (-j[\"puntos\"], j[\"nombre\"]))\n    return [j[\"nombre\"] for j in ordenados]\n",
     "quiz": [
      {
       "q": "¿Qué devuelve sorted([\"ccc\", \"a\", \"bb\"], key=len)?",
       "options": [
        "['a', 'bb', 'ccc']",
        "['ccc', 'bb', 'a']",
        "['a', 'bb', 'ccc'] pero modificando la lista original"
       ],
       "answer": 0,
       "explain": ""
      },
      {
       "q": "¿Qué es lambda x: x + 1?",
       "options": [
        "Una variable",
        "Una función anónima que suma 1",
        "Un bucle"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m8"
  },
  {
   "title": "Errores",
   "icon": "🛟",
   "desc": "manejar fallos sin que el programa se caiga",
   "lessons": [
    {
     "id": "try_except",
     "title": "try / except",
     "minutes": 6,
     "teoria": "Cuando algo falla, Python lanza una **excepción** y el programa se detiene. Con `try/except` la capturas y decides qué hacer:\n\n```python\ntry:\n    edad = int(texto)\nexcept ValueError:\n    print(\"Eso no es un número\")\n    edad = 0\n```\n\nEstructura completa:\n\n```python\ntry:\n    ...                 # código que puede fallar\nexcept ZeroDivisionError:\n    ...                 # si ocurre ese error\nexcept (ValueError, TypeError) as e:\n    print(\"Error:\", e)  # 'e' contiene el mensaje\nelse:\n    ...                 # si NO hubo error\nfinally:\n    ...                 # siempre, haya error o no\n```\n\nErrores comunes: `ValueError`, `TypeError`, `KeyError`, `IndexError`, `ZeroDivisionError`, `FileNotFoundError`.\n\n> ⚠️ Evita `except:` a secas: atrapa todo, incluso errores que deberías ver y corregir. Captura el error concreto.\n",
     "ejemplo": "def dividir_seguro(a, b):\n    try:\n        resultado = a / b\n    except ZeroDivisionError:\n        return \"no se puede dividir entre 0\"\n    except TypeError as e:\n        return f\"tipos inválidos: {e}\"\n    else:\n        return round(resultado, 2)\n\nprint(dividir_seguro(10, 3))\nprint(dividir_seguro(10, 0))\nprint(dividir_seguro(\"10\", 2))\n\ndatos = [\"12\", \"abc\", \"7\", \"\", \"3.5\"]\nnumeros = []\nfor d in datos:\n    try:\n        numeros.append(int(d))\n    except ValueError:\n        print(f\"Ignoro {d!r}\")\nprint(numeros)\n",
     "ejercicio": "Escribe `a_numero(texto, por_defecto=0)` que intente convertir el texto a `float` y, si no es posible, devuelva `por_defecto`. Debe aceptar coma decimal: `\"3,5\"` → `3.5`.\n\n- `a_numero(\"12\")` → `12.0`\n- `a_numero(\"3,5\")` → `3.5`\n- `a_numero(\"hola\")` → `0`\n- `a_numero(\"x\", None)` → `None`\n",
     "codigo": "def a_numero(texto, por_defecto=0):\n    pass\n",
     "prueba": "assert a_numero(\"12\") == 12.0, f\"a_numero('12') dio {a_numero('12')!r}\"\nassert a_numero(\"3,5\") == 3.5, f\"a_numero('3,5') dio {a_numero('3,5')!r}\"\nassert a_numero(\" 7.25 \") == 7.25, \"Debe tolerar espacios (float ya lo hace)\"\nassert a_numero(\"hola\") == 0, f\"a_numero('hola') dio {a_numero('hola')!r}\"\nassert a_numero(\"x\", None) is None, \"Con por_defecto=None debe devolver None\"\n",
     "pista": "Dentro del `try`: `return float(texto.replace(\",\", \".\"))`. En `except ValueError:` devuelve `por_defecto`.\n",
     "solucion": "def a_numero(texto, por_defecto=0):\n    try:\n        return float(texto.replace(\",\", \".\"))\n    except ValueError:\n        return por_defecto\n",
     "quiz": [
      {
       "q": "¿Cuándo se ejecuta el bloque finally?",
       "options": [
        "Solo si hubo error",
        "Solo si no hubo error",
        "Siempre"
       ],
       "answer": 2,
       "explain": ""
      },
      {
       "q": "¿Qué excepción lanza int(\"abc\")?",
       "options": [
        "ValueError",
        "TypeError",
        "NameError"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    },
    {
     "id": "raise",
     "title": "Lanzar errores y validar",
     "minutes": 5,
     "teoria": "Tus funciones también pueden **lanzar** errores con `raise` cuando reciben algo inválido. Es mejor fallar pronto y con un mensaje claro que devolver un resultado incorrecto.\n\n```python\ndef retirar(saldo, monto):\n    if monto <= 0:\n        raise ValueError(\"El monto debe ser positivo\")\n    if monto > saldo:\n        raise ValueError(\"Saldo insuficiente\")\n    return saldo - monto\n```\n\nQuien llama decide cómo manejarlo:\n\n```python\ntry:\n    saldo = retirar(100, 500)\nexcept ValueError as e:\n    print(\"No se pudo:\", e)\n```\n\nPuedes crear tus propios tipos de error heredando de `Exception` (verás herencia en POO):\n\n```python\nclass SaldoInsuficiente(Exception):\n    pass\n```\n\n`assert condicion, \"mensaje\"` es una comprobación rápida que lanza `AssertionError`. Así funcionan las pruebas de este curso.\n",
     "ejemplo": "def validar_email(email):\n    if \"@\" not in email:\n        raise ValueError(f\"'{email}' no tiene @\")\n    usuario, dominio = email.split(\"@\", 1)\n    if not usuario or \".\" not in dominio:\n        raise ValueError(f\"'{email}' no es válido\")\n    return email.lower()\n\nfor e in [\"Ana@Mail.com\", \"sin-arroba\", \"@mail.com\", \"x@dominio\"]:\n    try:\n        print(\"OK:\", validar_email(e))\n    except ValueError as err:\n        print(\"Error:\", err)\n",
     "ejercicio": "Escribe `crear_usuario(nombre, edad)` que devuelva `{\"nombre\": nombre, \"edad\": edad}` pero lance `ValueError` si:\n\n- `nombre` está vacío o tiene solo espacios\n- `edad` no es un `int`, o es menor que 0 o mayor que 130\n",
     "codigo": "def crear_usuario(nombre, edad):\n    pass\n",
     "prueba": "assert crear_usuario(\"Ana\", 30) == {\"nombre\": \"Ana\", \"edad\": 30}, \"Con datos válidos debe devolver el diccionario\"\nfor args in [(\"\", 20), (\"   \", 20), (\"Ana\", -1), (\"Ana\", 131), (\"Ana\", \"30\"), (\"Ana\", 30.5)]:\n    try:\n        crear_usuario(*args)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"crear_usuario{args} debería lanzar ValueError\")\n",
     "pista": "`if not nombre.strip(): raise ValueError(...)`. Para el tipo: `if not isinstance(edad, int) or not 0 <= edad <= 130: raise ValueError(...)`.\n",
     "solucion": "def crear_usuario(nombre, edad):\n    if not nombre.strip():\n        raise ValueError(\"El nombre no puede estar vacío\")\n    if not isinstance(edad, int) or not 0 <= edad <= 130:\n        raise ValueError(\"Edad no válida\")\n    return {\"nombre\": nombre, \"edad\": edad}\n",
     "quiz": [
      {
       "q": "¿Qué palabra clave lanza una excepción?",
       "options": [
        "throw",
        "raise",
        "error"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m9"
  },
  {
   "title": "Módulos",
   "icon": "📦",
   "desc": "la biblioteca estándar: pilas incluidas",
   "lessons": [
    {
     "id": "import",
     "title": "import y módulos útiles",
     "minutes": 7,
     "teoria": "Python trae cientos de módulos listos para usar. Se cargan con `import`:\n\n```python\nimport math\nmath.sqrt(16)        # 4.0\nmath.pi\n\nfrom random import randint, choice\nrandint(1, 6)        # dado\nchoice([\"a\", \"b\"])   # elemento al azar\n\nimport statistics as st   # alias\nst.mean([1, 2, 3])\n```\n\nMódulos que vale la pena conocer:\n\n| Módulo | Para qué |\n|---|---|\n| `math` | raíces, potencias, trigonometría, `ceil`, `floor` |\n| `random` | números y elecciones al azar, `shuffle` |\n| `statistics` | `mean`, `median`, `mode`, `stdev` |\n| `datetime` | fechas y horas |\n| `collections` | `Counter`, `defaultdict`, `deque` |\n| `json` | leer y escribir JSON |\n| `itertools` | combinaciones, permutaciones... |\n| `re` | expresiones regulares |\n\nPara instalar paquetes externos en tu computadora se usa `pip install nombre` (por ejemplo `requests` o `pandas`).\n",
     "ejemplo": "import math\nimport random\nimport statistics\nfrom datetime import date\n\nprint(math.sqrt(2), math.ceil(4.1), math.floor(4.9))\nrandom.seed(1)   # semilla: hace el azar repetible\nprint(random.randint(1, 6), random.choice([\"piedra\", \"papel\", \"tijera\"]))\nmazo = list(range(1, 11))\nrandom.shuffle(mazo)\nprint(mazo)\nprint(statistics.median([3, 1, 4, 1, 5]))\nhoy = date(2025, 3, 15)\nnavidad = date(2025, 12, 25)\nprint(\"Faltan\", (navidad - hoy).days, \"días\")\n",
     "ejercicio": "Escribe `estadisticas(datos)` que devuelva un diccionario con `\"media\"`, `\"mediana\"` y `\"desviacion\"` (desviación estándar muestral), **todas redondeadas a 2 decimales**, usando el módulo `statistics`.\n\n`estadisticas([2, 4, 4, 4, 5, 5, 7, 9])` → `{\"media\": 5.0, \"mediana\": 4.5, \"desviacion\": 2.14}`\n",
     "codigo": "def estadisticas(datos):\n    pass\n",
     "prueba": "r = estadisticas([2, 4, 4, 4, 5, 5, 7, 9])\nassert r == {\"media\": 5.0, \"mediana\": 4.5, \"desviacion\": 2.14}, f\"dio {r}\"\n",
     "pista": "`import statistics` arriba, y luego `statistics.mean`, `statistics.median`, `statistics.stdev`, cada uno dentro de `round(..., 2)`.\n",
     "solucion": "import statistics\n\ndef estadisticas(datos):\n    return {\n        \"media\": round(statistics.mean(datos), 2),\n        \"mediana\": round(statistics.median(datos), 2),\n        \"desviacion\": round(statistics.stdev(datos), 2),\n    }\n",
     "quiz": [
      {
       "q": "¿Qué hace from math import sqrt?",
       "options": [
        "Importa todo math",
        "Importa solo sqrt, para usarla sin escribir math.",
        "Instala math"
       ],
       "answer": 1,
       "explain": ""
      },
      {
       "q": "¿Para qué sirve random.seed(1)?",
       "options": [
        "Para generar números más aleatorios",
        "Para que la secuencia \"aleatoria\" sea siempre la misma (reproducible)",
        "Para elegir un número entre 0 y 1"
       ],
       "answer": 1,
       "explain": ""
      }
     ]
    },
    {
     "id": "collections_json",
     "title": "Counter, defaultdict y JSON",
     "minutes": 6,
     "teoria": "`collections` tiene versiones mejoradas de las estructuras básicas.\n\n**Counter** cuenta elementos en una línea:\n\n```python\nfrom collections import Counter\nc = Counter(\"abracadabra\")\nc[\"a\"]            # 5\nc.most_common(2)  # [('a', 5), ('b', 2)]\n```\n\n**defaultdict** crea automáticamente un valor inicial para claves nuevas:\n\n```python\nfrom collections import defaultdict\ngrupos = defaultdict(list)\ngrupos[\"frutas\"].append(\"pera\")   # no hace falta comprobar si existe\n```\n\n**JSON** es el formato de datos más usado en la web. El módulo `json` lo convierte desde y hacia diccionarios y listas:\n\n```python\nimport json\ntexto = json.dumps({\"a\": 1}, indent=2)   # dict → texto\ndatos = json.loads('{\"a\": 1}')           # texto → dict\n```\n",
     "ejemplo": "from collections import Counter, defaultdict\nimport json\n\nvotos = [\"rojo\", \"azul\", \"rojo\", \"verde\", \"rojo\", \"azul\"]\nconteo = Counter(votos)\nprint(conteo)\nprint(\"Ganador:\", conteo.most_common(1)[0])\n\npalabras = [\"sol\", \"sal\", \"mar\", \"luz\", \"mes\"]\npor_letra = defaultdict(list)\nfor p in palabras:\n    por_letra[p[0]].append(p)\nprint(dict(por_letra))\n\ntexto = '{\"nombre\": \"Ana\", \"cursos\": [\"Python\", \"SQL\"]}'\ndatos = json.loads(texto)\ndatos[\"cursos\"].append(\"Git\")\nprint(json.dumps(datos, ensure_ascii=False, indent=2))\n",
     "ejercicio": "Escribe `top_palabras(texto, n)` que devuelva una lista con las `n` palabras más frecuentes (en minúsculas, sin contar signos `.,;:!?`), como tuplas `(palabra, cantidad)`. Usa `Counter`.\n\n`top_palabras(\"El sol. El mar, el cielo!\", 1)` → `[(\"el\", 3)]`\n",
     "codigo": "from collections import Counter\n\ndef top_palabras(texto, n):\n    pass\n",
     "prueba": "assert top_palabras(\"El sol. El mar, el cielo!\", 1) == [(\"el\", 3)], f\"dio {top_palabras('El sol. El mar, el cielo!', 1)}\"\nr = top_palabras(\"a b b c c c; d!\", 2)\nassert r == [(\"c\", 3), (\"b\", 2)], f\"dio {r}\"\n",
     "pista": "Quita los signos con un bucle `for s in \".,;:!?\": texto = texto.replace(s, \"\")`. Después `Counter(texto.lower().split()).most_common(n)`.\n",
     "solucion": "from collections import Counter\n\ndef top_palabras(texto, n):\n    for signo in \".,;:!?\":\n        texto = texto.replace(signo, \"\")\n    return Counter(texto.lower().split()).most_common(n)\n",
     "quiz": [
      {
       "q": "¿Qué devuelve json.loads('[1, 2]')?",
       "options": [
        "La lista [1, 2]",
        "El texto '[1, 2]'",
        "Un diccionario"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m10"
  },
  {
   "title": "Objetos (POO)",
   "icon": "🏗️",
   "desc": "clases, métodos, herencia",
   "lessons": [
    {
     "id": "clases",
     "title": "Clases y objetos",
     "minutes": 8,
     "teoria": "Una **clase** es un molde para crear **objetos** que agrupan datos (**atributos**) y comportamiento (**métodos**).\n\n```python\nclass Perro:\n    def __init__(self, nombre, edad):   # constructor: se ejecuta al crear el objeto\n        self.nombre = nombre             # atributos\n        self.edad = edad\n\n    def ladrar(self):                    # método\n        return f\"{self.nombre} dice ¡guau!\"\n\nfirulais = Perro(\"Firulais\", 3)          # crear un objeto (instancia)\nfirulais.ladrar()                        # 'Firulais dice ¡guau!'\nfirulais.edad += 1                       # acceder y modificar atributos\n```\n\n- `self` es el propio objeto. Siempre es el primer parámetro de los métodos, pero **no** se pasa al llamar.\n- Los nombres de clase van en `CamelCase`.\n- Cada objeto tiene sus propios datos: `Perro(\"Rex\", 5)` es independiente de `firulais`.\n\n¿Cuándo usar clases? Cuando tienes datos y operaciones que van siempre juntos: una cuenta bancaria, un jugador, un carrito de compra.\n",
     "ejemplo": "class Contador:\n    def __init__(self, inicio=0):\n        self.valor = inicio\n\n    def incrementar(self, paso=1):\n        self.valor += paso\n        return self.valor\n\n    def reiniciar(self):\n        self.valor = 0\n\nvisitas = Contador()\nclics = Contador(100)\nvisitas.incrementar()\nvisitas.incrementar()\nclics.incrementar(10)\nprint(visitas.valor, clics.valor)\nvisitas.reiniciar()\nprint(visitas.valor)\n",
     "ejercicio": "Crea la clase `CuentaBancaria`:\n\n- `__init__(self, titular, saldo=0)` guarda ambos atributos.\n- `depositar(self, monto)`: suma al saldo. Si monto <= 0 lanza `ValueError`.\n- `retirar(self, monto)`: resta del saldo. Si no hay saldo suficiente lanza `ValueError`.\n- Ambos métodos devuelven el saldo resultante.\n",
     "codigo": "class CuentaBancaria:\n    def __init__(self, titular, saldo=0):\n        pass\n\ncuenta = CuentaBancaria(\"Ana\", 100)\n",
     "prueba": "c = CuentaBancaria(\"Ana\", 100)\nassert c.titular == \"Ana\" and c.saldo == 100, \"El constructor debe guardar titular y saldo\"\nassert CuentaBancaria(\"Leo\").saldo == 0, \"El saldo por defecto es 0\"\nassert c.depositar(50) == 150, \"depositar(50) debe devolver 150\"\nassert c.retirar(30) == 120, \"retirar(30) debe devolver 120\"\nassert c.saldo == 120, \"El saldo debe quedar en 120\"\nfor metodo, monto in [(c.retirar, 1000), (c.depositar, -5), (c.depositar, 0)]:\n    try:\n        metodo(monto)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"{metodo.__name__}({monto}) debería lanzar ValueError\")\nassert c.saldo == 120, \"Una operación fallida no debe cambiar el saldo\"\n",
     "pista": "En `__init__`: `self.titular = titular` y `self.saldo = saldo`. En `retirar`: `if monto > self.saldo: raise ValueError(\"Saldo insuficiente\")`.\n",
     "solucion": "class CuentaBancaria:\n    def __init__(self, titular, saldo=0):\n        self.titular = titular\n        self.saldo = saldo\n\n    def depositar(self, monto):\n        if monto <= 0:\n            raise ValueError(\"El monto debe ser positivo\")\n        self.saldo += monto\n        return self.saldo\n\n    def retirar(self, monto):\n        if monto <= 0 or monto > self.saldo:\n            raise ValueError(\"Monto no válido o saldo insuficiente\")\n        self.saldo -= monto\n        return self.saldo\n\ncuenta = CuentaBancaria(\"Ana\", 100)\n",
     "quiz": [
      {
       "q": "¿Qué es self?",
       "options": [
        "Una palabra reservada para importar",
        "El objeto sobre el que se llama el método",
        "El nombre de la clase"
       ],
       "answer": 1,
       "explain": ""
      },
      {
       "q": "¿Cuándo se ejecuta __init__?",
       "options": [
        "Al crear un objeto nuevo de la clase",
        "Al borrar el objeto",
        "Cada vez que se llama a un método"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    },
    {
     "id": "metodos_especiales",
     "title": "Métodos especiales",
     "minutes": 6,
     "teoria": "Los métodos con doble guion bajo (**dunder**) permiten que tus objetos funcionen con las herramientas de Python:\n\n| Método | Se usa con |\n|---|---|\n| `__str__` | `print(obj)`, `str(obj)` (texto para personas) |\n| `__repr__` | la consola y depuración |\n| `__len__` | `len(obj)` |\n| `__eq__` | `obj1 == obj2` |\n| `__lt__` | `obj1 < obj2` (y por tanto `sorted`) |\n| `__add__` | `obj1 + obj2` |\n| `__contains__` | `x in obj` |\n\n```python\nclass Punto:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __str__(self):\n        return f\"({self.x}, {self.y})\"\n    def __add__(self, otro):\n        return Punto(self.x + otro.x, self.y + otro.y)\n\nprint(Punto(1, 2) + Punto(3, 4))   # (4, 6)\n```\n\n**Atajo moderno**: `@dataclass` genera automáticamente `__init__`, `__repr__` y `__eq__`:\n\n```python\nfrom dataclasses import dataclass\n\n@dataclass\nclass Producto:\n    nombre: str\n    precio: float\n    stock: int = 0\n```\n",
     "ejemplo": "from dataclasses import dataclass\n\n@dataclass\nclass Producto:\n    nombre: str\n    precio: float\n\nclass Carrito:\n    def __init__(self):\n        self.items = []\n    def agregar(self, producto):\n        self.items.append(producto)\n    def __len__(self):\n        return len(self.items)\n    def __str__(self):\n        total = sum(p.precio for p in self.items)\n        return f\"Carrito con {len(self)} productos, total {total:.2f}\"\n\nc = Carrito()\nc.agregar(Producto(\"Libro\", 12.5))\nc.agregar(Producto(\"Taza\", 6))\nprint(c)\nprint(c.items[0])\nprint(Producto(\"A\", 1) == Producto(\"A\", 1))\n",
     "ejercicio": "Crea la clase `Dinero(cantidad, moneda)` con:\n\n- `__str__` → `\"10.50 USD\"` (2 decimales)\n- `__add__` → suma dos `Dinero` de la misma moneda y devuelve un `Dinero` nuevo. Si las monedas son distintas lanza `ValueError`.\n- `__eq__` → iguales si coinciden cantidad y moneda.\n",
     "codigo": "class Dinero:\n    def __init__(self, cantidad, moneda):\n        self.cantidad = cantidad\n        self.moneda = moneda\n",
     "prueba": "a, b = Dinero(10.5, \"USD\"), Dinero(4.5, \"USD\")\nassert str(a) == \"10.50 USD\", f\"str dio {str(a)!r}\"\ns = a + b\nassert isinstance(s, Dinero), \"La suma debe devolver un objeto Dinero\"\nassert s.cantidad == 15 and s.moneda == \"USD\", \"10.5 + 4.5 USD debería dar 15 USD\"\nassert Dinero(3, \"EUR\") == Dinero(3, \"EUR\"), \"Dos Dinero iguales deben ser ==\"\nassert Dinero(3, \"EUR\") != Dinero(3, \"USD\"), \"Monedas distintas no son iguales\"\ntry:\n    Dinero(1, \"EUR\") + Dinero(1, \"USD\")\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError(\"Sumar monedas distintas debe lanzar ValueError\")\n",
     "pista": "`def __add__(self, otro):` compara `self.moneda != otro.moneda`, y si todo va bien `return Dinero(self.cantidad + otro.cantidad, self.moneda)`.\n",
     "solucion": "class Dinero:\n    def __init__(self, cantidad, moneda):\n        self.cantidad = cantidad\n        self.moneda = moneda\n\n    def __str__(self):\n        return f\"{self.cantidad:.2f} {self.moneda}\"\n\n    def __add__(self, otro):\n        if self.moneda != otro.moneda:\n            raise ValueError(\"No se pueden sumar monedas distintas\")\n        return Dinero(self.cantidad + otro.cantidad, self.moneda)\n\n    def __eq__(self, otro):\n        return self.cantidad == otro.cantidad and self.moneda == otro.moneda\n",
     "quiz": [
      {
       "q": "¿Qué método se usa al hacer print(objeto)?",
       "options": [
        "__str__",
        "__init__",
        "__print__"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    },
    {
     "id": "herencia",
     "title": "Herencia",
     "minutes": 6,
     "teoria": "La **herencia** crea una clase nueva a partir de otra: la hija recibe todo lo de la madre y puede **añadir** o **cambiar** (sobrescribir) comportamiento.\n\n```python\nclass Animal:\n    def __init__(self, nombre):\n        self.nombre = nombre\n    def hablar(self):\n        return \"...\"\n    def presentarse(self):\n        return f\"Soy {self.nombre} y digo {self.hablar()}\"\n\nclass Gato(Animal):              # Gato hereda de Animal\n    def hablar(self):            # sobrescribe\n        return \"miau\"\n\nclass Perro(Animal):\n    def __init__(self, nombre, raza):\n        super().__init__(nombre) # reutiliza el constructor de Animal\n        self.raza = raza\n    def hablar(self):\n        return \"guau\"\n```\n\n`super()` llama a la versión de la clase madre. `isinstance(obj, Animal)` es `True` para gatos y perros.\n\n**Polimorfismo**: puedes tratar distintos objetos igual porque comparten métodos: `for a in animales: print(a.presentarse())`.\n",
     "ejemplo": "class Empleado:\n    def __init__(self, nombre, sueldo):\n        self.nombre = nombre\n        self.sueldo = sueldo\n    def pago_mensual(self):\n        return self.sueldo / 12\n\nclass Gerente(Empleado):\n    def __init__(self, nombre, sueldo, bono):\n        super().__init__(nombre, sueldo)\n        self.bono = bono\n    def pago_mensual(self):\n        return super().pago_mensual() + self.bono\n\nequipo = [Empleado(\"Ana\", 36000), Gerente(\"Luis\", 60000, 800)]\nfor e in equipo:\n    print(f\"{e.nombre}: {e.pago_mensual():,.2f}\")\nprint(isinstance(equipo[1], Empleado))\n",
     "ejercicio": "Crea la clase base `Figura` con un método `area()` que devuelva `0` y un método `describir()` que devuelva `\"<Nombre de la clase> de área X\"` con el área a 2 decimales (usa `type(self).__name__`).\n\nCrea `Rectangulo(base, altura)` y `Circulo(radio)` que hereden de `Figura` y sobrescriban `area()` (usa `math.pi`).\n\n`Rectangulo(2, 3).describir()` → `\"Rectangulo de área 6.00\"`\n",
     "codigo": "import math\n\nclass Figura:\n    pass\n",
     "prueba": "r, c = Rectangulo(2, 3), Circulo(1)\nassert isinstance(r, Figura) and isinstance(c, Figura), \"Rectangulo y Circulo deben heredar de Figura\"\nassert r.area() == 6, f\"Área del rectángulo: {r.area()}\"\nassert abs(c.area() - 3.14159265) < 1e-6, f\"Área del círculo: {c.area()}\"\nassert r.describir() == \"Rectangulo de área 6.00\", f\"dio {r.describir()!r}\"\nassert c.describir() == \"Circulo de área 3.14\", f\"dio {c.describir()!r}\"\nassert \"describir\" not in Rectangulo.__dict__, \"describir() debe definirse solo en Figura y heredarse\"\n",
     "pista": "`describir` va en `Figura`: `return f\"{type(self).__name__} de área {self.area():.2f}\"`. Las hijas solo definen `__init__` y `area`.\n",
     "solucion": "import math\n\nclass Figura:\n    def area(self):\n        return 0\n\n    def describir(self):\n        return f\"{type(self).__name__} de área {self.area():.2f}\"\n\nclass Rectangulo(Figura):\n    def __init__(self, base, altura):\n        self.base = base\n        self.altura = altura\n\n    def area(self):\n        return self.base * self.altura\n\nclass Circulo(Figura):\n    def __init__(self, radio):\n        self.radio = radio\n\n    def area(self):\n        return math.pi * self.radio ** 2\n",
     "quiz": [
      {
       "q": "¿Para qué sirve super().__init__(...)?",
       "options": [
        "Para ejecutar el constructor de la clase madre",
        "Para crear una clase nueva",
        "Para borrar el objeto"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m11"
  },
  {
   "title": "Python pythónico",
   "icon": "🐍",
   "desc": "archivos, generadores y buenas prácticas",
   "lessons": [
    {
     "id": "archivos",
     "title": "Leer y escribir archivos",
     "minutes": 6,
     "teoria": "Se abre un archivo con `open(nombre, modo)`. Usa siempre `with`: cierra el archivo automáticamente aunque haya errores.\n\n| Modo | Significa |\n|---|---|\n| `\"r\"` | leer (por defecto) |\n| `\"w\"` | escribir (¡borra el contenido anterior!) |\n| `\"a\"` | añadir al final |\n\n```python\nwith open(\"notas.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"Primera línea\\n\")\n\nwith open(\"notas.txt\", encoding=\"utf-8\") as f:\n    contenido = f.read()          # todo el texto\n\nwith open(\"notas.txt\", encoding=\"utf-8\") as f:\n    for linea in f:               # línea a línea (ideal para archivos grandes)\n        print(linea.strip())\n```\n\nPara CSV existe el módulo `csv`, y para JSON `json.dump(datos, f)` / `json.load(f)`.\n\n> 💡 Aquí los archivos se guardan en un disco virtual dentro del navegador: puedes practicar sin miedo.\n",
     "ejemplo": "import csv\n\nwith open(\"compras.csv\", \"w\", encoding=\"utf-8\", newline=\"\") as f:\n    escritor = csv.writer(f)\n    escritor.writerow([\"producto\", \"precio\"])\n    escritor.writerows([[\"pan\", 1.2], [\"queso\", 4.5], [\"vino\", 9.9]])\n\nwith open(\"compras.csv\", encoding=\"utf-8\") as f:\n    print(f.read())\n\nwith open(\"compras.csv\", encoding=\"utf-8\") as f:\n    filas = list(csv.DictReader(f))\ntotal = sum(float(fila[\"precio\"]) for fila in filas)\nprint(filas[0])\nprint(f\"Total: {total:.2f}\")\n",
     "ejercicio": "Escribe `guardar_y_contar(nombre_archivo, lineas)` que:\n\n1. Escriba cada texto de la lista `lineas` en el archivo, uno por línea.\n2. Vuelva a abrir el archivo, lo lea y devuelva cuántas líneas **no vacías** tiene.\n",
     "codigo": "def guardar_y_contar(nombre_archivo, lineas):\n    pass\n",
     "prueba": "n = guardar_y_contar(\"prueba.txt\", [\"hola\", \"\", \"mundo\", \"  \", \"python\"])\nassert n == 3, f\"Debería haber 3 líneas no vacías y devolviste {n}\"\nwith open(\"prueba.txt\", encoding=\"utf-8\") as f:\n    assert f.read().splitlines() == [\"hola\", \"\", \"mundo\", \"  \", \"python\"], \"El archivo no contiene las líneas esperadas\"\n",
     "pista": "Escribe con `f.write(linea + \"\\n\")` dentro de un `for`. Para leer: `sum(1 for l in f if l.strip())`.\n",
     "solucion": "def guardar_y_contar(nombre_archivo, lineas):\n    with open(nombre_archivo, \"w\", encoding=\"utf-8\") as f:\n        for linea in lineas:\n            f.write(linea + \"\\n\")\n    with open(nombre_archivo, encoding=\"utf-8\") as f:\n        return sum(1 for l in f if l.strip())\n",
     "quiz": [
      {
       "q": "¿Qué pasa al abrir un archivo existente con modo \"w\"?",
       "options": [
        "Se añade al final",
        "Se borra su contenido y se escribe desde cero",
        "Da error"
       ],
       "answer": 1,
       "explain": ""
      },
      {
       "q": "¿Por qué usar with open(...)?",
       "options": [
        "Cierra el archivo automáticamente",
        "Es más rápido de escribir",
        "Permite abrir varios a la vez"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    },
    {
     "id": "generadores",
     "title": "Generadores e iteradores",
     "minutes": 6,
     "teoria": "Un **generador** produce valores **uno a uno**, bajo demanda, sin guardarlos todos en memoria. Se crea con una función que usa `yield` en lugar de `return`:\n\n```python\ndef cuenta_regresiva(n):\n    while n > 0:\n        yield n        # entrega un valor y se pausa aquí\n        n -= 1\n\nfor x in cuenta_regresiva(3):\n    print(x)          # 3, 2, 1\n```\n\n**Expresión generadora**: como una comprensión pero con paréntesis. No crea la lista:\n\n```python\ntotal = sum(x ** 2 for x in range(1_000_000))\n```\n\nÚtil para datos enormes, flujos infinitos o leer archivos grandes línea a línea. `next(gen)` pide el siguiente valor manualmente.\n\nFunciones del día a día que trabajan con iterables: `enumerate`, `zip`, `reversed`, `sorted`, `sum`, `any`, `all`, `min`, `max`.\n",
     "ejemplo": "def fibonacci():\n    a, b = 0, 1\n    while True:          # infinito, pero solo calcula lo que pidas\n        yield a\n        a, b = b, a + b\n\ngen = fibonacci()\nprint([next(gen) for _ in range(10)])\n\ndef leer_por_bloques(datos, tam):\n    for i in range(0, len(datos), tam):\n        yield datos[i:i + tam]\n\nfor bloque in leer_por_bloques(list(range(10)), 4):\n    print(bloque)\n",
     "ejercicio": "Escribe el generador `pares_hasta(n)` que produzca (con `yield`) los números pares desde 0 hasta n incluido.\n\nY la función `primeros_cuadrados(k)` que use una **expresión generadora** con `sum` para devolver la suma de los cuadrados de 1 a k.\n",
     "codigo": "def pares_hasta(n):\n    pass\n\ndef primeros_cuadrados(k):\n    pass\n",
     "prueba": "import types\ng = pares_hasta(10)\nassert isinstance(g, types.GeneratorType), \"pares_hasta debe ser un generador (usa yield)\"\nassert list(g) == [0, 2, 4, 6, 8, 10], \"pares_hasta(10) debe producir 0, 2, 4, 6, 8, 10\"\nassert list(pares_hasta(5)) == [0, 2, 4], \"pares_hasta(5) debe producir 0, 2, 4\"\nassert primeros_cuadrados(3) == 14, f\"1 + 4 + 9 = 14, y dio {primeros_cuadrados(3)}\"\nassert primeros_cuadrados(100) == 338350, \"Falla con k=100\"\n",
     "pista": "`for i in range(0, n + 1, 2): yield i` y `return sum(i ** 2 for i in range(1, k + 1))`.\n",
     "solucion": "def pares_hasta(n):\n    for i in range(0, n + 1, 2):\n        yield i\n\ndef primeros_cuadrados(k):\n    return sum(i ** 2 for i in range(1, k + 1))\n",
     "quiz": [
      {
       "q": "¿Qué diferencia a yield de return?",
       "options": [
        "yield entrega un valor y pausa la función, que puede continuar después",
        "Son iguales",
        "yield termina el programa"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    },
    {
     "id": "buenas_practicas",
     "title": "Estilo y buenas prácticas",
     "minutes": 5,
     "teoria": "Código que funciona no basta: tiene que ser **fácil de leer**. La guía oficial de estilo se llama **PEP 8**. Lo esencial:\n\n- 4 espacios de sangría. Líneas cortas (hasta unos 79 a 99 caracteres).\n- `snake_case` para variables y funciones, `CamelCase` para clases, `MAYUSCULAS` para constantes.\n- Nombres que expliquen: `precio_total` mejor que `pt` o `x`.\n- Funciones pequeñas que hagan **una sola cosa**.\n- No repitas código: si copias y pegas, probablemente necesitas una función o un bucle.\n\nIdioms pythónicos:\n\n```python\nif lista:                      # en vez de if len(lista) > 0:\nfor i, x in enumerate(lista):  # en vez de range(len(lista))\na, b = b, a                    # intercambio\nvalor = d.get(\"k\", 0)          # en vez de comprobar con if\ntexto = \", \".join(nombres)     # en vez de concatenar en un bucle\nwith open(...) as f:           # siempre para archivos\n```\n\nUn script típico se organiza así, para que el código solo se ejecute al lanzarlo directamente:\n\n```python\ndef main():\n    ...\n\nif __name__ == \"__main__\":\n    main()\n```\n\nEscribe `import this` en la zona libre para leer \"El Zen de Python\".\n",
     "ejemplo": "import this\n",
     "ejercicio": "Este código funciona pero es poco pythónico. **Reescribe** `procesar(nombres)` para que haga lo mismo (devolver los nombres de más de 3 letras, con formato título, unidos por `\", \"`) en **una o dos líneas**, usando una comprensión y `join`.\n",
     "codigo": "def procesar(nombres):\n    resultado = \"\"\n    for i in range(len(nombres)):\n        if len(nombres[i]) > 3:\n            if resultado != \"\":\n                resultado = resultado + \", \"\n            resultado = resultado + nombres[i].title()\n    return resultado + \"PENDIENTE DE MEJORAR\"\n",
     "prueba": "assert procesar([\"ana\", \"luisa\", \"bo\", \"MARTA\"]) == \"Luisa, Marta\", f\"dio {procesar(['ana', 'luisa', 'bo', 'MARTA'])!r}\"\nassert procesar([]) == \"\", \"Para una lista vacía debe devolver ''\"\ncodigo_f = procesar.__code__\ncuerpo = {l for *_, l in codigo_f.co_lines() if l and l != codigo_f.co_firstlineno}\nassert len(cuerpo) <= 2, f\"El cuerpo de la función tiene {len(cuerpo)} líneas; intenta dejarlo en 1 o 2\"\n",
     "pista": "`return \", \".join(n.title() for n in nombres if len(n) > 3)`\n",
     "solucion": "def procesar(nombres):\n    return \", \".join(n.title() for n in nombres if len(n) > 3)\n",
     "quiz": [
      {
       "q": "Según PEP 8, ¿cómo se nombra una función?",
       "options": [
        "calcular_total",
        "CalcularTotal",
        "CALCULAR_TOTAL"
       ],
       "answer": 0,
       "explain": ""
      }
     ]
    }
   ],
   "id": "m12"
  },
  {
   "title": "Proyectos finales",
   "icon": "🏆",
   "desc": "junta todo lo aprendido",
   "lessons": [
    {
     "id": "proyecto_texto",
     "title": "Proyecto 1: analizador de texto",
     "minutes": 12,
     "teoria": "Vas a construir una herramienta real que combina **strings, diccionarios, funciones y comprensiones**.\n\nDivide el problema en pasos pequeños (así se programa de verdad):\n\n1. Normalizar el texto: minúsculas y sin signos de puntuación.\n2. Obtener la lista de palabras.\n3. Calcular métricas: total de palabras, palabras únicas, la más larga, la más frecuente.\n4. Devolver todo en un diccionario.\n\n> 💡 Prueba cada paso por separado con `print()` antes de seguir con el siguiente. Si algo falla, sabrás exactamente dónde.\n",
     "ejemplo": "import string\nprint(string.punctuation)\ntexto = \"¡Hola! ¿Qué tal? Hola, hola.\"\nlimpio = \"\".join(c for c in texto.lower() if c not in string.punctuation + \"¿¡\")\nprint(limpio)\nprint(limpio.split())\n",
     "ejercicio": "Escribe `analizar(texto)` que devuelva un diccionario con:\n\n- `\"palabras\"`: número total de palabras\n- `\"unicas\"`: número de palabras distintas\n- `\"mas_larga\"`: la palabra más larga (si hay empate, la primera que aparece)\n- `\"mas_comun\"`: la palabra más frecuente (si hay empate, la primera que aparece)\n- `\"promedio\"`: longitud media de las palabras, con 2 decimales\n\nIgnora mayúsculas y los signos de `string.punctuation` más `¿¡`. Para un texto sin palabras devuelve `{\"palabras\": 0, \"unicas\": 0, \"mas_larga\": \"\", \"mas_comun\": \"\", \"promedio\": 0}`.\n",
     "codigo": "import string\n\ndef analizar(texto):\n    pass\n\nprint(analizar(\"El perro y el gato. ¡El perro corre!\"))\n",
     "prueba": "r = analizar(\"El perro y el gato. ¡El perro corre!\")\nesperado = {\"palabras\": 8, \"unicas\": 5, \"mas_larga\": \"perro\", \"mas_comun\": \"el\", \"promedio\": 3.25}\nassert r == esperado, f\"dio {r}\\nesperado {esperado}\"\nvacio = {\"palabras\": 0, \"unicas\": 0, \"mas_larga\": \"\", \"mas_comun\": \"\", \"promedio\": 0}\nassert analizar(\"\") == vacio, f\"Para texto vacío dio {analizar('')}\"\nassert analizar(\"¡¿...?!\") == vacio, \"Un texto solo con signos no tiene palabras\"\nr = analizar(\"sol luna sol luna mar\")\nassert r[\"mas_comun\"] == \"sol\", \"En empate debe ganar la primera que aparece\"\n",
     "pista": "Con `Counter(palabras).most_common(1)` los empates se resuelven por orden de aparición. Para la más larga: `max(palabras, key=len)` también devuelve la primera en caso de empate.\n",
     "solucion": "import string\nfrom collections import Counter\n\ndef analizar(texto):\n    signos = string.punctuation + \"¿¡\"\n    limpio = \"\".join(c for c in texto.lower() if c not in signos)\n    palabras = limpio.split()\n    if not palabras:\n        return {\"palabras\": 0, \"unicas\": 0, \"mas_larga\": \"\", \"mas_comun\": \"\", \"promedio\": 0}\n    return {\n        \"palabras\": len(palabras),\n        \"unicas\": len(set(palabras)),\n        \"mas_larga\": max(palabras, key=len),\n        \"mas_comun\": Counter(palabras).most_common(1)[0][0],\n        \"promedio\": round(sum(len(p) for p in palabras) / len(palabras), 2),\n    }\n\nprint(analizar(\"El perro y el gato. ¡El perro corre!\"))\n"
    },
    {
     "id": "proyecto_tareas",
     "title": "Proyecto 2: gestor de tareas",
     "minutes": 15,
     "teoria": "Ahora un programa con **clases**, **listas de objetos**, **errores** y **ordenación**: el corazón de cualquier app de productividad.\n\nDiseño:\n\n- `Tarea`: título, prioridad (1 alta a 3 baja) y si está hecha.\n- `GestorTareas`: guarda tareas y ofrece operaciones para añadir, completar, listar pendientes y calcular el progreso.\n\nPiensa primero en **qué** debe hacer cada método (sus entradas y su salida) y solo después en **cómo**.\n",
     "ejemplo": "from dataclasses import dataclass\n\n@dataclass\nclass Tarea:\n    titulo: str\n    prioridad: int = 2\n    hecha: bool = False\n\nt = Tarea(\"Estudiar Python\", 1)\nprint(t)\nt.hecha = True\nprint(t.hecha)\n",
     "ejercicio": "Completa `GestorTareas`:\n\n- `agregar(titulo, prioridad=2)`: crea una `Tarea` y la guarda. Lanza `ValueError` si el título está vacío, si la prioridad no es 1, 2 o 3, o si ya existe una tarea con ese título (sin distinguir mayúsculas).\n- `completar(titulo)`: marca como hecha la tarea con ese título (sin distinguir mayúsculas). Si no existe, lanza `KeyError`.\n- `pendientes()`: lista de **títulos** no hechos, ordenados por prioridad y luego alfabéticamente.\n- `progreso()`: porcentaje de tareas hechas, entero redondeado (0 si no hay tareas).\n",
     "codigo": "from dataclasses import dataclass\n\n@dataclass\nclass Tarea:\n    titulo: str\n    prioridad: int = 2\n    hecha: bool = False\n\nclass GestorTareas:\n    def __init__(self):\n        self.tareas = []\n\n    def agregar(self, titulo, prioridad=2):\n        pass\n\n    def completar(self, titulo):\n        pass\n\n    def pendientes(self):\n        pass\n\n    def progreso(self):\n        pass\n",
     "prueba": "g = GestorTareas()\nassert g.progreso() == 0, \"Sin tareas, el progreso es 0\"\ng.agregar(\"Comprar pan\", 3)\ng.agregar(\"Estudiar\", 1)\ng.agregar(\"Correr\")\ng.agregar(\"Banco\", 1)\nassert g.pendientes() == [\"Banco\", \"Estudiar\", \"Correr\", \"Comprar pan\"], f\"pendientes() dio {g.pendientes()}\"\ng.completar(\"estudiar\")\nassert g.pendientes() == [\"Banco\", \"Correr\", \"Comprar pan\"], f\"tras completar: {g.pendientes()}\"\nassert g.progreso() == 25, f\"progreso debería ser 25 y es {g.progreso()}\"\nfor args in [(\"\",), (\"   \",), (\"X\", 5), (\"ESTUDIAR\",)]:\n    try:\n        g.agregar(*args)\n    except ValueError:\n        pass\n    else:\n        raise AssertionError(f\"agregar{args} debería lanzar ValueError\")\ntry:\n    g.completar(\"No existe\")\nexcept KeyError:\n    pass\nelse:\n    raise AssertionError(\"completar de una tarea inexistente debe lanzar KeyError\")\ng.completar(\"Banco\")\ng.completar(\"Correr\")\nassert g.progreso() == 75, f\"progreso debería ser 75 y es {g.progreso()}\"\n",
     "pista": "Crea un método auxiliar `_buscar(titulo)` que recorra `self.tareas` comparando `t.titulo.lower() == titulo.lower()` y devuelva la tarea o `None`. Para ordenar: `sorted(pend, key=lambda t: (t.prioridad, t.titulo))`.\n",
     "solucion": "from dataclasses import dataclass\n\n@dataclass\nclass Tarea:\n    titulo: str\n    prioridad: int = 2\n    hecha: bool = False\n\nclass GestorTareas:\n    def __init__(self):\n        self.tareas = []\n\n    def _buscar(self, titulo):\n        for t in self.tareas:\n            if t.titulo.lower() == titulo.strip().lower():\n                return t\n        return None\n\n    def agregar(self, titulo, prioridad=2):\n        if not titulo.strip():\n            raise ValueError(\"Título vacío\")\n        if prioridad not in (1, 2, 3):\n            raise ValueError(\"Prioridad debe ser 1, 2 o 3\")\n        if self._buscar(titulo):\n            raise ValueError(\"La tarea ya existe\")\n        self.tareas.append(Tarea(titulo.strip(), prioridad))\n\n    def completar(self, titulo):\n        t = self._buscar(titulo)\n        if t is None:\n            raise KeyError(titulo)\n        t.hecha = True\n\n    def pendientes(self):\n        pend = [t for t in self.tareas if not t.hecha]\n        return [t.titulo for t in sorted(pend, key=lambda t: (t.prioridad, t.titulo))]\n\n    def progreso(self):\n        if not self.tareas:\n            return 0\n        hechas = sum(1 for t in self.tareas if t.hecha)\n        return round(hechas * 100 / len(self.tareas))\n"
    },
    {
     "id": "proyecto_juego",
     "title": "Proyecto 3: juego de adivinar",
     "minutes": 10,
     "teoria": "El clásico juego: la computadora piensa un número y tú lo adivinas con pistas \"mayor\" o \"menor\".\n\nPara que se pueda **probar automáticamente**, separamos la lógica de la interacción:\n\n- `pista(secreto, intento)` devuelve `\"mayor\"`, `\"menor\"` o `\"correcto\"`.\n- `jugar(secreto, intentos)` simula una partida con una lista de intentos y devuelve en qué intento se acertó (o `-1`).\n\nSeparar la lógica (funciones puras) de la entrada/salida (`input`, `print`) es una de las mejores costumbres que puedes tener: el código queda testeable y reutilizable. Debajo tienes la versión interactiva para jugar de verdad.\n",
     "ejemplo": "import random\n\nsecreto = random.randint(1, 100)\nintentos = 0\nprint(\"Pensé un número del 1 al 100\")\nwhile True:\n    texto = input(\"Tu intento (vacío para rendirte): \")\n    if not texto:\n        print(\"El número era\", secreto)\n        break\n    if not texto.isdigit():\n        print(\"Escribe un número\")\n        continue\n    intento = int(texto)\n    intentos += 1\n    if intento < secreto:\n        print(intento, \"→ es mayor\")\n    elif intento > secreto:\n        print(intento, \"→ es menor\")\n    else:\n        print(f\"¡Correcto en {intentos} intentos!\")\n        break\n",
     "ejercicio": "Escribe:\n\n1. `pista(secreto, intento)` → `\"mayor\"` si el secreto es mayor que el intento, `\"menor\"` si es menor, `\"correcto\"` si son iguales.\n2. `jugar(secreto, intentos)` → recorre la lista de intentos usando `pista` y devuelve el número de intento (empezando en 1) en que se acertó, o `-1` si nunca se acierta.\n3. `mejor_estrategia(minimo, maximo, secreto)` → adivina usando **búsqueda binaria** (prueba siempre el punto medio con `//`) y devuelve cuántos intentos necesitó. Para 1 a 100 nunca debe pasar de 7.\n",
     "codigo": "def pista(secreto, intento):\n    pass\n\ndef jugar(secreto, intentos):\n    pass\n\ndef mejor_estrategia(minimo, maximo, secreto):\n    pass\n",
     "prueba": "assert pista(50, 30) == \"mayor\" and pista(50, 70) == \"menor\" and pista(5, 5) == \"correcto\", \"pista() no es correcta\"\nassert jugar(42, [10, 80, 42, 50]) == 3, f\"jugar(42, [10, 80, 42, 50]) dio {jugar(42, [10, 80, 42, 50])}\"\nassert jugar(7, [1, 2, 3]) == -1, \"Si nunca acierta debe devolver -1\"\nassert jugar(7, [7]) == 1, \"Acertar a la primera es el intento 1\"\nassert mejor_estrategia(1, 100, 50) == 1, \"Para 50 en 1..100 el primer intento (50) acierta\"\nmaximo = max(mejor_estrategia(1, 100, s) for s in range(1, 101))\nassert maximo <= 7, f\"La búsqueda binaria no debería pasar de 7 intentos y llegó a {maximo}\"\nassert all(mejor_estrategia(1, 1000, s) <= 10 for s in range(1, 1001)), \"En 1..1000 no debería pasar de 10\"\n",
     "pista": "Búsqueda binaria: en un `while`, `medio = (minimo + maximo) // 2`, cuenta un intento, y según la pista mueve `minimo = medio + 1` o `maximo = medio - 1` hasta acertar.\n",
     "solucion": "def pista(secreto, intento):\n    if secreto > intento:\n        return \"mayor\"\n    if secreto < intento:\n        return \"menor\"\n    return \"correcto\"\n\ndef jugar(secreto, intentos):\n    for i, intento in enumerate(intentos, start=1):\n        if pista(secreto, intento) == \"correcto\":\n            return i\n    return -1\n\ndef mejor_estrategia(minimo, maximo, secreto):\n    intentos = 0\n    while True:\n        medio = (minimo + maximo) // 2\n        intentos += 1\n        p = pista(secreto, medio)\n        if p == \"correcto\":\n            return intentos\n        if p == \"mayor\":\n            minimo = medio + 1\n        else:\n            maximo = medio - 1\n"
    },
    {
     "id": "proyecto_inventario",
     "title": "Proyecto 4: inventario con reportes",
     "minutes": 15,
     "teoria": "El reto final simula una tarea típica de trabajo: procesar datos en **CSV**, calcular métricas y generar un **reporte**. Usarás archivos, diccionarios, ordenación, formato y manejo de errores.\n\nDatos de entrada (texto CSV):\n\n```\nproducto,categoria,precio,stock\nTeclado,perifericos,25.5,10\nMonitor,pantallas,180,3\n...\n```\n\nConsejo: `csv.DictReader` acepta cualquier iterable de líneas, así que puedes usar `texto.splitlines()` sin crear un archivo.\n",
     "ejemplo": "import csv\ndatos = \"\"\"producto,precio\nLápiz,0.5\nCuaderno,2.25\"\"\"\nfor fila in csv.DictReader(datos.splitlines()):\n    print(fila[\"producto\"], float(fila[\"precio\"]) * 2)\n",
     "ejercicio": "Escribe `reporte(texto_csv)` que devuelva un diccionario con:\n\n- `\"valor_total\"`: suma de precio × stock de todos los productos, redondeada a 2 decimales\n- `\"agotados\"`: lista ordenada alfabéticamente de productos con stock 0\n- `\"por_categoria\"`: diccionario categoría → valor (precio × stock) redondeado a 2 decimales\n- `\"top\"`: nombre del producto con más valor en inventario\n- `\"errores\"`: número de filas con datos no numéricos en precio o stock (esas filas se ignoran)\n",
     "codigo": "import csv\n\ndef reporte(texto_csv):\n    pass\n\nDATOS = \"\"\"producto,categoria,precio,stock\nTeclado,perifericos,25.5,10\nMonitor,pantallas,180,3\nRatón,perifericos,15,0\nWebcam,perifericos,45,2\nTablet,pantallas,abc,5\nCable,accesorios,3.99,100\"\"\"\n\nprint(reporte(DATOS))\n",
     "prueba": "r = reporte(DATOS)\nassert r[\"valor_total\"] == 1284.0, f\"valor_total: {r['valor_total']}\"\nassert r[\"agotados\"] == [\"Ratón\"], f\"agotados: {r['agotados']}\"\nassert r[\"por_categoria\"] == {\"perifericos\": 345.0, \"pantallas\": 540.0, \"accesorios\": 399.0}, f\"por_categoria: {r['por_categoria']}\"\nassert r[\"top\"] == \"Monitor\", f\"top: {r['top']}\"\nassert r[\"errores\"] == 1, f\"errores: {r['errores']}\"\nr2 = reporte(\"producto,categoria,precio,stock\\nA,x,1,1\\nB,x,dos,1\\nC,y,1,tres\")\nassert r2[\"errores\"] == 2 and r2[\"valor_total\"] == 1.0, f\"Con dos filas malas dio {r2}\"\n",
     "pista": "Recorre `csv.DictReader(texto_csv.splitlines())`. En un `try` convierte `float(fila[\"precio\"])` e `int(fila[\"stock\"])`; en `except ValueError` suma 1 a errores y `continue`. Guarda el valor de cada producto en un diccionario para calcular el `top` con `max(valores, key=valores.get)`.\n",
     "solucion": "import csv\n\ndef reporte(texto_csv):\n    total = 0\n    agotados = []\n    por_categoria = {}\n    valores = {}\n    errores = 0\n    for fila in csv.DictReader(texto_csv.splitlines()):\n        try:\n            precio = float(fila[\"precio\"])\n            stock = int(fila[\"stock\"])\n        except ValueError:\n            errores += 1\n            continue\n        valor = precio * stock\n        total += valor\n        valores[fila[\"producto\"]] = valor\n        cat = fila[\"categoria\"]\n        por_categoria[cat] = por_categoria.get(cat, 0) + valor\n        if stock == 0:\n            agotados.append(fila[\"producto\"])\n    return {\n        \"valor_total\": round(total, 2),\n        \"agotados\": sorted(agotados),\n        \"por_categoria\": {c: round(v, 2) for c, v in por_categoria.items()},\n        \"top\": max(valores, key=valores.get) if valores else None,\n        \"errores\": errores,\n    }\n\nDATOS = \"\"\"producto,categoria,precio,stock\nTeclado,perifericos,25.5,10\nMonitor,pantallas,180,3\nRatón,perifericos,15,0\nWebcam,perifericos,45,2\nTablet,pantallas,abc,5\nCable,accesorios,3.99,100\"\"\"\n\nprint(reporte(DATOS))\n"
    }
   ],
   "id": "m13"
  }
 ],
 "cheatsheet": [
  {
   "title": "Básicos",
   "md": "```python\nprint(\"Hola\", nombre, sep=\" \", end=\"\\n\")\nx = 10            # int\ny = 3.5           # float\ns = \"texto\"       # str\nok = True         # bool\nnada = None\ntype(x)  int(\"5\")  float(\"2.5\")  str(9)\ninput(\"Pregunta: \")   # siempre devuelve str\n```\n"
  },
  {
   "title": "Operadores",
   "md": "```python\n+  -  *  /  //  %  **        # aritméticos\n==  !=  <  >  <=  >=         # comparación\nand  or  not  in  is         # lógicos y pertenencia\nx += 1   x -= 1   x *= 2     # asignación compuesta\n```\n"
  },
  {
   "title": "Strings",
   "md": "```python\nf\"{nombre} tiene {edad} años\"   f\"{precio:,.2f}\"   f\"{0.25:.0%}\"\ns.upper() s.lower() s.title() s.strip()\ns.replace(\"a\", \"b\")   s.split(\",\")   \", \".join(lista)\ns.startswith(\"x\")  s.endswith(\"x\")  s.find(\"x\")  s.count(\"x\")\ns[0]  s[-1]  s[1:4]  s[::-1]   len(s)   \"py\" in s\n```\n"
  },
  {
   "title": "Condicionales",
   "md": "```python\nif x > 0:\n    ...\nelif x == 0:\n    ...\nelse:\n    ...\nestado = \"par\" if n % 2 == 0 else \"impar\"\nmatch comando:\n    case \"a\" | \"b\": ...\n    case _: ...\n```\n"
  },
  {
   "title": "Bucles",
   "md": "```python\nfor i in range(5):            # 0..4\nfor i in range(2, 10, 2):     # 2, 4, 6, 8\nfor x in lista:\nfor i, x in enumerate(lista):\nfor a, b in zip(lista1, lista2):\nfor k, v in diccionario.items():\nwhile condicion:\nbreak      continue\n```\n"
  },
  {
   "title": "Listas",
   "md": "```python\nl = [1, 2, 3]\nl.append(4)  l.insert(0, x)  l.extend(otra)\nl.pop()  l.pop(i)  l.remove(x)  l.index(x)  l.count(x)\nl.sort(reverse=True)   sorted(l, key=len)   l.copy()\nsum(l)  max(l)  min(l)  len(l)\n[x * 2 for x in l if x > 1]\nany(x > 2 for x in l)   all(...)\n```\n"
  },
  {
   "title": "Tuplas, dicts y sets",
   "md": "```python\nt = (1, 2)          a, b = t        a, b = b, a\nd = {\"k\": 1}        d[\"k\"]          d.get(\"k\", 0)\nd[\"nuevo\"] = 2      del d[\"k\"]      \"k\" in d\nd.keys()  d.values()  d.items()     d.update(otro)\n{k: v for k, v in pares}\ns = {1, 2}   s.add(3)   a | b   a & b   a - b   a ^ b\n```\n"
  },
  {
   "title": "Funciones",
   "md": "```python\ndef f(a, b=2, *args, **kwargs):\n    \"\"\"Docstring.\"\"\"\n    return a + b\n\nf(1)  f(1, 3)  f(b=5, a=1)  f(*lista)  f(**dic)\ncuadrado = lambda x: x ** 2\nsorted(datos, key=lambda d: (-d[\"pts\"], d[\"nombre\"]))\n```\n"
  },
  {
   "title": "Errores",
   "md": "```python\ntry:\n    ...\nexcept ValueError as e:\n    print(e)\nexcept (KeyError, IndexError):\n    ...\nelse:\n    ...       # si no hubo error\nfinally:\n    ...       # siempre\nraise ValueError(\"mensaje\")\n```\n"
  },
  {
   "title": "Clases",
   "md": "```python\nclass Animal:\n    def __init__(self, nombre):\n        self.nombre = nombre\n    def __str__(self):\n        return self.nombre\n\nclass Gato(Animal):\n    def __init__(self, nombre, color):\n        super().__init__(nombre)\n        self.color = color\n\nfrom dataclasses import dataclass\n@dataclass\nclass Punto:\n    x: float\n    y: float = 0\n```\n"
  },
  {
   "title": "Archivos y módulos",
   "md": "```python\nwith open(\"a.txt\", \"w\", encoding=\"utf-8\") as f:\n    f.write(\"hola\\n\")\nwith open(\"a.txt\", encoding=\"utf-8\") as f:\n    for linea in f: ...\n\nimport math, random, json, csv\nfrom collections import Counter, defaultdict\nfrom datetime import date, datetime\njson.dumps(obj)  json.loads(texto)\nCounter(lista).most_common(3)\n```\n"
  }
 ]
};
window.PY_RUNNER = "# Motor que ejecuta el codigo del alumno y las pruebas automaticas.\n# Se usa igual en el navegador (Pyodide) y en tools/build.py para validar las soluciones.\nimport sys\nimport io\nimport time\n\n_FILE = \"<tu código>\"\n_MAX_OUT = 20000\n\n_PISTAS = {\n    \"NameError\": \"Usaste un nombre que Python no conoce. ¿Está bien escrito? ¿Lo creaste antes de usarlo? Si era un texto, ¿le pusiste comillas?\",\n    \"SyntaxError\": \"Python no entiende la estructura de esa línea. Revisa paréntesis y comillas sin cerrar, y los dos puntos (:) al final de if, for, while, def y class.\",\n    \"IndentationError\": \"La sangría (los espacios al inicio de la línea) no cuadra. Dentro de un bloque usa siempre 4 espacios.\",\n    \"TabError\": \"Mezclaste tabuladores y espacios. Usa solo espacios (4 por nivel).\",\n    \"TypeError\": \"Estás combinando tipos que no encajan (por ejemplo texto + número) o llamando a una función con argumentos de más o de menos. Convierte con str(), int() o float() si hace falta.\",\n    \"ZeroDivisionError\": \"No se puede dividir entre cero. Comprueba el divisor antes de dividir.\",\n    \"IndexError\": \"Pediste una posición que no existe. Los índices empiezan en 0 y el último es len(x) - 1.\",\n    \"KeyError\": \"Esa clave no existe en el diccionario. Comprueba con 'in' o usa .get(clave, valor_por_defecto).\",\n    \"ValueError\": \"El tipo es correcto pero el valor no sirve, por ejemplo int('hola').\",\n    \"AttributeError\": \"Ese objeto no tiene ese método o atributo. Revisa el nombre y de qué tipo es el objeto.\",\n    \"TimeoutError\": \"Tu código tardó demasiado. ¿Hay un bucle infinito? Asegúrate de que la condición del while llegue a ser falsa.\",\n    \"RecursionError\": \"Una función se llama a sí misma sin parar. Revisa el caso base.\",\n    \"UnboundLocalError\": \"Asignas una variable dentro de la función y también la lees antes. Pásala como parámetro o devuélvela con return.\",\n    \"ModuleNotFoundError\": \"Ese módulo no está disponible aquí. Revisa el nombre del import.\",\n    \"FileNotFoundError\": \"El archivo no existe. Revisa el nombre o créalo antes con open(nombre, 'w').\",\n}\n\n\ndef _info_error(e, archivo):\n    nombre = type(e).__name__\n    linea = None\n    if isinstance(e, SyntaxError):\n        if e.filename == archivo:\n            linea = e.lineno\n        mensaje = f\"{nombre}: {e.msg}\"\n    else:\n        tb = e.__traceback__\n        while tb is not None:\n            if tb.tb_frame.f_code.co_filename == archivo:\n                linea = tb.tb_lineno\n            tb = tb.tb_next\n        texto = str(e)\n        mensaje = f\"{nombre}: {texto}\" if texto else nombre\n    return {\"type\": nombre, \"line\": linea, \"message\": mensaje, \"hint\": _PISTAS.get(nombre, \"\")}\n\n\ndef run_code(code, test=None, timeout=5.0):\n    \"\"\"Ejecuta code. Si hay test, lo ejecuta despues en el mismo espacio de nombres.\n\n    status: ok | error | pass | fail\n    \"\"\"\n    resultado = {\"status\": \"ok\", \"output\": \"\", \"error\": None, \"fail\": None}\n    ns = {\"__name__\": \"__main__\"}\n    buf = io.StringIO()\n    viejo_out, viejo_err = sys.stdout, sys.stderr\n    inicio = [time.time()]\n    contador = [0]\n\n    def tracer(frame, event, arg):\n        contador[0] += 1\n        if (contador[0] & 1023) == 0 and time.time() - inicio[0] > timeout:\n            raise TimeoutError(f\"se superó el límite de {timeout:.0f} segundos\")\n        return tracer\n\n    sys.stdout = sys.stderr = buf\n    try:\n        compilado = compile(code, _FILE, \"exec\")\n        sys.settrace(tracer)\n        try:\n            exec(compilado, ns)\n        finally:\n            sys.settrace(None)\n    except BaseException as e:  # tambien SystemExit / KeyboardInterrupt del alumno\n        resultado[\"status\"] = \"error\"\n        resultado[\"error\"] = _info_error(e, _FILE)\n    finally:\n        sys.stdout, sys.stderr = viejo_out, viejo_err\n\n    salida = buf.getvalue()\n    if len(salida) > _MAX_OUT:\n        salida = salida[:_MAX_OUT] + \"\\n… (salida recortada)\"\n    resultado[\"output\"] = salida\n\n    if test and resultado[\"status\"] == \"ok\":\n        ns[\"salida\"] = buf.getvalue()\n        sys.stdout = sys.stderr = io.StringIO()\n        inicio[0] = time.time()\n        try:\n            sys.settrace(tracer)\n            try:\n                exec(compile(test, \"<prueba>\", \"exec\"), ns)\n            finally:\n                sys.settrace(None)\n            resultado[\"status\"] = \"pass\"\n        except AssertionError as e:\n            resultado[\"status\"] = \"fail\"\n            resultado[\"fail\"] = str(e) or \"El resultado no es el esperado.\"\n        except BaseException as e:\n            info = _info_error(e, _FILE)\n            resultado[\"status\"] = \"fail\"\n            donde = f\" (línea {info['line']} de tu código)\" if info[\"line\"] else \"\"\n            resultado[\"fail\"] = f\"Al probar tu código ocurrió {info['message']}{donde}.\"\n        finally:\n            sys.stdout, sys.stderr = viejo_out, viejo_err\n    return resultado\n";
