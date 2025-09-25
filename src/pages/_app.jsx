import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { useEffect } from 'react';
import * as fbq from '../lib/fbPixel';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		// Track page views on route change
		const handleRouteChange = () => {
			fbq.pageview();
		};
		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			{/* Facebook Pixel Script (lazy load after page becomes interactive) */}
			<Script
				id='fb-pixel'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${
				process.env.NEXT_PUBLIC_FB_PIXEL_ID || '1104740558048901'
			}');
      fbq('track', 'PageView');
    `,
				}}
			/>
			{/* NoScript fallback for browsers with JS disabled */}
			<noscript>
				<img
					height='1'
					width='1'
					style={{ display: 'none' }}
					src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
				/>
			</noscript>
			<QueryClientProvider client={queryClient}>
				<Component {...pageProps} />
			</QueryClientProvider>
		</>
	);
}
