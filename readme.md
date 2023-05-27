# Challenge Nuclea Solutions #

---

El Proyecto es una aplicación web desarrollada con Express.js que contiene estas caracteristicas:

    * 1° Te permite realizar el orden alfabético de datos en formato JSON.
    * 2° Permite aplanar cualquier array que contenga el JSON.
    * 3° Permite consultar citas random.
    * 4° Permite visualizar todas las citas consultadas.

💻 Requisitos previos
Antes de poder desplegar y ejecutar el proyecto, asegúrate de tener los siguientes requisitos previos instalados en tu sistema:

 * Node.js (versión X.X.X)
 * npm (versión X.X.X)

💻 Instalación
Sigue los siguientes pasos para instalar y desplegar el Proyecto XYZ:

Clona este repositorio en tu máquina local:

shell
Copy code
git clone <URL_DEL_REPOSITORIO>
Accede al directorio del proyecto:

shell
Copy code
cd proyecto-xyz
Instala las dependencias del proyecto utilizando npm:

shell
Copy code
npm install
Configura las variables de entorno:

Crea un archivo .env en la raíz del proyecto y define las siguientes variables:

makefile
Copy code
PORT=3000
MONGODB_URI=<URL_DE_LA_BASE_DE_DATOS_MONGODB>
Asegúrate de reemplazar <URL_DE_LA_BASE_DE_DATOS_MONGODB> con la URL de tu base de datos MongoDB (si deseas utilizar MongoDB para almacenar los datos ordenados). Si no deseas utilizar MongoDB, puedes omitir la variable MONGODB_URI y se utilizará una base de datos en memoria.

Inicia la aplicación:

shell
Copy code
npm start
La aplicación se ejecutará en http://localhost:3000 o en el puerto que hayas especificado en la variable de entorno PORT.

Uso
Una vez que la aplicación esté en ejecución, puedes enviar solicitudes HTTP para ordenar tus datos JSON. Asegúrate de enviar una solicitud POST a la ruta /alphabetize con un cuerpo JSON válido. La aplicación verificará que la solicitud contenga JSON y responderá con el JSON ordenado alfabéticamente.

Ejemplo de solicitud utilizando cURL:

shell
Copy code
curl -X POST -H "Content-Type: application/json" -d '{"b": 2, "a": 1}' http://localhost:3000/alphabetize
Respuesta esperada:

json
Copy code
{
  "a": 1,
  "b": 2
}
Contribución
Si deseas contribuir al Proyecto XYZ, ¡eres bienvenido! Puedes hacer lo siguiente:

Realizar pull requests para sugerir mejoras o correcciones.
Reportar problemas o errores en el repositorio de problemas.
Proporcionar comentarios y sugerencias en el repositorio de problemas.
Licencia
El Proyecto XYZ se distribuye bajo la Licencia MIT. Puedes consultar el archivo LICENSE para obtener más información sobre los términos de la licencia.

Contacto