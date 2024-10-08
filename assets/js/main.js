$(document).ready(function () {
    // Clase Producto
    function Producto(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    // Clase Carrito
    function Carrito() {
        this.productos = [];

        // Validar si el producto es válido
        this.ProductoValido = function (opcion) {
            return productosValidos[opcion - 1];
        };

        // Agregar producto al carrito
        this.agregarProducto = function (opcion) {
            var producto = this.ProductoValido(opcion);
            if (producto) {
                var cantidad = parseInt(prompt("Ingresa la cantidad de unidades:"));
                if (this.cantidadValida(cantidad)) {
                    this.agregarMultiplesUnidades(producto, cantidad);
                    this.notificarProductoNuevo(producto, cantidad);
                } else {
                    alert("Cantidad no válida. Intenta nuevamente.");
                }
            } else {
                alert("Opción no válida. Intenta nuevamente.");
            }
        };

        // Verificar si la cantidad ingresada es válida
        this.cantidadValida = function (cantidad) {
            return !isNaN(cantidad) && cantidad > 0;
        };

        // Agregar múltiples unidades de un producto
        this.agregarMultiplesUnidades = function (producto, cantidad) {
            for (var i = 0; i < cantidad; i++) {
                this.productos.push(producto);
            }
        };

        // Notificar al usuario que el producto ha sido agregado
        this.notificarProductoNuevo = function (producto, cantidad) {
            var mensaje = cantidad + " unidad(es) de " + producto.nombre + " agregada(s) al carrito.";
            alert(mensaje);
            console.log(mensaje);
        };

        // Calcular el total de la compra
        this.calcularTotal = function () {
            var total = 0;
            for (var i = 0; i < this.productos.length; i++) {
                total += this.productos[i].precio;
            }
            return total;
        };

        // Finalizar la compra y vaciar el carrito
        this.finalizarCompra = function () {
            var total = this.calcularTotal();
            this.productos = [];
            return total;
        };

        // Mostrar detalles de la compra
        this.mostrarDetalles = function () {
            var detalles = {};
            for (var i = 0; i < this.productos.length; i++) {
                var producto = this.productos[i];
                if (!detalles[producto.nombre]) {
                    detalles[producto.nombre] = { precio: producto.precio, cantidad: 0 };
                }
                detalles[producto.nombre].cantidad += 1;
            }

            console.log("Detalles de la compra:");
            for (var nombre in detalles) {
                if (detalles.hasOwnProperty(nombre)) {
                    var info = detalles[nombre];
                    console.log("- " + nombre + ": $" + info.precio + " x " + info.cantidad + " = $" + (info.precio * info.cantidad));
                }
            }
            console.log("Total: $" + this.calcularTotal());
        };
    }

    // Productos disponibles
    var productosValidos = [
        new Producto("Leche", 1000),
        new Producto("Pan de Molde", 2000),
        new Producto("Queso", 1200),
        new Producto("Mermelada", 890),
        new Producto("Azúcar", 1300)
    ];

    // Ejecución del proceso de compra
    var carrito = new Carrito();

    var continuar = true;
    while (continuar) {
        // Muestra los productos disponibles
        var opcionProducto = prompt(
            "Productos disponibles:\n" +
            "1. Leche $1000\n" +
            "2. Pan de Molde $2000\n" +
            "3. Queso $1200\n" +
            "4. Mermelada $890\n" +
            "5. Azúcar $1300\n" +
            "\nElige el número del producto o deja en blanco para finalizar:"
        );

        if (opcionProducto === '') {
            continuar = false;
        } else {
            var opcion = parseInt(opcionProducto);
            if (!isNaN(opcion) && opcion >= 1 && opcion <= 5) {
                // Ingreso de la cantidad de unidades que desea comprar
                carrito.agregarProducto(opcion);

                // Valida si el usuario desea seguir agregando productos o no
                var respuesta = prompt("¿Deseas seguir agregando productos? (s/n):").toLowerCase();
                if (respuesta === 'n') {
                    continuar = false;
                    //Muestra el total de la compra
                    var totalCompra = carrito.calcularTotal();
                    alert("Total de la compra: $" + totalCompra + ".");
                }
            } else {
                alert("Opción no válida. Intenta nuevamente.");
            }
        }
    }

    // Muestra detalles finales y finaliza la compra
    carrito.mostrarDetalles();
    carrito.finalizarCompra();
});
