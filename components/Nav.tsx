import React, {useContext} from 'react';
import Link from 'next/link';
import {CartContext} from "../context/shopContext";
import MiniCart from "./MiniCart";

const Nav = () => {
	const { cart, setCartOpen } = useContext(CartContext);

	let cartQuantity = 0;
	cart.map((item: any) => {
		return (cartQuantity += item?.variantQuantity)
	})

	return (
	<header className="border-b sticky top-0 z-10 bg-white">
		<div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 m-auto lg:max-w-screen-xl">
			<Link href="/">
				<a>
					<span className="text-lg pt-1 font-bold">
						Shopify + Next.js
					</span>
				</a>
			</Link>

			<a onClick={() => setCartOpen(prev => !prev)} className="text-base font-bold cursor-pointer">
				Cart ({cartQuantity})
			</a>
			<MiniCart cart={cart}/>
		</div>
	</header>
	);
};

export default Nav;