import RouteTracker from "../../components/RouteTracker";

function Product() {
  return <>
    <RouteTracker
      pathArray={[
        {
          link: "/categories",
          title: "Categories",
        },
        {
          link: "/categories/4",
          title: "Tools and equipment",
        },
        {
          link: "",
          title: "Secateurs",
        },
      ]}
    />
    <h1>Product</h1>
  </>;
}

export default Product;
