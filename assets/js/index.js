const btn = document.getElementById("btnCarrito");
const panelCarrito = document.getElementById("carrito");
const carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];

const boton = document.getElementById("btn");

Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
}).fire({
  icon: "success",
  title: "Signed in successfully",
});

const cards = document.getElementById("cards");

const peticion = () => {
  fetch("./productos.json")
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      const data = datos;
      data.forEach((item, index) => {
        const card = document.createElement("div");
        card.innerHTML = `
                    <div class="card" style="width: 18rem; height: 32rem;">
                    <img class="card-img-top" src="${item.imagen}" alt="${item.nombre}"/>
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">Precio: $${item.precio}.-</p>
                            <a href="#" class="btn btn-primary comprar-item"
                                data-id-producto="${item.id_producto}"
                            >Comprar</a>
                        </div>
                    </div>
                    `;

        cards.appendChild(card);
      });
    })
    .catch((error) => console.error("Ups, Algo salio mal...6", error))
    .finally(() => console.log("Peticion finalizada"));
};

peticion();

const listaCarrito = document.getElementById("listaCarrito");

document.getElementById("btnCarrito").addEventListener("click", () => {
  panelCarrito.classList.add("abierto");
});

document.getElementById("cerrarCarrito").addEventListener("click", () => {
  panelCarrito.classList.remove("abierto");
});

cards.addEventListener("click", (event) => {
  if (event.target.classList.contains("comprar-item")) {
    const idProducto = event.target.dataset.idProducto;

    const producto = {
      id: idProducto,
      nombre:
        event.target.parentElement.querySelector(".card-title").textContent,
      precio: parseFloat(
        event.target.parentElement
          .querySelector(".card-text")
          .textContent.replace("Precio: $", "")
          .replace(".-", ""),
      ),
    };

    carritoProductos.push(producto);
    actualizarCarrito();
    panelCarrito.classList.add("abierto");

    console.log("Producto agregado al carrito:", producto);

    event.preventDefault();

    Swal.fire({
      title: "Producto agregado al Carrito!",
      text: "con ID: " + idProducto,
      icon: "success",
    });
  }
});

function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  let total = 0;
  carritoProductos.forEach((producto) => {
    total += producto.precio;
  });

  const totalElement = document.createElement("p");
  totalElement.textContent = `Total: $${total.toFixed(2)}`;
  listaCarrito.appendChild(totalElement);

  if (carritoProductos.length === 0) {
    listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  carritoProductos.forEach((producto) => {
    listaCarrito.innerHTML += `
            <div class="item-carrito">
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio}</p>
            </div>
        `;
    const carritoProductos = JSON.parse(localStorage.getItem("carrito")) || [];
    
  });
  
}

const botonVaciar = document.getElementById("vaciar-carrito");

botonVaciar.addEventListener("click", () => {
  carritoProductos.length = 0;
  actualizarCarrito();
  
});

