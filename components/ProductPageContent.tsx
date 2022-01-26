import React from 'react';
import {Product} from "shopify-storefront-api-typings";

interface ProductPageContentProp {
	product: Product
}

const ProductPageContent = ({product}: ProductPageContentProp): JSX.Element => {
	return (
	<div>
		{product.title}
	</div>
	);
};

export default ProductPageContent;