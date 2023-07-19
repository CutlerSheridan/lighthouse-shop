const _categorySchema = ({ _id, name, description }) => {
  return {
    _id,
    name,
    description,
  };
};

const Category = (details) => {
  if (details.length) {
    return details.map((x) => Category(x));
  }

  const newCategory = _categorySchema(details);

  newCategory.getUrl = () => `/inventory/category/${newCategory._id}`;

  return newCategory;
};

module.exports = { Category };
