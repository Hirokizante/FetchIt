class Cart {
  constructor(cart) {
    this.cart_id = cart.cart_id;
    this.account_id = cart.account_id;
    this.product_id = cart.product_id;
    this.quantity = cart.quantity;
    this.created_at = cart.created_at;
  }
}

module.exports = Cart;