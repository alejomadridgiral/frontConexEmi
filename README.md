# frontConexEMI

**frontConexEMI** es una plataforma que conecta a emprendedores, inversores, mentores y organizaciones dentro de un ecosistema dinámico y vibrante que fomenta el crecimiento y éxito de nuevas ideas y negocios en Colombia.

<div align="center">
  <img src="https://github.com/user-attachments/assets/1ce09bac-3b8a-4f47-91bc-28f101caba9b" alt="Logo Conexemi" />
</div>

##Tabla de Contenidos

1. [Vista previa](#vista-previa)
2. [Instalación](#instalación)
3. [Uso](#uso)
4. [Scripts Disponibles](#scripts-disponibles)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Contribuir](#contribuir)
7. [Licencia](#licencia)

---
## Vista previa

![Homepage](https://github.com/user-attachments/assets/64fef91a-c86a-4c35-8827-ca4c6d088d85)

![Emprendimientos](https://github.com/user-attachments/assets/240414b0-45aa-46c2-ba52-f4ec8965df82)

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/alejomadridgiral/frontConexEMI.git
    cd frontConexEMI
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

---

## Uso

Para iniciar el servidor de desarrollo, ejecuta:
```bash
npm start
```
Esto iniciará la aplicación en [http://localhost:4200/](http://localhost:4200/).

---

## Scripts Disponibles

En el proyecto puedes ejecutar los siguientes scripts:

- **`npm start`**: Inicia el servidor de desarrollo.
- **`npm run build`**: Compila la aplicación para producción en la carpeta `dist`.
- **`npm run watch`**: Compila la aplicación en modo desarrollo y observa los cambios.
- **`npm test`**: Ejecuta las pruebas unitarias.

---

## Estructura del Proyecto

La estructura principal del proyecto es la siguiente:

```
frontConexEMI/
├── .editorconfig
├── .gitignore
├── .vscode/
│   ├── extensions.json
│   ├── launch.json
│   └── tasks.json
├── angular.json
├── package.json
├── public/
├── README.md
├── src/
│   ├── app/
│   │   ├── app-routing.module.ts
│   │   ├── app.component.css
│   │   ├── app.component.html
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.server.ts
│   │   ├── app.module.ts
│   │   ├── app.routes.server.ts
│   │   └── components/
│   │       └── ...
│   ├── config/
│   │   └── baseurl.ts
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── server.ts
│   ├── styles.css
│   └── replace-underscore.pipe.spec.ts
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json
```

---

## Contribuir

Las contribuciones son bienvenidas. Sigue estos pasos para contribuir:

1. Haz un fork del proyecto.
2. Crea una nueva rama:
    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```
3. Realiza los cambios necesarios y haz commit:
    ```bash
    git commit -m 'Añadir nueva funcionalidad'
    ```
4. Sube los cambios a tu fork:
    ```bash
    git push origin feature/nueva-funcionalidad
    ```
5. Abre un **Pull Request**.

---

## Licencia

Este proyecto está licenciado bajo la **Licencia MIT**. Consulta el archivo `LICENSE` para más detalles.
