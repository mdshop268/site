function transliterate(text) {
	const cyrillicToLatinMap = {
		'а': 'a',
		'б': 'b',
		'в': 'v',
		'г': 'g',
		'д': 'd',
		'е': 'e',
		'ё': 'yo',
		'ж': 'zh',
		'з': 'z',
		'и': 'i',
		'й': 'y',
		'к': ['k', 'c'],
		'л': 'l',
		'м': 'm',
		'н': 'n',
		'о': 'o',
		'п': 'p',
		'р': 'r',
		'с': ['s', 'c'],
		'т': 't',
		'у': 'u',
		'ф': 'f',
		'х': 'kh',
		'ц': 'ts',
		'ч': 'ch',
		'ш': 'sh',
		'щ': 'shch',
		'ъ': '',
		'ы': ['i', 'y'],
		'ь': '',
		'э': 'e',
		'ю': 'yu',
		'я': 'ya',
		'є': 'ye',
		'і': 'i',
		'ї': 'yi',
		'ґ': 'g'
	};
	
	const results = [''];
	
	for (const char of text) {
		const trans = cyrillicToLatinMap[char] || char;
		if (Array.isArray(trans)) {
			const temp = [];
			for (const result of results) {
				for (const t of trans) {
					temp.push(result + t);
				}
			}
			results.length = 0;
			results.push(...temp);
		} else {
			for (let i = 0; i < results.length; i++) {
				results[i] += trans;
			}
		}
	}
	
	return results;
}

function levenshteinDistance(a, b) {
	const matrix = [];
	
	if (a.length === 0) return b.length;
	if (b.length === 0) return a.length;
	
	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}
	
	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}
	
	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
				);
			}
		}
	}
	
	return matrix[b.length][a.length];
}

function similarityPercentage(a, b) {
	const aVariants = transliterate(a.toLowerCase());
	const bVariants = transliterate(b.toLowerCase());
	
	let maxSimilarity = 0;
	
	for (const aVar of aVariants) {
		for (const bVar of bVariants) {
			if (aVar.includes(bVar) || bVar.includes(aVar)) {
				return 100;
			}
			
			const distance = levenshteinDistance(aVar, bVar);
			const maxLength = Math.max(aVar.length, bVar.length);
			const similarity = ((maxLength - distance) / maxLength) * 100;
			maxSimilarity = Math.max(maxSimilarity, similarity);
		}
	}
	
	return maxSimilarity.toFixed(2);
}

function search(text) {
	let counter = 0;
	for (const name of names) {
		const parent = name.parentNode.parentNode;
		const suitable = (similarityPercentage(text, name.innerHTML) >= 80);
		
		parent.style.display = suitable ? "block" : "none";
		counter += suitable;
	}
	
	if (counter == 0) {
		for (const name of names) {
			const parent = name.parentNode.parentNode;
			parent.style.display = "block";
		}
	}
}

const names = document.querySelectorAll(".shop .product__name");
const searchField = document.getElementById("search");
const searchIcon = document.querySelector(".search__ico");

let clickedOnIcon = false;

function updateIcon() {
    if (document.activeElement === searchField) {
		searchIcon.innerHTML = "close";
		searchIcon.setAttribute("title", "Закрити");
    } else {
		searchIcon.innerHTML = "search";
		searchIcon.setAttribute("title", "Пошук");
    }
}

searchField.addEventListener("focus", updateIcon);

searchField.addEventListener("blur", () => {
    clickedOnIcon = false;
	updateIcon();
});

searchIcon.addEventListener("mousedown", (e) => {
    clickedOnIcon = true;
    e.preventDefault();
    if (document.activeElement === searchField) {
        searchField.blur();
    } else {
        searchField.focus();
    }
});

searchIcon.addEventListener("mouseup", updateIcon);

const commands = new Map();
commands.set("_SNOW", () => {
	if(isWinter) {isWinter = false;}
	else {isWinter = true; startSnowing();}
});
commands.set("_ICO", () => {
	let settings = document.querySelector(".promo__ico");

	settings.innerHTML = (settings.innerHTML === "confirmation_number") ? "key" : "confirmation_number";
});

searchField.onkeyup = function (e) {
	const text = searchField.value;

	if(e.key === "Enter" && commands.get(text)) {
		commands.get(text)();
	}
	else {search(text.toLowerCase());}
};
