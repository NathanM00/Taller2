function paginaCargada() {

  var rango = document.querySelector('.rangoprecio');


  var listaProductos = [];
  var descuentoJuego = 0;
  var carritoNum = document.querySelector('.encabezado__contador');
  var carritoInd = document.querySelector('.encabezado__indicador');
  var totalCarrito = document.querySelector('.pushbar__cartotalnum');
  var totalChekout = document.querySelector('.pushbar__check-totalnum');
  var parcialChekout = document.querySelector('.pushbar__check-parnum');
  var descChekout = document.querySelector('.pushbar__check-descnum');
  var totalItems = document.querySelector('.pushbar__cartotalcanti');
  var totalItemsCheck = document.querySelector('.pushbar__checktotalcanti');

  var listaCarrito = document.querySelector('.pushbar__lista');

  if (localStorage.getItem('listaProductos') != null) {
    listaProductos = JSON.parse(localStorage.getItem('listaProductos'));
  }

  if (localStorage.getItem('descuentoJuego') != null) {
    descuentoJuego = parseInt(localStorage.getItem('descuentoJuego'));
  }

  function actualizarCarrito() {
    var suma = 0;
    var valor = 0;
    carritoNum.innerHTML = listaProductos.length;
    totalItems.innerHTML = listaProductos.length;
    totalItemsCheck.innerHTML = listaProductos.length;
    if (listaProductos.length >= 1) {
      carritoInd.style.display = "inline-block";
    }

    if (listaCarrito != null) {
      listaCarrito.innerHTML = "";
    }

    listaProductos.forEach(function (producto, index) {

      var itemNuevo = document.createElement('li');
      var contNuevo = document.createElement('div');

      var imgNuevo = document.createElement('img');

      var restoNuevo = document.createElement('div');
      var nombreNuevo = document.createElement('p');
      var precioNuevo = document.createElement('p');
      var variablesNuevo = document.createElement('div');
      var cantidadNuevo = document.createElement('div');
      var quanNuevo = document.createElement('p');
      var cuadroCNuevo = document.createElement('div');
      var tamanoNuevo = document.createElement('div');
      var sizeNuevo = document.createElement('p');
      var cuadroTNuevo = document.createElement('div');

      var eliminarNuevo = document.createElement('button');
      var eliminarNuevoIcono = document.createElement('i');

      if (listaCarrito != null) {

        listaCarrito.appendChild(itemNuevo);
        itemNuevo.appendChild(contNuevo);
        contNuevo.appendChild(imgNuevo);
        contNuevo.appendChild(restoNuevo);
        restoNuevo.appendChild(nombreNuevo);
        restoNuevo.appendChild(precioNuevo);
        restoNuevo.appendChild(variablesNuevo);
        variablesNuevo.appendChild(cantidadNuevo);
        cantidadNuevo.appendChild(quanNuevo);
        cantidadNuevo.appendChild(cuadroCNuevo);
        variablesNuevo.appendChild(tamanoNuevo);
        tamanoNuevo.appendChild(sizeNuevo);
        tamanoNuevo.appendChild(cuadroTNuevo);
        contNuevo.appendChild(eliminarNuevo);
        eliminarNuevo.appendChild(eliminarNuevoIcono);
      }

      contNuevo.className = 'pushbar__producto-item';
      imgNuevo.className = 'pushbar__producto-img';
      restoNuevo.className = 'pushbar__producto-resto';
      nombreNuevo.className = 'pushbar__producto-nombre';
      precioNuevo.className = 'pushbar__producto-precio';
      variablesNuevo.className = 'pushbar__producto-variables';
      cantidadNuevo.className = 'pushbar__producto-cantidad';
      cuadroCNuevo.className = 'pushbar__producto-cuadro';
      tamanoNuevo.className = 'pushbar__producto-tamano';
      cuadroTNuevo.className = 'pushbar__producto-cuadro';
      eliminarNuevo.className = 'pushbar__producto-eliminar';
      eliminarNuevoIcono.className = 'fa fa-close';

      imgNuevo.src = producto.imagen;
      nombreNuevo.innerHTML = producto.nombre;
      precioNuevo.innerHTML = producto.precio;
      quanNuevo.innerHTML = "Quantity";
      cuadroCNuevo.innerHTML = "1";
      sizeNuevo.innerHTML = "Size";
      cuadroTNuevo.innerHTML = "M";

      var temp = new String();
      for (let i = 1; i < producto.precio.length; i++) {
        temp += producto.precio[i];
      }
      suma += parseFloat(temp);
      valor = suma.toFixed(2);

      eliminarNuevo.addEventListener('click', function () {

        listaProductos.splice(index, 1);
        itemNuevo.remove();
        localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
        actualizarCarrito();
      });

    });

    if (totalCarrito != null) {
      parcialChekout.innerHTML = "$" + valor;
      totalCarrito.innerHTML = "$" + valor;
      if (descuentoJuego != 0) {
        valor = valor - (0.2 * valor);
        descChekout.innerHTML = descuentoJuego + '%';
      } else {
        descChekout.innerHTML = '0%';
      }
      totalChekout.innerHTML = "$" + valor;
    }

  }
  actualizarCarrito();

  function hoverTitulo() {
    //TweenLite.to(carritoInd, 1.5, { ease: Bounce.easeOut, y: 30 });
    TweenLite.to(carritoInd, 1.5, { ease: CustomEase.create("custom", "M0,0 C0.146,0 0.099,-0.195 0.244,-0.212 0.347,-0.224 0.37,-0.037 0.378,0 0.387,-0.015 0.403,-0.126 0.546,-0.126 0.656,-0.126 0.649,-0.005 0.656,0.012 0.721,-0.072 0.757,-0.054 0.757,-0.054 0.824,-0.054 0.838,-0.013 0.853,0 0.858,-0.002 0.899,-0.027 0.93,-0.026 0.969,-0.026 1,0 1,0"), y: 100 });
  }

  var botones = document.querySelectorAll('.tienda__agregar');
  function recorrerBotones(boton) {
    function agregarAlCarrito() {
      var padre = boton.parentNode;
      var nombre = padre.querySelector('.item__nombre').innerText;
      var precio = padre.querySelector('.item__precio').innerText;
      var imagen = padre.querySelector('.item__fotoP').src;
      var producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
      };

      listaProductos.push(producto);
      actualizarCarrito();
      hoverTitulo();
      localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
    }
    boton.addEventListener('click', agregarAlCarrito);
  }
  botones.forEach(recorrerBotones);

  var botonProductoDetalle = document.querySelector('.producto__agregar');
  var botonProductoDetalle2 = document.querySelector('.producto__agregar2');

  function agregarAlCarritoDetalle() {
    var nombre = document.querySelector('.producto__nombre').innerText;
    var precio = document.querySelector('.producto__precio').innerText;
    var imagen = document.querySelector('.producto__fotoP').src;
    var producto = {
      nombre: nombre,
      precio: precio,
      imagen: imagen,
    };

    listaProductos.push(producto);
    actualizarCarrito();
    hoverTitulo();
    localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
  }

  if (botonProductoDetalle != null) {
    botonProductoDetalle.addEventListener('click', agregarAlCarritoDetalle);
  }

  function agregarAlCarritoDetalleMobil() {
    var nombre = document.querySelector('.producto__nombre').innerText;
    var precio = document.querySelector('.producto__precio2').innerText;
    var imagen = document.querySelector('.producto__fotoP').src;
    var producto = {
      nombre: nombre,
      precio: precio,
      imagen: imagen,
    };

    listaProductos.push(producto);
    actualizarCarrito();
    localStorage.setItem('listaProductos', JSON.stringify(listaProductos));
  }
  if (botonProductoDetalle2 != null) {
    botonProductoDetalle2.addEventListener('click', agregarAlCarritoDetalleMobil);
  }

  var fotoMostrada = document.querySelector('.producto__fotoP');

  var fotoMinis = document.querySelectorAll('.producto__fotoM');
  function recorrerFotos(foto) {
    function cambiarFoto() {
      fotoMostrada.src = foto.src;
      foto.addEventListener('click', cambiarFoto)

      fotoMinis.forEach(function cambiarBorde(lafoto) {
        if (lafoto.src == fotoMostrada.src) {
          lafoto.style.border = '1px solid';
        } else {
          lafoto.style.border = 'none';
        }
      });
    }
    foto.addEventListener('click', cambiarFoto);
  };

  if (botonProductoDetalle != null) {
    fotoMinis.forEach(recorrerFotos);
  }

  var vistaCarrito = document.querySelector('.pushbar__carro');
  var vistaCheckout = document.querySelector('.pushbar__checkout');
  var botonCheckout = document.querySelector('.pushbar__checkout-boton');
  var atrasCheckout = document.querySelector('.pushbar__boton-atras');

  function verCheckout() {
    vistaCarrito.style.display = 'none';
    vistaCheckout.style.display = 'block';
  }
  botonCheckout.addEventListener('click', verCheckout);
  function ocultarCheckout() {
    vistaCarrito.style.display = 'block';
    vistaCheckout.style.display = 'none';
  }
  atrasCheckout.addEventListener('click', ocultarCheckout);

  var atrasMobil = document.querySelector('.producto__boton-atras');
  function volverTienda() {
    window.location.href = "http://localHost:5000/tienda/producto/";
  }
  atrasMobil.addEventListener('click', volverTienda);

  var formulario = document.querySelector('.pushbar__formulario');
  function hacerPedido() {
    //evento.preventDefault();
    console.log("funciona");

    var input = document.querySelector('.formulario__productos');
    input.value = localStorage.getItem('listaProductos');
    console.log(localStorage.getItem('listaProductos'));

    localStorage.removeItem('listaProductos')
  }
  formulario.addEventListener('submit', hacerPedido);

  var puntajeJuego = document.querySelector('.juego__lateral-puntaje');
  var empezarJuego = document.querySelector('.juego__iniciar');
  var completadoJuego = document.querySelector('.juego__completado');
  var tirosJuego = document.querySelector('.juego__lateral-tiros');
  var puntaje = 0;
  var tiros = 5;
  var potencia;
  var balonJuego = document.querySelector('.juego__balon');

  function terminarPartida() {
    completadoJuego.style.display = 'flex';
    if (puntaje >= 6) {
      completadoJuego.innerHTML = '<p>Congrats you made <span style="color: #FFC50D">' + puntaje + '</span> points and with that you won the <span style="color: #FFC50D"> 20% discount in your next buy!!</span></p>'
      localStorage.setItem('descuentoJuego', '20')
    } else {
      completadoJuego.innerHTML = '<p>Sorry you only made <span style="color: #FFC50D">' + puntaje + '</span> points and we cant give you the discount.<br>But hey cheer up, you can <span style="color: #FFC50D">try again tomorrow!!</span></p>'
    }
    actualizarCarrito();

  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function lanzamiento() {
    if (potencia < 35) {
      falloAbajo();
    } else if (potencia > 65) {
      falloArriba();
    } else {
      cesta();
    }
  }

  balonJuego.addEventListener('click', lanzamiento);

  async function reboteBalon() {
    reproducir('rebote');
    tirosJuego.innerHTML = 'Shots left: ' + tiros + '';
    puntajeJuego.innerHTML = '0' + puntaje + '';
    TweenMax.to(balonJuego, 0.5, { y: -130 });
    await sleep(340);
    TweenMax.to(balonJuego, 0.6, { y: -20 });
    await sleep(600);
    TweenMax.to(balonJuego, 0.1, { scale: 0 });
    await sleep(300);
    TweenMax.to(balonJuego, 0.1, { scale: 1 });
    TweenMax.to(balonJuego, 0.1, { y: 0 });
  }

  function cesta() {
    tiros--;
    puntaje += 2;

    async function lanzarBalon() {
      TweenMax.to(balonJuego, 0.8, { y: -545 });
      TweenMax.to(balonJuego, 0.8, { scale: 0.4 });
      await sleep(500);
      reproducir('cesta');
      await sleep(100);
      TweenMax.to(balonJuego, 1.1, { y: 0 });
      await sleep(800);
      reboteBalon();
    }

    lanzarBalon();

  }

  function falloArriba() {
    tiros--;

    async function lanzarBalon() {
      TweenMax.to(balonJuego, 0.8, { y: -600 });
      TweenMax.to(balonJuego, 0.8, { scale: 0.4 });
      await sleep(400);
      reproducir('tablero');
      await sleep(200);
      TweenMax.to(balonJuego, 1.1, { y: -700 });
      TweenMax.to(balonJuego, 0.8, { scale: 0.6 });
      await sleep(800);
      reboteBalon();
    }

    lanzarBalon();
  }

  function falloAbajo() {
    tiros--;

    async function lanzarBalon() {
      TweenMax.to(balonJuego, 0.8, { y: -300 });
      TweenMax.to(balonJuego, 0.8, { scale: 0.4 });
      await sleep(600);
      reboteBalon();
    }

    lanzarBalon();
  }

  function fuerzaSubir() {
    reproducir('fondo');
    empezarJuego.style.display = 'none';
    var fuerzaJuego = document.querySelector('.juego__fuerza');
    potencia = 1;
    var intervalo = setInterval(frame, 20);
    function frame() {
      if (potencia >= 94) {
        clearInterval(intervalo);
        fuerzaBajar();
      } else if (tiros == 0) {
        clearInterval(intervalo);
        terminarPartida();
      } else {
        potencia++;
        if (potencia > 35 && potencia < 65) {
          fuerzaJuego.style.background = 'rgb(255,206,30)';
        } else {
          fuerzaJuego.style.background = 'rgb(219, 33, 33)';
        }
        fuerzaJuego.style.height = potencia + '%';
        fuerzaJuego.style.flexBasis = potencia + '%';
      }
    }
  }

  function fuerzaBajar() {
    var fuerzaJuego = document.querySelector('.juego__fuerza');
    potencia = 94;
    var intervalo = setInterval(frame, 20);
    function frame() {
      if (potencia <= 0) {
        clearInterval(intervalo);
        fuerzaSubir();
      } else if (tiros == 0) {
        terminarPartida();
        clearInterval(intervalo);
      } else {
        potencia--;
        if (potencia > 35 && potencia < 65) {
          fuerzaJuego.style.background = 'rgb(255,206,30)';
        } else {
          fuerzaJuego.style.background = 'rgb(219, 33, 33)';
        }
        fuerzaJuego.style.height = potencia + '%';
        fuerzaJuego.style.flexBasis = potencia + '%';
      }
    }
  }
  empezarJuego.addEventListener('click', fuerzaSubir);

  function reproducir(audio) {
    var musicaFondo = document.getElementById("spacejamAudio");
    musicaFondo.volume = 0.5;
    var rebote = document.getElementById("reboteAudio");
    var cesta = document.getElementById("cestaAudio");
    var tablero = document.getElementById("tableroAudio");

    if (audio == 'fondo') {
      musicaFondo.play();
    } else if (audio == 'rebote') {
      rebote.play();
    } else if (audio == 'tablero') {
      tablero.play();
    } else if (audio == 'cesta') {
      cesta.play();
    }

  }

}

window.addEventListener('load', paginaCargada);