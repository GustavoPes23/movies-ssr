interface InputsForm {
  readonly login: string;
  readonly password: string;
  readonly rememberMe: boolean;
}

interface RequestCreateAccount {
  readonly name: string;
  readonly email: string;
  readonly login: string;
  readonly password: string;
}

export { InputsForm, RequestCreateAccount };
