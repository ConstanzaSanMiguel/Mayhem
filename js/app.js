//Inicio
alert("Welcome to Mayhem shop! We hope you find what you came looking for!")

function precioTotal(precioProducto, IVA) {
    const precioConIVA = precioProducto * (1 + IVA / 100);
    return precioConIVA;
}

const productoElegido = prompt("What are you interested in? ('Clothes', 'merch' or 'album'):").toLowerCase();

let precioSinIVA;
let precioConIVA;

switch (productoElegido) {
    case 'clothes':
        precioSinIVA = 4500;
        precioConIVA = precioTotal(precioSinIVA, 25);
        break;
    case 'merch':
        precioSinIVA = 1500;
        precioConIVA = precioTotal(precioSinIVA, 10);
        break;
    case 'album':
        precioSinIVA = 2500;
        precioConIVA = precioTotal(precioSinIVA, 15);
        break;
    default:
        alert('Unrecognized product, please try again.');
        break;
}

if (precioConIVA) {
    alert(`The total for ${productoElegido} is $${precioConIVA}`);
    alert("To proceed with the purchase please fill the following fields:")

    // Preguntar datos para mandar mail de confirmación
    let nombre = prompt("Please enter your full name:");
    let direccion = prompt("Please enter you address:");
    let email
     // Validación del email
    do {
        email = prompt("Please enter your email:");
        if (!email.includes('@')) {
            alert("Invalid email. Please enter a valid email.");
        }
    } while (!email.includes('@'));

    // Envío de datos
    alert(`Thank you ${nombre}! An email confirmation was sent to ${email} to confirm the purchase.`);
    console.log(`Data`)
    console.log(`Name: ${nombre}`);
    console.log(`Address: ${direccion}`);
    console.log(`Email: ${email}`);
}

