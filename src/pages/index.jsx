import HomeMain from '@/components/HomeMain';
import { gqlRequest } from '@/lib/api-client';
import { All_Products_Query } from '@/lib/gql';

const HomePage = ({ dbData, fakeData }) => {
	console.log({ dbData, fakeData });
	return (
		<div>
			<HomeMain dbData={dbData} fakeData={fakeData} />{' '}
		</div>
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
