// Objetivos de la pre-entrega 3:
// Usar DOM
// Usar eventos
// Usar storage

// Simulación de base de datos. 
class BaseDeDatos{
    constructor(){
        this.carrito = []; // Array donde guardamos todos los productos en carrito.
        // Cargamos los productos
        this.agregarRegistro(1, "Dieffenbachia", 3300, "Plantas", "dieffenbachia.jpg");
        this.agregarRegistro(2, "Potus", 3000, "Plantas", "potus.JPG");
        this.agregarRegistro(3, "Sanseviera", 2900, "Plantas", "sanseviera.JPG");
        this.agregarRegistro(4, "Piedras", 100, "Plantas", "piedras.jpg");
    }

    agregarRegistro(id, nombre, precio, categoria, imagen){
        const producto = new Producto(id, nombre, precio, categoria, imagen);
        this.carrito.push(producto);
    }

    traerRegistros(){
        return this.productos;
    }

    registroPorId(id){
        return this.productos.find((producto) => producto.id ===id);
    }
}

// Clase molde para las plantas a la venta
class Producto{
    constructor(id, nombre, precio, categoria, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
        this.imagen = imagen;
    }
}

// Crédito Disponible
let credito = 9500;

// Instanciamos el Objeto Base de Datos
const baseDatos = new BaseDeDatos;

// Elementos
const divProductos = document.querySelector("#productos");
const elementoCredito = document.querySelector("#credito");
const elementoCarrito = document.querySelector("#carrito");
elementoCredito.innerText = credito;

// FUNCIONES REGULARES

// Muestra en el HTML los productos que tengo en la base de datos 
function cargarProductos(){
    const productos = baseDatos.traerRegistros();
    divProductos.innerHTML = "";
    for (const producto of productos){
        divProductos.innerHTML += `
            <div class="producto">
                <h2>${producto.nombre}</h2>
                <p>${producto.precio}</p>
                <img src="img/${producto.imagen}"/>
                <button>Agregar al Carrito</button>
        `;
    }
}



// function comprar(planta){
//     if (credito - planta.precio <= -1){
//         alert("No tenés suficiente crédito para comprar el producto " + planta.nombre);
//         return;
//     }
//     carrito.push(planta);
//     credito = credito - planta.precio;
//     actualizarHTML();
// }

// function devolver(indice) {
//     const producto = carrito[indice];
//     credito = credito + producto.precio;
//     carrito.splice(indice, 1);
//     actualizarHTML(); // Actualizo el HTML
// }

// // Se encarga de renderizar todos los productos en el carrito
// function actualizarHTML() {
//     elementoCarrito.innerHTML = "";
//     for (const producto of carrito){
//         let indicePlanta = carrito.indexOf(producto);
//         let elementoPlanta = `<div class="planta" onclick="devolver(${indicePlanta})">${producto.nombre}</div>`;
//         elementoCarrito.innerHTML += elementoPlanta;
//     }
//     elementoCredito.innerText = credito;
// }
