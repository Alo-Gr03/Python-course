@modulo Objetos (POO) | 🏗️ | clases, métodos, herencia

@leccion clases | Clases y objetos | 8
::teoria
Una **clase** es un molde para crear **objetos** que agrupan datos (**atributos**) y comportamiento (**métodos**).

```python
class Perro:
    def __init__(self, nombre, edad):   # constructor: se ejecuta al crear el objeto
        self.nombre = nombre             # atributos
        self.edad = edad

    def ladrar(self):                    # método
        return f"{self.nombre} dice ¡guau!"

firulais = Perro("Firulais", 3)          # crear un objeto (instancia)
firulais.ladrar()                        # 'Firulais dice ¡guau!'
firulais.edad += 1                       # acceder y modificar atributos
```

- `self` es el propio objeto. Siempre es el primer parámetro de los métodos, pero **no** se pasa al llamar.
- Los nombres de clase van en `CamelCase`.
- Cada objeto tiene sus propios datos: `Perro("Rex", 5)` es independiente de `firulais`.

¿Cuándo usar clases? Cuando tienes datos y operaciones que van siempre juntos: una cuenta bancaria, un jugador, un carrito de compra.
::ejemplo
class Contador:
    def __init__(self, inicio=0):
        self.valor = inicio

    def incrementar(self, paso=1):
        self.valor += paso
        return self.valor

    def reiniciar(self):
        self.valor = 0

visitas = Contador()
clics = Contador(100)
visitas.incrementar()
visitas.incrementar()
clics.incrementar(10)
print(visitas.valor, clics.valor)
visitas.reiniciar()
print(visitas.valor)
::ejercicio
Crea la clase `CuentaBancaria`:

- `__init__(self, titular, saldo=0)` guarda ambos atributos.
- `depositar(self, monto)`: suma al saldo. Si monto <= 0 lanza `ValueError`.
- `retirar(self, monto)`: resta del saldo. Si no hay saldo suficiente lanza `ValueError`.
- Ambos métodos devuelven el saldo resultante.
::codigo
class CuentaBancaria:
    def __init__(self, titular, saldo=0):
        pass

cuenta = CuentaBancaria("Ana", 100)
::prueba
c = CuentaBancaria("Ana", 100)
assert c.titular == "Ana" and c.saldo == 100, "El constructor debe guardar titular y saldo"
assert CuentaBancaria("Leo").saldo == 0, "El saldo por defecto es 0"
assert c.depositar(50) == 150, "depositar(50) debe devolver 150"
assert c.retirar(30) == 120, "retirar(30) debe devolver 120"
assert c.saldo == 120, "El saldo debe quedar en 120"
for metodo, monto in [(c.retirar, 1000), (c.depositar, -5), (c.depositar, 0)]:
    try:
        metodo(monto)
    except ValueError:
        pass
    else:
        raise AssertionError(f"{metodo.__name__}({monto}) debería lanzar ValueError")
assert c.saldo == 120, "Una operación fallida no debe cambiar el saldo"
::pista
En `__init__`: `self.titular = titular` y `self.saldo = saldo`. En `retirar`: `if monto > self.saldo: raise ValueError("Saldo insuficiente")`.
::solucion
class CuentaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo = saldo

    def depositar(self, monto):
        if monto <= 0:
            raise ValueError("El monto debe ser positivo")
        self.saldo += monto
        return self.saldo

    def retirar(self, monto):
        if monto <= 0 or monto > self.saldo:
            raise ValueError("Monto no válido o saldo insuficiente")
        self.saldo -= monto
        return self.saldo

cuenta = CuentaBancaria("Ana", 100)
::quiz
? ¿Qué es self?
- Una palabra reservada para importar
* El objeto sobre el que se llama el método
- El nombre de la clase
? ¿Cuándo se ejecuta __init__?
* Al crear un objeto nuevo de la clase
- Al borrar el objeto
- Cada vez que se llama a un método

@leccion metodos_especiales | Métodos especiales | 6
::teoria
Los métodos con doble guion bajo (**dunder**) permiten que tus objetos funcionen con las herramientas de Python:

| Método | Se usa con |
|---|---|
| `__str__` | `print(obj)`, `str(obj)` (texto para personas) |
| `__repr__` | la consola y depuración |
| `__len__` | `len(obj)` |
| `__eq__` | `obj1 == obj2` |
| `__lt__` | `obj1 < obj2` (y por tanto `sorted`) |
| `__add__` | `obj1 + obj2` |
| `__contains__` | `x in obj` |

```python
class Punto:
    def __init__(self, x, y):
        self.x, self.y = x, y
    def __str__(self):
        return f"({self.x}, {self.y})"
    def __add__(self, otro):
        return Punto(self.x + otro.x, self.y + otro.y)

print(Punto(1, 2) + Punto(3, 4))   # (4, 6)
```

**Atajo moderno**: `@dataclass` genera automáticamente `__init__`, `__repr__` y `__eq__`:

```python
from dataclasses import dataclass

@dataclass
class Producto:
    nombre: str
    precio: float
    stock: int = 0
```
::ejemplo
from dataclasses import dataclass

@dataclass
class Producto:
    nombre: str
    precio: float

class Carrito:
    def __init__(self):
        self.items = []
    def agregar(self, producto):
        self.items.append(producto)
    def __len__(self):
        return len(self.items)
    def __str__(self):
        total = sum(p.precio for p in self.items)
        return f"Carrito con {len(self)} productos, total {total:.2f}"

c = Carrito()
c.agregar(Producto("Libro", 12.5))
c.agregar(Producto("Taza", 6))
print(c)
print(c.items[0])
print(Producto("A", 1) == Producto("A", 1))
::ejercicio
Crea la clase `Dinero(cantidad, moneda)` con:

- `__str__` → `"10.50 USD"` (2 decimales)
- `__add__` → suma dos `Dinero` de la misma moneda y devuelve un `Dinero` nuevo. Si las monedas son distintas lanza `ValueError`.
- `__eq__` → iguales si coinciden cantidad y moneda.
::codigo
class Dinero:
    def __init__(self, cantidad, moneda):
        self.cantidad = cantidad
        self.moneda = moneda
::prueba
a, b = Dinero(10.5, "USD"), Dinero(4.5, "USD")
assert str(a) == "10.50 USD", f"str dio {str(a)!r}"
s = a + b
assert isinstance(s, Dinero), "La suma debe devolver un objeto Dinero"
assert s.cantidad == 15 and s.moneda == "USD", "10.5 + 4.5 USD debería dar 15 USD"
assert Dinero(3, "EUR") == Dinero(3, "EUR"), "Dos Dinero iguales deben ser =="
assert Dinero(3, "EUR") != Dinero(3, "USD"), "Monedas distintas no son iguales"
try:
    Dinero(1, "EUR") + Dinero(1, "USD")
except ValueError:
    pass
else:
    raise AssertionError("Sumar monedas distintas debe lanzar ValueError")
::pista
`def __add__(self, otro):` compara `self.moneda != otro.moneda`, y si todo va bien `return Dinero(self.cantidad + otro.cantidad, self.moneda)`.
::solucion
class Dinero:
    def __init__(self, cantidad, moneda):
        self.cantidad = cantidad
        self.moneda = moneda

    def __str__(self):
        return f"{self.cantidad:.2f} {self.moneda}"

    def __add__(self, otro):
        if self.moneda != otro.moneda:
            raise ValueError("No se pueden sumar monedas distintas")
        return Dinero(self.cantidad + otro.cantidad, self.moneda)

    def __eq__(self, otro):
        return self.cantidad == otro.cantidad and self.moneda == otro.moneda
::quiz
? ¿Qué método se usa al hacer print(objeto)?
* __str__
- __init__
- __print__

@leccion herencia | Herencia | 6
::teoria
La **herencia** crea una clase nueva a partir de otra: la hija recibe todo lo de la madre y puede **añadir** o **cambiar** (sobrescribir) comportamiento.

```python
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre
    def hablar(self):
        return "..."
    def presentarse(self):
        return f"Soy {self.nombre} y digo {self.hablar()}"

class Gato(Animal):              # Gato hereda de Animal
    def hablar(self):            # sobrescribe
        return "miau"

class Perro(Animal):
    def __init__(self, nombre, raza):
        super().__init__(nombre) # reutiliza el constructor de Animal
        self.raza = raza
    def hablar(self):
        return "guau"
```

`super()` llama a la versión de la clase madre. `isinstance(obj, Animal)` es `True` para gatos y perros.

**Polimorfismo**: puedes tratar distintos objetos igual porque comparten métodos: `for a in animales: print(a.presentarse())`.
::ejemplo
class Empleado:
    def __init__(self, nombre, sueldo):
        self.nombre = nombre
        self.sueldo = sueldo
    def pago_mensual(self):
        return self.sueldo / 12

class Gerente(Empleado):
    def __init__(self, nombre, sueldo, bono):
        super().__init__(nombre, sueldo)
        self.bono = bono
    def pago_mensual(self):
        return super().pago_mensual() + self.bono

equipo = [Empleado("Ana", 36000), Gerente("Luis", 60000, 800)]
for e in equipo:
    print(f"{e.nombre}: {e.pago_mensual():,.2f}")
print(isinstance(equipo[1], Empleado))
::ejercicio
Crea la clase base `Figura` con un método `area()` que devuelva `0` y un método `describir()` que devuelva `"<Nombre de la clase> de área X"` con el área a 2 decimales (usa `type(self).__name__`).

Crea `Rectangulo(base, altura)` y `Circulo(radio)` que hereden de `Figura` y sobrescriban `area()` (usa `math.pi`).

`Rectangulo(2, 3).describir()` → `"Rectangulo de área 6.00"`
::codigo
import math

class Figura:
    pass
::prueba
r, c = Rectangulo(2, 3), Circulo(1)
assert isinstance(r, Figura) and isinstance(c, Figura), "Rectangulo y Circulo deben heredar de Figura"
assert r.area() == 6, f"Área del rectángulo: {r.area()}"
assert abs(c.area() - 3.14159265) < 1e-6, f"Área del círculo: {c.area()}"
assert r.describir() == "Rectangulo de área 6.00", f"dio {r.describir()!r}"
assert c.describir() == "Circulo de área 3.14", f"dio {c.describir()!r}"
assert "describir" not in Rectangulo.__dict__, "describir() debe definirse solo en Figura y heredarse"
::pista
`describir` va en `Figura`: `return f"{type(self).__name__} de área {self.area():.2f}"`. Las hijas solo definen `__init__` y `area`.
::solucion
import math

class Figura:
    def area(self):
        return 0

    def describir(self):
        return f"{type(self).__name__} de área {self.area():.2f}"

class Rectangulo(Figura):
    def __init__(self, base, altura):
        self.base = base
        self.altura = altura

    def area(self):
        return self.base * self.altura

class Circulo(Figura):
    def __init__(self, radio):
        self.radio = radio

    def area(self):
        return math.pi * self.radio ** 2
::quiz
? ¿Para qué sirve super().__init__(...)?
* Para ejecutar el constructor de la clase madre
- Para crear una clase nueva
- Para borrar el objeto

@modulo Python pythónico | 🐍 | archivos, generadores y buenas prácticas

@leccion archivos | Leer y escribir archivos | 6
::teoria
Se abre un archivo con `open(nombre, modo)`. Usa siempre `with`: cierra el archivo automáticamente aunque haya errores.

| Modo | Significa |
|---|---|
| `"r"` | leer (por defecto) |
| `"w"` | escribir (¡borra el contenido anterior!) |
| `"a"` | añadir al final |

```python
with open("notas.txt", "w", encoding="utf-8") as f:
    f.write("Primera línea\n")

with open("notas.txt", encoding="utf-8") as f:
    contenido = f.read()          # todo el texto

with open("notas.txt", encoding="utf-8") as f:
    for linea in f:               # línea a línea (ideal para archivos grandes)
        print(linea.strip())
```

Para CSV existe el módulo `csv`, y para JSON `json.dump(datos, f)` / `json.load(f)`.

> 💡 Aquí los archivos se guardan en un disco virtual dentro del navegador: puedes practicar sin miedo.
::ejemplo
import csv

with open("compras.csv", "w", encoding="utf-8", newline="") as f:
    escritor = csv.writer(f)
    escritor.writerow(["producto", "precio"])
    escritor.writerows([["pan", 1.2], ["queso", 4.5], ["vino", 9.9]])

with open("compras.csv", encoding="utf-8") as f:
    print(f.read())

with open("compras.csv", encoding="utf-8") as f:
    filas = list(csv.DictReader(f))
total = sum(float(fila["precio"]) for fila in filas)
print(filas[0])
print(f"Total: {total:.2f}")
::ejercicio
Escribe `guardar_y_contar(nombre_archivo, lineas)` que:

1. Escriba cada texto de la lista `lineas` en el archivo, uno por línea.
2. Vuelva a abrir el archivo, lo lea y devuelva cuántas líneas **no vacías** tiene.
::codigo
def guardar_y_contar(nombre_archivo, lineas):
    pass
::prueba
n = guardar_y_contar("prueba.txt", ["hola", "", "mundo", "  ", "python"])
assert n == 3, f"Debería haber 3 líneas no vacías y devolviste {n}"
with open("prueba.txt", encoding="utf-8") as f:
    assert f.read().splitlines() == ["hola", "", "mundo", "  ", "python"], "El archivo no contiene las líneas esperadas"
::pista
Escribe con `f.write(linea + "\n")` dentro de un `for`. Para leer: `sum(1 for l in f if l.strip())`.
::solucion
def guardar_y_contar(nombre_archivo, lineas):
    with open(nombre_archivo, "w", encoding="utf-8") as f:
        for linea in lineas:
            f.write(linea + "\n")
    with open(nombre_archivo, encoding="utf-8") as f:
        return sum(1 for l in f if l.strip())
::quiz
? ¿Qué pasa al abrir un archivo existente con modo "w"?
- Se añade al final
* Se borra su contenido y se escribe desde cero
- Da error
? ¿Por qué usar with open(...)?
* Cierra el archivo automáticamente
- Es más rápido de escribir
- Permite abrir varios a la vez

@leccion generadores | Generadores e iteradores | 6
::teoria
Un **generador** produce valores **uno a uno**, bajo demanda, sin guardarlos todos en memoria. Se crea con una función que usa `yield` en lugar de `return`:

```python
def cuenta_regresiva(n):
    while n > 0:
        yield n        # entrega un valor y se pausa aquí
        n -= 1

for x in cuenta_regresiva(3):
    print(x)          # 3, 2, 1
```

**Expresión generadora**: como una comprensión pero con paréntesis. No crea la lista:

```python
total = sum(x ** 2 for x in range(1_000_000))
```

Útil para datos enormes, flujos infinitos o leer archivos grandes línea a línea. `next(gen)` pide el siguiente valor manualmente.

Funciones del día a día que trabajan con iterables: `enumerate`, `zip`, `reversed`, `sorted`, `sum`, `any`, `all`, `min`, `max`.
::ejemplo
def fibonacci():
    a, b = 0, 1
    while True:          # infinito, pero solo calcula lo que pidas
        yield a
        a, b = b, a + b

gen = fibonacci()
print([next(gen) for _ in range(10)])

def leer_por_bloques(datos, tam):
    for i in range(0, len(datos), tam):
        yield datos[i:i + tam]

for bloque in leer_por_bloques(list(range(10)), 4):
    print(bloque)
::ejercicio
Escribe el generador `pares_hasta(n)` que produzca (con `yield`) los números pares desde 0 hasta n incluido.

Y la función `primeros_cuadrados(k)` que use una **expresión generadora** con `sum` para devolver la suma de los cuadrados de 1 a k.
::codigo
def pares_hasta(n):
    pass

def primeros_cuadrados(k):
    pass
::prueba
import types
g = pares_hasta(10)
assert isinstance(g, types.GeneratorType), "pares_hasta debe ser un generador (usa yield)"
assert list(g) == [0, 2, 4, 6, 8, 10], "pares_hasta(10) debe producir 0, 2, 4, 6, 8, 10"
assert list(pares_hasta(5)) == [0, 2, 4], "pares_hasta(5) debe producir 0, 2, 4"
assert primeros_cuadrados(3) == 14, f"1 + 4 + 9 = 14, y dio {primeros_cuadrados(3)}"
assert primeros_cuadrados(100) == 338350, "Falla con k=100"
::pista
`for i in range(0, n + 1, 2): yield i` y `return sum(i ** 2 for i in range(1, k + 1))`.
::solucion
def pares_hasta(n):
    for i in range(0, n + 1, 2):
        yield i

def primeros_cuadrados(k):
    return sum(i ** 2 for i in range(1, k + 1))
::quiz
? ¿Qué diferencia a yield de return?
* yield entrega un valor y pausa la función, que puede continuar después
- Son iguales
- yield termina el programa

@leccion buenas_practicas | Estilo y buenas prácticas | 5
::teoria
Código que funciona no basta: tiene que ser **fácil de leer**. La guía oficial de estilo se llama **PEP 8**. Lo esencial:

- 4 espacios de sangría. Líneas cortas (hasta unos 79 a 99 caracteres).
- `snake_case` para variables y funciones, `CamelCase` para clases, `MAYUSCULAS` para constantes.
- Nombres que expliquen: `precio_total` mejor que `pt` o `x`.
- Funciones pequeñas que hagan **una sola cosa**.
- No repitas código: si copias y pegas, probablemente necesitas una función o un bucle.

Idioms pythónicos:

```python
if lista:                      # en vez de if len(lista) > 0:
for i, x in enumerate(lista):  # en vez de range(len(lista))
a, b = b, a                    # intercambio
valor = d.get("k", 0)          # en vez de comprobar con if
texto = ", ".join(nombres)     # en vez de concatenar en un bucle
with open(...) as f:           # siempre para archivos
```

Un script típico se organiza así, para que el código solo se ejecute al lanzarlo directamente:

```python
def main():
    ...

if __name__ == "__main__":
    main()
```

Escribe `import this` en la zona libre para leer "El Zen de Python".
::ejemplo
import this
::ejercicio
Este código funciona pero es poco pythónico. **Reescribe** `procesar(nombres)` para que haga lo mismo (devolver los nombres de más de 3 letras, con formato título, unidos por `", "`) en **una o dos líneas**, usando una comprensión y `join`.
::codigo
def procesar(nombres):
    resultado = ""
    for i in range(len(nombres)):
        if len(nombres[i]) > 3:
            if resultado != "":
                resultado = resultado + ", "
            resultado = resultado + nombres[i].title()
    return resultado + "PENDIENTE DE MEJORAR"
::prueba
assert procesar(["ana", "luisa", "bo", "MARTA"]) == "Luisa, Marta", f"dio {procesar(['ana', 'luisa', 'bo', 'MARTA'])!r}"
assert procesar([]) == "", "Para una lista vacía debe devolver ''"
codigo_f = procesar.__code__
cuerpo = {l for *_, l in codigo_f.co_lines() if l and l != codigo_f.co_firstlineno}
assert len(cuerpo) <= 2, f"El cuerpo de la función tiene {len(cuerpo)} líneas; intenta dejarlo en 1 o 2"
::pista
`return ", ".join(n.title() for n in nombres if len(n) > 3)`
::solucion
def procesar(nombres):
    return ", ".join(n.title() for n in nombres if len(n) > 3)
::quiz
? Según PEP 8, ¿cómo se nombra una función?
* calcular_total
- CalcularTotal
- CALCULAR_TOTAL

@modulo Proyectos finales | 🏆 | junta todo lo aprendido

@leccion proyecto_texto | Proyecto 1: analizador de texto | 12
::teoria
Vas a construir una herramienta real que combina **strings, diccionarios, funciones y comprensiones**.

Divide el problema en pasos pequeños (así se programa de verdad):

1. Normalizar el texto: minúsculas y sin signos de puntuación.
2. Obtener la lista de palabras.
3. Calcular métricas: total de palabras, palabras únicas, la más larga, la más frecuente.
4. Devolver todo en un diccionario.

> 💡 Prueba cada paso por separado con `print()` antes de seguir con el siguiente. Si algo falla, sabrás exactamente dónde.
::ejemplo
import string
print(string.punctuation)
texto = "¡Hola! ¿Qué tal? Hola, hola."
limpio = "".join(c for c in texto.lower() if c not in string.punctuation + "¿¡")
print(limpio)
print(limpio.split())
::ejercicio
Escribe `analizar(texto)` que devuelva un diccionario con:

- `"palabras"`: número total de palabras
- `"unicas"`: número de palabras distintas
- `"mas_larga"`: la palabra más larga (si hay empate, la primera que aparece)
- `"mas_comun"`: la palabra más frecuente (si hay empate, la primera que aparece)
- `"promedio"`: longitud media de las palabras, con 2 decimales

Ignora mayúsculas y los signos de `string.punctuation` más `¿¡`. Para un texto sin palabras devuelve `{"palabras": 0, "unicas": 0, "mas_larga": "", "mas_comun": "", "promedio": 0}`.
::codigo
import string

def analizar(texto):
    pass

print(analizar("El perro y el gato. ¡El perro corre!"))
::prueba
r = analizar("El perro y el gato. ¡El perro corre!")
esperado = {"palabras": 8, "unicas": 5, "mas_larga": "perro", "mas_comun": "el", "promedio": 3.25}
assert r == esperado, f"dio {r}\nesperado {esperado}"
vacio = {"palabras": 0, "unicas": 0, "mas_larga": "", "mas_comun": "", "promedio": 0}
assert analizar("") == vacio, f"Para texto vacío dio {analizar('')}"
assert analizar("¡¿...?!") == vacio, "Un texto solo con signos no tiene palabras"
r = analizar("sol luna sol luna mar")
assert r["mas_comun"] == "sol", "En empate debe ganar la primera que aparece"
::pista
Con `Counter(palabras).most_common(1)` los empates se resuelven por orden de aparición. Para la más larga: `max(palabras, key=len)` también devuelve la primera en caso de empate.
::solucion
import string
from collections import Counter

def analizar(texto):
    signos = string.punctuation + "¿¡"
    limpio = "".join(c for c in texto.lower() if c not in signos)
    palabras = limpio.split()
    if not palabras:
        return {"palabras": 0, "unicas": 0, "mas_larga": "", "mas_comun": "", "promedio": 0}
    return {
        "palabras": len(palabras),
        "unicas": len(set(palabras)),
        "mas_larga": max(palabras, key=len),
        "mas_comun": Counter(palabras).most_common(1)[0][0],
        "promedio": round(sum(len(p) for p in palabras) / len(palabras), 2),
    }

print(analizar("El perro y el gato. ¡El perro corre!"))

@leccion proyecto_tareas | Proyecto 2: gestor de tareas | 15
::teoria
Ahora un programa con **clases**, **listas de objetos**, **errores** y **ordenación**: el corazón de cualquier app de productividad.

Diseño:

- `Tarea`: título, prioridad (1 alta a 3 baja) y si está hecha.
- `GestorTareas`: guarda tareas y ofrece operaciones para añadir, completar, listar pendientes y calcular el progreso.

Piensa primero en **qué** debe hacer cada método (sus entradas y su salida) y solo después en **cómo**.
::ejemplo
from dataclasses import dataclass

@dataclass
class Tarea:
    titulo: str
    prioridad: int = 2
    hecha: bool = False

t = Tarea("Estudiar Python", 1)
print(t)
t.hecha = True
print(t.hecha)
::ejercicio
Completa `GestorTareas`:

- `agregar(titulo, prioridad=2)`: crea una `Tarea` y la guarda. Lanza `ValueError` si el título está vacío, si la prioridad no es 1, 2 o 3, o si ya existe una tarea con ese título (sin distinguir mayúsculas).
- `completar(titulo)`: marca como hecha la tarea con ese título (sin distinguir mayúsculas). Si no existe, lanza `KeyError`.
- `pendientes()`: lista de **títulos** no hechos, ordenados por prioridad y luego alfabéticamente.
- `progreso()`: porcentaje de tareas hechas, entero redondeado (0 si no hay tareas).
::codigo
from dataclasses import dataclass

@dataclass
class Tarea:
    titulo: str
    prioridad: int = 2
    hecha: bool = False

class GestorTareas:
    def __init__(self):
        self.tareas = []

    def agregar(self, titulo, prioridad=2):
        pass

    def completar(self, titulo):
        pass

    def pendientes(self):
        pass

    def progreso(self):
        pass
::prueba
g = GestorTareas()
assert g.progreso() == 0, "Sin tareas, el progreso es 0"
g.agregar("Comprar pan", 3)
g.agregar("Estudiar", 1)
g.agregar("Correr")
g.agregar("Banco", 1)
assert g.pendientes() == ["Banco", "Estudiar", "Correr", "Comprar pan"], f"pendientes() dio {g.pendientes()}"
g.completar("estudiar")
assert g.pendientes() == ["Banco", "Correr", "Comprar pan"], f"tras completar: {g.pendientes()}"
assert g.progreso() == 25, f"progreso debería ser 25 y es {g.progreso()}"
for args in [("",), ("   ",), ("X", 5), ("ESTUDIAR",)]:
    try:
        g.agregar(*args)
    except ValueError:
        pass
    else:
        raise AssertionError(f"agregar{args} debería lanzar ValueError")
try:
    g.completar("No existe")
except KeyError:
    pass
else:
    raise AssertionError("completar de una tarea inexistente debe lanzar KeyError")
g.completar("Banco")
g.completar("Correr")
assert g.progreso() == 75, f"progreso debería ser 75 y es {g.progreso()}"
::pista
Crea un método auxiliar `_buscar(titulo)` que recorra `self.tareas` comparando `t.titulo.lower() == titulo.lower()` y devuelva la tarea o `None`. Para ordenar: `sorted(pend, key=lambda t: (t.prioridad, t.titulo))`.
::solucion
from dataclasses import dataclass

@dataclass
class Tarea:
    titulo: str
    prioridad: int = 2
    hecha: bool = False

class GestorTareas:
    def __init__(self):
        self.tareas = []

    def _buscar(self, titulo):
        for t in self.tareas:
            if t.titulo.lower() == titulo.strip().lower():
                return t
        return None

    def agregar(self, titulo, prioridad=2):
        if not titulo.strip():
            raise ValueError("Título vacío")
        if prioridad not in (1, 2, 3):
            raise ValueError("Prioridad debe ser 1, 2 o 3")
        if self._buscar(titulo):
            raise ValueError("La tarea ya existe")
        self.tareas.append(Tarea(titulo.strip(), prioridad))

    def completar(self, titulo):
        t = self._buscar(titulo)
        if t is None:
            raise KeyError(titulo)
        t.hecha = True

    def pendientes(self):
        pend = [t for t in self.tareas if not t.hecha]
        return [t.titulo for t in sorted(pend, key=lambda t: (t.prioridad, t.titulo))]

    def progreso(self):
        if not self.tareas:
            return 0
        hechas = sum(1 for t in self.tareas if t.hecha)
        return round(hechas * 100 / len(self.tareas))

@leccion proyecto_juego | Proyecto 3: juego de adivinar | 10
::teoria
El clásico juego: la computadora piensa un número y tú lo adivinas con pistas "mayor" o "menor".

Para que se pueda **probar automáticamente**, separamos la lógica de la interacción:

- `pista(secreto, intento)` devuelve `"mayor"`, `"menor"` o `"correcto"`.
- `jugar(secreto, intentos)` simula una partida con una lista de intentos y devuelve en qué intento se acertó (o `-1`).

Separar la lógica (funciones puras) de la entrada/salida (`input`, `print`) es una de las mejores costumbres que puedes tener: el código queda testeable y reutilizable. Debajo tienes la versión interactiva para jugar de verdad.
::ejemplo
import random

secreto = random.randint(1, 100)
intentos = 0
print("Pensé un número del 1 al 100")
while True:
    texto = input("Tu intento (vacío para rendirte): ")
    if not texto:
        print("El número era", secreto)
        break
    if not texto.isdigit():
        print("Escribe un número")
        continue
    intento = int(texto)
    intentos += 1
    if intento < secreto:
        print(intento, "→ es mayor")
    elif intento > secreto:
        print(intento, "→ es menor")
    else:
        print(f"¡Correcto en {intentos} intentos!")
        break
::ejercicio
Escribe:

1. `pista(secreto, intento)` → `"mayor"` si el secreto es mayor que el intento, `"menor"` si es menor, `"correcto"` si son iguales.
2. `jugar(secreto, intentos)` → recorre la lista de intentos usando `pista` y devuelve el número de intento (empezando en 1) en que se acertó, o `-1` si nunca se acierta.
3. `mejor_estrategia(minimo, maximo, secreto)` → adivina usando **búsqueda binaria** (prueba siempre el punto medio con `//`) y devuelve cuántos intentos necesitó. Para 1 a 100 nunca debe pasar de 7.
::codigo
def pista(secreto, intento):
    pass

def jugar(secreto, intentos):
    pass

def mejor_estrategia(minimo, maximo, secreto):
    pass
::prueba
assert pista(50, 30) == "mayor" and pista(50, 70) == "menor" and pista(5, 5) == "correcto", "pista() no es correcta"
assert jugar(42, [10, 80, 42, 50]) == 3, f"jugar(42, [10, 80, 42, 50]) dio {jugar(42, [10, 80, 42, 50])}"
assert jugar(7, [1, 2, 3]) == -1, "Si nunca acierta debe devolver -1"
assert jugar(7, [7]) == 1, "Acertar a la primera es el intento 1"
assert mejor_estrategia(1, 100, 50) == 1, "Para 50 en 1..100 el primer intento (50) acierta"
maximo = max(mejor_estrategia(1, 100, s) for s in range(1, 101))
assert maximo <= 7, f"La búsqueda binaria no debería pasar de 7 intentos y llegó a {maximo}"
assert all(mejor_estrategia(1, 1000, s) <= 10 for s in range(1, 1001)), "En 1..1000 no debería pasar de 10"
::pista
Búsqueda binaria: en un `while`, `medio = (minimo + maximo) // 2`, cuenta un intento, y según la pista mueve `minimo = medio + 1` o `maximo = medio - 1` hasta acertar.
::solucion
def pista(secreto, intento):
    if secreto > intento:
        return "mayor"
    if secreto < intento:
        return "menor"
    return "correcto"

def jugar(secreto, intentos):
    for i, intento in enumerate(intentos, start=1):
        if pista(secreto, intento) == "correcto":
            return i
    return -1

def mejor_estrategia(minimo, maximo, secreto):
    intentos = 0
    while True:
        medio = (minimo + maximo) // 2
        intentos += 1
        p = pista(secreto, medio)
        if p == "correcto":
            return intentos
        if p == "mayor":
            minimo = medio + 1
        else:
            maximo = medio - 1

@leccion proyecto_inventario | Proyecto 4: inventario con reportes | 15
::teoria
El reto final simula una tarea típica de trabajo: procesar datos en **CSV**, calcular métricas y generar un **reporte**. Usarás archivos, diccionarios, ordenación, formato y manejo de errores.

Datos de entrada (texto CSV):

```
producto,categoria,precio,stock
Teclado,perifericos,25.5,10
Monitor,pantallas,180,3
...
```

Consejo: `csv.DictReader` acepta cualquier iterable de líneas, así que puedes usar `texto.splitlines()` sin crear un archivo.
::ejemplo
import csv
datos = """producto,precio
Lápiz,0.5
Cuaderno,2.25"""
for fila in csv.DictReader(datos.splitlines()):
    print(fila["producto"], float(fila["precio"]) * 2)
::ejercicio
Escribe `reporte(texto_csv)` que devuelva un diccionario con:

- `"valor_total"`: suma de precio × stock de todos los productos, redondeada a 2 decimales
- `"agotados"`: lista ordenada alfabéticamente de productos con stock 0
- `"por_categoria"`: diccionario categoría → valor (precio × stock) redondeado a 2 decimales
- `"top"`: nombre del producto con más valor en inventario
- `"errores"`: número de filas con datos no numéricos en precio o stock (esas filas se ignoran)
::codigo
import csv

def reporte(texto_csv):
    pass

DATOS = """producto,categoria,precio,stock
Teclado,perifericos,25.5,10
Monitor,pantallas,180,3
Ratón,perifericos,15,0
Webcam,perifericos,45,2
Tablet,pantallas,abc,5
Cable,accesorios,3.99,100"""

print(reporte(DATOS))
::prueba
r = reporte(DATOS)
assert r["valor_total"] == 1284.0, f"valor_total: {r['valor_total']}"
assert r["agotados"] == ["Ratón"], f"agotados: {r['agotados']}"
assert r["por_categoria"] == {"perifericos": 345.0, "pantallas": 540.0, "accesorios": 399.0}, f"por_categoria: {r['por_categoria']}"
assert r["top"] == "Monitor", f"top: {r['top']}"
assert r["errores"] == 1, f"errores: {r['errores']}"
r2 = reporte("producto,categoria,precio,stock\nA,x,1,1\nB,x,dos,1\nC,y,1,tres")
assert r2["errores"] == 2 and r2["valor_total"] == 1.0, f"Con dos filas malas dio {r2}"
::pista
Recorre `csv.DictReader(texto_csv.splitlines())`. En un `try` convierte `float(fila["precio"])` e `int(fila["stock"])`; en `except ValueError` suma 1 a errores y `continue`. Guarda el valor de cada producto en un diccionario para calcular el `top` con `max(valores, key=valores.get)`.
::solucion
import csv

def reporte(texto_csv):
    total = 0
    agotados = []
    por_categoria = {}
    valores = {}
    errores = 0
    for fila in csv.DictReader(texto_csv.splitlines()):
        try:
            precio = float(fila["precio"])
            stock = int(fila["stock"])
        except ValueError:
            errores += 1
            continue
        valor = precio * stock
        total += valor
        valores[fila["producto"]] = valor
        cat = fila["categoria"]
        por_categoria[cat] = por_categoria.get(cat, 0) + valor
        if stock == 0:
            agotados.append(fila["producto"])
    return {
        "valor_total": round(total, 2),
        "agotados": sorted(agotados),
        "por_categoria": {c: round(v, 2) for c, v in por_categoria.items()},
        "top": max(valores, key=valores.get) if valores else None,
        "errores": errores,
    }

DATOS = """producto,categoria,precio,stock
Teclado,perifericos,25.5,10
Monitor,pantallas,180,3
Ratón,perifericos,15,0
Webcam,perifericos,45,2
Tablet,pantallas,abc,5
Cable,accesorios,3.99,100"""

print(reporte(DATOS))
