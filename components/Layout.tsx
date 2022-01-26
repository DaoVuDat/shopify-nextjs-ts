import React, {ReactNode} from 'react';
import Nav from './Nav';

interface LayoutProp {
	children: ReactNode
}

const Layout = ({children}: LayoutProp): JSX.Element => {
	return (
	<div className="flex flex-col justify-between min-h-screen">
		<Nav />

		<main>
			{children}
		</main>
		
		<footer>
			Footer
		</footer>
	</div>
	);
};

export default Layout;