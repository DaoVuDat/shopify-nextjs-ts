import {GetStaticProps, GetStaticPaths} from 'next';
import {getAllProducts, getProduct} from "../../lib/shopify";
import {Product} from "shopify-storefront-api-typings";
import ProductPageContent from "../../components/ProductPageContent";

interface ProductPageProp {
	product: Product
}

const ProductPage = ({product}: ProductPageProp): JSX.Element => {

	return (
	<div>
		<ProductPageContent product={product}/>
	</div>
	);
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const products = await getAllProducts();
	const paths = products.map(product => {
		const handle = product.node.handle;

		return {
			params: {
				slug: handle
			}
		}
	});

	return {
		paths,
		fallback: false
	}
}

export const getStaticProps: GetStaticProps = async (ctx) => {

	const product = await getProduct(ctx.params!.slug as string);

	return {
		props: {
			product
		}
	}
}

export default ProductPage;