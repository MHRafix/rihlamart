import Image from 'next/image';

const Header = ({ fakeData }) => {
	return (
		<header className='flex sticky z-50 top-0 bg-white justify-between items-center px-4 py-4 shadow-md border-b'>
			<h1 className='text-2xl text-purple-950 font-bold'>RihlaMart</h1>
			<div className='flex gap-3'>
				<Image
					onClick={() => window.open(fakeData?.facebook, '_blank')}
					src='https://cdn-icons-png.flaticon.com/128/15047/15047435.png'
					className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
					width={32}
					height={32}
				/>
				<Image
					onClick={() =>
						window.open(`https://wa.me/${fakeData?.whatsappNumber}`, '_blank')
					}
					src='https://cdn-icons-png.flaticon.com/128/3670/3670051.png'
					className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
					width={32}
					height={32}
				/>
				<Image
					onClick={() =>
						(window.location.href = `tel:${fakeData?.whatsappNumber}`)
					}
					src='https://cdn-icons-png.flaticon.com/128/724/724664.png'
					className='h-8 w-8 cursor-pointer hover:scale-[1.2] hover:duration-300 mx-1'
					width={32}
					height={32}
				/>
			</div>
		</header>
	);
};

export default Header;
