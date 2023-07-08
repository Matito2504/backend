
const url = "http://127.0.0.1:5000"
const contenedor = document.querySelector('tbody')
let resultados = ""

// Capturamos el evento de envío del formulario 
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitamos que se recargue la página

const myModalBurguer = new bootstrap.Modal(document.getElementById('modalBurguer'))

const formBurguer = document.querySelector("form")
const codigo = document.getElementById("codigo")
const nombre = document.getElementById("nombre")
const ingredientes = document.getElementById("ingredientes")
const precio = document.getElementById("precio")
const stock = document.getElementById("stock")
let opcion = "";

var hamburguesa = { codigo: codigo, nombre: nombre, ingredientes: ingredientes, precio: precio, stock: stock };

btnCrear.addEventListener('click', () => {
    codigo.value = ''
    nombre.value = ''
    ingredientes.value = ''
    precio.value = ''
    stock.value = ''
    myModalBurguer.show()
    opcion = 'crear'
})

console.log(hamburguesa)  //Realizamos la solicitud POST al servidor 
fetch(url + 'productos',
    {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hamburguesa)
    })
    .then(function (response) { // Código para manejar la respuesta 
        if (response.ok) {
            return response.json(); // Parseamos la respuesta JSON 
        } else { // Si hubo un error, lanzar explícitamente una excepción // para ser "catcheada" más adelante 
            throw new Error('Error al agregar el producto.');
        }
    })
    .then(function (data) {
        alert('Producto agregado correctamente.'); //Limpiamos el formulario. 
        document.getElementById('codigo').value = ""; 
        document.getElementById('nombre').value = "";
        document.getElementById('ingredientes').value = "";
        document.getElementById('stock').value = ""; 
        document.getElementById('precio').value = "";
    })
    .catch(function (error) { // Código para manejar errores 
        alert('Error al agregar el producto.');
    });
})

fetch(url + 'productos')
    .then(function (response) {
        if (response.ok) {
            return response.json(); // Parseamos la respuesta JSON
        } else {
            // Si hubo un error, lanzar explícitamente una excepción
            // para ser "catcheada" más adelante
            throw new Error('Error al obtener los productos.');
        }
    })
    .then(function (data) {
        var tablaHamburguesas = document.getElementById('tablaHamburguesas');

        // Iteramos sobre los productos y agregamos filas a la tabla
        data.forEach(function (hamburguesa) {
            var fila = document.createElement('tr');
            fila.innerHTML = '<td>' + hamburguesa.codigo + '</td>' +
                '<td>' + hamburguesa.nombre + '</td>' +
                '<td align="right">' + hamburguesa.ingredientes + '</td>' +
                '<td align="right">&nbsp; &nbsp;&nbsp; &nbsp;</td>' + '<td>' + hamburguesa.codigo + '</td>' + hamburguesa.precio + '</td>';
            tablaHamburguesas.appendChild(fila);
        });
    })
    .catch(function (error) {
        // Código para manejar errores
        alert('Error al obtener los productos.');
    });


const mostrar = (hamburguesa) => {
    articulos.forEach(articulo => {
        resultados += ` <tr>
                            <td>${hamburguesa.id}</td>
                            <td>${hamburguesa.nombre}</td>
                            <td>${hamburguesa.ingredientes}</td>
                            <td>${hamburguesa.cantidad}</td>
                            <td>${hamburguesa.precio}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                        </tr>
                    `
    })
    contenedor.innerHTML = resultados
}

