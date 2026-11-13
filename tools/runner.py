# Motor que ejecuta el codigo del alumno y las pruebas automaticas.
# Se usa igual en el navegador (Pyodide) y en tools/build.py para validar las soluciones.
import sys
import io
import time

_FILE = "<tu código>"
_MAX_OUT = 20000

_PISTAS = {
    "NameError": "Usaste un nombre que Python no conoce. ¿Está bien escrito? ¿Lo creaste antes de usarlo? Si era un texto, ¿le pusiste comillas?",
    "SyntaxError": "Python no entiende la estructura de esa línea. Revisa paréntesis y comillas sin cerrar, y los dos puntos (:) al final de if, for, while, def y class.",
    "IndentationError": "La sangría (los espacios al inicio de la línea) no cuadra. Dentro de un bloque usa siempre 4 espacios.",
    "TabError": "Mezclaste tabuladores y espacios. Usa solo espacios (4 por nivel).",
    "TypeError": "Estás combinando tipos que no encajan (por ejemplo texto + número) o llamando a una función con argumentos de más o de menos. Convierte con str(), int() o float() si hace falta.",
    "ZeroDivisionError": "No se puede dividir entre cero. Comprueba el divisor antes de dividir.",
    "IndexError": "Pediste una posición que no existe. Los índices empiezan en 0 y el último es len(x) - 1.",
    "KeyError": "Esa clave no existe en el diccionario. Comprueba con 'in' o usa .get(clave, valor_por_defecto).",
    "ValueError": "El tipo es correcto pero el valor no sirve, por ejemplo int('hola').",
    "AttributeError": "Ese objeto no tiene ese método o atributo. Revisa el nombre y de qué tipo es el objeto.",
    "TimeoutError": "Tu código tardó demasiado. ¿Hay un bucle infinito? Asegúrate de que la condición del while llegue a ser falsa.",
    "RecursionError": "Una función se llama a sí misma sin parar. Revisa el caso base.",
    "UnboundLocalError": "Asignas una variable dentro de la función y también la lees antes. Pásala como parámetro o devuélvela con return.",
    "ModuleNotFoundError": "Ese módulo no está disponible aquí. Revisa el nombre del import.",
    "FileNotFoundError": "El archivo no existe. Revisa el nombre o créalo antes con open(nombre, 'w').",
}


def _info_error(e, archivo):
    nombre = type(e).__name__
    linea = None
    if isinstance(e, SyntaxError):
        if e.filename == archivo:
            linea = e.lineno
        mensaje = f"{nombre}: {e.msg}"
    else:
        tb = e.__traceback__
        while tb is not None:
            if tb.tb_frame.f_code.co_filename == archivo:
                linea = tb.tb_lineno
            tb = tb.tb_next
        texto = str(e)
        mensaje = f"{nombre}: {texto}" if texto else nombre
    return {"type": nombre, "line": linea, "message": mensaje, "hint": _PISTAS.get(nombre, "")}


def run_code(code, test=None, timeout=5.0):
    """Ejecuta code. Si hay test, lo ejecuta despues en el mismo espacio de nombres.

    status: ok | error | pass | fail
    """
    resultado = {"status": "ok", "output": "", "error": None, "fail": None}
    ns = {"__name__": "__main__"}
    buf = io.StringIO()
    viejo_out, viejo_err = sys.stdout, sys.stderr
    inicio = [time.time()]
    contador = [0]

    def tracer(frame, event, arg):
        contador[0] += 1
        if (contador[0] & 1023) == 0 and time.time() - inicio[0] > timeout:
            raise TimeoutError(f"se superó el límite de {timeout:.0f} segundos")
        return tracer

    sys.stdout = sys.stderr = buf
    try:
        compilado = compile(code, _FILE, "exec")
        sys.settrace(tracer)
        try:
            exec(compilado, ns)
        finally:
            sys.settrace(None)
    except BaseException as e:  # tambien SystemExit / KeyboardInterrupt del alumno
        resultado["status"] = "error"
        resultado["error"] = _info_error(e, _FILE)
    finally:
        sys.stdout, sys.stderr = viejo_out, viejo_err

    salida = buf.getvalue()
    if len(salida) > _MAX_OUT:
        salida = salida[:_MAX_OUT] + "\n… (salida recortada)"
    resultado["output"] = salida

    if test and resultado["status"] == "ok":
        ns["salida"] = buf.getvalue()
        sys.stdout = sys.stderr = io.StringIO()
        inicio[0] = time.time()
        try:
            sys.settrace(tracer)
            try:
                exec(compile(test, "<prueba>", "exec"), ns)
            finally:
                sys.settrace(None)
            resultado["status"] = "pass"
        except AssertionError as e:
            resultado["status"] = "fail"
            resultado["fail"] = str(e) or "El resultado no es el esperado."
        except BaseException as e:
            info = _info_error(e, _FILE)
            resultado["status"] = "fail"
            donde = f" (línea {info['line']} de tu código)" if info["line"] else ""
            resultado["fail"] = f"Al probar tu código ocurrió {info['message']}{donde}."
        finally:
            sys.stdout, sys.stderr = viejo_out, viejo_err
    return resultado
