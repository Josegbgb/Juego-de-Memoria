let cartas = document.documentElement.querySelector("#cartas-container");
let contador = 0;
let tiempo;
let par = [];
let btnComenzar = document.getElementById("btn-comenzar");
let intervalo;
console.log(contador);
let imagenes = [
  {
    par: 1,
    img: "img/Tulips.jpg",
  },
  {
    par: 2,
    img: "img/Penguins.jpg",
  },
  {
    par: 3,
    img: "img/Desert.jpg",
  },
  {
    par: 4,
    img: "img/Koala.jpg",
  },
  {
    par: 5,
    img: "img/Apartment.jpg",
  },
  {
    par: 6,
    img: "img/Lighthouse.jpg",
  },
  {
    par: 7,
    img: "img/Jellyfish.jpg",
  },
  {
    par: 8,
    img: "img/Volcano.jpg",
  },
  {
    par: 9,
    img: "img/Lagoon.jpg",
  },
  {
    par: 10,
    img: "img/Temple.jpg",
  },
  {
    par: 11,
    img: "img/Rocks.jpg",
  },
  {
    par: 12,
    img: "img/Mountain.jpg",
  },
  {
    par: 13,
    img: "img/Hydrangeas.jpg",
  },
  {
    par: 14,
    img: "img/Building.jpg",
  },
  {
    par: 15,
    img: "img/Chrysanthemum.jpg",
  },
];

let paresImagenes = [...imagenes, ...imagenes];

function mezclar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function comenzar() {
  let cartasHTMl = ``;
  for (let i = 0; i < paresImagenes.length; i++) {
    cartasHTMl += `<img class="cartas" src="img/back.jpg" alt="" onclick="abrir(this,id)">`;
    //cartas.innerHTML += `<img class="cartas" src="img/back.jpg" alt="" onclick="abrir(this)">`;
  }
  cartas.innerHTML = cartasHTMl;
  cartas.style.display = "grid";

  let img = document.querySelectorAll("img");
  mezclar(paresImagenes);
  img.forEach((element, index) => {
    element.dataset.img = paresImagenes[index].img;
    element.src = "img/back.jpg";
  });
  btnComenzar.remove();
  temporizador();
}

function abrir(esto, id) {
  let imgCambiar = esto;
  if (imgCambiar.attributes.src.value != "img/back.jpg") {
    return;
  }
  if (contador < 2) {
    esto.src = esto.dataset.img;
    contador++;
    par.push(esto);
    console.log(contador);
    if (contador === 2) {
      esPar();
    }
  } else {
    //  cerrar(imgCambiar);
  }
}
function esPar() {
  let img = document.querySelectorAll(".cartas");
  const imgArray = Array.from(img);

  if (par[0].src === par[1].src) {
    //selectorImg retorna solo los metodos que coinciden con la info
    const selectorImg = imgArray.filter((imgg) => imgg.src === par[0].src);
    setTimeout(function () {
      selectorImg.forEach((elemento) => {
        elemento.classList.add("par");
      });
    }, 1000);
    /* antiguo metodo funcionaba igual
    img.forEach((element) => {
      if (element.src === par[0].src) {
        setTimeout(function () {
          //cartas.removeChild(element); antiguo metodo, funcionaba
          element.classList.add("par");
          //element.style.contentVisibility = "hidden";
        }, 1000);
      }
    });*/
    contador = 0;
    par = [];
    verificar();
  } else {
    reset();
    par = [];
  }
}
function verificar() {
  let cartasRestante = document.querySelectorAll("img:not(.par)");
  let local = JSON.parse(localStorage.getItem("tiempo")) || [];
  if (cartasRestante.length === 2) {
    clearInterval(intervalo);
    //
    //
    let tiempoText = document.querySelector("#tiempo");
    let hijo = tiempoText.childNodes[0];
    let tiempo = {
      tiempo: hijo.textContent.trim(),
    };
    function convertirInt(variable_a_convertir) {
      let partesTiempo = variable_a_convertir.tiempo.split(":");
      let minutos = parseInt(partesTiempo[0]);
      let segundos = parseInt(partesTiempo[1]);
      return minutos * 60 + segundos;
    }
    let tiempoInt = convertirInt(tiempo);
    //
    //
    //
    if (local.length < 5) {
      local.push(tiempo);
      let nuevoLocal = local.sort((a, b) => convertirInt(a) - convertirInt(b));
      localStorage.setItem("tiempo", JSON.stringify(nuevoLocal));
    } else {
      let ultimoRegistro = convertirInt(local[4]);
      if (tiempoInt < ultimoRegistro) {
        local.splice(4, 1, tiempo);
        alert("hay un nuevo record", tiempoInt);
        let nuevoLocal = local.sort(
          (a, b) => convertirInt(a) - convertirInt(b)
        );
        localStorage.setItem("tiempo", JSON.stringify(nuevoLocal));
      }
    }

    setInterval(() => {
      window.location.reload();
    }, 3000);
  }
}
/*
function cerrar(esto) {
  clearTimeout(tiempo);
  contador = 0;
  let img = document.querySelectorAll(`img:not([src="img/back.jpg"])`);
  img.forEach((element) => {
    element.src = "img/back.jpg";
  });
  abrir(esto);
}*/

function reset() {
  let img = document.querySelectorAll(`img:not([src="img/back.jpg"])`);
  if (contador === 2) {
    clearTimeout(tiempo);
    tiempo = setTimeout(function () {
      img.forEach((element) => {
        element.src = "img/back.jpg";
      });
      contador = 0;
    }, 3000);
  }
}

let tiempo_display = document.getElementById("temporizador");
function setTiempo(timer) {
  return timer + 1;
}

function temporizador() {
  let tiempod = document.createElement("div");
  tiempod.classList.add("temporizador");
  let primerHijo = document.body.firstChild;

  tiempod.innerHTML = `
    <h2>00:00</h2>
 `;
  let time = 0;
  intervalo = window.setInterval(() => {
    time = setTiempo(time);
    const minutos = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const segundos = (time % 60).toString().padStart(2, "0");
    tiempod.innerHTML = `
      <h2 id="tiempo">${minutos}:${segundos}</h2>
    `;
  }, 1000);

  document.body.insertBefore(tiempod, primerHijo);
}
let local_storage = JSON.parse(localStorage.getItem("tiempo"));
if (local_storage) {
  let mejores = document.createElement("div");
  mejores.classList.add("tiempos");
  const titulo = document.createElement("h2");
  titulo.textContent = "Mejores tiempos";
  mejores.appendChild(titulo);
  local_storage.forEach((elemento) => {
    let tiempo = `<h2>${elemento.tiempo}<h2/>`;
    mejores.innerHTML += tiempo;
  });
  document.body.appendChild(mejores);
}
