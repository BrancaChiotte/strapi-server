'use strict';
const stripe = require('stripe')('sk_test_51HkDVUAropkeX0opHncL3xs16NjB8U6gYNxCs4HtRC878gR7F59yV0KRQhXozS4BjMciKrTzo9KHGUHO33lw5G85003DkwVFLf')
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  create: async ctx => {
    const { name, total, items, stripeTokenId } = ctx.request.body;
    const {id} = ctx.state.user;
    const charge = await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      description: `Order ${new Date()} by ${ctx.state.user.username}`,
      source: stripeTokenId
    });
    const order = await strapi.services.order.create({
      name,
      total,
      items,
      user: id
    });
    return order;
  }
};
