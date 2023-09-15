const contenedorProductos = document.getElementById('misProductos');
let listaProductos;

async function renderizarProductos() {
    try {
        const response = await fetch('../JSON/productos.json');
        if (!response.ok) {
            throw new Error('Product list not found.');
        }
        listaProductos = await response.json();
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
                            <input type="submit" value="${prod.disponible ? 'Add to cart' : 'OUT OF STOCK'}" id="addToCartBtn" class="compra btn btn-primary ${prod.disponible ? '' : 'not-available'}" data-product-id="${prod.id}" onclick="${prod.disponible ? `agregarACarrito(${prod.id}, listaProductos)` : ''}" ${prod.disponible ? '' : 'disabled'}>
                            </form>
                    </div>
            </div>
        </div>
    `;
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Obtener el modal y el botón para abrirlo
const modal = document.getElementById('carritoModal');
const abrirCarritoBtn = document.getElementById('botonAbrirCarrito');

// Función para abrir y cerrar el modal del carrito
abrirCarritoBtn.addEventListener('click', () => {
    modal.style.display = (modal.style.display == 'none') ? 'block' : 'none';
});

// Cargo los productos.
renderizarProductos();

let carrito = [];

function agregarACarrito(productoId, listaProductos) {
    console.log(`Se llamó a agregarACarrito con productoId: ${productoId}`);
    const prodACarro = listaProductos.find((producto) => producto.id === productoId);
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

// Eliminar productos del carrito
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

// Buscar carrito en el local
const carritoGuardado = localStorage.getItem('carrito');
carritoGuardado ? (carrito = JSON.parse(carritoGuardado), actualizarCarrito()) : null;

const totalCarritoElement = document.getElementById('totalCarrito');

function calcularTotal() {
    let total = 0;

    for (const producto of carrito) {
        total += producto.precio;
    }

    return total;
}

// Formulario
const pagarButton = document.getElementById('pagarButton');
const formularioPago = document.getElementById('formularioPago');
const cerrarFormulario = document.getElementById('cerrarFormulario');
const totalAPagarSpan = document.getElementById('totalAPagar');
const datosEnvioForm = document.getElementById('datosEnvioForm');
const endShopping = document.getElementById('endShopping')

// Agregar evento click al botón Pagar
pagarButton.addEventListener('click', () => {
    const total = calcularTotal();
    totalAPagarSpan.textContent = `$${total.toFixed(2)}`;
    formularioPago.style.display = 'block'; // Mostrar el formulario modal
});

// Agregar evento click para cerrar el formulario modal
cerrarFormulario.addEventListener('click', () => {
    formularioPago.style.display = 'none'; // Ocultar el formulario modal
});

datosEnvioForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Acá irían los métodos de pago

    // Enviar los datos a un servidor
    Swal.fire({
        title: `Thanks for the purchase, ${nombre}!`,
        text: `The information has been sent to ${email}.`,
        imageUrl: '../images/band.jpg',
        imageWidth: 400,
        imageHeight: 300,
        imageAlt: 'Mayhem band',
        confirmButtonColor: '#762020',
    })

    // Cerrar el formulario modal
    formularioPago.style.display = 'none';
});

// Vaciar el carrito y eliminar los datos con el formulario lleno
endShopping.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const zipcode = document.getElementById('zipcode').value;
    const address = document.getElementById('address').value;

    // Validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);

    if (!name || !isEmailValid || !country || !city || !zipcode || !address) {
        // Mensaje de error si faltan campos o el email es inválido
        Swal.fire({
            icon: 'error',
            text: 'Please fill out every input correctly before checkout.',
            confirmButtonColor: '#762020',
        })
    } else {
        // Si todos los campos están completos y el correo electrónico es válido, eliminar el carrito y los datos
        localStorage.removeItem('carrito');
        sessionStorage.removeItem('carrito');
        carrito = [];
        actualizarCarrito();
        modal.style.display = 'none'; // Cerrar el modal del carrito
    }
});