import React, {useState, useContext, useEffect} from 'react';
import {Product} from "shopify-storefront-api-typings";
import {formatter} from "../utils/helpers";
import ProductOptions from "./ProductOptions";

interface ProductFormProps {
	product: Product
}

const ProductForm = ({product}: ProductFormProps): JSX.Element => {

	const allVariantOptions = product.variants.edges?.map(variant => {
		const allOptions: {
			[name: string]: string
		} = {}

		variant.node.selectedOptions.map(item => {
			allOptions[item.name] = item.value;
		})

		return {
			id: variant.node.id,
			title: product.title,
			handle: product.handle,
			image: variant.node.image?.url,
			options: allOptions,
			variantTitle: variant.node.title,
			variantPrice: variant.node.priceV2.amount,
			variantQuantity: 1
		}
	})

	const defaultValues: {
		[name: string]: string
	} = {}

	product.options.map(item => {
		defaultValues[item.name] = item.values[0]
	})

	const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0])
	const [selectedOptions, setSelectedOptions] = useState(defaultValues);

	const setOption = (name: string, value: string) => {
		setSelectedOptions(prevState => {
			console.log(name, value)
			return {...prevState, [name]: value}
		})
	}

	return (
	<div className="rounded-2xl p-4 shadow-lg flex flex-col w-full md:w-1/3">
		<h2 className="text-2xl font-bold">{product.title}</h2>
		<span className="pb-6">{formatter.format(product.variants.edges[0].node.priceV2.amount)}</span>
		{
			product.options.map(({name, values}) => {
				return <ProductOptions
									name={name}
									values={values}
									selectedOptions={selectedOptions}
									setOption={setOption}
									key={`key-${name}`}/>
		})
		}
		<button className="bg-black rounded-lg text-white px-2 py-3 hover:bg-gray-800">Add To Cart</button>
	</div>
	);
};

export default ProductForm;