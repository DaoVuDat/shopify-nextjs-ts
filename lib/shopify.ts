import {Checkout, Product, ProductConnection} from "shopify-storefront-api-typings";
import {SelectedVariant} from "../components/ProductForm";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN!;

async function shopifyData(query: string) {
	const url = `https://${domain}/api/2022-01/graphql.json`

	const options = {
		endpoint: url,
		method: "POST",
		headers: {
			"X-Shopify-Storefront-Access-Token": storefrontAccessToken,
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({query})
	}

	try {
		const res = await fetch(url, options);
		return await res.json();
	} catch (error) {
		throw new Error("Products not fetched");
	}
}

export async function getProductsInCollection() {
	const query = `
    {
      collection(handle: "frontpage"){
        title
        products(first: 25){
          edges{
            node {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 5){
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }`;

	const res = await shopifyData(query);

	const products: ProductConnection = await res.data.collection.products;

	return products.edges ?? [];
}

export async function getAllProducts() {
	const query = `
	{
		products(first:25){
			edges {
				node {
					handle
					id
				}
			}
		}
	}
	`;

	const res = await shopifyData(query);

	const productConnection: ProductConnection = await res.data.products;



	return productConnection.edges ?? [];
}

export async function getProduct(handle: string) {
	const query = `
	{
		product(handle: "${handle}"){
			id,
			title,
			handle,
			images(first:5) {
				edges {
					node {
						url
						altText
					}
				}
			}
			options {
				name
				values
				id
			}
			variants(first: 25) {
				edges {
					node {
						selectedOptions {
							name
							value
						}
						image {
							url
							altText
						}
						title
						id
						priceV2 {
							amount
						}
						
					}
				}
			}
		}
	}
	`;

	const response = await shopifyData(query);

	const product: Product = await response.data.product;

	return product ?? {};
}

export async function createCheckout(id: string, quantity: number) {
	const query = `
		mutation {
			checkoutCreate(input:{
				lineItems: [
					{variantId: "${id}", quantity: ${quantity}}
				]
			}) {
				checkout {
					id,
					webUrl,
					
				}
			}
		}
	`;

	const response = await shopifyData(query);

	const checkout: Checkout = await response.data.checkoutCreate.checkout;

	return checkout ?? {};
}

export async function updateCheckout(id: string, lineItems: SelectedVariant[]) {
	const lineItemObject = lineItems.map(item => {
		return `{
			variantId: "${item.id}",
			quantity: ${item.variantQuantity}
		}`
	})

	const query = `
	mutation {
		checkoutLineItemsReplace(lineItems: [${lineItemObject}], checkoutId: "${id}") {
			checkout {
				id
				webUrl
				lineItems(first: 25) {
					edges {
						node {
							id
							title
							quantity
						}
					}
				}
			}
		}
	}
	`

	const response = await shopifyData(query);
	const checkout: Checkout = await response.data.checkoutLineItemsReplace.checkout;

	return checkout ?? {};
}