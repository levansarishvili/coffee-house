import { signIn } from '../authStore';
import { setupHeaderCartListener } from '../utils/setupHeaderCartListener';
import { showErrorMessage } from '../utils/showErrorMessage';
import { showSpinner } from '../utils/showSpinner';
import { showSuccessMessage } from '../utils/showSuccessMessage';
import { signInUser } from '../utils/signInUser';
import { validateLogin, validatePassword } from '../utils/validations';

export const login = async () => {
  setupHeaderCartListener();

  const signInFormEl = document.querySelector<HTMLFormElement>('.login-form');
  const inputWrapperEls = {
    login: document.querySelector<HTMLDivElement>('.input-wrapper--login'),
    password: document.querySelector<HTMLDivElement>(
      '.input-wrapper--password'
    ),
  };
  const submitBtn = document.querySelector<HTMLButtonElement>('.login-btn');
  const resultMessageWrapperEl = document.querySelector<HTMLDivElement>(
    '.result-message-wrapper'
  );
  const signInSpinnerWrapperEl = document.querySelector<HTMLDivElement>(
    '.login-spinner-wrapper'
  );

  // Handle form submission
  signInFormEl?.addEventListener('submit', async (e: SubmitEvent) => {
    e.preventDefault();
    showSpinner(true, signInSpinnerWrapperEl);
    resultMessageWrapperEl && (resultMessageWrapperEl.textContent = '');

    submitBtn && submitBtn.classList.add('disabled-btn');

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const signInData = {
      login: data.login.toString(),
      password: data.password.toString(),
    };

    try {
      const res = await signInUser(signInData);

      showSpinner(false, signInSpinnerWrapperEl);
      showSuccessMessage(res.message, resultMessageWrapperEl);
      signIn(res.data);
      resetForm();
      window.location.href = '/menu.html';
    } catch (err) {
      const errorMessage = (err as Error).message;

      showSpinner(false, signInSpinnerWrapperEl);
      showErrorMessage(errorMessage, resultMessageWrapperEl);
    } finally {
      submitBtn && submitBtn.classList.remove('disabled-btn');
    }
  });

  // Function to validate inputs
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

  setupValidations();

  // Function to reset signIn form
  function resetForm() {
    signInFormEl?.reset();

    // Clear validation states
    Object.values(inputWrapperEls).forEach((wrapperEl) => {
      wrapperEl?.classList.remove('valid', 'invalid');
      wrapperEl?.removeAttribute('data-error');
    });

    submitBtn?.classList.add('disabled-btn');
  }
};
