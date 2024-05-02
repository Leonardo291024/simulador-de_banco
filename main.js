//clase madre
class CuentasBancarias{
    constructor({
        cliente = "",
        email,
        dinero = 0,
    }){
        this.cliente = cliente;
        this.email = email;
        this.dinero = dinero;
    }

    nuevoUsuario(newUsuario, saldo){
        this.cliente = newUsuario;
        this.dinero = saldo;
        console.log(`Bienvenido ${this.cliente}`);
    }

    consultarSaldo(){
        console.log("Tu saldo es de " + this.dinero);
    }

    retirarEfectivo(retiro){
        if(retiro > this.dinero){
            console.error("No tienes suficientes fondos para retirar");
        }else{
            this.dinero -= retiro;
            console.log("Saldo disponible " + this.dinero);
        }
    }

     depositarDinero(deposito){
        if(deposito > 2000){
            console.error("Solo puedes hacer un deposito menor o igual 2000");
        }else{
            this.dinero += deposito;
            console.log("Tu nuevo saldo es de " + this.dinero)
        }
    }
}

const clientes = new CuentasBancarias({
    cliente: "",
    email: "",
    dinero: 0,
});


//INSTANCIAS DE LA CLASE MADRE
/*const pedro = new CuentasBancarias({
    cliente: "Pedro Diaz",
    email: "pedro@gmail.com",
    dinero: 100.
});

const ana = new CuentasBancarias({
    cliente: "Ana Rumpelstinski",
    email: "stinski@gmail.com",
    dinero: 1000.
});*/

document.addEventListener("DOMContentLoaded", function() {
    const saldoElement = document.getElementById("saldo");
    const newCliente = document.getElementById('cliente-form');
    const retiroForm = document.getElementById("retiro-form");
    const depositoForm = document.getElementById("deposito-form");
    const mensajeElement = document.getElementById("mensaje");
    const bienvenido = document.getElementById('bienvenido');


    //Manejar el envio del formulario nuevo cliente
    newCliente.addEventListener("submit", function(event){
        event.preventDefault();
        const inputCliente = document.getElementById('newCliente').value;
        const inputSaaldo = document.getElementById('cantidadInicial').value;
        if(inputCliente !== "" && inputSaaldo !== ""){
            clientes.nuevoUsuario(inputCliente, inputSaaldo);
    
            //clientes.nuevoUsuario(inputSaaldo);
            bienvenido.innerText = `Bienvenido/a ${clientes.cliente} Tu saldo es: ${clientes.dinero}`;


        }

    });

     // Mostrar saldo inicial
     saldoElement.innerText = `Saldo actual: $${clientes.dinero}`;

    // Manejar el envío del formulario de retiro
    retiroForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const retiroAmount = parseFloat(document.getElementById("retiro-amount").value);
        if (retiroAmount > clientes.dinero) {
            mensajeElement.innerText = "No tienes suficientes fondos para retirar.";
        } else {
            clientes.retirarEfectivo(retiroAmount);
            saldoElement.innerText = `Saldo actual: $${clientes.dinero}`;
            mensajeElement.innerText = "Retiro exitoso.";
        }
    });

    // Manejar el envío del formulario de depósito
    depositoForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const depositoAmount = parseFloat(document.getElementById("deposito-amount").value);
        if (depositoAmount > 2000) {
            mensajeElement.innerText = "Solo puedes depositar un monto menor o igual a $2000.";
        } else {
            clientes.depositarDinero(depositoAmount);
            saldoElement.innerText = `Saldo actual: $${clientes.dinero}`;
            mensajeElement.innerText = "Depósito exitoso.";
        }
    });
});
