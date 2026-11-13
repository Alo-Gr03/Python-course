@chuleta Básicos
```python
print("Hola", nombre, sep=" ", end="\n")
x = 10            # int
y = 3.5           # float
s = "texto"       # str
ok = True         # bool
nada = None
type(x)  int("5")  float("2.5")  str(9)
input("Pregunta: ")   # siempre devuelve str
```

@chuleta Operadores
```python
+  -  *  /  //  %  **        # aritméticos
==  !=  <  >  <=  >=         # comparación
and  or  not  in  is         # lógicos y pertenencia
x += 1   x -= 1   x *= 2     # asignación compuesta
```

@chuleta Strings
```python
f"{nombre} tiene {edad} años"   f"{precio:,.2f}"   f"{0.25:.0%}"
s.upper() s.lower() s.title() s.strip()
s.replace("a", "b")   s.split(",")   ", ".join(lista)
s.startswith("x")  s.endswith("x")  s.find("x")  s.count("x")
s[0]  s[-1]  s[1:4]  s[::-1]   len(s)   "py" in s
```

@chuleta Condicionales
```python
if x > 0:
    ...
elif x == 0:
    ...
else:
    ...
estado = "par" if n % 2 == 0 else "impar"
match comando:
    case "a" | "b": ...
    case _: ...
```

@chuleta Bucles
```python
for i in range(5):            # 0..4
for i in range(2, 10, 2):     # 2, 4, 6, 8
for x in lista:
for i, x in enumerate(lista):
for a, b in zip(lista1, lista2):
for k, v in diccionario.items():
while condicion:
break      continue
```

@chuleta Listas
```python
l = [1, 2, 3]
l.append(4)  l.insert(0, x)  l.extend(otra)
l.pop()  l.pop(i)  l.remove(x)  l.index(x)  l.count(x)
l.sort(reverse=True)   sorted(l, key=len)   l.copy()
sum(l)  max(l)  min(l)  len(l)
[x * 2 for x in l if x > 1]
any(x > 2 for x in l)   all(...)
```

@chuleta Tuplas, dicts y sets
```python
t = (1, 2)          a, b = t        a, b = b, a
d = {"k": 1}        d["k"]          d.get("k", 0)
d["nuevo"] = 2      del d["k"]      "k" in d
d.keys()  d.values()  d.items()     d.update(otro)
{k: v for k, v in pares}
s = {1, 2}   s.add(3)   a | b   a & b   a - b   a ^ b
```

@chuleta Funciones
```python
def f(a, b=2, *args, **kwargs):
    """Docstring."""
    return a + b

f(1)  f(1, 3)  f(b=5, a=1)  f(*lista)  f(**dic)
cuadrado = lambda x: x ** 2
sorted(datos, key=lambda d: (-d["pts"], d["nombre"]))
```

@chuleta Errores
```python
try:
    ...
except ValueError as e:
    print(e)
except (KeyError, IndexError):
    ...
else:
    ...       # si no hubo error
finally:
    ...       # siempre
raise ValueError("mensaje")
```

@chuleta Clases
```python
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre
    def __str__(self):
        return self.nombre

class Gato(Animal):
    def __init__(self, nombre, color):
        super().__init__(nombre)
        self.color = color

from dataclasses import dataclass
@dataclass
class Punto:
    x: float
    y: float = 0
```

@chuleta Archivos y módulos
```python
with open("a.txt", "w", encoding="utf-8") as f:
    f.write("hola\n")
with open("a.txt", encoding="utf-8") as f:
    for linea in f: ...

import math, random, json, csv
from collections import Counter, defaultdict
from datetime import date, datetime
json.dumps(obj)  json.loads(texto)
Counter(lista).most_common(3)
```
