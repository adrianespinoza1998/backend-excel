const express = require("express");
const cors = require("cors");

const { sequelize } = require("../database/dbConfig");
const itemRoutes = require("../routes/itemRoutes");
const rolRoutes = require("../routes/rolRoutes");
const usuarioRoutes = require("../routes/usuarioRoutes");
const authRoutes = require("../routes/authRoutes");
const initRoutes = require("../routes/initRoutes");

class Server{

    constructor(){
        this.app = express();

        this.port = process.env.PORT;

        this.path = {
            items: '/api/items',
            roles: '/api/rol',
            usuario: '/api/usuario',
            auth: '/api/auth',
            init: '/api/init'
        }

        this.dbConnect();

        this.middlewares();

        this.rutas();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor iniciado en el puerto " + this.port);
        });
    }

    async dbConnect(){
        try{
            await sequelize.authenticate();
            console.log('Base de datos en linea');
        }catch(error){
            console.warn('Error en la base de datos: ', error);
        }
    }

    rutas(){
        this.app.use(this.path.items, itemRoutes);
        this.app.use(this.path.roles, rolRoutes);
        this.app.use(this.path.usuario, usuarioRoutes);
        this.app.use(this.path.auth, authRoutes);
        this.app.use(this.path.init, initRoutes);
    }
}

module.exports = Server;