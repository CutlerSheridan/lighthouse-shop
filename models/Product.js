const { db } = require('../mongodb_config');

const _productSchema = ({ _id, name, description, price }) => {
  return {
    _id,
    name,
    description,
    price,
  };
};

const Product = (details) => {
  const newProduct = _productSchema(details);

  newProduct.getUrl = () => `/inventory/product/${newProduct._id}`;
  newProduct.getStock = async () =>
    await db
      .collection('product_instances')
      .countDocuments({ product: newProduct._id });

  return newProduct;
};

module.exports = { Product };
