## tp-07-salas-mongodb
Pesistencia de Datos en Reserva de Salas a traves de MongoDB

ACLARACION: Algunas evidencias (Conexxion base de DEatos, listar Crear se adjuntan en Carpeta docuementos/evidencias)

1. Punto de partida

    Este proyecto corresponde al TP07 y fue desarrollado a partir de una copia funcional del TP06.

    Nombre de la copia:
    tp-07-salas-mongodb

    La aplicación web continúa utilizando almacenamiento en memoria para las rutas Express y el formulario de reservas.
    La persistencia en MongoDB se implementó mediante scripts independientes ejecutados desde terminal.

2. Versiones y Tecnologías utilizadas
       ─┬ @eslint/js@10.0.1
        │ └── eslint@10.12.0 deduped
        ├─┬ eslint@10.12.0
        │ └─┬ @eslint-community/eslint-utils@4.10.1
        │   └── eslint@10.12.0 deduped
        ├── express@5.2.1
        ├── mongoose@9.10.3
        └── prettier@3.9.9

3. Pasos para ejecutar el proyecto desde una descarga nueva
    A . Clonar el repositorio
        git clone <https://github.com/juanpcalas-tech/tp-07-salas-mongodb>
        cd tp-07-salas-mongodb
    
    B. Instalar dependencias
        Instalar todas las dependencias definidas en package.json:
        npm install
    
    C. Preparar MongoDB Atlas Free (M0)
        Se Creo una cuenta en MongoDB Atlas. ( Conectado con Google)
        Se Creo un clúster gratuito Atlas Free (M0). (Cluster0)
        Se Creo una base de datos llamada: reservas_salas_u7
        Se Creo un usuario de base de datos con permisos: Project Owner (juanpcalas_db_user - passward: aleatorio)
        
    D. Configurar acceso de red
        En la sección Network Access de Atlas, Se agreg0 una la dirección IP 0.0.0.0
        Esto habilita el acceso desde cualquier dirección IP.

    E. Copiar la plantilla de variables de entorno

        Copiar el archivo de ejemplo:
        cp .env.example .env

        Se Completao la variable MONGODB_URI con la cadena de conexión proporcionada por Atlas: MONGODB_URI="mongodb+srv://juanpcalas_db_user:7vzIJQR787gPBFjT@cluster0.ggyk4zc.mongodb.net/reservas_salas_u7?retryWrites=true&w=majority&appName=Cluster0"


    F. Comprobacion la conexión a MongoDB, Listado Inicial, creacion , Listado posterior creacion

        "comprobardb": "node --env-file=.env scripts/comprobar-conexion.js",
        "validar": "node --env-file=.env scripts/validar-reserva.js",
        "crear": "node --env-file=.env scripts/crear-reserva.js",
        "listar": "node --env-file=.env scripts/listar-reservas.js"

        SE EJECUTA EN TERMINAL :
        a. npm run comprobardb
        b. npm run validar
        c. npm run listar
        d. npm run crear
        e. npm run listar

    G. Controles de calidad
        npm run format
        npm run check

    H. Iniciar la aplicación web
        npm start
        La aplicación quedará disponible en:http://localhost:3000
        Las rutas web continúan utilizando almacenamiento en memoria, mientras que la persistencia en MongoDB se realiza mediante los scripts de consola desarrollados para este TP.        

4. Diagnostico DSNS Resolutores utilizados

    MongoDB Atlas utiliza registros DNS de tipo SRV y TXT para resolver las cadenas de conexión con prefijo mongodb+srv://. Durante el desarrollo se incorporó la configuración recomendada en la consigna dentro de src/config/base-datos.js:

    const dns = require("node:dns");
    dns.setServers(["8.8.8.8", "1.1.1.1"]);

5. Mapa de archivos - Esquema - Modelo y Coleccion

        tp-07-salas-mongodb/
        │
        ├── src/
        │ │
        │ ├── config/
        │ │ ├── entorno.js
        │ │ └── base-datos.js
        │ │
        │ ├── modelos/
        │ │ └── reserva.js
        │ │
        │ ├── controladores/
        │ │ └── reservas.js
        │ ├── rutas/
        │ │ └── reservas.js        
        │ ├── servicios/
        │ │ └── reservas.js        
        │ ├── middleware/
        │ │ └── reservas.js
        │ │ └── solicitudes.js
        │ ├── vistas/
        │ ├── app.js
        │ └── index.js
        │
        ├── scripts/
        │ ├── comprobar-conexion.js
        │ ├── crear-reserva.js
        │ └── listar-reservas.js
        │ └── validar-reserva.js        
        │
        ├── .env
        ├── .gitignore
        ├── eslint.config.js
        ├── package.json
        ├── package-lock.json
        └── README.md
    * Esquema
        {
        estudiante: String,
        email: String,
        sala: String,
        fecha: String,
        turno: String,
        personas: Number
        }
    * Coleccion
        { collection: "reservas" }

6. Campos y reglas

    * estudiante: { type: String, required: true, trim: true, validate: { validator: (v) => v.length > 0, message: "El nombre no puede estar vacío" } }
    * email: { type: String, required: true, trim: true,  match: [/@/, "El email debe contener un carácter '@'"] }
    * sala: { type: String, required: true, enum: ["Sala Norte","Sala Sur","Sala Multimedia"], }
    * fecha: { type: String, required: true, trim: true, validate: { validator: (v) => v.length > 0, message: "La fecha no puede estar vacía" } }
    * turno: { type: String, required: true, enum: ["Mañana","Tarde","Noche"],}        
    * personas: { type: Number, required: true, min: 1, max:6, validate: { validator: Number.isInteger, message: "Debe ser Entero"}, } 
    
    * * { collection: "reservas" }

7. Matriz de pruebas

| CASO | RESULTADO OBSERVADO |
| --- | --- |
| Conexión válida | OK |
|Variable vacía|Error de configuración|
|Contraseña incorrecta|Error de autenticación|
|Reserva válida|Documento creado|
|Consulta desde nuevo proceso|Documento recuperado|
|Segunda consulta|Sin cambios|
|Estudiante vacío|Rechazado|
|Email sin @|Rechazado|
|Sala inválida|Rechazado|
|Turno inválido|Rechazado|
|Fecha vacía|Rechazado|
|Personas = 0|Rechazado|
|Personas = 7|Rechazado|
|Personas = 2.5|Rechazado|
|Texto en personas|Rechazado|    


8. Continuidad del sitio
    El sitio Express continúa funcionando en memoria exactamente como en el TP06.
    Las reservas guardadas en MongoDB aún no son utilizadas por las rutas HTTP.
    La integración entre Express y MongoDB será desarrollada en la Unidad 8.

9. Seguridad
    No se publica .env.
    No se publican credenciales.
    No se publica información personal.
    node_modules permanece excluido mediante .gitignore.