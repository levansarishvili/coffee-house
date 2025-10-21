import { CITIES } from '../constants/constants';
import { registerUser } from '../utils/registerUser';
import { renderStreetOptions } from '../utils/renderStreetOptions';
import { showErrorMessage } from '../utils/showErrorMessage';
import { showSpinner } from '../utils/showSpinner';
import { showSuccessMessage } from '../utils/showSuccessMessage';
import {
  validateConfirmPassword,
  validateHouseNumber,
  validateLogin,
  validatePassword,
  validateCity,
  validateStreet,
} from '../utils/validations';

export const registration = async () => {
  const registrationFormEl =
    document.querySelector<HTMLFormElement>('.registration-form');

  const inputWrapperEls = {
    login: document.querySelector<HTMLDivElement>('.input-wrapper--login'),
    password: document.querySelector<HTMLDivElement>(
      '.input-wrapper--password'
    ),
    confirmPassword: document.querySelector<HTMLDivElement>(
      '.input-wrapper--confirm-password'
    ),
    city: document.querySelector<HTMLDivElement>('.input-wrapper--city'),
    street: document.querySelector<HTMLDivElement>('.input-wrapper--street'),
    houseNumber: document.querySelector<HTMLDivElement>(
      '.input-wrapper--house-number'
    ),
  };
  const citySelectEl =
    document.querySelector<HTMLSelectElement>('.city-select');
  const streetSelectEl =
    document.querySelector<HTMLSelectElement>('.street-select');
  const streetSelectOptionsEl = document.querySelector<HTMLSelectElement>(
    '.street-select-options'
  );
  const submitBtn = document.querySelector<HTMLButtonElement>('.register-btn');
  const resultMessageWrapperEl = document.querySelector<HTMLDivElement>(
    '.result-message-wrapper'
  );
  const registerSpinnerWrapperEl = document.querySelector<HTMLDivElement>(
    '.register-spinner-wrapper'
  );

  // Handle form submission
  registrationFormEl?.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();
    showSpinner(true, registerSpinnerWrapperEl);
    resultMessageWrapperEl && (resultMessageWrapperEl.textContent = '');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const registrationData = {
      login: data.login.toString(),
      password: data.password.toString(),
      confirmPassword: data.confirmPassword.toString(),
      city: data.city.toString(),
      street: data.street.toString(),
      houseNumber: Number(data.houseNumber),
      paymentMethod: data.paymentMethod.toString(),
    };

    try {
      const res = await registerUser(registrationData);

      showSpinner(false, registerSpinnerWrapperEl);
      showSuccessMessage(res.message, resultMessageWrapperEl);
      resetForm();
    } catch (err) {
      const errorMessage = (err as Error).message;

      showSpinner(false, registerSpinnerWrapperEl);
      showErrorMessage(errorMessage, resultMessageWrapperEl);
    }
  });

  // Generate street options based on selected city
  citySelectEl?.addEventListener('change', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const selectedCity = target.value;

    const city = CITIES.find(
      (city) => city.city.toLowerCase() === selectedCity.toLowerCase()
    );
    renderStreetOptions(streetSelectOptionsEl, city ? city.streets : []);
    streetSelectEl!.disabled = false;
  });

  // Function to validate inputs
  function validateInput(
    validationFn: (value: string) => string | null,
    wrapperEl: HTMLDivElement
  ) {
    const setValidationState = (errorMessage: string | null) => {
      if (errorMessage) {
        wrapperEl.classList.add('invalid');
        wrapperEl.classList.remove('valid');
        wrapperEl.setAttribute('data-error', errorMessage);
      } else {
        wrapperEl.classList.remove('invalid');
        wrapperEl.classList.add('valid');
        wrapperEl.removeAttribute('data-error');
      }
      checkFormValidity();
    };

    const selectEl = wrapperEl.querySelector<HTMLSelectElement>('select');
    if (selectEl) {
      selectEl.addEventListener('change', () => {
        setValidationState(validationFn(selectEl.value));
      });
      return;
    }

    const inputEl = wrapperEl.querySelector<HTMLInputElement>('input');
    if (inputEl) {
      inputEl.addEventListener('blur', () => {
        setValidationState(validationFn(inputEl.value));
      });
    }
  }

  // Validate Inputs on blur
  function setupValidations() {
    if (inputWrapperEls.login) {
      validateInput(validateLogin, inputWrapperEls.login);
    }

    if (inputWrapperEls.password) {
      validateInput(validatePassword, inputWrapperEls.password);
    }
    // Wrap confirm password to include password value
    if (inputWrapperEls.confirmPassword && inputWrapperEls.password) {
      validateInput((confirmValue: string) => {
        const passwordInput =
          inputWrapperEls.password!.querySelector<HTMLInputElement>('input')!;
        return validateConfirmPassword(passwordInput.value, confirmValue);
      }, inputWrapperEls.confirmPassword);
    }

    if (inputWrapperEls.city) {
      validateInput(validateCity, inputWrapperEls.city);
    }
    if (inputWrapperEls.street) {
      validateInput(validateStreet, inputWrapperEls.street);
    }

    if (inputWrapperEls.houseNumber) {
      validateInput(validateHouseNumber, inputWrapperEls.houseNumber);
    }
  }

  // Track form validity
  function checkFormValidity() {
    const allWrappers = Object.values(inputWrapperEls).filter(
      (el): el is HTMLDivElement => el !== null
    );

    // Check if every wrapper has 'valid' class
    const isFormValid = allWrappers.every((wrapper) =>
      wrapper.classList.contains('valid')
    );

    if (submitBtn) {
      submitBtn.classList.toggle('disabled-btn', !isFormValid);
    }
  }

  // Reset validations on focus
  function resetValidationOnFocus() {
    Object.values(inputWrapperEls).forEach((wrapperEl) => {
      wrapperEl?.addEventListener(
        'focus',
        (e: FocusEvent) => {
          const target = e.target as HTMLInputElement;
          if (target.tagName !== 'INPUT') return;
          wrapperEl.classList.remove('invalid', 'valid');
          wrapperEl.removeAttribute('data-error');
        },
        true
      );
    });
  }

  // Function to reset form after successful registration
  function resetForm() {
    registrationFormEl && registrationFormEl.reset();

    // Clear validation states
    Object.values(inputWrapperEls).forEach((wrapperEl) => {
      wrapperEl?.classList.remove('valid', 'invalid');
      wrapperEl?.removeAttribute('data-error');
    });

    citySelectEl!.selectedIndex = 0;
    streetSelectEl!.selectedIndex = 0;
    streetSelectEl!.disabled = true;

    submitBtn?.classList.add('disabled-btn');
  }

  resetValidationOnFocus();

  setupValidations();
};
