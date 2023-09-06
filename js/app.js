let contenedorProductos = document.getElementById('misProductos');

function renderizarProductos(listaProductos) {
    for (const prod of listaProductos) {
        contenedorProductos.innerHTML += `
            <div class="product-grid">
                <div class="card">        
                        <img src=${prod.foto} alt="" class="card_img">
                        <div class="card_content">
                            <h2 class="card_title">${prod.producto}</h2>
                            <p class="card_price">$${prod.precio}</p>
                            <form action="#">
                            <label for="size">Choose the color & size:</label>
                                <select class="card_options" name="color" id="color">
                                    <option value="black">Black</option>
                                    <option value="white">White</option>
                                </select>
                                <select class="card_options" name="size" id="size">
                                    <option value="XS">XS</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                </select>
                                <input type="submit" value="${prod.disponible ? 'Add to cart' : 'OUT OF STOCK'}" id="addToCartBtn" class="compra btn btn-primary ${prod.disponible ? '' : 'not-available'}" data-product-id="${prod.id}" onclick="${prod.disponible ? 'agregarACarrito' : ''}(${prod.id})" ${prod.disponible ? '' : 'disabled'}>
                                </form>
                        </div>
                </div>
            </div>
        `;
    }
}

// Obtener el modal y el botón para abrirlo
const modal = document.getElementById('carritoModal');
const abrirCarritoBtn = document.getElementById('botonAbrirCarrito');

// Función para abrir y cerrar el modal del carrito
abrirCarritoBtn.addEventListener('click', () => {
    if (modal.style.display == 'none') {
        modal.style.display = 'block';
    } else {
        modal.style.display = 'none';
    }
});

renderizarProductos(productos);

let carrito = [];

function agregarACarrito(productoId) {
    console.log(`Se llamó a agregarACarrito con productoId: ${productoId}`);
    const prodACarro = productos.find((producto) => producto.id === productoId);
    carrito.push(prodACarro);
    console.log("Producto agregado al carrito:", prodACarro);

    Toastify({
        text: `${prodACarro.producto} added to the cart`,
        gravity: "bottom",
        avatar: `${prodACarro.foto}`,
        style: {
            background: "linear-gradient(to right, #332f2f, #762020)",
        }
    }).showToast();

    actualizarCarrito();
    event.preventDefault();
}

function actualizarCarrito() {
    let carritoProductosContainer = document.getElementById('carritoProductos');
    carritoProductosContainer.innerHTML = ''; // Limpiar el contenido del carrito

    let total = 0; // Inicializar el total

    // Agregar productos al carrito y calcular el total
    carrito.forEach((productos) => {
        carritoProductosContainer.innerHTML += `
            <div class="producto-en-carrito">
                <p>${productos.producto} - $${productos.precio}</p>
                <button onclick="quitarDelCarrito(${productos.id})">Eliminar</button>
            </div>
        `;

        total += productos.precio; // Sumar el precio de cada producto al total
    });

    // Mostrar el total actualizado en la página
    document.getElementById('totalCarrito').textContent = `Total: $${total.toFixed(2)}`;

    // Guardar el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function quitarDelCarrito(productoId) {
    console.log(`Se llamó a quitarDelCarrito con productoId: ${productoId}`);
    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === productoId) {
            carrito.splice(i, 1); // Elimina el producto en la posición i
            break; // Sale del bucle una vez que se ha eliminado un producto
        }
    }
    actualizarCarrito();
}

const totalCarritoElement = document.getElementById('totalCarrito');

function calcularTotal() {
    let total = 0;

    for (const producto of carrito) {
        total += producto.precio;
    }

    return total;
}

// Guardar carrito al local
const carritoGuardado = localStorage.getItem('carrito');
if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
}

const pagarButton = document.getElementById('pagarButton');
const formularioPago = document.getElementById('formularioPago');
const cerrarFormulario = document.getElementById('cerrarFormulario');
const totalAPagarSpan = document.getElementById('totalAPagar');
const datosEnvioForm = document.getElementById('datosEnvioForm');

// Agregar evento click al botón Pagar
pagarButton.addEventListener('click', () => {
    const total = calcularTotal();
    totalAPagarSpan.textContent = `$${total.toFixed(2)}`;
    formularioPago.style.display = 'block'; // Mostrar el formulario modal
});

// Agregar evento click para cerrar el formulario modal
cerrarFormulario.addEventListener('click', () => {
    formularioPago.style.display = 'none'; // Ocultar el formulario modal
    carrito = [];
    actualizarCarrito();
});

datosEnvioForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Aquí puedes obtener los valores de los campos del formulario y realizar la acción de pago/envío
    const nombre = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value;
    const address = document.getElementById('address').value;

    // Poner métodos de pago acá
    // Enviar los datos a un servidor o procesarlos de la manera que desees

    Swal.fire({
        title: `Thanks for the purchase, ${nombre}!`,
        text: `The information has been sent to ${email}.`,
        imageUrl: '../images/band.jpg',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Mayhem band',
        confirmButtonColor: '#762020',
    })

    // Vaciar el carrito
    carrito = [];
    actualizarCarrito();

    // Cerrar el formulario modal
    formularioPago.style.display = 'none';
});