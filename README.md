tengo planeado que esta aplicación tenga tres páginas:
  1.inicio
    -hero section con fondo sólido pero con elementos lindos que destaquen
      -principalmente tipografía
      -animaciones
      -elementos sutiles (como svgs con animaciones (destellos) o algo más)
    -timeline de nuestros momentos más importantes (hasta ahora)
      -mostrar el sneak peek de la línea para que se entienda que debe dar scroll
      -utilizar el componente de MUI
      -añadir imágenes del otro lado de la fecha del acontecimiento
      -poner un continuará... al poner la última
  2.aplicación películas que hemos visto/queremos ver
    -botón para añadir nueva película
      -desplegará modal con formulario para crear un nuevo registro de película
    -consumir API: https://www.omdbapi.com/
    -o esta: https://developer.themoviedb.org/docs/getting-started en caso que no me convenza la anterior 
    -poner una tabla en orden ascendente (comenzando por la última que vimos) con columnas:
      -acciones (editar, eliminar)
      -título
      -quién la propuso
      -fecha que se ingresó al sistema (N/A para películas que vimos antes de la aplicación)
      -fecha que la vimos (se actualizará cuando apliquemos una calificación)
      -calificación (poner componente rating de MUI)
  3.aplicación lugares visitados/por visitar
    -CRUD con mismo concepto del de películas
    -cambiaría al tener la opción de añadir perfiles de RR.SS.

las 3 páginas van a tener la misma estructura base:
  -navbar (componente MUI)
    -sticky con fondo transparente, pero al hacer scroll que desaparezca
    -que en celular se convierta en hamburguer menu
  -contenido (este sí va a cambiar)
  -footer (pequeño pero lindo)
    -con una nota que diga: hecho con <3 por Alda (con link hacia mi perfil de github)

cosas que podría agregar según chat:
  -transiciones suaves entre rutas con framer-motion
  -sección "sobre nosotros" con cards animadas o galería con anécdotas
  -dark mode, ya si me pongo muy locochón

a considerar:
  -utilizar laravel para el backend (creación de endpoints para los CRUDs)
  -utilizar más la lógica por el lado del front y utilizar firebase o supabase (pero son de pago)
  -utilizar Node.js (Express) para que el proyecto sea JS full-stack