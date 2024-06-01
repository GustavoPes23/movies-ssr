interface WizardSteps {
  next: number;
  previous: number;
}

interface InputsForm {
  readonly name: string;
  readonly email: string;
  readonly login: string;
  readonly password: string;
  readonly confirmPassword: string;
}

export { WizardSteps, InputsForm };
