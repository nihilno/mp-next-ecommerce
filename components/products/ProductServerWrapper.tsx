import { getProductsCached, GetProductsParams } from "@/lib/actions/cart";
import ProductList from "./ProductList";

type ProductServerWrapperProps = {
  params: GetProductsParams;
};

async function ProductServerWrapper({ params }: ProductServerWrapperProps) {
  const products = await getProductsCached(params);

  return <ProductList products={products} params={params} />;
}

export default ProductServerWrapper;
