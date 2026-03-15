<template>
  <div class="min-h-screen bg-gray-200 pb-12">
    <Navbar />
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Encabezado -->
      <div class="text-center mb-10">
        <h1 class="text-4xl font-bold font-serif text-[#1a1625]">Pagar</h1>
        <p class="text-gray-600 font-bold uppercase text-xs tracking-widest mt-2">Completa tu compra</p>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <!-- Información de Pago -->
         <div class="bg-gray-100 border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 class="text-3xl font-bold font-serif mb-2">Información de pago</h2>
          <p class="text-gray-600 font-medium mb-8">Ingresa tus detalles de pago a continuación.</p>
          <form @submit.prevent="ejecutarPago" class="space-y-6">
            <div class="mb-6">
              <label class="block text-sm font-bold mb-2 uppercase">Detalles de la Tarjeta</label>
              <!-- Stripe inyectará el formulario seguro aquí -->
              <div id="card-element" class="p-4 border-2 border-black bg-gray-50"></div>
            </div>

            <button
              type="submit"
              :disabled="cargando || !carritoStore.pagoSeleccionado"
              class="w-full bg-[#1a1625] text-white py-4 border-2 border-black font-bold text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {{ cargando ? 'Procesando...' : 'Confirmar y Pagar $' + carritoStore.totalPagar.toFixed(2) }}
            </button>
          </form>         </div>
         <!-- Resumen del Pedido -->
         <div class="bg-gray-100 border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 class="text-3xl font-bold font-serif mb-2" >Resumen del Pedido</h2>
          <p class="text-gray-600 font-medium mb-4">Estás comprando {{ carritoStore.cantidadLibros }} artículo(s).</p>
          <!-- Lista de Libros -->
          <div class="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="libro in carritoStore.items" :key="libro.id" class="flex gap-4 items-center bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div class="w-20 h-20 bg-gray-300 border border-black flex-shrink-0">
                <img :src="getImageUrl(libro.url_imagen)" class="w-full h-full object-cover">
              </div>
              <div class="flex-grow">
                <h3 class="font-bold text-xl leading-tight">{{ libro.titulo }}</h3>
                <p class="text-xl font-bold text-blue-600 mt-1">{{ libro.autor?.nombre_completo }}</p>
                <p class="font-black text-right ">${{ libro.precio_actual }}</p>
              </div>
            </div>
          </div>
          <!-- Total Final -->
          <div class="mt-8 pt-6 border-t-4 border-black">
            <div class="flex justify-between items-center">
              <span class="text-2xl font-bold">Total</span>
              <span class="text-3xl font-black">${{ carritoStore.totalPagar.toFixed(2) }}</span>
            </div>
          </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import Navbar from '@/components/layouts/Navbar.vue';
  import { onMounted, ref } from 'vue';
  import { loadStripe } from '@stripe/stripe-js';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore';
  import { useCarritoStore } from '@/stores/carritoStore';
  import Swal from 'sweetalert2';

  const authStore = useAuthStore()
  const carritoStore = useCarritoStore()
  const router = useRouter()
  //Instancias de Stripe para el procesamiento de pagos
  let stripe = null //Clave de stripe
  let elements = null //Elemento UI de stripe
  let cardElement = null //Formulario de tarjeta

  const cargando = ref(false)

  onMounted(async () => {
    //Cargamos stripe con la lleve publica
    stripe = await loadStripe('pk_test_51T61f3Qbc13nmlnSfGMfk45KtN63t3hrEfcnqeTBMbjQ6JZBcStYk659cgiH5OxljAF83iOjGxRPH6PSf35i4GPl00zKeVzbkd')
    elements = stripe.elements()

    //Estilo para el campo de stripe
    const style = {
      base: {
        fontSize: '16px',
        color: '#000',
        fontFamily: 'Times New Roman, serif','::placeholder': { color: '#6b7280' }
      }
    }
    //Montamos los elementos en el div que creamos
    cardElement = elements.create('card', {style, hidePostalCode: true})
    cardElement.mount('#card-element')
  })

  const ejecutarPago = async () => {
    cargando.value = true
    try{
      //Pedimos el client_secret al backend
      const clientSecret = await carritoStore.procesarPago()
      //Confrimamos el pago con stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: authStore.user?.name || 'Comprador de ReadBooks'
          }
        }
      })

      if(error){
        Swal.fire('Error', error.message, 'error')
      }else if(paymentIntent.status === 'succeeded'){
        //Si todo salio correcto
        carritoStore.vaciarCarrito()
        //Refrecamos los datos del usuario
        await authStore.fetchUser()
        Swal.fire('¡Pago Exitoso!', 'Tus libros ya están en Mi Biblioteca', 'success')
        setTimeout(() => router.push('/'), 4000)
      }
    }catch(err){
      Swal.fire('Error', 'No se pudo procesar la transacción', err)
    }finally{
      cargando.value = false
    }
  }

  const getImageUrl = (url) => `http://localhost:8000/${url}`
</script>

<style scoped>
.font-serif{
  font-family:'Times New Roman', Times, serif;
}
.custom-scrollbar::-webkit-scrollbar{
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track{
  background: #e5e7eb;
}
.custom-scrollbar::-webkit-scrollbar-thumb{
  background: #000;
}
</style>
