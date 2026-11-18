"""Genera el portafolio estático con Python 3. Ejecutar: python build.py"""
from pathlib import Path
from shutil import copytree
from string import Template

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "src"
OUTPUT = ROOT / "docs"
# Título de navegación, nombre visible del archivo y símbolo del explorador.
PAGES = {
    "inicio": ("Inicio", "inicio.py", "λ"),
    "sobre-mi": ("Sobre mí", "sobre-mi.md", "#"),
    "proyectos": ("Proyectos", "proyectos.json", "{}"),
    "habilidades": ("Habilidades", "habilidades.js", "JS"),
    "contacto": ("Contacto", "contacto.txt", "@"),
}


def filename(key):
    return "index.html" if key == "inicio" else f"{key}.html"


def navigation(current, mode):
    links = []
    for key, (title, file_label, icon) in PAGES.items():
        state = ' aria-current="page"' if key == current else ""
        label = file_label if mode == "tabs" else title
        links.append(f'<a href="{filename(key)}" aria-label="{title}"{state}>'
                     f'<b aria-hidden="true">{icon}</b>{label}</a>')
    return "\n".join(links)


def build():
    OUTPUT.mkdir(exist_ok=True)
    copytree(SOURCE / "assets", OUTPUT / "assets", dirs_exist_ok=True)
    template = Template((SOURCE / "layout.html").read_text(encoding="utf-8"))
    for key, (title, file_label, _) in PAGES.items():
        page = template.substitute(
            title=title, file=file_label, explorer=navigation(key, "explorer"),
            tabs=navigation(key, "tabs"),
            content=(SOURCE / "pages" / f"{key}.html").read_text(encoding="utf-8"))
        (OUTPUT / filename(key)).write_text(page, encoding="utf-8")


if __name__ == "__main__":
    build()
