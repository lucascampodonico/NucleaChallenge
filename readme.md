# Challenge Nuclea Solutions #

---

El Proyecto es una aplicación web desarrollada con Express.js que contiene estas caracteristicas:

    * 1° Te permite realizar el orden alfabético de datos en formato JSON.
    * 2° Permite aplanar cualquier array que contenga el JSON.
    * 3° Permite consultar citas random.
    * 4° Permite visualizar todas las citas consultadas.

💻 Requisitos previos
Antes de poder desplegar y ejecutar el proyecto, asegúrate de tener los siguientes requisitos previos instalados en tu sistema:

 * Node.js (16 o superior)
 * npm

💻 Instalación
Sigue los siguientes pasos para instalar y desplegar el Proyecto XYZ:

Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/lucascampodonico/NucleaChallenge.git
```

Accede al directorio del proyecto:

```bash
cd NucleaChallenge
```

Instala las dependencias del proyecto utilizando npm:

```bash
npm install
```

Compila el proyecto:

```bash
npm run build
```

Inicia la aplicación:

```bash
npm start
```

La aplicación se ejecutará en http://localhost:3000 o en el puerto que hayas especificado en la variable de entorno PORT.

------

💻Uso

- Alfabetización:

   Una vez que la aplicación esté en ejecución, puedes enviar solicitudes HTTP para ordenar tus datos JSON. Asegúrate de enviar una solicitud POST a la ruta /alpha con un cuerpo JSON válido. La aplicación verificará que la solicitud contenga JSON y responderá con el JSON ordenado alfabéticamente.

```bash
{
  "fruit": "banana",
  "animal": "zebra",
  "city-list": [
    "sunnyvale",
    "san jose"
  ]
}
```

- Aplanamiento:

   Asegúrate de enviar una solicitud POST a la ruta /flatten con un cuerpo JSON válido. La aplicación verificará que la solicitud contenga JSON y responderá con el JSON aplanado.

```bash
{
  "fruit": "banana",
  "animal": "zebra",
  "city-list": [
    "sunnyvale",
    "san jose"
  ]
}
```

- Quote:

   Envia una solicitud POST a la ruta /quote para obtener una cita random.

- Quotes:

   Envia una solicitud GET a la ruta /quotes para obtener el listado de citas consultadas.


💻 API

- Actualmente se esta corriendo la aplicacion en Google App Engine.

| DESCRIPCION  | URL | PETICION  | HEADER  | RESPUESTA
| ------ | ------ | ------ | ------ | ------ |
| Service Alphabetize | https://lucas-campodonico.uc.r.appspot.com/alpha | PUT | Content-Type: application/json | JSON sorted.
| Service Flatten | https://lucas-campodonico.uc.r.appspot.com/flatten | POST |  Content-Type: application/json | JSON flattened.
| Service Quote | https://lucas-campodonico.uc.r.appspot.com/quote | POST | Content-Type: application/json | Quote.
| Service Quotes | https://lucas-campodonico.uc.r.appspot.com/quotes | GET |  Content-Type: application/json | All Quotes.
| Documentation Swagger | https://lucas-campodonico.uc.r.appspot.com/api-docs |  |   | 

------
