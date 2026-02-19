# Prueba Tecnica - Panel CMS

## Instalación y Ejecución

### Pasos

```bash
# 1 - Clonar el repositorio
git clone "https://github.com/alexvc1999/prueba-tecnica-alejandro"
cd prueba-tecnica-alejandro

# 2 - Instalar dependencias
npm install

# 3 - Lanzar el servidor dev
npm run dev
```

> Es necesario tener Node.js instalado para que funcione el proyecto.

---

## Decisiones Técnicas

### Datos

Como la prueba no requeria un backend real, simplemente he guardado los datos en memoria, permitiendo operaciones CRUD, pero que se pierden al cerrar el servidor. Para realizar esas operaciones, se han utilizado rutas API con Next.js.

### Idioma

Para poder cambiar de idioma en la aplicacion, he usado LanguageContext, para poder almacenar el contexto del idioma en toda la aplicacion, y asi poder mostrar en todo momento el idioma seleccionado.

### Gestión de estados

En cuanto a la gestión de estados, he implementado un spinner de carga, para cuando se realiza la carga de la ventana, para cuando la lista esta vacia, muestra un mensaje de que no hay productos, y tambien he añadido un boton para simular un error en la carga de los datos.

### Autenticación y sesión

Para el tema de la sesion, he hecho un login sencillo, que crea una cookie de sesion. Tambien tengo un middleware que comprueba las rutas que se cargan y si existe la cookie de sesion, y te redirige al login o al panel segun se haya iniciado sesión o no.

---

## Posibles Mejoras

Se podrian implementar las siguientes mejoras en el futuro:

- **Persistencia de datos** — Añadir una base de datos, dependiendo de las necesidades del proyecto, para poder persistir los datos.
- **Autenticación real** — Añadir un login real, con JWT, para que la pagina este realmente protegida y poder crear diferentes usuarios.
- **Paginación** — En un panel real, no se cargarian todos los datos a la vez.
- **Datos** — Se podrian añadir mas campos a los datos, como ventas, imagenes, etc...
- **Informes** — Por ultimo se podria añadir una ventana de informes, de las ventas de los productos, por ejemplo.
