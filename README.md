# Sistema de Estacionamiento

Este proyecto es una aplicación para gestionar un sistema de estacionamiento de pago. Permite registrar entradas y salidas de vehículos y generar reportes en PDF y Excel

## Dependencias

- **Node.js** (v14.0.0 o superior)
- **MySQL** (v8.0 o superior)
- **Sequelize** (v6.0 o superior) - ORM para Node.js
- **PDFKit** - Biblioteca para la generación de archivos PDF
- **ExcelJS** - Biblioteca para la generación de archivos Excel
- **Express** - Framework para aplicaciones web en Node.js

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://https://github.com/RaxoCS/ParkingSystem
   cd ParkingSystem-main

2. **Instalar dependencias**:

   ```bash
   npm install

## Configuración de MySQL localmente

Para usar MySQL sigue estos pasos:

1. **Descargar e instalar MySQL**:

   - Ve al [sitio oficial de XAMPP](https://www.apachefriends.org) y descarga la versión XAMPP for Windows 8.2.12

2. **Iniciar el servicio de MySQL**:

    - Abre el programa XAMPP Control Panel

    - Inicia el servicio Apache y MySQL

    - Ve al Admin de MySQL para crear la base de datos

## Creación de la base de datos

Para crear la base de datos sigue estos pasos:

1. **Crea y configura la base de datos**:

     Ejecuta los siguientes comandos
    ```bash
    CREATE DATABASE estacionamiento;

    USE estacionamiento;

    CREATE TABLE auto (
        id_auto INT AUTO_INCREMENT PRIMARY KEY,
        placa VARCHAR(50) NOT NULL UNIQUE,
        tipo ENUM('oficial', 'residente', 'no_residente') NOT NULL
    );

    CREATE TABLE estadia (
        id_estadia INT AUTO_INCREMENT PRIMARY KEY,
        auto_id INT,
        entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        salida TIMESTAMP NULL,
        cobro DECIMAL(10, 2) NULL,
        FOREIGN KEY (auto_id) REFERENCES auto(id_auto)
    );

2. Verifica que el archivo database.js estén los detalles de tu BD

    ```bash
    const { Sequelize } = require('sequelize');

    // Configuracion de la conexión a MySQL
    const sequelize = new Sequelize('estacionamiento', 'root', '', {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
    });

    module.exports = { sequelize };


## Iniciar la aplicación

Ya que se tenga todas las dependencias y base de datos puedes iniciar la aplicación

    node app.js

Y visita http://localhost:3000 para acceder a la interfaz de la aplicación.
