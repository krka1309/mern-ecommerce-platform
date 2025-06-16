//Add product to localstorage

export const addProductsToLocalStorage = (product) => {
  const favourites = getProductsFromLocalStorage();
  if (!favourites.some((p) => p._id === product._id)) {
    favourites.push(product);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }
};
//Remove product from localstorage

export const removeProductFromLocalStorage = (product) => {
  const favourites = getProductsFromLocalStorage();
  const filteredProducts = favourites.filter((p) => p._id !== product._id);
  localStorage.setItem("favourites", JSON.stringify(filteredProducts));
};

//Retrieve product from localstorage

export const getProductsFromLocalStorage = () => {
  const products = localStorage.getItem("favourites");
  return products ? JSON.parse(products) : [];
};
