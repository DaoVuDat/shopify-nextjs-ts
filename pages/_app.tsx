import '../styles/globals.css'
import type {AppProps} from 'next/app'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {useRouter} from "next/router";
import Layout from "../components/Layout";
import ShopProvider from "../context/shopContext";

function MyApp({Component, pageProps}: AppProps) {
	const router = useRouter();

	return <ShopProvider>
		<Layout>
			<Component {...pageProps} key={router.asPath}/>
		</Layout>
	</ShopProvider>
}

export default MyApp
