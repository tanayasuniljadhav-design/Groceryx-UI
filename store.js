const ORDERS_KEY = "groceryxOrders";
const RECENTLY_VIEWED_KEY = "groceryxRecentlyViewed";

export const getOrders = () => {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch (error) {
    return [];
  }
};

export const saveOrders = (orders) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

  // Notify other parts of the application
  window.dispatchEvent(new Event("groceryx-orders-updated"));
};

export const createOrder = (customer, products) => {
  const orders = getOrders();

  const totalAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const order = {
    id: "ORD" + Date.now(),
    customerName: customer.name,
    customerEmail: customer.email,
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    })),
    amount: totalAmount,
    status: "Placed",
    time: new Date().toISOString(),
  };

  const updatedOrders = [order, ...orders];

  saveOrders(updatedOrders);

  return order;
};

export const addRecentlyViewed = (product) => {
  let viewed = [];

  try {
    viewed = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY)) || [];
  } catch (error) {
    viewed = [];
  }

  const filtered = viewed.filter((item) => item.id !== product.id);

  const updated = [
    {
      ...product,
      viewedAt: new Date().toISOString(),
    },
    ...filtered,
  ].slice(0, 10);

  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));

  window.dispatchEvent(new Event("groceryx-viewed-updated"));
};

export const getRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY)) || [];
  } catch (error) {
    return [];
  }
  
  
};