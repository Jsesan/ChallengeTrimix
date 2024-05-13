# ChallengeTrimix ABM Personas :bust_in_silhouette:

En este repositorio presento mi solucion al challenge de Trimix

## Tecnologias utilizadas
### Frontend
<div>
<img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
</div>

### Backend
<div>
<img src="https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white"/>
<img src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot"/>
<img src="https://img.shields.io/badge/Junit5-25A162?style=for-the-badge&logo=junit5&logoColor=white"/>
</div>

Se utilizo como base de datos H2 para simplificar el desarrollo.

### Tanto FE como BE
<div>
<img src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
</div>

## Como ejecutar la solución con Docker Compose

* Clonar repo `git clone https://github.com/Jsesan/ChellengeTrimix.git`
* Una vez finalizado el clone ejecutar el siguiente cmd `cd ChallengeTrimix`
  * Si desea verificar que se haya clonado correctamente `ls`
   ``` 
    /ChallengeTrimix/
    |
    |--README.md
    |--challenge-trimix-frontend
    |--challengeTrimixBackend
    `--docker-compose.yml
  ```
* La manera mas rapida de correr el challenge es por medio del *docker-compose.yml*
  * Debe tener docker previamente instalado en su local [Comenzando con docker](https://www.docker.com/get-started/)
* Ejecute el siguiente cmd `docker compose up`
* Vera como tanto el frontend como el backend comienzan a ejecutarse...

  <img width="375" alt="image" src="https://github.com/Jsesan/ChallengeTrimix/assets/63931150/69a6b861-9b21-4fdb-8958-f0d221e6e909">

* En el backend se utilizo el archivo `data.sql` para inicializar la base de datos con algunos registros con el objetivo que probar la paginacion sea mas sencillo.

## Imagenes DockerHub

El docker compose utiliza las siguiente imagenes de dockerHub

[Imagen Frontend](https://hub.docker.com/repository/docker/jsesan/challenge-trimix-fe/general)

[Imagen Backend](https://hub.docker.com/repository/docker/jsesan/challenge-trimix-be/general)

## Como ejecutar los tests
### Frontend
```bash
> cd challenge-trimix-frontend
> npm install
> npm test
```
Por motivos de tiempo se crearon solamente dos pruebas unitarias para el frontend. Un test muy simple sobre el componente `Divider`.

El segundo test es sobre el que considero el componente mas complejo ya que tiene varias condiciones y distintos estados.

### Backend
Por motivos de tiempo se creo solamente dos pruebas sobre el metodo del @Get ya que considero que es la que mas complejidad tiene del backend.

Para ejecutar esta prueba lo mas facil es abrir la carpeta `challengeTrimixBackend` en un IDE como *Intellij* y clickear sobre el play sobre la clase

<img width="426" alt="image" src="https://github.com/Jsesan/ChallengeTrimix/assets/63931150/750776bb-106e-42e4-8550-c90b9b770c76">


Encontrará la prueba unitaria en...
``` 
  /challengeTrimixBackend/
  |
  `--src
      |
      `--test
          |
          `--java
            |
            `--com.example.challengeTrimixBackend
                |
                `--PersonaResourceTest
```
## Paginas/Estados de la aplicacion (FrontEnd POV)

### API Caida
<img width="1418" alt="image" src="https://github.com/Jsesan/ChallengeTrimix/assets/63931150/4fb1af72-fd31-4151-bd7a-2a650b522c06">

### Cargando registros
<img width="1418" alt="Screenshot 2024-05-13 at 12 52 44 AM" src="https://github.com/Jsesan/ChallengeTrimix/assets/63931150/1b015ff3-9301-4ef4-ae48-f8df8bfd1c30">

### Con Registros
<img width="1418" alt="image" src="https://github.com/Jsesan/ChallengeTrimix/assets/63931150/cab09dbe-d866-4818-9ca5-89bb4d68e945">

### Cargar/Editar Persona
<img width="1418" alt="image" src="https://github.com/Jsesan/ChallengeTrimix/assets/63931150/ec14fe4b-ae0c-4c40-9b14-5880e2545705">

### Modal de confirmacion para borrar
<img width="1418" alt="image" src="https://github.com/Jsesan/ChallengeTrimix/assets/63931150/f2f5ef03-cba0-4598-968b-388f3921f8da">

### Sin personas
<img width="1418" alt="image" src="https://github.com/Jsesan/ChallengeTrimix/assets/63931150/5c573997-05fe-40b6-981a-5e4d3033a5b0">







