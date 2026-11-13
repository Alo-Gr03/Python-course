#!/usr/bin/env python3
"""Descarga Pyodide y lo empaqueta en vendor/pyodide/ para que el curso funcione 100% sin conexión,
incluso abriendo index.html con doble clic (file://).

Los binarios (wasm, biblioteca estándar y lock) se guardan en base64 dentro de pyodide-data.js,
porque los navegadores no dejan usar fetch() sobre archivos locales pero sí cargar <script>.

Uso: python3 tools/vendor_pyodide.py
"""
import base64
import json
import pathlib
import urllib.request

VERSION = "0.26.4"
CDN = f"https://cdn.jsdelivr.net/npm/pyodide@{VERSION}/"
DEST = pathlib.Path(__file__).resolve().parent.parent / "vendor" / "pyodide"
SCRIPTS = ["pyodide.js", "pyodide.asm.js"]
DATA = {"pyodide.asm.wasm": "application/wasm", "python_stdlib.zip": "application/zip", "pyodide-lock.json": "application/json"}


def descargar(nombre):
    with urllib.request.urlopen(CDN + nombre) as r:
        return r.read()


def main():
    DEST.mkdir(parents=True, exist_ok=True)
    for f in SCRIPTS:
        (DEST / f).write_bytes(descargar(f))
    partes = [f"// Pyodide {VERSION} empaquetado por tools/vendor_pyodide.py. No editar a mano.\n",
              "window.PYODIDE_FILES = {\n"]
    for nombre, tipo in DATA.items():
        b64 = base64.b64encode(descargar(nombre)).decode("ascii")
        partes.append(f"{json.dumps(nombre)}: {{type: {json.dumps(tipo)}, b64: \"{b64}\"}},\n")
    partes.append("};\n")
    (DEST / "pyodide-data.js").write_text("".join(partes), encoding="ascii")
    for f in DATA:
        (DEST / f).unlink(missing_ok=True)
    total = sum(p.stat().st_size for p in DEST.iterdir())
    print(f"✓ Pyodide {VERSION} en {DEST} ({total / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
