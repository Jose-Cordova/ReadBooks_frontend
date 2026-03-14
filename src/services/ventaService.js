import api from "./api";

export const ventaService = {
  //Funcion para enviar el carrito al backend
  iniciarCompra(datos){
    return api.post('ventas', datos)
  }
}
