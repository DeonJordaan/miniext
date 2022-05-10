import React, { useState } from 'react';

const useInput = (validateValue: (value: string) => boolean) => {
	// Save entered value to state
	const [enteredValue, setEnteredValue] = useState<string>('');
	// Has the input been touched by the user
	const [isTouched, setIsTouched] = useState<boolean>(false);

	let valueIsValid: boolean | undefined;
	let hasError: boolean | undefined;

	// if (enteredValue) {
	valueIsValid = validateValue(enteredValue);
	hasError = !valueIsValid && isTouched;
	// }

	// Gather entered input value
	const valueChangeHandler = (event: React.FormEvent<Element>) => {
		const target = event.target as HTMLInputElement;
		setEnteredValue(target.value);
	};

	// onBlur event sets isTouched state
	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	// Reset input and isTouched state
	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		hasError,
		isValid: valueIsValid,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
};

export default useInput;
