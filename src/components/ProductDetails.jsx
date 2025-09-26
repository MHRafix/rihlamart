import { event } from '@/lib/fbPixel';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductDetails = ({ productData, productFetchedData }) => {
	return (
		<div className='space-y-8'>
			<section className='px-4'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
					{productFetchedData?.carouselImages?.map((img, idx) => (
						<Zoom key={idx}>
							<Image
								onClick={() =>
									event('ProductClicked', {
										value: productFetchedData?.salePrice,
										currency: 'BDT',
										content_ids: [productFetchedData?._id],
									})
								}
								src={img?.externalUrl}
								alt='Product'
								className='!w-full !h-[200px] sm:!h-[250px] object-cover rounded-xl border'
								width={400}
								height={250}
							/>
						</Zoom>
					))}
				</div>
			</section>
			<section className='px-4 space-y-4'>
				<div className='text-white bg-purple-950 rounded-xl border shadow-lg'>
					<div className='px-4 py-3 space-y-3'>
						<h3 className='text-2xl font-bold'>প্রোডাক্ট ডিটেইলসঃ</h3>
						<ul className='list-disc pl-5 space-y-2 text-lg font-medium'>
							{productData?.description?.map((description, idx) => (
								<li key={idx}>{description}</li>
							))}
						</ul>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProductDetails;
