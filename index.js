 
  const express = require('express');
  const bodyParser = require('body-parser');
  const mongoose = require('mongoose');

  const Dato = require('./datas/dato');

  const app = express();
  const port = process.env.PORT || 3000

  app.use(bodyParser.urlencoded({extendend: false }));
  app.use(bodyParser.json());

  app.get('/api/dato/', (req, res) => {
      Dato.find({}, (err, datos) => {
          if (err) return res.status(500).send({message: `Eror al extraer Datos`});
          res.send(200, {datos});
      })
  });  

  app.post('/api/dato/', (req, res) => {
    console.log('POST /api/dato');  
    console.log(req.body);

    let dato = new Dato()
    dato.name = req.body.name
    dato.email = req.body.email
    dato.kilometros = req.body.kilometros

    if(dato.kilometros > 4 ) {
        dato.save((err, datoStored) => {
            if(err) res.status(500).send({message: `Error a save in DB:${err} `});
    
            res.status(200).send({dato: datoStored});
        });
    }else{
        return res.status(500).send({message: `Debes caminar más!`});
    

    }  
  });

  mongoose.connect('mongodb://localhost:27017/dato', (err, res) => {
       if(err) {
           return console.log(`Error a conection DB: ${err}`);
       }
       console.log('conexion DB establecida');

       app.listen(port, () => {
        console.log(`API Inicializada en http://localhost:${port}`);
    });
  });
