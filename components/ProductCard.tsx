import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {ProductEdge} from "shopify-storefront-api-typings";
import {formatter} from "../utils/helpers";

interface ProductCardProp {
	product: ProductEdge
}

const ProductCard = ({product}: ProductCardProp): JSX.Element => {

	const {title, handle} = product.node;

	const {altText, url} = product.node.images.edges[0].node;

	const price = product.node.priceRange.minVariantPrice.amount;

	return (
		<Link href={`/product/${handle}`}>
			<a className="group">
				<div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
					<div className="relative group-hover:opacity-75 h-72">
						<Image
							src={url}
							layout="fill"
							objectFit="cover"
							priority={true}
							alt={altText}/>
					</div>
				</div>{}
				<h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
				<p className="mt-1 text-sm text-gray-700">{formatter.format(price)}</p>
			</a>
		</Link>
	);
};

export default ProductCard;