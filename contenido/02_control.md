@modulo Decisiones | 🔀 | comparaciones, if, elif, else y lógica

@leccion comparaciones | Comparaciones y booleanos | 5
::teoria
Una comparación da `True` o `False` (tipo `bool`).

| Operador | Significa |
|---|---|
| `==` | igual (¡dos signos! `=` solo asigna) |
| `!=` | distinto |
| `<` `>` `<=` `>=` | menor, mayor, menor o igual, mayor o igual |
| `in` | está dentro de (texto, lista...) |

Combinar condiciones:

- `and`: verdadero si **ambas** lo son
- `or`: verdadero si **al menos una** lo es
- `not`: invierte

```python
edad = 20
tiene_entrada = True
puede_pasar = edad >= 18 and tiene_entrada   # True
```

Python permite encadenar: `0 <= nota <= 10`. Los textos también se comparan: `"a" < "b"` es `True`, y `"Hola" == "hola"` es `False` (distingue mayúsculas).
::ejemplo
x = 7
print(x > 5, x == 7, x != 7)
print(x > 5 and x < 10)
print(x < 0 or x > 100)
print(not x > 5)
print(1 <= x <= 10)
print("py" in "python", "z" in "python")
::ejercicio
Escribe `puede_conducir(edad, tiene_licencia, alcohol)` que devuelva `True` solo si la persona tiene **18 o más**, **tiene licencia** y su nivel de `alcohol` es **menor que 0.5**.

Hazlo en una sola línea con `return` y `and`.
::codigo
def puede_conducir(edad, tiene_licencia, alcohol):
    pass
::prueba
casos = [((20, True, 0.0), True), ((17, True, 0.0), False), ((30, False, 0.0), False),
         ((30, True, 0.5), False), ((18, True, 0.49), True)]
for args, esperado in casos:
    r = puede_conducir(*args)
    assert r == esperado, f"puede_conducir{args} debería ser {esperado} y dio {r}"
::pista
`return edad >= 18 and tiene_licencia and alcohol < 0.5`
::solucion
def puede_conducir(edad, tiene_licencia, alcohol):
    return edad >= 18 and tiene_licencia and alcohol < 0.5
::quiz
? ¿Qué diferencia hay entre = y ==?
* = asigna un valor; == compara
- Son lo mismo
- == asigna; = compara
? ¿Qué da True or False and False?
* True
- False
= and se evalúa antes que or: True or (False and False) → True or False → True.

@leccion if_elif | if, elif, else | 7
::teoria
`if` ejecuta un bloque solo si la condición es verdadera. `elif` (si no, si...) prueba otra condición y `else` cubre todo lo demás.

```python
nota = 7.5
if nota >= 9:
    print("Sobresaliente")
elif nota >= 7:
    print("Notable")
elif nota >= 5:
    print("Aprobado")
else:
    print("Suspenso")
```

- Cada línea `if/elif/else` termina en `:` y su bloque va sangrado.
- Python revisa de arriba hacia abajo y entra **solo en el primer** bloque que se cumpla. Por eso el orden importa.
- `elif` y `else` son opcionales.

Dentro de una función puedes usar `return` en cada rama.
::ejemplo
def clasificar_temperatura(t):
    if t < 0:
        return "helada"
    elif t < 15:
        return "frío"
    elif t < 25:
        return "agradable"
    else:
        return "calor"

for t in [-5, 10, 20, 35]:
    print(t, clasificar_temperatura(t))
::ejercicio
Escribe `calcular_imc(peso, altura)` que calcule `imc = peso / altura ** 2` y devuelva:

- `"bajo"` si imc < 18.5
- `"normal"` si imc < 25
- `"sobrepeso"` si imc < 30
- `"obesidad"` en otro caso
::codigo
def calcular_imc(peso, altura):
    imc = peso / altura ** 2
    # completa con if / elif / else

print(calcular_imc(70, 1.75))
::prueba
casos = [(50, 1.80, "bajo"), (70, 1.75, "normal"), (85, 1.75, "sobrepeso"), (110, 1.70, "obesidad"), (75, 1.7320508, "sobrepeso"), (72, 1.7320508, "normal")]
for p, a, esp in casos:
    r = calcular_imc(p, a)
    assert r == esp, f"calcular_imc({p}, {a}) debería ser {esp!r} y dio {r!r}"
::pista
Ordena las condiciones de menor a mayor y usa `return` en cada rama: `if imc < 18.5: return "bajo"`...
::solucion
def calcular_imc(peso, altura):
    imc = peso / altura ** 2
    if imc < 18.5:
        return "bajo"
    elif imc < 25:
        return "normal"
    elif imc < 30:
        return "sobrepeso"
    else:
        return "obesidad"

print(calcular_imc(70, 1.75))
::quiz
? Si x = 15, ¿qué imprime? if x > 10: print("A") elif x > 5: print("B")
* Solo A
- A y B
- Solo B
= Entra en el primer bloque que se cumple y salta el resto.

@leccion logica | Valores verdaderos y atajos | 6
::teoria
En un `if` cualquier valor se interpreta como verdadero o falso (**truthiness**). Son **falsos**: `0`, `0.0`, `""` (texto vacío), `[]`, `{}`, `None` y `False`. Todo lo demás es verdadero.

```python
nombre = ""
if not nombre:
    print("Falta el nombre")
```

**Expresión condicional (ternario)**, un if en una línea:

```python
estado = "mayor" if edad >= 18 else "menor"
```

**`in` con varias opciones** en lugar de muchos `or`:

```python
if dia in ("sábado", "domingo"):
    print("¡Finde!")
```

**`None`** representa "sin valor". Se compara con `is`: `if resultado is None:`.

Con `match` (Python 3.10+) puedes elegir entre muchos casos de forma limpia:

```python
match comando:
    case "salir":
        ...
    case "ayuda" | "?":
        ...
    case _:
        ...   # cualquier otro
```
::ejemplo
for valor in [0, 1, "", "hola", [], [1, 2], None]:
    print(repr(valor), "→", "verdadero" if valor else "falso")

def tipo_dia(dia):
    match dia.lower():
        case "sábado" | "domingo":
            return "fin de semana"
        case "lunes" | "martes" | "miércoles" | "jueves" | "viernes":
            return "laborable"
        case _:
            return "no es un día"

print(tipo_dia("Domingo"), tipo_dia("martes"), tipo_dia("pizza"))
::ejercicio
El clásico **FizzBuzz** para un solo número. Escribe `fizzbuzz(n)` que devuelva:

- `"FizzBuzz"` si n es divisible por 3 **y** por 5
- `"Fizz"` si solo por 3
- `"Buzz"` si solo por 5
- el número como texto en otro caso (`str(n)`)
::codigo
def fizzbuzz(n):
    pass
::prueba
esperado = {1: "1", 3: "Fizz", 5: "Buzz", 15: "FizzBuzz", 9: "Fizz", 10: "Buzz", 30: "FizzBuzz", 7: "7"}
for n, e in esperado.items():
    r = fizzbuzz(n)
    assert r == e, f"fizzbuzz({n}) debería ser {e!r} y dio {r!r}"
::pista
Comprueba primero el caso de 15 (`n % 15 == 0` o `n % 3 == 0 and n % 5 == 0`); si lo pones al final, nunca se alcanzará.
::solucion
def fizzbuzz(n):
    if n % 15 == 0:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    return str(n)
::quiz
? ¿Cuál de estos valores es falso en un if?
- "0"
- [0]
* ""
= "0" y [0] no están vacíos, así que son verdaderos.
? ¿Qué vale x = "par" if 4 % 2 == 0 else "impar"?
* "par"
- "impar"
- True

@modulo Bucles | 🔁 | repetir sin copiar y pegar

@leccion while | Bucle while | 6
::teoria
`while` repite un bloque **mientras** la condición sea verdadera.

```python
cuenta = 3
while cuenta > 0:
    print(cuenta)
    cuenta -= 1      # ¡sin esto, el bucle no termina nunca!
print("¡Despegue!")
```

Úsalo cuando **no sabes cuántas vueltas** darás: repetir hasta que el usuario acierte, hasta que un saldo se acabe, etc.

> ⚠️ Si la condición nunca se vuelve falsa tienes un **bucle infinito**. Aquí el código se detiene solo a los 5 segundos.
::ejemplo
ahorro = 0
meses = 0
while ahorro < 1000:
    ahorro += 150
    meses += 1
print(f"Llegas a {ahorro} en {meses} meses")

n = 27
pasos = 0
while n != 1:          # conjetura de Collatz
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    pasos += 1
print("Pasos:", pasos)
::ejercicio
Escribe `anios_para_duplicar(capital, interes)` que devuelva cuántos años hacen falta para que el capital **llegue o supere el doble**, aplicando cada año `capital = capital * (1 + interes / 100)`.

- `anios_para_duplicar(1000, 10)` → `8`
- `anios_para_duplicar(500, 100)` → `1`
::codigo
def anios_para_duplicar(capital, interes):
    objetivo = capital * 2
    anios = 0
    # usa while
    return anios
::prueba
assert anios_para_duplicar(1000, 10) == 8, f"(1000, 10) debería ser 8 y dio {anios_para_duplicar(1000, 10)}"
assert anios_para_duplicar(500, 100) == 1, "(500, 100) debería ser 1"
assert anios_para_duplicar(100, 7) == 11, f"(100, 7) debería ser 11 y dio {anios_para_duplicar(100, 7)}"
::pista
`while capital < objetivo:` y dentro actualiza `capital` y suma 1 a `anios`.
::solucion
def anios_para_duplicar(capital, interes):
    objetivo = capital * 2
    anios = 0
    while capital < objetivo:
        capital = capital * (1 + interes / 100)
        anios += 1
    return anios
::quiz
? ¿Cuántas veces se imprime? i = 0; while i < 3: print(i); i += 1
- 2
* 3
- 4
= Imprime 0, 1 y 2.

@leccion for_range | Bucle for y range() | 7
::teoria
`for` recorre **cada elemento** de algo iterable: un texto, una lista, un rango de números...

```python
for letra in "hola":
    print(letra)
```

`range()` genera números:

| Llamada | Números |
|---|---|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(2, 6)` | 2, 3, 4, 5 |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8 |
| `range(5, 0, -1)` | 5, 4, 3, 2, 1 |

Como en los cortes, el final **no se incluye**.

**Patrón acumulador**, la base de muchísimos programas:

```python
total = 0
for n in range(1, 101):
    total += n
print(total)   # 5050
```

Usa `for` cuando sabes qué recorrer, y `while` cuando depende de una condición.
::ejemplo
for i in range(1, 6):
    print(f"{i} x 7 = {i * 7}")

vocales = 0
for letra in "programación en python":
    if letra in "aeiouáéíóú":
        vocales += 1
print("Vocales:", vocales)

for i in range(1, 5):
    print("*" * i)
::ejercicio
Escribe `suma_pares(n)` que devuelva la suma de todos los números **pares** entre 1 y n (incluido n).

- `suma_pares(10)` → `30` (2+4+6+8+10)
- `suma_pares(1)` → `0`
::codigo
def suma_pares(n):
    total = 0

    return total
::prueba
for n, e in [(10, 30), (1, 0), (2, 2), (7, 12), (100, 2550)]:
    r = suma_pares(n)
    assert r == e, f"suma_pares({n}) debería ser {e} y dio {r}"
::pista
`for i in range(2, n + 1, 2): total += i`, o recorre todos y usa `if i % 2 == 0`.
::solucion
def suma_pares(n):
    total = 0
    for i in range(2, n + 1, 2):
        total += i
    return total
::quiz
? ¿Qué números genera range(3, 8, 2)?
* 3, 5, 7
- 3, 5, 7, 9
- 3, 4, 5, 6, 7, 8
? ¿Cuántas vueltas da for i in range(10)?
- 9
* 10
- 11

@leccion break_continue | break, continue y bucles anidados | 6
::teoria
- `break` **sale** del bucle inmediatamente.
- `continue` **salta** al siguiente ciclo, sin ejecutar el resto del bloque.

```python
for n in range(1, 100):
    if n % 7 == 0:
        print("Primer múltiplo de 7:", n)
        break
```

Un bucle puede ir dentro de otro (**anidado**). El interior se completa entero en cada vuelta del exterior:

```python
for fila in range(1, 4):
    for col in range(1, 4):
        print(fila * col, end="\t")
    print()   # salto de línea al terminar la fila
```

`print(..., end="")` cambia lo que se pone al final (por defecto un salto de línea).

Un `return` dentro de un bucle en una función también lo corta: es la forma más limpia de "buscar y devolver".
::ejemplo
for n in range(10):
    if n % 2 == 0:
        continue      # salta los pares
    print(n, end=" ")
print()

def primer_negativo(numeros):
    for n in numeros:
        if n < 0:
            return n
    return None

print(primer_negativo([4, 8, -3, 5, -9]))
print(primer_negativo([1, 2]))
::ejercicio
Escribe `es_primo(n)` que devuelva `True` si n es primo (solo divisible por 1 y por sí mismo) y `False` si no. Los números menores que 2 no son primos.

Pista de eficiencia: basta con probar divisores desde 2 hasta la raíz cuadrada de n (`int(n ** 0.5) + 1`).
::codigo
def es_primo(n):
    pass
::prueba
primos = [2, 3, 5, 7, 11, 13, 97, 7919]
no_primos = [-3, 0, 1, 4, 9, 15, 21, 100, 7917]
for p in primos:
    assert es_primo(p) is True, f"{p} es primo y tu función dijo {es_primo(p)}"
for p in no_primos:
    assert es_primo(p) is False, f"{p} no es primo y tu función dijo {es_primo(p)}"
::pista
Si `n < 2` devuelve False. Recorre `range(2, int(n ** 0.5) + 1)`; si algún `n % d == 0`, devuelve False. Si termina el bucle, devuelve True.
::solucion
def es_primo(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5) + 1):
        if n % d == 0:
            return False
    return True
::quiz
? ¿Qué hace continue?
- Termina el programa
- Sale del bucle
* Pasa a la siguiente vuelta del bucle
? En dos bucles anidados, ¿de cuál sale un break?
* Solo del bucle donde está escrito (el más interno)
- De los dos
- De ninguno
