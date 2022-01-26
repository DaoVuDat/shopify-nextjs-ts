import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {createCheckout, updateCheckout} from "../lib/shopify";
import {SelectedVariant} from "../components/ProductForm";

interface CartContextProp {
	cart: SelectedVariant[],
	cartOpen: boolean,
	setCartOpen: React.Dispatch<React.SetStateAction<boolean>>,
	addToCart: (newItem: SelectedVariant) => Promise<void>,
	checkoutUrl: string
	removeCartItem: (itemToRemove: string) => Promise<void>
}


const CartContext = createContext<CartContextProp>({
	cart: [],
	cartOpen: false,
	setCartOpen: () => {},
	addToCart: async () => {},
	checkoutUrl: "",
	removeCartItem: async () => {}
});

interface ShopProviderProps {
	children: ReactNode
}

const ShopProvider = ({children}: ShopProviderProps): JSX.Element => {
	const [cart, setCart] = useState<SelectedVariant[]>([]);
	const [cartOpen, setCartOpen] = useState(false)
	const [checkoutId, setCheckoutId] = useState("");
	const [checkoutUrl, setCheckoutUrl] = useState("");

	useEffect(() => {
		if(localStorage["checkoutId"]) {
			const cartObject = JSON.parse(localStorage["checkoutId"])

			if(cartObject[0].length > 0) {
				const cartList = cartObject[0] as SelectedVariant[]
				setCart([...cartList])
			}

			setCheckoutId(cartObject[1].id)
			setCheckoutUrl(cartObject[1].webUrl)
		}
	}, []);

	const addToCart = async (newItem: SelectedVariant) => {
		setCartOpen(true);

		if(cart.length === 0) {
			setCart([newItem]);

			const checkout = await createCheckout(newItem.id, newItem.variantQuantity)

			setCheckoutId(checkout.id);
			setCheckoutUrl(checkout.webUrl);

			localStorage.setItem("checkoutId", JSON.stringify([[newItem], checkout]));
		} else {
			let newCart = [...cart];

			cart.map(item => {
				if(item.id === newItem.id) {
					item.variantQuantity++;
					newCart = [...cart];
				} else {
					newCart = [...cart, newItem];
				}
			})

			setCart(newCart);
			const newCheckout = await updateCheckout(checkoutId, newCart);
			localStorage.setItem("checkoutId", JSON.stringify([newCart, newCheckout]));
		}
	}

	const removeCartItem = async (itemToRemove: string) => {
		const updatedCart = cart.filter(item => item.id !== itemToRemove)

		setCart(updatedCart);

		const newCheckout = await updateCheckout(checkoutId, updatedCart);

		localStorage.setItem("checkoutId", JSON.stringify([updatedCart, newCheckout]));

		if(cart.length === 1) {
			setCartOpen(false);
		}
	}

	return (
	<CartContext.Provider value={{
		cart,
		cartOpen,
		setCartOpen,
		addToCart,
		checkoutUrl,
		removeCartItem
	}}>
		{children}
	</CartContext.Provider>
	);
};

const ShopConsumer = CartContext.Consumer;

export {ShopConsumer, CartContext};

export default ShopProvider;