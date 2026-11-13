@modulo Primeros pasos | 🚀 | print, variables, tipos y operaciones

@leccion hola | Hola, Python | 4
::teoria
Python ejecuta tu código **de arriba hacia abajo, línea por línea**. La primera herramienta que necesitas es `print()`, que muestra algo en pantalla.

```python
print("Hola, mundo")
print(2 + 3)
print("Tengo", 25, "años")   # varios valores separados por comas
```

- El texto va entre comillas: `"así"` o `'así'`.
- Los números van sin comillas.
- Todo lo que va después de `#` es un **comentario**: Python lo ignora. Sirve para explicar tu código.

> 💡 Cómo usar este curso: lee la teoría (corta), ejecuta el ejemplo, cámbialo y rómpelo a propósito. Después resuelve el reto. Aprender programando es mucho más rápido que solo leyendo.
::ejemplo
# Pulsa ▶ Ejecutar. Luego cambia los textos y vuelve a ejecutar.
print("Hola, mundo")
print("Python es fácil de leer")
print(10 * 3)
print("El resultado es", 7 + 8)
::ejercicio
Haz que tu programa imprima **exactamente** estas dos líneas:

```
Hola, mundo
Estoy aprendiendo Python
```
::codigo
# Escribe tus dos print() aquí

::prueba
lineas = salida.strip().splitlines()
assert len(lineas) >= 2, "Deben salir al menos 2 líneas. ¿Usaste dos print()?"
assert lineas[0].strip() == "Hola, mundo", f"La primera línea debe ser 'Hola, mundo' y salió {lineas[0]!r}"
assert lineas[1].strip() == "Estoy aprendiendo Python", f"La segunda línea debe ser 'Estoy aprendiendo Python' y salió {lineas[1]!r}"
::pista
Cada `print()` imprime una línea. Fíjate en mayúsculas, comas y que el texto vaya entre comillas.
::solucion
print("Hola, mundo")
print("Estoy aprendiendo Python")
::quiz
? ¿Qué hace Python con una línea que empieza con #?
- La imprime en pantalla
* La ignora: es un comentario
- Da un error
= Los comentarios son notas para las personas; Python no los ejecuta.
? ¿Qué imprime print("2 + 3")?
* 2 + 3
- 5
- Un error
= Entre comillas es texto, así que se imprime tal cual. Sin comillas, print(2 + 3) imprimiría 5.

@leccion variables | Variables y tipos | 6
::teoria
Una **variable** es un nombre que guarda un valor. Se crea con `=`:

```python
nombre = "Ana"      # str  (texto)
edad = 30           # int  (número entero)
altura = 1.68       # float (número decimal)
es_estudiante = True  # bool (True o False)
```

Puedes cambiar su valor cuando quieras: `edad = 31`. Para saber el tipo de un valor usa `type()`:

```python
print(type(edad))   # <class 'int'>
```

**Reglas para nombres:** letras, números y `_`, sin empezar por número ni usar espacios. La costumbre en Python es `snake_case`: `precio_total`, `nombre_usuario`. Mayúsculas y minúsculas son distintas: `Edad` y `edad` son dos variables diferentes.

| Tipo | Ejemplo | Para qué |
|---|---|---|
| `int` | `42`, `-7` | contar, enteros |
| `float` | `3.14`, `2.0` | decimales |
| `str` | `"hola"` | texto |
| `bool` | `True`, `False` | sí / no |
::ejemplo
ciudad = "Lima"
habitantes = 10_000_000   # el _ solo ayuda a leer números grandes
temperatura = 18.5
llueve = False

print(ciudad, habitantes, temperatura, llueve)
print(type(ciudad), type(habitantes), type(temperatura), type(llueve))

temperatura = 21.0   # reasignar
print("Ahora hace", temperatura, "grados")
::ejercicio
Crea estas cuatro variables con valores **de tu elección**, respetando el tipo:

- `nombre`: un texto
- `edad`: un número entero
- `altura`: un número decimal (por ejemplo `1.75`)
- `programador`: `True`
::codigo
# Crea aquí tus variables

::prueba
for v in ("nombre", "edad", "altura", "programador"):
    assert v in dir(), f"No encuentro la variable '{v}'. Revisa que esté bien escrita."
assert isinstance(nombre, str), "nombre debe ser texto (entre comillas)"
assert type(edad) is int, "edad debe ser un entero, sin comillas ni decimales"
assert type(altura) is float, "altura debe tener decimales, como 1.75"
assert programador is True, "programador debe valer True (con T mayúscula, sin comillas)"
::pista
`True` se escribe con T mayúscula y sin comillas. Si escribes `"30"` con comillas, es texto, no un número.
::solucion
nombre = "Ana"
edad = 30
altura = 1.68
programador = True
::quiz
? ¿De qué tipo es el valor "25"?
- int
- float
* str
= Las comillas lo convierten en texto, aunque contenga dígitos.
? ¿Cuál de estos nombres de variable es válido?
- 2precio
- precio total
* precio_total
= No pueden empezar con número ni tener espacios.

@leccion operaciones | Operaciones con números | 6
::teoria
| Operador | Significado | Ejemplo | Resultado |
|---|---|---|---|
| `+` `-` `*` | suma, resta, multiplicación | `7 * 3` | `21` |
| `/` | división (siempre da float) | `7 / 2` | `3.5` |
| `//` | división entera | `7 // 2` | `3` |
| `%` | resto (módulo) | `7 % 2` | `1` |
| `**` | potencia | `2 ** 3` | `8` |

Se respeta el orden matemático: primero `**`, luego `* / // %`, luego `+ -`. Usa paréntesis para dejarlo claro: `(2 + 3) * 4`.

**Atajos de asignación:** `x += 1` equivale a `x = x + 1`. También existen `-=`, `*=`, `/=`.

Funciones útiles: `abs(-5)` da `5`, `round(3.14159, 2)` da `3.14`, `max(3, 9, 2)` da `9`, `min(...)`.

> 💡 `%` es muy útil: `n % 2 == 0` te dice si un número es par.
::ejemplo
print(17 / 5)    # 3.4
print(17 // 5)   # 3  (cuántas veces cabe)
print(17 % 5)    # 2  (lo que sobra)
print(2 ** 10)   # 1024

saldo = 100
saldo -= 30
saldo *= 2
print("Saldo:", saldo)
print(round(10 / 3, 2))
::ejercicio
Tienes `segundos = 3725`. Calcula usando `//` y `%`:

- `horas`: horas completas (3600 segundos cada una)
- `minutos`: minutos completos que sobran
- `resto`: segundos que sobran al final

Para 3725 el resultado es 1 hora, 2 minutos y 5 segundos.
::codigo
segundos = 3725

horas = 0
minutos = 0
resto = 0

print(horas, "h", minutos, "min", resto, "s")
::prueba
assert horas == 1, f"horas debería ser 1, pero vale {horas}"
assert minutos == 2, f"minutos debería ser 2, pero vale {minutos}"
assert resto == 5, f"resto debería ser 5, pero vale {resto}"
::pista
`horas = segundos // 3600`. Lo que sobra es `segundos % 3600`; de eso, `// 60` son los minutos y `% 60` los segundos.
::solucion
segundos = 3725

horas = segundos // 3600
minutos = (segundos % 3600) // 60
resto = segundos % 60

print(horas, "h", minutos, "min", resto, "s")
::quiz
? ¿Cuánto vale 10 // 3?
- 3.33
* 3
- 1
= // es división entera: descarta la parte decimal.
? ¿Cuánto vale 10 % 3?
* 1
- 3
- 0
= 3 cabe 3 veces en 10 (9) y sobra 1.
? ¿Qué hace x += 5?
- Compara x con 5
* Suma 5 al valor de x y lo guarda en x
- Crea una variable llamada x+5

@leccion textos | Textos (strings) | 6
::teoria
Los textos se llaman **strings** (`str`). Algunas operaciones:

```python
saludo = "Hola" + " " + "Ana"   # concatenar: "Hola Ana"
risa = "ja" * 3                   # repetir: "jajaja"
len("Python")                     # longitud: 6
```

**No puedes sumar texto y número directamente.** Convierte primero:

```python
edad = 30
print("Tengo " + str(edad) + " años")   # str() pasa a texto
```

Al revés, para hacer cálculos con un texto que contiene un número:

| Función | Convierte a | Ejemplo |
|---|---|---|
| `int("42")` | entero | `42` |
| `float("3.5")` | decimal | `3.5` |
| `str(99)` | texto | `"99"` |

Para textos con varias líneas usa triple comilla `"""..."""`. Dentro de un texto, `\n` es un salto de línea.
::ejemplo
nombre = "Python"
print(len(nombre))
print(nombre + "!" * 3)

precio_texto = "19.99"
precio = float(precio_texto)
print(precio * 2)

print("Línea 1\nLínea 2")
print(str(2024) + " es un año")
::ejercicio
Llegan datos como texto desde un formulario: `precio = "12.50"` y `cantidad = "4"`.

1. Calcula `total` como número (precio × cantidad).
2. Crea `mensaje` con el texto exacto `Total: 50.0` usando concatenación y `str()`.
3. Imprime `mensaje`.
::codigo
precio = "12.50"
cantidad = "4"

total = 0
mensaje = ""
print(mensaje)
::prueba
assert isinstance(total, (int, float)), "total debe ser un número, no texto. Usa float() e int()."
assert total == 50.0, f"total debería valer 50.0 y vale {total!r}"
assert mensaje == "Total: 50.0", f"mensaje debe ser exactamente 'Total: 50.0' y es {mensaje!r}"
assert "Total: 50.0" in salida, "Falta imprimir el mensaje"
::pista
`total = float(precio) * int(cantidad)`. Luego `mensaje = "Total: " + str(total)`.
::solucion
precio = "12.50"
cantidad = "4"

total = float(precio) * int(cantidad)
mensaje = "Total: " + str(total)
print(mensaje)
::quiz
? ¿Qué produce "5" + "5"?
- 10
* "55"
- Un error
= Con textos, + concatena.
? ¿Qué pasa con "Edad: " + 30?
- Imprime Edad: 30
* Da TypeError: no se puede sumar str e int
- Convierte 30 a texto automáticamente
= Hay que convertir con str(30) o usar un f-string.

@leccion fstrings | f-strings e input() | 6
::teoria
La forma moderna y más cómoda de mezclar texto y valores es el **f-string**: pon una `f` antes de las comillas y escribe las variables entre llaves.

```python
nombre = "Ana"
edad = 30
print(f"Hola {nombre}, el año que viene tendrás {edad + 1} años")
```

Dentro de `{}` puedes poner cualquier expresión: `{precio * 1.21}`, `{nombre.upper()}`.

**Pedir datos al usuario** con `input()`. Siempre devuelve **texto**, así que convierte si necesitas un número:

```python
nombre = input("¿Cómo te llamas? ")
edad = int(input("¿Edad? "))
```

> 💡 Aquí `input()` abre una ventanita del navegador. En los retos usaremos variables fijas para que se puedan comprobar automáticamente.
::ejemplo
nombre = input("¿Cómo te llamas? ")
anio = int(input("¿En qué año naciste? "))
print(f"Hola {nombre}. En 2030 tendrás unos {2030 - anio} años.")
::ejercicio
Con las variables dadas, imprime usando un **f-string** exactamente:

```
Hola Lucía, el año que viene tendrás 29 años
```

(el 29 debe calcularse a partir de `edad`, no escribirse a mano)
::codigo
nombre = "Lucía"
edad = 28

::prueba
assert salida.strip() == "Hola Lucía, el año que viene tendrás 29 años", f"Salió {salida.strip()!r}"
::pista
`print(f"Hola {nombre}, el año que viene tendrás {edad + 1} años")`
::solucion
nombre = "Lucía"
edad = 28
print(f"Hola {nombre}, el año que viene tendrás {edad + 1} años")
::quiz
? ¿Qué tipo devuelve siempre input()?
- int
* str
- Depende de lo que escriba el usuario
= Siempre texto. Para números usa int() o float().
? ¿Qué imprime print(f"{2 * 5} manzanas")?
* 10 manzanas
- {2 * 5} manzanas
- 2 * 5 manzanas

@modulo Textos a fondo | 🔤 | formato, métodos y cortes de strings

@leccion formato | Formatear números | 5
::teoria
Dentro de las llaves de un f-string puedes indicar **cómo** mostrar un valor con `:`.

| Formato | Ejemplo | Resultado |
|---|---|---|
| `.2f` | `f"{3.14159:.2f}"` | `3.14` |
| `,` | `f"{1234567:,}"` | `1,234,567` |
| `,.2f` | `f"{1234.5:,.2f}"` | `1,234.50` |
| `%` | `f"{0.256:.1%}"` | `25.6%` |
| `>8` | `f"{'hola':>8}"` | `    hola` (derecha) |
| `<8` / `^8` | izquierda / centrado | |
| `03d` | `f"{7:03d}"` | `007` |

Truco para depurar: `f"{x=}"` imprime el nombre y el valor, por ejemplo `x=5`.
::ejemplo
precio = 1234.5678
print(f"Precio: ${precio:,.2f}")
print(f"Descuento: {0.15:.0%}")
for producto, valor in [("Café", 2.5), ("Tarta", 4.75)]:
    print(f"{producto:<10}{valor:>8.2f}")
x = 42
print(f"{x=}")
::ejercicio
Con `precio = 1499.9` y `iva = 0.21`:

- Calcula `total = precio * (1 + iva)`.
- Imprime exactamente: `Total con IVA (21%): 1,814.88`

Usa formato para el porcentaje (`.0%`) y para el total (`,.2f`).
::codigo
precio = 1499.9
iva = 0.21

::prueba
assert abs(total - 1814.879) < 0.01, "total no es correcto"
assert salida.strip() == "Total con IVA (21%): 1,814.88", f"Salió {salida.strip()!r}"
::pista
`print(f"Total con IVA ({iva:.0%}): {total:,.2f}")`
::solucion
precio = 1499.9
iva = 0.21
total = precio * (1 + iva)
print(f"Total con IVA ({iva:.0%}): {total:,.2f}")
::quiz
? ¿Qué imprime f"{2/3:.2f}"?
- 0.6
* 0.67
- 0.66
= Redondea a 2 decimales.

@leccion metodos_str | Métodos de texto | 7
::teoria
Los strings traen funciones propias (métodos) que se usan con punto: `texto.metodo()`. **Nunca modifican el original**: devuelven un texto nuevo.

| Método | Qué hace | Ejemplo → resultado |
|---|---|---|
| `.upper()` / `.lower()` | mayúsculas / minúsculas | `"Hola".upper()` → `"HOLA"` |
| `.capitalize()` / `.title()` | primera letra / cada palabra | `"ana gil".title()` → `"Ana Gil"` |
| `.strip()` | quita espacios en los extremos | `"  hi ".strip()` → `"hi"` |
| `.replace(a, b)` | reemplaza | `"gato".replace("g", "p")` → `"pato"` |
| `.split(sep)` | corta en una lista | `"a,b,c".split(",")` → `['a','b','c']` |
| `sep.join(lista)` | une una lista | `"-".join(['a','b'])` → `"a-b"` |
| `.count(x)` | cuenta apariciones | `"banana".count("a")` → `3` |
| `.find(x)` | posición (o -1) | `"hola".find("l")` → `2` |
| `.startswith(x)` / `.endswith(x)` | ¿empieza/termina con? | `True` / `False` |

`.split()` sin argumentos corta por cualquier espacio, ideal para contar palabras. Los métodos se pueden encadenar: `texto.strip().lower()`.

Para saber si algo está dentro de un texto usa `in`: `"py" in "python"` → `True`.
::ejemplo
frase = "   Python es GENIAL y Python es fácil   "
limpia = frase.strip().lower()
print(limpia)
print(limpia.count("python"))
palabras = limpia.split()
print(palabras, len(palabras))
print(" | ".join(palabras))
print(limpia.replace("python", "🐍"))
print("genial" in limpia)
::ejercicio
Tienes `entrada = "   mARía   lóPEZ  "`. Crea:

- `nombre_limpio`: sin espacios en los extremos y con formato título → `"María López"`
- `usuario`: en minúsculas, con `.` en lugar del espacio → `"maría.lópez"`
- `iniciales`: `"ML"`
::codigo
entrada = "   mARía   lóPEZ  "

nombre_limpio = ""
usuario = ""
iniciales = ""
::prueba
assert nombre_limpio == "María López", f"nombre_limpio es {nombre_limpio!r}"
assert usuario == "maría.lópez", f"usuario es {usuario!r}"
assert iniciales == "ML", f"iniciales es {iniciales!r}"
::pista
Ojo: entre las palabras hay varios espacios. `entrada.split()` te da `['mARía', 'lóPEZ']` sin espacios. Luego `" ".join(...)`, `.title()`, y `palabras[0][0]` es la primera letra.
::solucion
entrada = "   mARía   lóPEZ  "
partes = entrada.split()
nombre_limpio = " ".join(partes).title()
usuario = ".".join(partes).lower()
iniciales = partes[0][0].upper() + partes[1][0].upper()
::quiz
? Si s = "hola", ¿qué vale s después de s.upper()?
* "hola" (los métodos no cambian el original)
- "HOLA"
- None
= Debes guardar el resultado: s = s.upper().
? ¿Qué devuelve "a b  c".split()?
- ['a', 'b', '', 'c']
* ['a', 'b', 'c']
- "abc"

@leccion slicing | Índices y cortes | 6
::teoria
Cada carácter tiene una posición (**índice**) que empieza en **0**. Los índices negativos cuentan desde el final.

```
 P  y  t  h  o  n
 0  1  2  3  4  5
-6 -5 -4 -3 -2 -1
```

```python
s = "Python"
s[0]     # 'P'
s[-1]    # 'n'  (el último)
s[0:3]   # 'Pyt' (del 0 al 3, SIN incluir el 3)
s[2:]    # 'thon' (desde el 2 hasta el final)
s[:2]    # 'Py'
s[::2]   # 'Pto' (de 2 en 2)
s[::-1]  # 'nohtyP' (al revés)
```

La regla de oro del corte `[inicio:fin:paso]`: incluye `inicio`, **excluye** `fin`. Esto mismo funciona con listas, como verás pronto.

Los strings son **inmutables**: `s[0] = "J"` da error. Crea uno nuevo: `"J" + s[1:]`.
::ejemplo
s = "Programar"
print(s[0], s[-1])
print(s[:3])
print(s[3:])
print(s[::-1])
print(s[1:-1])
email = "ana@correo.com"
arroba = email.find("@")
print("Usuario:", email[:arroba], "Dominio:", email[arroba + 1:])
::ejercicio
Con `palabra = "reconocer"` crea:

- `primeras`: las 3 primeras letras
- `ultima`: la última letra (usa índice negativo)
- `al_reves`: la palabra invertida
- `es_palindromo`: `True` si se lee igual al revés (compara con `==`)
::codigo
palabra = "reconocer"

::prueba
assert primeras == "rec", f"primeras es {primeras!r}"
assert ultima == "r", f"ultima es {ultima!r}"
assert al_reves == "reconocer", f"al_reves es {al_reves!r}"
assert es_palindromo is True, "es_palindromo debería ser True"
::pista
`palabra[:3]`, `palabra[-1]`, `palabra[::-1]` y `palabra == al_reves`.
::solucion
palabra = "reconocer"
primeras = palabra[:3]
ultima = palabra[-1]
al_reves = palabra[::-1]
es_palindromo = palabra == al_reves
::quiz
? Si s = "abcdef", ¿qué es s[1:4]?
- "abcd"
* "bcd"
- "bcde"
= Empieza en 1 e incluye hasta 3 (el 4 queda fuera).
? ¿Qué es s[-2] para s = "hola"?
- "o"
* "l"
- "a"

@modulo Funciones | 🧩 | crea tus propias herramientas reutilizables

@leccion funciones | Definir funciones | 7
::teoria
Una **función** es un bloque de código con nombre que puedes reutilizar. Se define con `def`, recibe **parámetros** y devuelve un resultado con `return`.

```python
def area_rectangulo(base, altura):
    resultado = base * altura
    return resultado

a = area_rectangulo(3, 4)   # llamar a la función
print(a)                    # 12
```

Claves:

- La línea de `def` termina en **dos puntos** `:`.
- El cuerpo va **sangrado con 4 espacios**. La sangría define qué pertenece a la función.
- `return` termina la función y entrega el valor. Sin `return` la función devuelve `None`.

**`return` no es lo mismo que `print`.** `print` solo muestra; `return` entrega el valor para que lo uses después (sumarlo, guardarlo, compararlo). En casi todos los retos tus funciones deben usar `return`.

> 💡 A partir de aquí casi todos los retos piden una función. Así se puede probar tu código con muchos casos distintos.
::ejemplo
def saludar(nombre):
    return f"¡Hola, {nombre}!"

def celsius_a_fahrenheit(c):
    return c * 9 / 5 + 32

print(saludar("Ana"))
print(saludar("Luis"))
print(celsius_a_fahrenheit(100))
temperatura = celsius_a_fahrenheit(25)
print(f"25 °C son {temperatura} °F")
::ejercicio
Escribe la función `precio_final(precio, descuento)` que devuelva el precio tras aplicar un descuento en porcentaje.

- `precio_final(100, 20)` → `80.0`
- `precio_final(50, 10)` → `45.0`
::codigo
def precio_final(precio, descuento):
    # tu código aquí
    pass

print(precio_final(100, 20))
::prueba
assert "precio_final" in dir(), "No encuentro la función precio_final"
r = precio_final(100, 20)
assert r is not None, "La función devuelve None. ¿Olvidaste el return?"
assert abs(r - 80) < 1e-9, f"precio_final(100, 20) debería ser 80 y dio {r}"
assert abs(precio_final(50, 10) - 45) < 1e-9, "precio_final(50, 10) debería ser 45"
assert abs(precio_final(200, 0) - 200) < 1e-9, "Con descuento 0 el precio no cambia"
::pista
El descuento en dinero es `precio * descuento / 100`. Devuelve `precio - eso`.
::solucion
def precio_final(precio, descuento):
    return precio - precio * descuento / 100

print(precio_final(100, 20))
::quiz
? ¿Qué devuelve una función que no tiene return?
- 0
- ""
* None
? ¿Qué define qué líneas pertenecen a una función?
- Las llaves { }
* La sangría (los espacios al inicio)
- La palabra end

@leccion parametros | Parámetros con valor por defecto | 6
::teoria
Un parámetro puede tener un **valor por defecto**, que se usa si no lo pasas:

```python
def saludar(nombre, saludo="Hola"):
    return f"{saludo}, {nombre}"

saludar("Ana")              # 'Hola, Ana'
saludar("Ana", "Buenas")    # 'Buenas, Ana'
saludar(saludo="Hey", nombre="Leo")  # argumentos por nombre, en cualquier orden
```

Los parámetros con valor por defecto van **después** de los obligatorios.

Una función puede devolver **varios valores** separándolos por comas, y los recibes igual:

```python
def min_max(a, b, c):
    return min(a, b, c), max(a, b, c)

menor, mayor = min_max(4, 9, 1)
```

Documenta tus funciones con un texto entre triples comillas justo debajo del `def` (docstring).
::ejemplo
def potencia(base, exponente=2):
    """Eleva base a exponente (por defecto, al cuadrado)."""
    return base ** exponente

print(potencia(5))
print(potencia(2, 10))
print(potencia(exponente=3, base=2))

def dividir(a, b):
    return a // b, a % b

cociente, resto = dividir(17, 5)
print(cociente, resto)
::ejercicio
Escribe `formatear_precio(cantidad, moneda="€", decimales=2)` que devuelva un texto con la cantidad y la moneda:

- `formatear_precio(5)` → `"5.00 €"`
- `formatear_precio(3.14159, "$", 3)` → `"3.142 $"`
- `formatear_precio(10, decimales=0)` → `"10 €"`
::codigo
def formatear_precio(cantidad, moneda, decimales):
    pass
::prueba
assert formatear_precio(5) == "5.00 €", f"formatear_precio(5) dio {formatear_precio(5)!r}"
assert formatear_precio(3.14159, "$", 3) == "3.142 $", f"dio {formatear_precio(3.14159, '$', 3)!r}"
assert formatear_precio(10, decimales=0) == "10 €", f"dio {formatear_precio(10, decimales=0)!r}"
::pista
Pon los valores por defecto en la firma. Para usar una variable como número de decimales en un f-string: `f"{cantidad:.{decimales}f}"`.
::solucion
def formatear_precio(cantidad, moneda="€", decimales=2):
    return f"{cantidad:.{decimales}f} {moneda}"
::quiz
? ¿Cuál de estas definiciones es válida?
- def f(a=1, b):
* def f(a, b=1):
- def f(a=1, b=):
= Los parámetros opcionales van al final.
