# Ecommerce de Libros: Not-An-Ebook

## Descripción

**Software de Librería** es una aplicación diseñada para gestionar de manera eficiente las operaciones de una librería virtual. Permite la administración de usuarios, productos (libros) y órdenes de compra, integrando funcionalidades de autenticación y autorización para garantizar la seguridad en el acceso a los recursos.

## Características Principales

- **Gestión de Usuarios**: Registro, inicio de sesión y administración de perfiles de usuario con roles específicos.
- **Catálogo de Productos**: CRUD completo para la gestión de libros disponibles en la librería.
- **Gestión de Órdenes**: Creación y seguimiento de órdenes de compra realizadas por los clientes.
- **Seguridad**: Implementación de autenticación basada en JWT y protección de rutas mediante Spring Security.
- **Interfaz de Usuario**: Frontend desarrollado con HTML, CSS y JavaScript para interactuar con las funcionalidades del backend.

## Tecnologías Utilizadas

- **Backend**:
  - Java con Spring Boot
  - Spring Security
  - JWT (JSON Web Tokens)
  - JPA/Hibernate
  - Base de datos Postgres

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6)

- **Herramientas de Desarrollo**:
  - Maven
  - Postman
  - Git y GitHub
  - Jira para la gestión de tareas

## Instalación y Despliegue

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/Kevin2211875/Software-de-Librer-a.git
   ```
2. **Verificar que Docker y Docker Compose estan instalados:**:
    ```bash
    docker --version
    docker compose version #Versiones nuevas
    docker-compose version #Versiones más antiguas
    ```
    **Si Docker y Docker Compose no están instalados, puedes seguir este tutorial:**  
    - 🔗 [Guía de instalación en DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04-es)  **O simplemente consultar a tu IA de confianza. 😉**

3. **Crear las imagenes del Front y del Back:**
    ```bash
    #Desde la raiz del repo
    cd Biblioteca/
    docker build -t back-entornos-v1 .
  
    cd ../frontend/
    docker build -t front-entornos-v1 .
  
    #Volver a la raiz del proyecto:
    cd ..
    ```
4. **Ejecutar el Docker Compose:**
    ```bash
    docker compose up -d
    ```
    > ℹ️ **Nota**: **Para detener la ejecución utilice** `docker compose down`
  
5. **Conectarse a su gestor de DB de confianza (Puerto 5435):**

     ![image](https://github.com/user-attachments/assets/268a7634-ad6a-492a-9642-a31ea54b06ab)
    
    > ⚠ **Importante:** Recuerde actualizar el host segun su caso especifico.
   
7. **Ejecutar el Script PoblarDB.sql**
  **El back debería haber creado las tablas al ejecutarse**
   
8. **Registrar y actualizar el Rol de un usuario para que sea Admin (Opcional):**

     ![image](https://github.com/user-attachments/assets/98b95f10-5c9e-4351-923e-80a4a904023e)

#### ⚠ **Importante**: Cada vez que se levante el proyecto con `docker compose up -d` se deberán repetir los pasos **5, 6 y 7**.
