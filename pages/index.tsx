import type { NextPage, GetStaticProps } from 'next'
import {getProductsInCollection} from "../lib/shopify";
import ProductList from "../components/ProductList";
import {ProductEdge} from "shopify-storefront-api-typings";


interface HomeProps {
    products: ProductEdge[];
}

export const getStaticProps: GetStaticProps = async (context) => {

    const products = await getProductsInCollection();
    return {
        props: {
            products
        }
    }
}

const Home: NextPage<HomeProps> = ({products}) => {

  return (
    <div>
      <ProductList products={products}/>
    </div>
  )
}

export default Home
