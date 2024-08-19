function hexToRgb(hex, _) {
	if (!hex) {
		return `${_}`;
	}
	
	hex = hex.replace(/^#/, '');
	
	if (hex.length === 3) {
		hex = hex.split('')
			.map(char => char + char)
			.join('');
	}
	
	const bigint = parseInt(hex, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	
	return `${r}, ${g}, ${b}`;
}

function setProperty(name, _color, opacity) {
	const color = hexToRgb(getComputedStyle(document.documentElement)
		.getPropertyValue(`--tg-theme-${name}-color`)
		.trim(), _color);
	document.documentElement.style.setProperty(`--tg-theme-${name}-color-${opacity}`, `rgba(${color}, .${opacity})`);
}

function createDurationVar(name, time) {
	document.documentElement.style.setProperty(`--${name}`, `.${time}s`);
	window[name] = time;
}

setProperty("hint", "170, 170, 170", "08");
setProperty("hint", "128, 128, 128", "15");
setProperty("text", "154, 154, 154", "15");
setProperty("text", "128, 128, 128", "08");
setProperty("text", "128, 128, 128", "04");

createDurationVar("animation", 500);
