import Header from '@/components/Header/Header';
import HomeMain from '@/components/HomeMain';
import { gqlRequest } from '@/lib/api-client';
import { All_Products_Query } from '@/lib/gql';
import Head from 'next/head';

const HomePage = ({ dbData, fakeData }) => {
	return (
		<>
			<Head>
				<title>Rihlamart – Shop the Best Products</title>
				<meta
					name='description'
					content='Best deals on fashion, electronics, and more!'
				/>

				{/* ✅ Open Graph tags */}
				<meta
					property='og:title'
					content='Rihlamart – Shop the Best Products'
				/>
				<meta property='og:description' content='Best deals on fashion' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://www.rihlamart.com/' />
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320485/BLOG_THUMBNAIL_AND_BANNER/irna915e1tpjugsqw9cd.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320487/BLOG_THUMBNAIL_AND_BANNER/us2cqwhbbztrda1ol5l6.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320487/BLOG_THUMBNAIL_AND_BANNER/mkdbxi5tr5qpv4vfj2ow.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320484/BLOG_THUMBNAIL_AND_BANNER/iwpszktx2jxcqx9mf0fv.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320487/BLOG_THUMBNAIL_AND_BANNER/xdrymkah5cbblwizry4y.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320488/BLOG_THUMBNAIL_AND_BANNER/z4iaxgqksz6jt6edkgvj.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320492/BLOG_THUMBNAIL_AND_BANNER/pwqdm9omlqinbfhqm8oy.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320492/BLOG_THUMBNAIL_AND_BANNER/im83gvzx43es9sa7hzst.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320490/BLOG_THUMBNAIL_AND_BANNER/jyjnjmbfbqdet6vaxrlc.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320491/BLOG_THUMBNAIL_AND_BANNER/zq2mzf4lkziv3fdyhzrg.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320492/BLOG_THUMBNAIL_AND_BANNER/qdqoeouuyf55a0jiuzay.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320481/BLOG_THUMBNAIL_AND_BANNER/vfgizcyjwlrmofl3xkou.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320483/BLOG_THUMBNAIL_AND_BANNER/flnr1jnp8qddopix0fwy.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320483/BLOG_THUMBNAIL_AND_BANNER/vkeshwqdwqoelytam18z.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320481/BLOG_THUMBNAIL_AND_BANNER/yxpxygkpt0fyil4hma3f.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320481/BLOG_THUMBNAIL_AND_BANNER/g0shgoh7zqcxdzd9unwy.jpg'
					as='image'
				/>
				<link
					rel='preload'
					href='https://res.cloudinary.com/coderxone/image/upload/v1758320486/BLOG_THUMBNAIL_AND_BANNER/wcl3no5dwknmxxetlalg.jpg'
					as='image'
				/>

				<meta
					property='og:image'
					content='https://res.cloudinary.com/coderxone/image/upload/v1758320485/BLOG_THUMBNAIL_AND_BANNER/irna915e1tpjugsqw9cd.jpg'
				/>
				<meta property='og:image:width' content='1200' />
				<meta property='og:image:height' content='630' />
			</Head>
			<div>
				<Header fakeData={fakeData} />
				<HomeMain dbData={dbData} fakeData={fakeData} />{' '}
			</div>
		</>
	);
};

export default HomePage;

export async function getStaticProps() {
	// gqlRequest already returns parsed JSON
	const dbData = await gqlRequest({
		query: All_Products_Query,
		variables: {
			orgUid: process.env.NEXT_PUBLIC_ANALYTICS_ORGANIZATION_UID,
		},
	});

	const fakeDataRes = await fetch(
		'https://raw.githubusercontent.com/MHRafix/rihla-mart-data/main/data.json'
	);
	const fakeData = await fakeDataRes.json();

	return { props: { dbData: dbData?.products?.nodes[0], fakeData } };
}
