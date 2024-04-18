const inputElement = document.getElementById('input') as HTMLInputElement;
const button = document.getElementById('submit');
const messageElement = document.getElementById('message');

button?.addEventListener('click', (e) => {
	e.preventDefault();
	const personalNumberString = inputElement.value;

	const isValid = isValidPersonalNumber(personalNumberString);

	if (!personalNumberString || !messageElement) {
		console.error('Something broke!');
		return;
	}

	if (!isValid) {
		console.log('Personnumret är ogiltigt.');
		messageElement.innerText =
			'Felaktigt personnummer. Vänligen skriv in ett giltigt personnummer.';
	} else {
		console.log('Personnumret är giltigt.');
		messageElement.innerText = 'Personnumret är giltigt.';
	}

	console.log(isValid);
});

function isValidPersonalNumber(personalNumber: string): boolean {
	personalNumber = personalNumber.replace(/\D/g, '');

	if (personalNumber.length > 10) {
		personalNumber = personalNumber.slice(2);
	}

	if (personalNumber.length !== 10) {
		return false;
	}

	let sum = 0;

	for (let i = 0; i < 9; i++) {
		let digit = Number(personalNumber[i]);
		if (i % 2 === 0) {
			digit *= 2;
			if (digit > 9) {
				const digiString = String(digit);

				digit = Number(digiString[0]) + Number(digiString[1]);
			}
		}
		sum += digit;
	}

	const claculatedControlDigit = (10 - (sum % 10)) % 10;
	const lastDigit = Number(personalNumber[9]);

	console.log('Calculated Control Digit: ', claculatedControlDigit);
	console.log('Last Digit: ', lastDigit);

	return claculatedControlDigit === lastDigit;
}
