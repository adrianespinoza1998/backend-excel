const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' )=>{
    //Crear una promesa con resultados personalizados
    return new Promise( (resolve, reject)=>{
        const payload = { uid };

        //Crear json web token con clave privada
        jwt.sign(payload, process.env.SECRET_KEY,{
            expiresIn: '4h'
        }, (error,token)=>{
            if(error){
                console.log(error);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        });
    });
}

//Exportar modulo
module.exports = {
    generarJWT
}