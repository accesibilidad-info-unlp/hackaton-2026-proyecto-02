# Interfaz accesible para la aplicación móvil de transporte 

## Motivación
El uso de transporte público es trasversal a la sociedad, es usado desde personas mayores, niños, personas con distintas discapacidades, etc. Aplicaciones como **"Cuando llega mi micro"**, **"Cuando Subo"** ayudan a la dinámica diaria para conocer con certeza los horarios y recorridos de los micros. 

Estas aplicaciones presentan dificultades en su uso por lo que su acceso resulta en una restricción para muchos. 

Se presentan problemas: 

- Exposición de IDs de paradas sin contenido semántico 
- Lector de pantallas: botones sin etiquetas: 
    - "Nav bar" -> para cuando se quiere acceder a más opciones
    - "Botón sin etiquetar" -> en el inicio de la aplicación no especifica qué se está seleccionando.
    - "Mapa de Google" -> es lo único que explica el lector cuando se accede a ver la ubicación del mapa. 
- 
- Problemas de contraste: botones amarillos, letras blancas sobre un fondo amarillo. 
- Fondo sobrecargado de marcas de agua: tiende a confundirse con los elementos de texto de la pantalla. 
- Información de listado de micros mezclado con guiones bajos y medios sin expresarse en columnas o con espacios suficientes para la escritura. 


## Cómo enfrentamos la problemática
Desde el grupo se inicio una investigación sobre otras herramientas similares como:
- Moovit
- Trenes Argentinos
- Google Maps 
- Cuando Subo

A partir de esta investigación y análisis se tuvieron en cuenta cómo es que estas aplicaciones enfrentaban las problemáticas presentes por lo que la solución final propuesta por nuestro equipo toma inspiración en varias de esas:
- Agregar una opción de configuración:
    - que el usuario pueda configurar la paleta de colores que prefiera según cómo le quede cómodo a la vista incluyendo una opción de alto contraste. 
    - agregado de tags semánticos (en el caso web) o de etiquetas android accesibility para colaborar con el lector de pantallas. 
    - alternativa textual al mapa: que se presenten en formato de lista con un formato correcto sin uso de símbolos extraños al usuario. 


## Primeros Pasos 
Se inicio un prototipado grupal en el que todos los miembros expusimos nuestras ideas y qué es lo que se debería considerar. A partir de ello se inició:
- Prototipado en Figma: idea inicial gráfica con interfaz UI centrado en lo móvil. 
- Desarrollo en Vue para probar cómo tomar los datos sobre el transporte de la API de estas aplicaciones.                       