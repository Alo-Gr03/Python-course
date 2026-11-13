#!/usr/bin/env python3
"""Convierte contenido/*.md en js/curso-datos.js y valida cada ejercicio.

Uso:  python3 tools/build.py

Formato de los archivos de contenido:

    @modulo Titulo | icono | descripcion corta
    @leccion id | Titulo | minutos
    ::teoria       (markdown)
    ::ejemplo      (codigo Python que se puede ejecutar)
    ::ejercicio    (enunciado en markdown)
    ::codigo       (codigo inicial del reto)
    ::prueba       (asserts que validan el reto; 'salida' contiene lo impreso)
    ::pista        (texto)
    ::solucion     (codigo)
    ::quiz
    ? Pregunta
    - opcion incorrecta
    * opcion correcta
    = explicacion

    @chuleta Titulo   (seccion de la hoja de referencia, en markdown)
"""
import json
import pathlib
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0, str(RAIZ / "tools"))
import runner  # noqa: E402

SECCIONES = {"teoria", "ejemplo", "ejercicio", "codigo", "prueba", "pista", "solucion", "quiz"}


def limpiar(texto):
    return texto.strip("\n").rstrip() + ("\n" if texto.strip() else "")


def parse_quiz(texto, donde):
    preguntas = []
    actual = None
    for linea in texto.splitlines():
        if not linea.strip():
            continue
        marca, resto = linea[:1], linea[1:].strip()
        if marca == "?":
            actual = {"q": resto, "options": [], "answer": None, "explain": ""}
            preguntas.append(actual)
        elif marca in "-*":
            if marca == "*":
                actual["answer"] = len(actual["options"])
            actual["options"].append(resto)
        elif marca == "=":
            actual["explain"] = resto
        else:
            raise SystemExit(f"{donde}: línea de quiz no válida: {linea!r}")
    for p in preguntas:
        if p["answer"] is None:
            raise SystemExit(f"{donde}: pregunta sin respuesta correcta: {p['q']}")
    return preguntas


def parse(archivo):
    modulos, chuleta = [], []
    leccion = None
    seccion = None
    destino = None
    for n, linea in enumerate(archivo.read_text(encoding="utf-8").splitlines(), 1):
        if linea.startswith("@modulo "):
            titulo, icono, desc = [x.strip() for x in linea[8:].split("|")]
            modulos.append({"title": titulo, "icon": icono, "desc": desc, "lessons": []})
            leccion, seccion, destino = None, None, None
        elif linea.startswith("@leccion "):
            lid, titulo, minutos = [x.strip() for x in linea[9:].split("|")]
            leccion = {"id": lid, "title": titulo, "minutes": int(minutos)}
            modulos[-1]["lessons"].append(leccion)
            destino, seccion = leccion, None
        elif linea.startswith("@chuleta "):
            sec = {"title": linea[9:].strip(), "md": ""}
            chuleta.append(sec)
            destino, seccion = sec, "md"
            leccion = None
        elif linea.startswith("::") and leccion is not None:
            seccion = linea[2:].strip()
            if seccion not in SECCIONES:
                raise SystemExit(f"{archivo.name}:{n}: sección desconocida {seccion}")
            leccion[seccion] = ""
        elif destino is not None and seccion:
            destino[seccion] += linea + "\n"
    return modulos, chuleta


def main():
    import os, tempfile
    os.chdir(tempfile.mkdtemp())  # los ejemplos crean archivos
    modulos, chuleta = [], []
    for archivo in sorted((RAIZ / "contenido").glob("*.md")):
        m, c = parse(archivo)
        modulos += m
        chuleta += c

    ids = set()
    errores = 0
    total = 0
    for mi, mod in enumerate(modulos, 1):
        mod["id"] = f"m{mi}"
        for lec in mod["lessons"]:
            donde = f"{lec['id']}"
            if lec["id"] in ids:
                raise SystemExit(f"id repetido: {lec['id']}")
            ids.add(lec["id"])
            for k in list(lec):
                if k in SECCIONES and k != "quiz":
                    lec[k] = limpiar(lec[k])
            if "quiz" in lec:
                lec["quiz"] = parse_quiz(lec["quiz"], donde)
            for k in ("teoria", "ejercicio", "codigo", "prueba", "solucion"):
                if not lec.get(k, "").strip():
                    raise SystemExit(f"{donde}: falta la sección {k}")
            total += 1
            # 1) La solucion debe pasar la prueba
            r = runner.run_code(lec["solucion"], lec["prueba"])
            if r["status"] != "pass":
                errores += 1
                print(f"✗ {donde}: la solución no pasa -> {r['status']} {r['error'] or r['fail']}\n{r['output']}")
            # 2) El codigo inicial no debe pasar sin hacer nada
            r0 = runner.run_code(lec["codigo"], lec["prueba"])
            if r0["status"] == "pass":
                errores += 1
                print(f"✗ {donde}: ¡el código inicial ya pasa la prueba!")
            # 3) El ejemplo debe ejecutarse sin errores (si no usa input)
            if lec.get("ejemplo") and "input(" not in lec["ejemplo"]:
                r1 = runner.run_code(lec["ejemplo"])
                if r1["status"] != "ok":
                    errores += 1
                    print(f"✗ {donde}: el ejemplo falla -> {r1['error']}")

    if errores:
        raise SystemExit(f"\n{errores} problema(s). No se generó el archivo.")

    for c in chuleta:
        c["md"] = limpiar(c["md"])
    datos = {"modules": modulos, "cheatsheet": chuleta}
    runner_src = (RAIZ / "tools" / "runner.py").read_text(encoding="utf-8")
    salida = (
        "// Archivo generado por tools/build.py a partir de contenido/*.md. No editar a mano.\n"
        f"window.COURSE = {json.dumps(datos, ensure_ascii=False, indent=1)};\n"
        f"window.PY_RUNNER = {json.dumps(runner_src, ensure_ascii=False)};\n"
    )
    (RAIZ / "js" / "curso-datos.js").write_text(salida, encoding="utf-8")
    print(f"✓ {len(modulos)} módulos, {total} lecciones validadas, {len(chuleta)} secciones de chuleta.")


if __name__ == "__main__":
    main()
