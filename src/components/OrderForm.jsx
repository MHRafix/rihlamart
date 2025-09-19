import { gqlRequest } from '@/lib/api-client';
import { Place_Order_Mutation } from '@/lib/gql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FormButton, FormTextArea, FormTextField } from './FormField';

const schema = yup.object({
	name: yup.string().required('আপনার নাম দিন'),
	phone: yup
		.string()
		.required('মোবাইল নাম্বার দিন')
		.matches(/^(?:\+?88)?01[3-9]\d{8}$/, 'সঠিক মোবাইল নাম্বার দিন'),
	address: yup.string().required('ঠিকানা দিন'),
	quantity: yup
		.number()
		.min(1, 'কমপক্ষে ১ টি দিতে হবে')
		.required('কমপক্ষে ১ টি দিতে হবে'),
	code: yup.string().required('প্রোডাক্ট কোড দিন'),
	specialNote: yup.string().optional(),
});

export default function OrderForm({ productFetchedData }) {
	const router = useRouter();

	const form = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			phone: '',
			address: '',
			quantity: 1,
			code: '',
			specialNote: '',
		},
	});

	const placeOrder = useMutation({
		mutationFn: async (payload) => {
			await gqlRequest({
				query: Place_Order_Mutation,
				variables: payload,
			});
		},
		onSuccess: (data) => {
			console.log(data);
			router.push(`/order-success?orderId=${data?.placeOrder?._id}`);
		},
	});

	const onSubmit = (values) => {
		const payload = {
			payload: {
				items: [
					{
						product: productFetchedData?._id,
						price: 900, // static price, or calculate dynamically
						quantity: values.quantity,
						code: values.code,
						subtotal: 900 * values.quantity,
					},
				],
				billing: {
					name: values.name,
					phone: values.phone,
					address: values.address,
				},
				specialNote: values.specialNote,
				total: 900 * values.quantity,
				deliveryFee: 0,
				payment: {
					amount: 900 * values.quantity,
					method: 'CASH_ON_DELIVERY',
					status: 'DUE',
				},
				status: 'PENDING',
				orgUID: process.env.NEXT_PUBLIC_ANALYTICS_ORGANIZATION_UID,
			},
		};

		placeOrder.mutate(payload);
	};

	return (
		<section className='mx-4'>
			<div className='flex flex-col gap-6 rounded-md py-6 bg-white text-purple-950 border border-gray-200 shadow-sm mx-auto'>
				<div className='px-4 space-y-4'>
					<h3 className='text-2xl font-bold text-center'>অর্ডার করুন এখনই</h3>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 '>
						<FormTextField
							form_label='আপনার নাম'
							name='name'
							form={form}
							required
						/>
						<FormTextField
							form_label='মোবাইল নাম্বার'
							name='phone'
							form={form}
							required
						/>
						<FormTextArea
							form_label='ঠিকানা'
							name='address'
							form={form}
							required
							cols={12}
							rows={2}
						/>
						<div>
							<span>
								কোয়ান্টিটি <span className='text-red-500'>*</span>
							</span>
							<div className='grid grid-cols-3 w-full border border-gray-200 rounded-xl overflow-hidden'>
								<button
									type='button'
									variant='ghost'
									className='rounded-none bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-4'
									onClick={() =>
										form.setValue(
											'quantity',
											Math.max(1, (form.watch('quantity') ?? 1) - 1)
										)
									}
									disabled={
										form.watch('quantity') === 1 || placeOrder.isPending
									}
								>
									➖
								</button>
								<div className='flex items-center justify-center bg-white font-semibold'>
									{form.watch('quantity')}
								</div>
								<button
									type='button'
									variant='ghost'
									className='rounded-none bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold py-4'
									onClick={() =>
										form.setValue('quantity', (form.watch('quantity') ?? 1) + 1)
									}
									disabled={
										form.watch('quantity') === 4 || placeOrder.isPending
									}
								>
									➕
								</button>
							</div>
						</div>
						<FormTextField
							form_label='প্রোডাক্ট কোড'
							name='code'
							form={form}
							required
						/>
						<FormTextArea
							form_label='অতিরিক্ত নোট (অপশনাল)'
							name='specialNote'
							form={form}
						/>
						<div className='text-purple-950 bg-white p-4 rounded-xl border border-purple-950 space-y-2'>
							<h2 className='text-lg font-semibold text-center'>
								অর্ডার সারাংশ
							</h2>
							<div className='flex justify-between text-base'>
								<span className='text-lg font-medium'>একক মূল্য:</span>
								<span className='text-lg font-medium'>
									<span className='font-extrabold'>৳</span> 900
								</span>
							</div>
							<div className='flex justify-between text-base'>
								<span className='text-lg font-medium'>কোয়ান্টিটি:</span>
								<span className='text-lg font-medium'>
									{form.watch('quantity')}
								</span>
							</div>
							<div className='flex justify-between text-base'>
								<span className='text-lg font-medium'>ডিসকাউন্ট:</span>
								<span className='font-extrabold'>
									৳{' '}
									{(form.watch('quantity') === 2 && 100) ||
										(form.watch('quantity') === 3 && 250) ||
										(form.watch('quantity') === 4 && 400) ||
										0.0}
								</span>
							</div>
							<hr className='border-purple-300 my-2' />
							<div className='flex justify-between text-xl font-bold'>
								<span>মোট টাকা:</span>
								<span className='font-extrabold'>
									৳{' '}
									{(form.watch('quantity') === 1 && 900) ||
										(form.watch('quantity') === 2 && 1700) ||
										(form.watch('quantity') === 3 && 2450) ||
										(form.watch('quantity') === 4 && 3200)}
								</span>
							</div>
						</div>
						<FormButton
							btn_name='অর্ডার কনফার্ম করুন'
							type='submit'
							processing={placeOrder.isPending}
							disable={placeOrder.isPending}
						/>
					</form>
				</div>
			</div>
		</section>
	);
}
