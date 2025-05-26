export function pageSwitcher(pathname, targetCategory) {
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
            title: targetCategory.title,
          },
        ],
        sectionTitle: targetCategory.title,
      };
  }
};
