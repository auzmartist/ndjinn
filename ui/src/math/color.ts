export const hsl_rgb = ({h, s, l}) => {
	const hue_rgb = (p, q, t) => {
		if(t < 0) t += 1
		if(t > 1) t -= 1
		if(t < 1/6) return p + (q - p) * 6 * t
		if(t < 1/2) return q
		if(t < 2/3) return p + (q - p) * (2/3 - t) * 6
		return p
	}

	let rgb: [number, number, number] = [0, 0, 0]
	if (s === 0) {
		rgb = [1, 1, 1]
	} else {
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		rgb = [hue_rgb(p, q, h + 1/3), hue_rgb(p, q, h), hue_rgb(p, q, h - 1/3)]
	}

	const [r, g, b] = rgb.map((c) => Math.round(c * 255))
	return {r, g, b}
}

export const rgb_hsl = ({r, g, b}, hueScalar = 1) => {
	r /= 255; g /= 255; b /= 255;
	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	let h, s, l = (max + min) / 2

	if(max === min) {
		h = s = 0
	} else {
		const d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch(max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6
	}

	return {h: h * hueScalar, s, l}
}

export const rgb_hex = (rgb) => rgb.reduce((color, channel) => {
	let hex = channel.toString(16)
	if (hex.length < 2) hex = '0' + hex
	return color + hex
}, '#')

export const shiftHue = ({h, s, l}, additive) => {
	let hue = h + additive
	hue = (hue > 1) ? hue - 1 : (hue < 0) ? 1 - hue : hue
	return {h: hue, s, l}
}

export function scale(color, scalars: Record<string, number>) {
	return Object.entries(scalars).reduce((scaled, [channel, scalar]) => {
		scaled[channel] *= (scalar || 1)
		return scaled
	}, {...color})
}
