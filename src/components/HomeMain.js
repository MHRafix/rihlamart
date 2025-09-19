// app/components/HomeMain.tsx
import OrderForm from './OrderForm'; // Client component for the form
import PriceAndReview from './PriceAndReview';
import ProductDetails from './ProductDetails';
import VideoAndHeading from './VideoAndHeading';

export const revalidate = 0; // fully static at build time

export default function HomeMain({ dbData, fakeData }) {
	return (
		<div className='space-y-8'>
			<VideoAndHeading />
			<ProductDetails
				productData={fakeData}
				productFetchedData={dbData} // plain object for Client Component
			/>
			<PriceAndReview productData={fakeData} />

			<section className='text-center py-6 px-4 font-bold text-white bg-purple-950 rounded-xl mx-4'>
				<p className='text-md text-amber-500 leading-12'>✅ ২ পিস ১৭০০</p>
				<p className='text-md text-amber-500 leading-12'>✅ ৩ পিস ২৪৫০</p>
				<p className='text-md text-amber-500 leading-12'>✅ ৪ পিস ৩২০০</p>

				<h2 className='mt-3 text-lg font-medium bg-amber-800 p-2 rounded-xl'>
					✅ পাইকারি নিতে কল করুন {fakeData?.whatsappNumber}
				</h2>
			</section>

			{/* Client-side order form */}
			<OrderForm productFetchedData={dbData} />
		</div>
	);
}
