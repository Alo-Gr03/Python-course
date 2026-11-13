@modulo Funciones pro | ⚙️ | *args, **kwargs, alcance, lambda y ordenar

@leccion args_kwargs | *args y **kwargs | 6
::teoria
A veces no sabes cuántos argumentos recibirá una función.

- `*args` recoge los argumentos **posicionales** extra en una **tupla**.
- `**kwargs` recoge los argumentos **con nombre** extra en un **diccionario**.

```python
def sumar(*numeros):
    return sum(numeros)

sumar(1, 2, 3, 4)   # 10

def perfil(nombre, **datos):
    print(nombre, datos)

perfil("Ana", edad=30, ciudad="Lima")   # Ana {'edad': 30, 'ciudad': 'Lima'}
```

El asterisco también sirve al **llamar**, para "desempaquetar":

```python
numeros = [3, 7, 1]
print(*numeros)          # igual que print(3, 7, 1)
config = {"sep": " - ", "end": "!\n"}
print("a", "b", **config)  # a - b!
```

Orden en la firma: normales, `*args`, con valor por defecto, `**kwargs`.
::ejemplo
def promedio(*valores):
    if not valores:
        return 0
    return sum(valores) / len(valores)

print(promedio(4, 8, 6))
print(promedio())

def etiqueta_html(etiqueta, contenido, **atributos):
    attrs = "".join(f' {k}="{v}"' for k, v in atributos.items())
    return f"<{etiqueta}{attrs}>{contenido}</{etiqueta}>"

print(etiqueta_html("a", "Python", href="https://python.org", target="_blank"))
::ejercicio
Escribe `crear_pedido(cliente, *productos, **opciones)` que devuelva un diccionario:

```python
crear_pedido("Ana", "pan", "leche", urgente=True)
# {"cliente": "Ana", "productos": ["pan", "leche"], "urgente": True}
```

Es decir: `cliente`, `productos` como **lista** y además cada opción como clave propia.
::codigo
def crear_pedido(cliente, *productos, **opciones):
    pass
::prueba
r = crear_pedido("Ana", "pan", "leche", urgente=True)
assert r == {"cliente": "Ana", "productos": ["pan", "leche"], "urgente": True}, f"dio {r}"
r = crear_pedido("Luis")
assert r == {"cliente": "Luis", "productos": []}, f"Sin productos ni opciones dio {r}"
r = crear_pedido("Eva", "té", envio="casa", pago="tarjeta")
assert r == {"cliente": "Eva", "productos": ["té"], "envio": "casa", "pago": "tarjeta"}, f"dio {r}"
::pista
`pedido = {"cliente": cliente, "productos": list(productos)}` y luego `pedido.update(opciones)` (o `{**pedido, **opciones}`).
::solucion
def crear_pedido(cliente, *productos, **opciones):
    pedido = {"cliente": cliente, "productos": list(productos)}
    pedido.update(opciones)
    return pedido
::quiz
? Dentro de def f(*args), ¿de qué tipo es args?
- list
* tuple
- dict
? Dentro de def f(**kwargs), ¿de qué tipo es kwargs?
- tuple
* dict
- set

@leccion alcance | Alcance de variables | 5
::teoria
Las variables creadas **dentro** de una función son **locales**: solo existen ahí y desaparecen al terminar.

```python
def f():
    secreto = 42
f()
print(secreto)   # NameError
```

Una función **puede leer** variables globales (las de fuera), pero si **asigna** una variable con el mismo nombre, crea una local nueva.

```python
contador = 0
def sumar():
    contador += 1     # UnboundLocalError
```

Existe `global contador` para forzarlo, pero es mala práctica. La forma limpia: **recibe por parámetro y devuelve con return**.

```python
def sumar(contador):
    return contador + 1
contador = sumar(contador)
```

> 💡 Funciones que solo dependen de sus parámetros y devuelven un valor son fáciles de probar y de reutilizar. Es el estilo que estás practicando en cada reto.
::ejemplo
IVA = 0.21          # constante global (en MAYÚSCULAS por convención)

def con_iva(precio):
    return precio * (1 + IVA)     # leer una global está bien

def aplicar_descuento(precios, porcentaje):
    nuevos = []                   # variable local
    for p in precios:
        nuevos.append(p * (1 - porcentaje / 100))
    return nuevos

carrito = [10, 20, 30]
carrito = aplicar_descuento(carrito, 10)
print(carrito)
print([round(con_iva(p), 2) for p in carrito])
::ejercicio
Este código tiene un error de alcance. Arréglalo **sin usar `global`**: `registrar(visitas)` debe recibir el número actual de visitas y devolverlo incrementado en 1.
::codigo
visitas = 0

def registrar():
    visitas += 1

registrar()
registrar()
print(visitas)
::prueba
assert registrar(0) == 1 and registrar(41) == 42, "registrar(n) debe devolver n + 1"
assert visitas == 2, f"Al final visitas debe valer 2 y vale {visitas}. ¿Guardas lo que devuelve: visitas = registrar(visitas)?"
::pista
`def registrar(visitas): return visitas + 1` y al llamar: `visitas = registrar(visitas)`.
::solucion
visitas = 0

def registrar(visitas):
    return visitas + 1

visitas = registrar(visitas)
visitas = registrar(visitas)
print(visitas)
::quiz
? ¿Qué pasa con una variable creada dentro de una función cuando esta termina?
* Desaparece (era local)
- Se vuelve global
- Se guarda para la próxima llamada

@leccion lambda_sorted | lambda, sorted y key | 7
::teoria
Una **lambda** es una función anónima de una sola expresión:

```python
doble = lambda x: x * 2
doble(5)   # 10
```

Su uso estrella: el parámetro `key` de `sorted()`, `max()` y `min()`, que indica **por qué** comparar.

```python
palabras = ["kiwi", "banana", "uva"]
sorted(palabras, key=len)                      # ['uva', 'kiwi', 'banana']
sorted(palabras, key=len, reverse=True)

alumnos = [("Ana", 8), ("Luis", 9.5), ("Eva", 7)]
sorted(alumnos, key=lambda a: a[1])            # por nota
max(alumnos, key=lambda a: a[1])               # ('Luis', 9.5)
```

Para ordenar por varios criterios, devuelve una tupla: `key=lambda p: (p["edad"], p["nombre"])`.

También existen `map(f, lista)` y `filter(f, lista)`, aunque normalmente una comprensión es más legible.
::ejemplo
productos = [
    {"nombre": "Teclado", "precio": 25, "stock": 10},
    {"nombre": "Ratón", "precio": 15, "stock": 0},
    {"nombre": "Monitor", "precio": 180, "stock": 3},
]
for p in sorted(productos, key=lambda p: p["precio"], reverse=True):
    print(p["nombre"], p["precio"])

barato = min(productos, key=lambda p: p["precio"])
print("Más barato:", barato["nombre"])
print(list(map(lambda p: p["nombre"].upper(), productos)))
print(sorted(["b", "A", "c"], key=str.lower))
::ejercicio
Escribe `ranking(jugadores)` que reciba una lista de diccionarios `{"nombre": ..., "puntos": ...}` y devuelva la **lista de nombres** ordenada por puntos de **mayor a menor**. En caso de empate, por nombre alfabéticamente.

`ranking([{"nombre": "Eva", "puntos": 50}, {"nombre": "Ana", "puntos": 50}, {"nombre": "Leo", "puntos": 80}])` → `["Leo", "Ana", "Eva"]`
::codigo
def ranking(jugadores):
    pass
::prueba
j = [{"nombre": "Eva", "puntos": 50}, {"nombre": "Ana", "puntos": 50}, {"nombre": "Leo", "puntos": 80}]
assert ranking(j) == ["Leo", "Ana", "Eva"], f"dio {ranking(j)}"
assert ranking([]) == [], "Lista vacía → []"
j2 = [{"nombre": "B", "puntos": 1}, {"nombre": "A", "puntos": 2}, {"nombre": "C", "puntos": 3}]
assert ranking(j2) == ["C", "A", "B"], f"dio {ranking(j2)}"
::pista
Truco: para mayor a menor en puntos pero alfabético en nombre, usa `key=lambda j: (-j["puntos"], j["nombre"])`. Luego extrae los nombres con una comprensión.
::solucion
def ranking(jugadores):
    ordenados = sorted(jugadores, key=lambda j: (-j["puntos"], j["nombre"]))
    return [j["nombre"] for j in ordenados]
::quiz
? ¿Qué devuelve sorted(["ccc", "a", "bb"], key=len)?
* ['a', 'bb', 'ccc']
- ['ccc', 'bb', 'a']
- ['a', 'bb', 'ccc'] pero modificando la lista original
? ¿Qué es lambda x: x + 1?
- Una variable
* Una función anónima que suma 1
- Un bucle

@modulo Errores | 🛟 | manejar fallos sin que el programa se caiga

@leccion try_except | try / except | 6
::teoria
Cuando algo falla, Python lanza una **excepción** y el programa se detiene. Con `try/except` la capturas y decides qué hacer:

```python
try:
    edad = int(texto)
except ValueError:
    print("Eso no es un número")
    edad = 0
```

Estructura completa:

```python
try:
    ...                 # código que puede fallar
except ZeroDivisionError:
    ...                 # si ocurre ese error
except (ValueError, TypeError) as e:
    print("Error:", e)  # 'e' contiene el mensaje
else:
    ...                 # si NO hubo error
finally:
    ...                 # siempre, haya error o no
```

Errores comunes: `ValueError`, `TypeError`, `KeyError`, `IndexError`, `ZeroDivisionError`, `FileNotFoundError`.

> ⚠️ Evita `except:` a secas: atrapa todo, incluso errores que deberías ver y corregir. Captura el error concreto.
::ejemplo
def dividir_seguro(a, b):
    try:
        resultado = a / b
    except ZeroDivisionError:
        return "no se puede dividir entre 0"
    except TypeError as e:
        return f"tipos inválidos: {e}"
    else:
        return round(resultado, 2)

print(dividir_seguro(10, 3))
print(dividir_seguro(10, 0))
print(dividir_seguro("10", 2))

datos = ["12", "abc", "7", "", "3.5"]
numeros = []
for d in datos:
    try:
        numeros.append(int(d))
    except ValueError:
        print(f"Ignoro {d!r}")
print(numeros)
::ejercicio
Escribe `a_numero(texto, por_defecto=0)` que intente convertir el texto a `float` y, si no es posible, devuelva `por_defecto`. Debe aceptar coma decimal: `"3,5"` → `3.5`.

- `a_numero("12")` → `12.0`
- `a_numero("3,5")` → `3.5`
- `a_numero("hola")` → `0`
- `a_numero("x", None)` → `None`
::codigo
def a_numero(texto, por_defecto=0):
    pass
::prueba
assert a_numero("12") == 12.0, f"a_numero('12') dio {a_numero('12')!r}"
assert a_numero("3,5") == 3.5, f"a_numero('3,5') dio {a_numero('3,5')!r}"
assert a_numero(" 7.25 ") == 7.25, "Debe tolerar espacios (float ya lo hace)"
assert a_numero("hola") == 0, f"a_numero('hola') dio {a_numero('hola')!r}"
assert a_numero("x", None) is None, "Con por_defecto=None debe devolver None"
::pista
Dentro del `try`: `return float(texto.replace(",", "."))`. En `except ValueError:` devuelve `por_defecto`.
::solucion
def a_numero(texto, por_defecto=0):
    try:
        return float(texto.replace(",", "."))
    except ValueError:
        return por_defecto
::quiz
? ¿Cuándo se ejecuta el bloque finally?
- Solo si hubo error
- Solo si no hubo error
* Siempre
? ¿Qué excepción lanza int("abc")?
* ValueError
- TypeError
- NameError

@leccion raise | Lanzar errores y validar | 5
::teoria
Tus funciones también pueden **lanzar** errores con `raise` cuando reciben algo inválido. Es mejor fallar pronto y con un mensaje claro que devolver un resultado incorrecto.

```python
def retirar(saldo, monto):
    if monto <= 0:
        raise ValueError("El monto debe ser positivo")
    if monto > saldo:
        raise ValueError("Saldo insuficiente")
    return saldo - monto
```

Quien llama decide cómo manejarlo:

```python
try:
    saldo = retirar(100, 500)
except ValueError as e:
    print("No se pudo:", e)
```

Puedes crear tus propios tipos de error heredando de `Exception` (verás herencia en POO):

```python
class SaldoInsuficiente(Exception):
    pass
```

`assert condicion, "mensaje"` es una comprobación rápida que lanza `AssertionError`. Así funcionan las pruebas de este curso.
::ejemplo
def validar_email(email):
    if "@" not in email:
        raise ValueError(f"'{email}' no tiene @")
    usuario, dominio = email.split("@", 1)
    if not usuario or "." not in dominio:
        raise ValueError(f"'{email}' no es válido")
    return email.lower()

for e in ["Ana@Mail.com", "sin-arroba", "@mail.com", "x@dominio"]:
    try:
        print("OK:", validar_email(e))
    except ValueError as err:
        print("Error:", err)
::ejercicio
Escribe `crear_usuario(nombre, edad)` que devuelva `{"nombre": nombre, "edad": edad}` pero lance `ValueError` si:

- `nombre` está vacío o tiene solo espacios
- `edad` no es un `int`, o es menor que 0 o mayor que 130
::codigo
def crear_usuario(nombre, edad):
    pass
::prueba
assert crear_usuario("Ana", 30) == {"nombre": "Ana", "edad": 30}, "Con datos válidos debe devolver el diccionario"
for args in [("", 20), ("   ", 20), ("Ana", -1), ("Ana", 131), ("Ana", "30"), ("Ana", 30.5)]:
    try:
        crear_usuario(*args)
    except ValueError:
        pass
    else:
        raise AssertionError(f"crear_usuario{args} debería lanzar ValueError")
::pista
`if not nombre.strip(): raise ValueError(...)`. Para el tipo: `if not isinstance(edad, int) or not 0 <= edad <= 130: raise ValueError(...)`.
::solucion
def crear_usuario(nombre, edad):
    if not nombre.strip():
        raise ValueError("El nombre no puede estar vacío")
    if not isinstance(edad, int) or not 0 <= edad <= 130:
        raise ValueError("Edad no válida")
    return {"nombre": nombre, "edad": edad}
::quiz
? ¿Qué palabra clave lanza una excepción?
- throw
* raise
- error

@modulo Módulos | 📦 | la biblioteca estándar: pilas incluidas

@leccion import | import y módulos útiles | 7
::teoria
Python trae cientos de módulos listos para usar. Se cargan con `import`:

```python
import math
math.sqrt(16)        # 4.0
math.pi

from random import randint, choice
randint(1, 6)        # dado
choice(["a", "b"])   # elemento al azar

import statistics as st   # alias
st.mean([1, 2, 3])
```

Módulos que vale la pena conocer:

| Módulo | Para qué |
|---|---|
| `math` | raíces, potencias, trigonometría, `ceil`, `floor` |
| `random` | números y elecciones al azar, `shuffle` |
| `statistics` | `mean`, `median`, `mode`, `stdev` |
| `datetime` | fechas y horas |
| `collections` | `Counter`, `defaultdict`, `deque` |
| `json` | leer y escribir JSON |
| `itertools` | combinaciones, permutaciones... |
| `re` | expresiones regulares |

Para instalar paquetes externos en tu computadora se usa `pip install nombre` (por ejemplo `requests` o `pandas`).
::ejemplo
import math
import random
import statistics
from datetime import date

print(math.sqrt(2), math.ceil(4.1), math.floor(4.9))
random.seed(1)   # semilla: hace el azar repetible
print(random.randint(1, 6), random.choice(["piedra", "papel", "tijera"]))
mazo = list(range(1, 11))
random.shuffle(mazo)
print(mazo)
print(statistics.median([3, 1, 4, 1, 5]))
hoy = date(2025, 3, 15)
navidad = date(2025, 12, 25)
print("Faltan", (navidad - hoy).days, "días")
::ejercicio
Escribe `estadisticas(datos)` que devuelva un diccionario con `"media"`, `"mediana"` y `"desviacion"` (desviación estándar muestral), **todas redondeadas a 2 decimales**, usando el módulo `statistics`.

`estadisticas([2, 4, 4, 4, 5, 5, 7, 9])` → `{"media": 5.0, "mediana": 4.5, "desviacion": 2.14}`
::codigo
def estadisticas(datos):
    pass
::prueba
r = estadisticas([2, 4, 4, 4, 5, 5, 7, 9])
assert r == {"media": 5.0, "mediana": 4.5, "desviacion": 2.14}, f"dio {r}"
::pista
`import statistics` arriba, y luego `statistics.mean`, `statistics.median`, `statistics.stdev`, cada uno dentro de `round(..., 2)`.
::solucion
import statistics

def estadisticas(datos):
    return {
        "media": round(statistics.mean(datos), 2),
        "mediana": round(statistics.median(datos), 2),
        "desviacion": round(statistics.stdev(datos), 2),
    }
::quiz
? ¿Qué hace from math import sqrt?
- Importa todo math
* Importa solo sqrt, para usarla sin escribir math.
- Instala math
? ¿Para qué sirve random.seed(1)?
- Para generar números más aleatorios
* Para que la secuencia "aleatoria" sea siempre la misma (reproducible)
- Para elegir un número entre 0 y 1

@leccion collections_json | Counter, defaultdict y JSON | 6
::teoria
`collections` tiene versiones mejoradas de las estructuras básicas.

**Counter** cuenta elementos en una línea:

```python
from collections import Counter
c = Counter("abracadabra")
c["a"]            # 5
c.most_common(2)  # [('a', 5), ('b', 2)]
```

**defaultdict** crea automáticamente un valor inicial para claves nuevas:

```python
from collections import defaultdict
grupos = defaultdict(list)
grupos["frutas"].append("pera")   # no hace falta comprobar si existe
```

**JSON** es el formato de datos más usado en la web. El módulo `json` lo convierte desde y hacia diccionarios y listas:

```python
import json
texto = json.dumps({"a": 1}, indent=2)   # dict → texto
datos = json.loads('{"a": 1}')           # texto → dict
```
::ejemplo
from collections import Counter, defaultdict
import json

votos = ["rojo", "azul", "rojo", "verde", "rojo", "azul"]
conteo = Counter(votos)
print(conteo)
print("Ganador:", conteo.most_common(1)[0])

palabras = ["sol", "sal", "mar", "luz", "mes"]
por_letra = defaultdict(list)
for p in palabras:
    por_letra[p[0]].append(p)
print(dict(por_letra))

texto = '{"nombre": "Ana", "cursos": ["Python", "SQL"]}'
datos = json.loads(texto)
datos["cursos"].append("Git")
print(json.dumps(datos, ensure_ascii=False, indent=2))
::ejercicio
Escribe `top_palabras(texto, n)` que devuelva una lista con las `n` palabras más frecuentes (en minúsculas, sin contar signos `.,;:!?`), como tuplas `(palabra, cantidad)`. Usa `Counter`.

`top_palabras("El sol. El mar, el cielo!", 1)` → `[("el", 3)]`
::codigo
from collections import Counter

def top_palabras(texto, n):
    pass
::prueba
assert top_palabras("El sol. El mar, el cielo!", 1) == [("el", 3)], f"dio {top_palabras('El sol. El mar, el cielo!', 1)}"
r = top_palabras("a b b c c c; d!", 2)
assert r == [("c", 3), ("b", 2)], f"dio {r}"
::pista
Quita los signos con un bucle `for s in ".,;:!?": texto = texto.replace(s, "")`. Después `Counter(texto.lower().split()).most_common(n)`.
::solucion
from collections import Counter

def top_palabras(texto, n):
    for signo in ".,;:!?":
        texto = texto.replace(signo, "")
    return Counter(texto.lower().split()).most_common(n)
::quiz
? ¿Qué devuelve json.loads('[1, 2]')?
* La lista [1, 2]
- El texto '[1, 2]'
- Un diccionario
