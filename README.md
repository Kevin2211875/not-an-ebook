# Software de Librería

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
  - Base de datos MySQL

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6)

- **Herramientas de Desarrollo**:
  - Maven
  - Postman
  - Git y GitHub
  - Jira para la gestión de tareas

## Instalación y Configuración

1. **Clonar el Repositorio**:

   ```bash
   git clone https://github.com/Kevin2211875/Software-de-Librer-a.git
2. **Configurar base de datos**:
Crear una base de datos en MySQL llamada libreria_db.

Configurar las credenciales de acceso en el archivo application.properties ubicado en src/main/resources/:

spring.datasource.url=jdbc:mysql://localhost:3306/libreria_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña

3. **ejecutar aplicacion**

cd Software-de-Librer-a
mvn spring-boot:run

4. **acceder a la aplicacion**

Backend: La API estará disponible en http://localhost:8080.

Frontend: Abrir el archivo index.html ubicado en el directorio frontend en un navegador web.

