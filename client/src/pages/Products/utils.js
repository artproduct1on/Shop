export function pageSwitcher(pathname, data) {
  switch (pathname) {
    case "/products":
      return {
        pathArray: [
          {
            link: "",
            title: "All products",
          },
        ],
        sectionTitle: "All products",
        productsList: data,
      };
    case "/sales":
      return {
        pathArray: [
          {
            link: "",
            title: "All sales",
          },
        ],
        sectionTitle: "Discounted items",
        productsList: Array.isArray(data) ? data.filter(product => product.discont_price && product.discont_price < product.price) : [],
      };
    default:

      return {
        pathArray: [
          {
            link: "/categories",
            title: "Categories",
          },
          {
            link: "",
            title: data.category.title,
          },
        ],
        sectionTitle: data.category.title,
        productsList: data.productsList,
      };
  }
};
