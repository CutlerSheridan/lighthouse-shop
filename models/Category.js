const _categorySchema = ({ _id, name, description }) => {
  return {
    _id,
    name,
    description,
  };
};

const Category = (details) => {
  const newCategory = _categorySchema(details);

  newCategory.getUrl = () => `/inventory/category/${newCategory._id}`;

  return newCategory;
};

module.exports = { Category };
