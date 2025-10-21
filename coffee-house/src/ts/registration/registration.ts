import {
  validateConfirmPassword,
  validateHouseNumber,
  validateLogin,
  validatePassword,
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
    houseNumber: document.querySelector<HTMLDivElement>(
      '.input-wrapper--house-number'
    ),
  };

  registrationFormEl?.addEventListener('submit', (e: SubmitEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
  });

  // Function to validate inputs
  function validateInput(
    validationFn: (value: string) => string | null,
    wrapperEl: HTMLDivElement
  ) {
    wrapperEl.addEventListener(
      'blur',
      (e: FocusEvent) => {
        const target = e.target as HTMLInputElement;
        if (target.tagName !== 'INPUT') return;

        const errorMessage = validationFn(target.value);
        if (errorMessage) {
          wrapperEl.classList.add('invalid');
          wrapperEl.setAttribute('data-error', errorMessage);
        } else {
          wrapperEl.classList.remove('invalid');
          wrapperEl.classList.add('valid');
          wrapperEl.removeAttribute('data-error');
        }
      },
      true
    );
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
    if (inputWrapperEls.houseNumber) {
      validateInput(validateHouseNumber, inputWrapperEls.houseNumber);
    }
  }

  setupValidations();
};
