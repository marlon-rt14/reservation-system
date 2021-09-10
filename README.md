# reservation-system
Reservation system with NodeJs, express &amp; MySQL MariaDB

<b>TECNOLOGIAS USADAS</b>
- NodeJS v14.17.6 Stable
- npm v7.21.1 Stable
- MariaDB v10.3.31 con versión de MySQL 15.1

<b>REQUERIMIENTOS</b><br>
<i>Las instrucciones de instalación pueden variar dependiendo del sistema operativo usado</i>
- <a href="https://nodejs.org/en/">Tener instalado NodeJS versión >= 10</a> (Verificar la version de npm desdpués de instalar NodeJS)
- Tener instalado npm versión >= 4
- Tener instalado un Motor de BDD de Preferencia MySQL

<b>EJECUCION</b>
- Crear la base de datos con el script db.sql que se encuentra en la carpeta "database"
<ol>
  <li>Copiar todo el script </li>
  <li>Abra una nueva consulta en el gestor de base de datos que tenga instalado</li>
  <li>Pegar el script (En esta parte puede cambiar el nombre de la BDD en <CREATE DATABSE nuevo_nombre> y en <USE nuevo_nombre>, no recomendado)</li>
  <li>Ejecutar el script</li>
</ol>
  
  <b>Errores y advertencias con la base de datos</b>
    <ol>
      <li>Advertencias caracterizadas por un triángulo de color amarillo puede ignorarlas. </li>
      <li>Si al ejecutar el script se muestra en mensaje de error puede eliminar la base de datos con el comando <DROP DATABASE nombre_de_la_BDD> y ejcutar las sentencias una a una. Revisar y corregir la sentecia causante del problema.</li>
    </ol>
- Abrir el terminal y dirigirse a la carpeta del proyecto. Use el comando <cd> para ello.
- Cuando en el terminal vea un archivo "package.json" ejecute este comando <npm install package.json>. Comenzará a intalar todos los módulos y dependencias necesarios el funcionamiento de este proyecto
- Dirigirse a la carpeta "src"
- En el archivo "keys.js" puede configurar la conexión con la base de datos. Cámbielos de acuerdo a su configuración del motor de BDD
- Regresar a la carpeta incial que contiene todo el proyecto.
- Ejecutar el comando <npm run dev> La consola mostrará que el servidor está corriendo el puerto 3000
- Puede abrir el sistema en la direccion http://localhost:3000

<b>MAS CONFIGURACIONES</b>
- Para cambiar el puerto diríjase al archivo "src/index.js" en settings
- Para cambiar el comando <npm run dev> diríjase al archiv "/package.json" en "scripts"  cambiando la palabra "dev" por "nuevo-nombre", asegúrese que este entre comillas. Después diríjase a la carpeta principal que contiene el proyecto y ejecute el comando <npm run nuevo-nombre>
    



