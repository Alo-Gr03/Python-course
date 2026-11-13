@modulo Listas | 📋 | guardar y procesar muchos valores

@leccion listas | Crear y usar listas | 6
::teoria
Una **lista** guarda varios valores en orden, entre corchetes:

```python
frutas = ["manzana", "pera", "uva"]
numeros = [4, 8, 15, 16, 23, 42]
mezcla = ["Ana", 30, True]   # se pueden mezclar tipos
vacia = []
```

Funciona igual que con los textos: índices desde 0, negativos y cortes.

```python
frutas[0]      # 'manzana'
frutas[-1]     # 'uva'
numeros[1:3]   # [8, 15]
len(frutas)    # 3
"pera" in frutas  # True
```

A diferencia de los textos, **las listas se pueden modificar**:

```python
frutas[1] = "kiwi"   # ['manzana', 'kiwi', 'uva']
```

Funciones muy útiles con listas de números: `sum()`, `max()`, `min()`, `sorted()`.
::ejemplo
notas = [7, 9, 5, 10, 6]
print("Primera:", notas[0], "Última:", notas[-1])
print("Cantidad:", len(notas))
print("Media:", sum(notas) / len(notas))
print("Mejor:", max(notas), "Peor:", min(notas))
print("Ordenadas:", sorted(notas))
notas[2] = 8
print(notas)
::ejercicio
Escribe `resumen(numeros)` que reciba una lista no vacía y devuelva un texto con este formato exacto:

`"n=5 min=2 max=9 media=5.4"`

(la media con 1 decimal)
::codigo
def resumen(numeros):
    pass

print(resumen([3, 9, 2, 7, 6]))
::prueba
r = resumen([3, 9, 2, 7, 6])
assert r == "n=5 min=2 max=9 media=5.4", f"Para [3, 9, 2, 7, 6] dio {r!r}"
r = resumen([10])
assert r == "n=1 min=10 max=10 media=10.0", f"Para [10] dio {r!r}"
::pista
`f"n={len(numeros)} min={min(numeros)} max={max(numeros)} media={sum(numeros) / len(numeros):.1f}"`
::solucion
def resumen(numeros):
    media = sum(numeros) / len(numeros)
    return f"n={len(numeros)} min={min(numeros)} max={max(numeros)} media={media:.1f}"

print(resumen([3, 9, 2, 7, 6]))
::quiz
? Si a = [10, 20, 30, 40], ¿qué es a[1:3]?
* [20, 30]
- [10, 20, 30]
- [20, 30, 40]
? ¿Cuál de estas operaciones da error?
- lista[0] = 5 (con lista = [1, 2])
* texto[0] = "x" (con texto = "hola")
- len([])
= Los strings son inmutables; las listas no.

@leccion metodos_lista | Añadir, quitar y ordenar | 6
::teoria
| Método | Qué hace |
|---|---|
| `.append(x)` | añade x al final |
| `.insert(i, x)` | inserta x en la posición i |
| `.extend(otra)` | añade todos los elementos de otra lista |
| `.remove(x)` | quita la primera aparición de x |
| `.pop()` / `.pop(i)` | quita y **devuelve** el último / el de la posición i |
| `.index(x)` | posición de x |
| `.count(x)` | cuántas veces aparece x |
| `.sort()` | ordena **la misma lista** (`reverse=True` para descendente) |
| `.reverse()` | invierte la misma lista |

Ojo con la diferencia: `lista.sort()` modifica la lista y devuelve `None`; `sorted(lista)` devuelve una lista **nueva** ordenada.

> ⚠️ `b = a` no copia la lista: ambos nombres apuntan a la misma. Para copiar usa `b = a.copy()` o `b = a[:]`.
::ejemplo
tareas = ["estudiar", "comprar"]
tareas.append("correr")
tareas.insert(0, "despertar")
print(tareas)
hecha = tareas.pop(0)
print("Hecha:", hecha, "Quedan:", tareas)
tareas.remove("comprar")
tareas.sort()
print(tareas)

a = [1, 2, 3]
b = a          # mismo objeto
c = a.copy()   # copia
a.append(4)
print(b, c)
::ejercicio
Escribe `sin_duplicados(lista)` que devuelva una **lista nueva** con los elementos sin repetir, **manteniendo el orden** de la primera aparición. No modifiques la lista original.

`sin_duplicados([3, 1, 3, 2, 1])` → `[3, 1, 2]`
::codigo
def sin_duplicados(lista):
    resultado = []

    return resultado
::prueba
original = [3, 1, 3, 2, 1]
r = sin_duplicados(original)
assert r == [3, 1, 2], f"Para [3, 1, 3, 2, 1] dio {r}"
assert original == [3, 1, 3, 2, 1], "¡Modificaste la lista original!"
assert sin_duplicados([]) == [], "Para una lista vacía debe devolver []"
assert sin_duplicados(list("banana")) == ["b", "a", "n"], "Falla con ['b','a','n','a','n','a']"
::pista
Recorre la lista con `for x in lista:` y haz `resultado.append(x)` solo `if x not in resultado`.
::solucion
def sin_duplicados(lista):
    resultado = []
    for x in lista:
        if x not in resultado:
            resultado.append(x)
    return resultado
::quiz
? ¿Qué imprime print([3, 1, 2].sort())?
- [1, 2, 3]
* None
- [3, 1, 2]
= sort() ordena en el sitio y devuelve None. Usa sorted() si quieres el resultado.
? ¿Qué hace lista.pop()?
- Borra toda la lista
* Quita el último elemento y lo devuelve
- Añade un elemento

@leccion recorrer | enumerate, zip y patrones | 6
::teoria
Formas idiomáticas de recorrer listas:

```python
nombres = ["Ana", "Luis", "Eva"]
edades = [30, 25, 35]

for nombre in nombres:                 # cada elemento
    ...
for i, nombre in enumerate(nombres):   # posición + elemento
    print(i, nombre)
for i, nombre in enumerate(nombres, start=1):  # empezando en 1
    ...
for nombre, edad in zip(nombres, edades):      # dos listas en paralelo
    print(nombre, edad)
```

**Patrones que usarás siempre:**

- **Filtrar**: crear una lista vacía y hacer `append` solo de lo que cumple una condición.
- **Transformar**: crear una lista nueva aplicando una operación a cada elemento.
- **Buscar el mejor**: guardar el mejor hasta ahora y compararlo con cada uno.
::ejemplo
productos = ["pan", "leche", "huevos"]
precios = [1.2, 0.95, 2.5]

for i, (p, precio) in enumerate(zip(productos, precios), start=1):
    print(f"{i}. {p:<8} {precio:.2f} €")

caros = []
for p, precio in zip(productos, precios):
    if precio > 1:
        caros.append(p)
print("Más de 1 €:", caros)

mas_caro = productos[0]
for p, precio in zip(productos, precios):
    if precio > precios[productos.index(mas_caro)]:
        mas_caro = p
print("El más caro:", mas_caro)
::ejercicio
Escribe `mejor_alumno(nombres, notas)` que devuelva el **nombre** con la nota más alta. Si hay empate, el primero que aparezca.

`mejor_alumno(["Ana", "Luis", "Eva"], [8, 9.5, 9.5])` → `"Luis"`
::codigo
def mejor_alumno(nombres, notas):
    pass
::prueba
assert mejor_alumno(["Ana", "Luis", "Eva"], [8, 9.5, 9.5]) == "Luis", "Debería ser Luis"
assert mejor_alumno(["Ana"], [3]) == "Ana", "Con un solo alumno debe devolverlo"
assert mejor_alumno(["A", "B", "C"], [1, 2, 10]) == "C", "Debería ser C"
assert mejor_alumno(["A", "B"], [-1, -5]) == "A", "Funciona también con notas negativas"
::pista
Empieza con `mejor = nombres[0]` y `mejor_nota = notas[0]`. Recorre con `zip` y actualiza solo si `nota > mejor_nota` (mayor estricto para respetar empates).
::solucion
def mejor_alumno(nombres, notas):
    mejor, mejor_nota = nombres[0], notas[0]
    for nombre, nota in zip(nombres, notas):
        if nota > mejor_nota:
            mejor, mejor_nota = nombre, nota
    return mejor
::quiz
? ¿Qué da list(enumerate(["a", "b"]))?
* [(0, 'a'), (1, 'b')]
- ['a', 'b']
- [(1, 'a'), (2, 'b')]
? ¿Qué hace zip(a, b)?
- Comprime las listas
* Recorre ambas en paralelo, emparejando elementos
- Une las dos listas en una

@leccion comprensiones | List comprehensions | 7
::teoria
Una **comprensión de lista** crea una lista en una sola línea. Es de lo más "pythónico" que hay.

```python
# Forma larga
cuadrados = []
for n in range(5):
    cuadrados.append(n ** 2)

# Comprensión
cuadrados = [n ** 2 for n in range(5)]    # [0, 1, 4, 9, 16]
```

Con filtro al final:

```python
pares = [n for n in range(10) if n % 2 == 0]
```

Con transformación condicional (el if/else va **antes** del for):

```python
etiquetas = ["par" if n % 2 == 0 else "impar" for n in range(4)]
```

Léelo así: "**[qué quiero** for **cada elemento** in **colección** if **condición]**".

Útiles con ellas: `sum(x for x in ...)`, `any(...)` (¿alguno cumple?) y `all(...)` (¿todos cumplen?).
::ejemplo
palabras = ["Python", "es", "un", "lenguaje", "genial"]
print([p.upper() for p in palabras])
print([p for p in palabras if len(p) > 3])
print([len(p) for p in palabras])
print(sum(len(p) for p in palabras))
print(any(p.startswith("g") for p in palabras))
print(all(len(p) > 1 for p in palabras))
precios = [10, 25, 8]
print([round(p * 1.21, 2) for p in precios])
::ejercicio
Escribe **en una línea cada una** usando comprensiones:

- `aprobados(notas)`: devuelve solo las notas >= 5
- `en_celsius(lista_f)`: convierte grados Fahrenheit a Celsius con `(f - 32) * 5 / 9`, redondeando a 1 decimal
- `longitudes(texto)`: devuelve la longitud de cada palabra del texto
::codigo
def aprobados(notas):
    pass

def en_celsius(lista_f):
    pass

def longitudes(texto):
    pass
::prueba
assert aprobados([3, 5, 7.5, 4.9, 10]) == [5, 7.5, 10], f"aprobados dio {aprobados([3, 5, 7.5, 4.9, 10])}"
assert en_celsius([32, 212, 100]) == [0.0, 100.0, 37.8], f"en_celsius dio {en_celsius([32, 212, 100])}"
assert longitudes("hola que tal estás") == [4, 3, 3, 5], f"longitudes dio {longitudes('hola que tal estás')}"
::pista
`[n for n in notas if n >= 5]`, `[round((f - 32) * 5 / 9, 1) for f in lista_f]`, `[len(p) for p in texto.split()]`
::solucion
def aprobados(notas):
    return [n for n in notas if n >= 5]

def en_celsius(lista_f):
    return [round((f - 32) * 5 / 9, 1) for f in lista_f]

def longitudes(texto):
    return [len(p) for p in texto.split()]
::quiz
? ¿Qué da [x * 2 for x in [1, 2, 3] if x != 2]?
* [2, 6]
- [2, 4, 6]
- [1, 3]
? ¿Qué devuelve all([True, 1, "a"])?
* True
- False
- "a"

@modulo Diccionarios y más | 🗂️ | tuplas, diccionarios y conjuntos

@leccion tuplas | Tuplas y desempaquetado | 5
::teoria
Una **tupla** es como una lista pero **inmutable**, con paréntesis:

```python
punto = (3, 4)
color = ("rojo", 255, 0, 0)
punto[0]      # 3
```

Úsalas para datos que van juntos y no deben cambiar (coordenadas, registros, fechas).

**Desempaquetado**: asignar cada elemento a una variable.

```python
x, y = punto
nombre, *resto = ["Ana", 1, 2, 3]   # resto = [1, 2, 3]
a, b = b, a                          # intercambiar valores ¡en una línea!
```

Lo usaste ya sin saberlo: `for i, x in enumerate(...)` y `return a, b` trabajan con tuplas.
::ejemplo
alumnos = [("Ana", 8.5), ("Luis", 6.0), ("Eva", 9.2)]
for nombre, nota in alumnos:
    print(f"{nombre}: {nota}")

a, b = 1, 2
a, b = b, a
print(a, b)

primero, *medio, ultimo = range(6)
print(primero, medio, ultimo)
::ejercicio
Escribe `distancia(p1, p2)` que reciba dos puntos como tuplas `(x, y)` y devuelva la distancia entre ellos:
√((x2 − x1)² + (y2 − y1)²). Usa desempaquetado.

`distancia((0, 0), (3, 4))` → `5.0`
::codigo
def distancia(p1, p2):
    pass
::prueba
assert distancia((0, 0), (3, 4)) == 5.0, f"distancia((0,0),(3,4)) dio {distancia((0, 0), (3, 4))}"
assert abs(distancia((1, 1), (4, 5)) - 5) < 1e-9, "Falla con (1,1) y (4,5)"
assert distancia((2, 2), (2, 2)) == 0, "La distancia de un punto a sí mismo es 0"
::pista
`x1, y1 = p1`, `x2, y2 = p2`, y `return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5`
::solucion
def distancia(p1, p2):
    x1, y1 = p1
    x2, y2 = p2
    return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5
::quiz
? ¿Qué diferencia principal hay entre lista y tupla?
- La tupla solo guarda números
* La tupla no se puede modificar
- No hay diferencia
? Tras a, b = 5, 9 y luego a, b = b, a, ¿cuánto vale a?
* 9
- 5
- 14

@leccion diccionarios | Diccionarios | 8
::teoria
Un **diccionario** (`dict`) guarda pares **clave: valor**. Buscas por clave, no por posición.

```python
persona = {"nombre": "Ana", "edad": 30, "ciudad": "Quito"}

persona["nombre"]              # 'Ana'
persona["edad"] = 31           # modificar
persona["email"] = "a@x.com"   # añadir
del persona["ciudad"]          # borrar
"edad" in persona              # True (busca en las claves)
persona.get("tel", "sin tel")  # valor por defecto si no existe
```

Las claves deben ser únicas e inmutables (textos, números, tuplas). Los valores pueden ser cualquier cosa, incluso listas u otros diccionarios.

Recorrerlos:

```python
for clave in persona: ...
for valor in persona.values(): ...
for clave, valor in persona.items(): ...
```

**Contar con un diccionario** es un patrón clásico:

```python
conteo = {}
for x in datos:
    conteo[x] = conteo.get(x, 0) + 1
```
::ejemplo
stock = {"manzana": 10, "pera": 0, "uva": 25}
stock["kiwi"] = 7
stock["manzana"] -= 3

for fruta, cantidad in stock.items():
    estado = "agotado" if cantidad == 0 else f"{cantidad} uds"
    print(f"{fruta:<8} {estado}")

print(stock.get("mango", 0))
print(list(stock.keys()))

colores = {}
for c in ["rojo", "azul", "rojo", "verde", "rojo"]:
    colores[c] = colores.get(c, 0) + 1
print(colores)
::ejercicio
Escribe `frecuencia_palabras(texto)` que devuelva un diccionario con cuántas veces aparece cada palabra, **en minúsculas**.

`frecuencia_palabras("Hola hola mundo")` → `{"hola": 2, "mundo": 1}`
::codigo
def frecuencia_palabras(texto):
    conteo = {}

    return conteo
::prueba
assert frecuencia_palabras("Hola hola mundo") == {"hola": 2, "mundo": 1}, f"dio {frecuencia_palabras('Hola hola mundo')}"
assert frecuencia_palabras("") == {}, "Un texto vacío debe dar {}"
r = frecuencia_palabras("el gato y EL perro y el pez")
assert r == {"el": 3, "gato": 1, "y": 2, "perro": 1, "pez": 1}, f"dio {r}"
::pista
Recorre `texto.lower().split()` y usa `conteo[p] = conteo.get(p, 0) + 1`.
::solucion
def frecuencia_palabras(texto):
    conteo = {}
    for p in texto.lower().split():
        conteo[p] = conteo.get(p, 0) + 1
    return conteo
::quiz
? ¿Qué pasa con d["x"] si "x" no es clave de d?
- Devuelve None
* Lanza KeyError
- Crea la clave
= Usa d.get("x") si no estás seguro de que exista.
? ¿Qué devuelve d.items()?
- Solo las claves
- Solo los valores
* Pares (clave, valor)

@leccion anidados | Datos anidados (listas de diccionarios) | 7
::teoria
Los datos reales casi siempre son **listas de diccionarios** (así llegan, por ejemplo, desde una API en JSON):

```python
usuarios = [
    {"nombre": "Ana", "edad": 30, "lenguajes": ["Python", "SQL"]},
    {"nombre": "Luis", "edad": 22, "lenguajes": ["JavaScript"]},
]

usuarios[0]["nombre"]           # 'Ana'
usuarios[0]["lenguajes"][1]     # 'SQL'
```

Se combinan con todo lo que ya sabes:

```python
nombres = [u["nombre"] for u in usuarios]
jovenes = [u for u in usuarios if u["edad"] < 25]
```

**Comprensión de diccionario**:

```python
edades = {u["nombre"]: u["edad"] for u in usuarios}   # {'Ana': 30, 'Luis': 22}
```
::ejemplo
pedidos = [
    {"cliente": "Ana", "total": 45.0, "pagado": True},
    {"cliente": "Luis", "total": 120.5, "pagado": False},
    {"cliente": "Ana", "total": 30.0, "pagado": True},
]
pendientes = [p["cliente"] for p in pedidos if not p["pagado"]]
print("Pendientes:", pendientes)
print("Facturado:", sum(p["total"] for p in pedidos if p["pagado"]))

por_cliente = {}
for p in pedidos:
    por_cliente[p["cliente"]] = por_cliente.get(p["cliente"], 0) + p["total"]
print(por_cliente)
::ejercicio
Escribe `gasto_por_categoria(gastos)` que reciba una lista de diccionarios con claves `"categoria"` y `"monto"` y devuelva un diccionario con el total por categoría.

```python
gastos = [{"categoria": "comida", "monto": 20},
          {"categoria": "ocio", "monto": 15},
          {"categoria": "comida", "monto": 5}]
gasto_por_categoria(gastos)  # {"comida": 25, "ocio": 15}
```
::codigo
def gasto_por_categoria(gastos):
    pass
::prueba
g = [{"categoria": "comida", "monto": 20}, {"categoria": "ocio", "monto": 15}, {"categoria": "comida", "monto": 5}]
assert gasto_por_categoria(g) == {"comida": 25, "ocio": 15}, f"dio {gasto_por_categoria(g)}"
assert gasto_por_categoria([]) == {}, "Sin gastos debe devolver {}"
::pista
Igual que contar palabras, pero sumando `g["monto"]` en lugar de 1: `totales[cat] = totales.get(cat, 0) + g["monto"]`.
::solucion
def gasto_por_categoria(gastos):
    totales = {}
    for g in gastos:
        cat = g["categoria"]
        totales[cat] = totales.get(cat, 0) + g["monto"]
    return totales
::quiz
? Con datos = {"a": [1, 2, 3]}, ¿cómo obtienes el 3?
- datos[a][2]
* datos["a"][2]
- datos["a"](2)

@leccion sets | Conjuntos (sets) | 5
::teoria
Un **set** es una colección **sin orden y sin repetidos**. Se escribe con llaves (o `set()` para uno vacío, porque `{}` es un diccionario).

```python
colores = {"rojo", "verde", "rojo"}   # {'rojo', 'verde'}
unicos = set([1, 2, 2, 3])             # {1, 2, 3}
colores.add("azul")
colores.discard("verde")
```

Brillan en dos cosas:

1. **Comprobar pertenencia** muy rápido (`x in conjunto`).
2. **Operaciones de conjuntos**:

| Operación | Símbolo | Resultado |
|---|---|---|
| Unión | `a \| b` | lo que está en alguno |
| Intersección | `a & b` | lo que está en ambos |
| Diferencia | `a - b` | lo que está en a pero no en b |
| Diferencia simétrica | `a ^ b` | lo que está en uno solo |
::ejemplo
python = {"Ana", "Luis", "Eva", "Iker"}
sql = {"Eva", "Iker", "Marta"}
print("Ambos:", python & sql)
print("Alguno:", python | sql)
print("Solo Python:", python - sql)
print("Solo uno:", python ^ sql)
print("Distintas letras en 'mississippi':", len(set("mississippi")))
::ejercicio
Escribe `comparar_listas(a, b)` que devuelva una tupla de tres **listas ordenadas**:

1. elementos comunes
2. los que solo están en `a`
3. los que solo están en `b`

`comparar_listas([1, 2, 3, 3], [2, 3, 4])` → `([2, 3], [1], [4])`
::codigo
def comparar_listas(a, b):
    pass
::prueba
r = comparar_listas([1, 2, 3, 3], [2, 3, 4])
assert r == ([2, 3], [1], [4]), f"dio {r}"
r = comparar_listas(["x"], ["y"])
assert r == ([], ["x"], ["y"]), f"dio {r}"
::pista
Convierte a sets: `sa, sb = set(a), set(b)`. Luego `sorted(sa & sb)`, `sorted(sa - sb)`, `sorted(sb - sa)`.
::solucion
def comparar_listas(a, b):
    sa, sb = set(a), set(b)
    return sorted(sa & sb), sorted(sa - sb), sorted(sb - sa)
::quiz
? ¿Qué crea x = {}?
- Un set vacío
* Un diccionario vacío
- Un error
= Para un set vacío usa set().
? ¿Cuánto vale len({1, 1, 2, 2, 3})?
* 3
- 5
- 2
