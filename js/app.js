const productos = [
    { id: 1, producto: "Group shirt", characteristic: "Black", precioSinIVA: 4500, IVA: 25, disponible: true },
    { id: 2, producto: "Member shirt", characteristic: "Black", precioSinIVA: 4500, IVA: 25, disponible: true },
    { id: 3, producto: "Lightstick", characteristic: "", precioSinIVA: 6500, IVA: 30, disponible: true },
    { id: 5, producto: "Necklace", characteristic: "Gold", precioSinIVA: 1500, IVA: 10, disponible: true },
    { id: 6, producto: "Find a Way album", characteristic: "Random version", precioSinIVA: 2700, IVA: 15, disponible: true },
    { id: 7, producto: "Be the change album", characteristic: "Version 1", precioSinIVA: 3000, IVA: 15, disponible: true },
    { id: 8, producto: "Be the change album", characteristic: "Version 2", precioSinIVA: 3000, IVA: 15, disponible: true },
    { id: 9, producto: "Black out album", characteristic: "Random version", precioSinIVA: 2500, IVA: 15, disponible: true },
    { id: 10, producto: "Can't take us alive album", characteristic: "Only version", precioSinIVA: 2500, IVA: 15, disponible: true },
];

function precioTotal(precioProducto, IVA) {
    const precioConIVA = precioProducto * (1 + IVA / 100);
    return precioConIVA;
}

const today = new Date();

//Inicio
alert("Welcome to Mayhem shop! We hope you find what you came looking for!")
alert("Please choose the product you want to purchase.")
productos.forEach(producto => {
    console.log(`ID: ${producto.id}, Product: ${producto.producto} ${producto.characteristic}`);
});

const userInput = prompt("Please type the ID of the product you'd like to purchase:");

if (userInput !== null) {
    const productoElegidoID = parseInt(userInput);
    const productoElegido = productos.find(producto => producto.id === productoElegidoID);

    if (productoElegido) {
        const precioConIVA = precioTotal(productoElegido.precioSinIVA, productoElegido.IVA);
        console.log(`Product: ${productoElegido.producto}, ${productoElegido.characteristic}`);
        console.log(`The total for ${productoElegido.producto} is $${precioConIVA.toFixed(2)}`);

        // Preguntar datos para mandar mail de confirmación
        alert(`If you want to continue with the purchase of ${productoElegido.producto} at a total of $${precioConIVA.toFixed(2)} please fill the following inputs:`)
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
        console.log(`Data on ${today.toLocaleDateString()}`);
        console.log(`Name: ${nombre}`);
        console.log(`Address: ${direccion}`);
        console.log(`Email: ${email}`);
    } else {
        alert("Product not found.");
    }
} else {
    alert("Wrong input. Please try again.");
}
