import { Loader2 } from 'lucide-react';

export const FormTextField = ({
	form_label,
	required,
	form,
	disabled,
	name,
}) => {
	return (
		<div id='field_wrapper'>
			<label id='input_label' htmlFor='field_label'>
				{form_label}
				{required && <span id='required_sign'>*</span>}
			</label>
			<br />
			<input
				type={'text'}
				id={name}
				className='file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 text-base shadow-xs transition-[color,box-shadow] file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm  py-6 border-gray-200 text-purple-950'
				{...form.register(name)}
				placeholder={form_label}
				required={required}
				disabled={disabled}
			/>
		</div>
	);
};

export const FormTextArea = ({
	form_label,
	cols,
	form,
	rows,
	required,
	disabled,
	name,
}) => {
	return (
		<div id='field_wrapper'>
			<label id='input_label' htmlFor='field_label'>
				{form_label}
				{required && <span id='required_sign'>*</span>}
			</label>
			<br />
			<textarea
				id={name}
				className='border-input placeholder:text-gray-400 flex min-h-16 w-full rounded-md bg-transparent px-3 disabled:opacity-50 md:text-sm py-6 border border-gray-200 '
				cols={cols}
				placeholder={form_label}
				rows={rows}
				{...form.register(name)}
				required={required}
				disabled={disabled}
			></textarea>
		</div>
	);
};

// form button
export const FormButton = ({ type, btn_name, processing, disable }) => {
	return (
		<div id='field_wrapper' className='!w-full mt-2'>
			{processing ? (
				<button
					type={'submit'}
					id='form_btn_disabled'
					className='flex justify-center w-full bg-purple-950 text-white font-bold py-5 cursor-pointer rounded-md text-xl'
					disabled={disable}
				>
					<Loader2 className='h-8 w-8 animate-spin' />
				</button>
			) : (
				<button
					type={type}
					className='flex justify-center w-full bg-purple-950 text-white font-bold py-5 cursor-pointer rounded-md text-xl'
				>
					{btn_name}
				</button>
			)}
		</div>
	);
};
