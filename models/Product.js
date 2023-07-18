const { db } = require('../mongodb_config');

const _productSchema = ({ _id, name, description, price, categories = [] }) => {
  return {
    _id,
    name,
    description,
    price,
    categories,
  };
};

const Product = (details) => {
  if (details.length) {
    return details.map((x) => Product(x));
  }

  const newProduct = _productSchema(details);

  newProduct.getUrl = () => `/inventory/product/${newProduct._id}`;
  newProduct.displayPrice = () => `$${newProduct.price.toFixed(2)}`;
  newProduct.getStock = async () =>
    await db
      .collection('product_instances')
      .countDocuments({ product: newProduct._id });

  return newProduct;
};

module.exports = { Product };
