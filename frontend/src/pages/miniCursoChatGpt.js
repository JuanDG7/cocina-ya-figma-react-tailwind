// const productos = ["Pan", "Leche", "Huevos"];

// productos.forEach((p, index) => console.log(`Producto${index + 1}:${p}`));

// const precios = [10, 20, 30];

// precios.map((d) => {
//   const descuento = d * 0.1;
//   return d - descuento;
// });

// const productos1 = [
//   { nombre: "Pan", precio: 10 },
//   { nombre: "Leche", precio: 20 },
//   { nombre: "Huevos", precio: 30 },
// ];

// const nuevoProducto1 = productos1.map((p) => {
//   return {
//     precio: p.precio * 0.9,
//     nombre: p.nombre,
//   };
// });

// nuevoProducto1.forEach((p) =>
//   console.log(`${p.nombre} cuesta ahora ${p.precio}`)
// );

// const productos = [
//   { nombre: "Pan", precio: 10 },
//   { nombre: "Leche", precio: 20 },
//   { nombre: "Huevos", precio: 30 },
//   { nombre: "Queso", precio: 12 },
// ];

// const producotsFilter = productos.filter((p) => p.precio >= 20);
// console.log(producotsFilter);

// const productos = [
//   { nombre: "Pan", precio: 10 },
//   { nombre: "Leche", precio: 20 },
//   { nombre: "Huevos", precio: 30 },
//   { nombre: "Queso", precio: 12 },
// ];

// const productosFiltrados = productos.filter((p) => p.precio >= 15);
// const prodFinal = productosFiltrados.map((p) => {
//   return {
//     nombre: p.nombre,
//     precio: p.precio * 0.9,
//   };
// });
// prodFinal.forEach((p) => console.log(`${p.nombre} cuesta ahora ${p.precio}`));

// const precios = [10, 20, 30, 40];

// const total = precios.reduce((total, p) => {
//   return total + p;
// }, 0);

// console.log(`El valor es:${total}`);

// const productos = [
//   { nombre: "Pan", precio: 10 },
//   { nombre: "Leche", precio: 20 },
//   { nombre: "Huevos", precio: 30 },
//   { nombre: "Queso", precio: 40 },
// ];

// const total = productos.reduce((acc, p) => {
//   return acc + p.precio;
// }, 0);

// console.log(`El total de precio es:${total}`);

// const ventas = [
//   { producto: "Teclado", categoria: "Electrónica", total: 50 },
//   { producto: "Mouse", categoria: "Electrónica", total: 30 },
//   { producto: "Silla", categoria: "Muebles", total: 120 },
//   { producto: "Monitor", categoria: "Electrónica", total: 200 },
//   { producto: "Mesa", categoria: "Muebles", total: 150 },
// ];

// const ventasFiltrado = ventas.filter((p) => p.categoria === "Electrónica");
// const total = ventasFiltrado.reduce((total, p) => {
//   return total + p.total;
// }, 0);

// console.log(`Total de Electrónica:${total}`);

// const pedidos = [
//   { producto: "Pizza", categoria: "Comida", precio: 80 },
//   { producto: "Hamburguesa", categoria: "Comida", precio: 50 },
//   { producto: "Gaseosa", categoria: "Bebida", precio: 20 },
//   { producto: "Jugo", categoria: "Bebida", precio: 25 },
//   { producto: "Ensalada", categoria: "Comida", precio: 40 },
// ];

// const pedidosF = pedidos.filter((p) => p.categoria === "Comida");
// const pedidoD = pedidosF.map((p) => {
//   return {
//     producto: p.producto,
//     categoria: p.categoria,
//     precio: p.precio * 0.8,
//   };
// });

// const total = pedidoD.reduce((total, p) => {
//   return total + p.precio;
// }, 0);

// console.log(`Total con descuento en Comida:${total}`);
// const productos = [
//   { nombre: "Mouse", precio: 25 },
//   { nombre: "Teclado", precio: 40 },
//   { nombre: "Monitor", precio: 150 },
//   { nombre: "USB", precio: 10 },
// ];

// const productoCaro = productos.find((p) => {
//   return p.precio > 30;
// });
// console.log(productoCaro);

// const autos = [
//   { marca: "Toyota", anio: 2018 },
//   { marca: "Ford", anio: 2012 },
//   { marca: "Honda", anio: 2019 },
//   { marca: "BMW", anio: 2008 },
// ];

// const booleano = autos.some((a) => {
//   return a.anio > 2020;
// });

// console.log(booleano);

// const productos = [
//   { nombre: "Laptop", stock: 10 },
//   { nombre: "Mouse", stock: 5 },
//   { nombre: "Teclado", stock: 3 },
//   { nombre: "Monitor", stock: 0 },
// ];

// const stock = productos.every((p) => {
//   return p.stock > 0;
// });
// console.log(stock);

// const productos = [
//   { nombre: "Laptop", precio: 1200, stock: 5 },
//   { nombre: "Mouse", precio: 25, stock: 0 },
//   { nombre: "Teclado", precio: 45, stock: 3 },
//   { nombre: "Monitor", precio: 350, stock: 2 },
// ];

// const filtrados = productos.filter((p) => p.stock > 0);
// const nombres = filtrados.map((p) => p.nombre);

// const productos = [
//   { nombre: "Laptop", precio: 1200, stock: 5 },
//   { nombre: "Mouse", precio: 25, stock: 0 },
//   { nombre: "Teclado", precio: 45, stock: 3 },
//   { nombre: "Monitor", precio: 350, stock: 2 },
// ];

// const filtrados = productos.filter((p) => p.stock > 0);
// const total = filtrados.reduce((acc, p) => {
//   return acc + p.precio * p.stock;
// }, 0);
// const alumnos = [
//   { nombre: "Ana", nota: 8 },
//   { nombre: "Luis", nota: 6 },
//   { nombre: "María", nota: 4 },
//   { nombre: "Pedro", nota: 9 },
// ];

// const todosAprobados = alumnos.every((p) => p.nota >= 6);
// const algunoReprobo = alumnos.some((p) => p.nota < 6);

// const pedidos = [
//   { id: 1, producto: "Pizza", estado: "entregado" },
//   { id: 2, producto: "Hamburguesa", estado: "pendiente" },
//   { id: 3, producto: "Empanadas", estado: "enviado" },
//   { id: 4, producto: "Papas fritas", estado: "entregado" },
// ];

// const primerPendiente = pedidos.find((p) => p.estado === "pendiente");
// const entregados = pedidos.filter((p) => p.estado === "entregado");

// const gastos = [
//   { categoria: "Comida", monto: 120 },
//   { categoria: "Transporte", monto: 60 },
//   { categoria: "Comida", monto: 80 },
//   { categoria: "Entretenimiento", monto: 100 },
//   { categoria: "Transporte", monto: 40 },
// ];

// const gastosT = gastos.filter((p) => p.categoria === "Comida");
// const productos = [
//   { nombre: "Laptop", precio: 1200, stock: 5 },
//   { nombre: "Mouse", precio: 25, stock: 0 },
//   { nombre: "Teclado", precio: 45, stock: 3 },
//   { nombre: "Monitor", precio: 350, stock: 2 },
//   { nombre: "Auriculares", precio: 80, stock: 1 },
// ];

// const disponibles = productos.filter((p) => p.stock > 0);
// const hayCaro = productos.some((p) => p.precio > 1000);
// const valorTotal = productos.reduce((acc, p) => {
//   return acc + p.precio * p.stock;
// }, 0);

// const usuarios = [
//   { nombre: "Ana", edad: 22, pais: "Paraguay", activo: true },
//   { nombre: "Luis", edad: 17, pais: "Argentina", activo: false },
//   { nombre: "María", edad: 30, pais: "Chile", activo: true },
//   { nombre: "Pedro", edad: 25, pais: "Paraguay", activo: false },
//   { nombre: "Lucía", edad: 19, pais: "Perú", activo: true },
// ];

// const mayores = usuarios.filter((p) => p.edad > 18);
// const primerParaguayo = usuarios.find((p) => p.pais === "Paraguay");
// const activos = usuarios.filter((p) => p.activo);
// const activosMayores = usuarios.every((p) => p.edad >= 18);

// const libros = [
//   { titulo: "El principito", autor: "Saint-Exupéry", precio: 50, stock: 4 },
//   {
//     titulo: "Cien años de soledad",
//     autor: "García Márquez",
//     precio: 80,
//     stock: 2,
//   },
//   { titulo: "Rayuela", autor: "Cortázar", precio: 60, stock: 0 },
//   { titulo: "Don Quijote", autor: "Cervantes", precio: 100, stock: 1 },
//   { titulo: "Ficciones", autor: "Borges", precio: 70, stock: 3 },
// ];

// const disponibles = libros.filter((p) => p.stock > 0);
// const titulos = libros.map((l) => {
//   return l.titulo;
// });
// const valorTotalAux = libros.filter((l) => l.stock > 0);
// const valorTotal = valorTotalAux.reduce((acc, libros) => {
//   return acc + libros.precio * libros.stock;
// }, 0);

// const hayCaro = libros.some((p) => p.precio > 90);
// const alumnos = ["Ana", "Luis", "María", "Pedro", "Lucía", "Carlos", "Sofía"];

// const grupoA = alumnos.slice(0, 3);
// const grupoB = alumnos.slice(3, 6);

// console.log(alumnos);
