// Objetivos de la pre-entrega 3:
// Usar DOM
// Usar eventos
// Usar storage

// Simulación de base de datos. 
class BaseDeDatos{
    constructor(){
        this.productos = []; // Array donde guardamos todos los productos en carrito.
        // Cargamos los productos
        this.agregarRegistro(1, "Dieffenbachia", 3300, "Plantas", "dieffenbachia.jpg");
        this.agregarRegistro(2, "Potus", 3000, "Plantas", "potus.JPG");
        this.agregarRegistro(3, "Sanseviera", 2900, "Plantas", "sanseviera.JPG");
        this.agregarRegistro(4, "Piedras", 100, "Accesorios", "piedras.jpg");
    }

    agregarRegistro(id, nombre, precio, categoria, imagen){
        const producto = new Producto(id, nombre, precio, categoria, imagen);
        this.productos.push(producto);
    }

    traerRegistros(){
        return this.productos;
    }

    registroPorId(id){
        return this.productos.find((producto) => producto.id === id);
    }
}

// Clase Carrito donde van a estar los productos a comprar
class Carrito{
    constructor(){
        this.carrito = [];
        this.total = 0;
        this.totalProductos = 0;
    }

    estaEnCarrito(productoCarrito){
        return this.carrito.find((producto) => producto.id === productoCarrito.id);
    }

    agregar(producto){
        let productoEnCarrito = this.estaEnCarrito(producto);
        if (productoEnCarrito) {
            // Si encuentra uno igual, que me sume la cantidad
            productoEnCarrito.cantidad += 1;
        } else {
            // Agregalo al carrito
            this.carrito.push({...producto, cantidad: 1});
        }
        this.listar();
    }

    quitar(id){

        const indice = this.carrito.findIndex((producto) => producto.id === id);
        if (this.carrito[indice].cantidad >1) {
            this.carrito[indice].cantidad -= 1;
        } else {
            this.carrito.splice(indice, 1); // Si hay más de 1 unidad resta 1, sino con este método, lo borra del carrito.
        }
        this.listar();
    }

    // Redibujo el contenido del array del carrito
    listar(){
        divCarrito.innerText = "";
        for (const producto of this.carrito) {
            divCarrito.innerHTML += `
                <div class="producto">
                    <h2>${producto.nombre}</h2>
                    <p>$${producto.precio}</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <button class="btnQuitar" data-id="${producto.id}">Quitar del Carrito</button>
                </div>
            `;
        }
        // Botones de Quitar
        const botonesQuitar = document.querySelectorAll("btnQuitar");
        for (const boton of botonesQuitar){
            boton.addEventListener = (event) => {
                this.quitar(Number(boton.dataset.id)); // le aplico la funcion 'Number' porque la comparación que hacemos en el método 'quitar' es estricta. Necesita si o si ser un número y 'dataset' me trae siempre un string.
            }
        }
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

// Instanciamos el Objeto Base de Datos
const baseDatos = new BaseDeDatos;

// Elementos
const divProductos = document.querySelector("#productos");
const divCarrito = document.querySelector("#carrito");
// const elementoCredito = document.querySelector("#credito");
// const elementoCarrito = document.querySelector("#carrito");
// elementoCredito.innerText = credito;

// Llamamos a la función
cargarProductos();
// FUNCIONES REGULARES

// Muestra en el HTML los productos que tengo en la base de datos 
function cargarProductos(){
    const productos = baseDatos.traerRegistros();
    divProductos.innerHTML = "";
    for (const producto of productos){
        divProductos.innerHTML += `
            <div class="producto">
                <h2>${producto.nombre}</h2>
                <h5>$${producto.precio}.-</h5>
                <img src="img/${producto.imagen}" width="250"/>
                <button class="btnAgregar" data-id="${producto.id}">Agregar al Carrito</button>
        `;
    }
    // Botones para agregar los productos al carrito
    const botonesAgregar = document.querySelectorAll(".btnAgregar");
    for (const boton of botonesAgregar){
        boton.addEventListener("click", (event) => {
            const id = Number(boton.dataset.id);
            const producto = baseDatos.registroPorId(id);
            carrito.agregar(producto);
        });
    }
}

// Creo el objeto carrito. Lo ponemos abajo de todo para que ya todo esté instanciado, listo y vinculado para ser agregado al carrito.
const carrito = new Carrito();


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
