<template>
  <div class="cart-list">
    <div class="flex justify-between">
      <div><h2 class="text-2xl font-semibold">Cart</h2></div>
    </div>
    <div v-if="cart.length === 0" class="text-xl font-medium w-full">
      <h1 class="text-center text-gray-500">Browse some books!</h1>
    </div>
    <div v-else>
      <div class="flex justify-end">
        <h6 class="font-medium text-2xl">Total Price: ${{ totalPrice }}</h6>
      </div>
      <div class="flex justify-end">
        <button
          @click="purchase"
          class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Check Out
        </button>
      </div>
    </div>

    <div class="cart-items flex flex-wrap mt-10">
      <div v-for="(item, index) in cart" :key="index" class="mr-4 mb-4">
        <img :src="item.image" class="w-60 h-60 object-cover rounded-lg" />
        <div class="flex flex-col w-60">
          <div>
            <h1 class="font-medium">{{ item.title }}</h1>
          </div>
          <div>
            <h1 class="text-xl">${{ item.price }}</h1>
          </div>
        </div>
        <button
          @click="removeFromCart(index)"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.getters.cartItems;
    },
    totalPrice() {
      return this.$store.getters.totalPrice;
    },
  },
  methods: {
    removeFromCart(index) {
      this.$store.commit("removeFromCart", index);
    },
    purchase() {
      // Store values before purchase
      const totalPaid = this.totalPrice.toFixed(2);
      const itemsBought = this.cart.length;

      this.$store.dispatch("purchase").then(() => {
        // Reset the cart after purchase
        this.$store.commit("emptyCart");
        // Show prompt with total paid and items bought
        alert(
          `Purchase successful! \n\n` +
            `Total paid: $${totalPaid} \n` +
            `Items bought: ${itemsBought}`
        );
      });
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
