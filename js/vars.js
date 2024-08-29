/**
 * Преобразует HEX-цвет в RGB-строку.
 * @param {string} hex - HEX-строка цвета.
 * @returns {string} - Цвет в формате 'r, g, b'.
 */
function hexToRgb(hex) {
    if (!hex) return '';

    // Удаляем символ # в начале строки
    hex = hex.replace(/^#/, '');

    // Преобразуем короткий HEX (например, #abc) в полный (например, #aabbcc)
    if (hex.length === 3) {
        hex = hex.split('').map(char => char + char).join('');
    }

    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `${r}, ${g}, ${b}`;
}

/**
 * Устанавливает CSS-переменную для цвета с заданной прозрачностью.
 * @param {string} name - Имя CSS-переменной (например, 'hint', 'text').
 * @param {string} defaultColor - Цвет по умолчанию в формате 'r, g, b'.
 * @param {string} opacity - Прозрачность (например, '08' для 0.08).
 */
function setProperty(name, defaultColor, opacity) {
    const computedStyle = getComputedStyle(document.documentElement);
    const hexColor = computedStyle.getPropertyValue(`--tg-theme-${name}-color`).trim();
    const rgbColor = hexToRgb(hexColor) || defaultColor;

    document.documentElement.style.setProperty(
        `--tg-theme-${name}-color-${opacity}`, 
        `rgba(${rgbColor}, .${opacity})`
    );
}

/**
 * Создает CSS-переменную длительности анимации.
 * @param {string} name - Имя переменной.
 * @param {number} time - Длительность в миллисекундах.
 */
function createDurationVar(name, time) {
    const timeInSeconds = time / 1000;

	window[name] = time;
    document.documentElement.style.setProperty(`--${name}`, `${timeInSeconds}s`);
}

// Установка цветов с различными уровнями прозрачности
setProperty("hint", "170, 170, 170", "08");
setProperty("hint", "128, 128, 128", "15");
setProperty("text", "154, 154, 154", "15");
setProperty("text", "128, 128, 128", "08");
setProperty("text", "128, 128, 128", "04");

// Создание переменной для длительности анимации
createDurationVar("animation", 500);
