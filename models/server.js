const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require('path');

const { sequelize } = require("../database/dbConfig");
const itemRoutes = require("../routes/itemRoutes");
const rolRoutes = require("../routes/rolRoutes");
const usuarioRoutes = require("../routes/usuarioRoutes");
const authRoutes = require("../routes/authRoutes");
const initRoutes = require("../routes/initRoutes");
const proyectoRoutes = require("../routes/proyectoRoutes");
const uploadRoutes = require("../routes/uploadRoutes");

class Server {

    constructor() {
        this.app = express();

        this.port = process.env.PORT;

        this.path = {
            items: '/api/items',
            roles: '/api/rol',
            usuario: '/api/usuario',
            auth: '/api/auth',
            init: '/api/init',
            proyecto: '/api/proyecto',
            upload: '/api/upload'
        }

        this.dbConnect();

        this.middlewares();

        this.rutas();

        this.proxy();
    }

    middlewares() {
        this.app.use(express.static('public'));
        //this.app.use(express.static(path.join(__dirname, '../public')));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor iniciado en el puerto " + this.port);
        });
    }

    async dbConnect() {
        try {
            await sequelize.authenticate();
            console.log('Base de datos en linea');
        } catch (error) {
            console.warn('Error en la base de datos: ', error);
        }
    }

    rutas() {
        this.app.use(this.path.items, itemRoutes);
        this.app.use(this.path.roles, rolRoutes);
        this.app.use(this.path.usuario, usuarioRoutes);
        this.app.use(this.path.auth, authRoutes);
        this.app.use(this.path.init, initRoutes);
        this.app.use(this.path.proyecto, proyectoRoutes);
        this.app.use(this.path.upload, uploadRoutes);
    }

    proxy() {
        this.app.all('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });
    }
}

module.exports = Server;