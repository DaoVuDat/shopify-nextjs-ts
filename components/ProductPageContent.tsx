import React from 'react';
import Image from 'next/image';
import {Product} from "shopify-storefront-api-typings";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination} from "swiper";
import ProductForm from "./ProductForm";


interface ProductPageContentProp {
	product: Product
}

const ProductPageContent = ({product}: ProductPageContentProp): JSX.Element => {

	const images: JSX.Element[] = [];

	product.images.edges.map((image,i) => {
		images.push(
			<SwiperSlide key={`slide-${i}`}>
				<Image src={image.node.url} alt={image.node.altText} layout="fill" objectFit="cover" priority={true}/>
			</SwiperSlide>
		);
	})

	SwiperCore.use([Navigation, Pagination])

	return (
	<div className="flex flex-col justify-center items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
		<div className="w-full max-w-md border bg-white rounded-2xl overflow-hidden shadow-lg md:w-1/2">
			<div className="relative h-96 w-full">
				{/*<Image*/}
				{/*	priority={true}*/}
				{/*	layout="fill"*/}
				{/*	objectFit="cover"*/}
				{/*	src={product.images.edges[0].node.url}*/}
				{/*	alt={product.images.edges[0].node.altText}/>*/}
				<Swiper
				// @ts-ignore
				style={{"--swiper-navigation-color": '#000', "--swiper-pagination-color": '#000'}}
					navigation
					loop
					className="h-96 rounded-2xl"
					pagination={{clickable: true}}
				>
					{images}
				</Swiper>
			</div>
		</div>
		<ProductForm product={product}/>
	</div>
	);
};

export default ProductPageContent;