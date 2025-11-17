import { getProducts, GetProductsParams } from "@/lib/actions";
import ProductList from "./ProductList";

type ProductServerWrapperProps = {
  params: GetProductsParams;
};

async function ProductServerWrapper({ params }: ProductServerWrapperProps) {
  const products = await getProducts(params);

  return <ProductList products={products} params={params} />;
}

export default ProductServerWrapper;
