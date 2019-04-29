//Importar librerias
var express = require('express');
var exphbs = require('express-handlebars');


//Crear app de express
var app = express();

//Establecer la carpeta public como estatica
app.use(express.static('public'));

//Registro de handlebars
app.engine('handlebars',exphbs());
//Establecer handlebars como el motor de render
app.set('view engine','handlebars');

//Arreglo de productos
var productos = [];
productos.push({
    titulo: 'aaaa',
    precio: 20,
    imagen: "../public/recursos/productosA1.jpeg",
    descripcion: "Your kiddo won't be able to contain their excitement when you gift them this Boston Celtics Essential logo hoodie from Nike. The cold won't stand a chance when your young one has this warm hoodie on." 
});

//Ruta inicial
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/index.html')
});

//Ruta a la tienda
app.get('/tienda', function(req, res) {
    res.render('tienda');
});

//ruta dinamica
app.get('/tienda/:pestana', function(req, res) {
    var contexto= null;
   
       productos.forEach(function(producto){
           if(producto.numero == req.params.pestana){
               contexto=producto;
           }
       });
   
       if(contexto == null){
           res.send('Page not found: '+req.params.pestana);
       }else{
           res.render('pestana',contexto);
       }
   
       console.log(req.params.pestana);
       
   });

// Escuchar desde puerto 3000
app.listen(5500, function(){
    console.log('Servidor en el puerto 3000')
});