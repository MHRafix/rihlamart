export const FB_PIXEL_ID =
	process.env.NEXT_PUBLIC_FB_PIXEL_ID || '25103151619292816';

export const pageview = () => {
	if (typeof window !== 'undefined') {
		window.fbq('track', 'PageView');
	}
};

export const event = (name, options = {}) => {
	if (typeof window !== 'undefined') {
		window.fbq('track', name, options);
	}
};
