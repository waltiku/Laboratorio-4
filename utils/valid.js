var express = require('express');
var router = express.Router();
var USER  = require("../database/users");

router.get('/user',(req, res, next) => {
    USER.find({}, (err, docs) => {
      res.status(200).json(docs);
    });
});


router.post('/user', async(req, res) => {
var params = req.body;
console.log(params);
if(!(params.name!=null))
{
    res.status(200).json("El nombre es necesario");
    return;
}
params["name"]=params.name;

if(params.email!=null)
{
    if(/\w+\@\w+\.\w/.test(params.email))
        params["email"]=params.email;
    else
    {
        res.status(200).json("el email no cumple con los requisitos");
        return;
    }
}

if(params.password!=null)
{
    if(!(/\d/.test(params.password)))
    {
        res.status(200).json("La contraseña debe de tener numeros");
        return;
    }
    else
    {
        if(!(/\w{6,}/.test(params.password)))
        {
            res.status(200).json("La contraseña debe de tener al menos 6 caracteres");
            return;
        }
        else
        {
            if(!(/^[\A-Z\.]/.test(params.password)))
            {
                res.status(200).json("La contraseña debe empezar con un caracter en MAYUSCULA");
                return;
            }
            else
                params["password"]=params.password;
        }
    }
}

params["registerdate"] = new Date();

if(!(params.sex!=null))
{
    res.status(200).json("El genero es necesario");
    return;
}
params["sex"]=params.sex;

if(!(params.address!=null))
{
    res.status(200).json("La direccion es necesaria");
    return;
}
params["address"]=params.address;

var users = new USER(params);
var result = await users.save();
res.status(200).json(result);
});


module.exports = router;