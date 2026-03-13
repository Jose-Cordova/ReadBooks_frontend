import api from "./api";

export const metodosPagosService = {
  getMetodosPagos(){
    return api.get('/metodos_pagos')
  }
}
