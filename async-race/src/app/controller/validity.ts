import { OptionsTypes } from '../../interfaces';

export function isValid(optionType: OptionsTypes): boolean {
  if (optionType === OptionsTypes.Create) {
    const textInput: HTMLInputElement | null = document.querySelector('.garage__create_text');
    return Boolean(textInput?.value);
  }
  const textInput: HTMLInputElement | null = document.querySelector('.garage__update_text');
  return Boolean(textInput?.value);
}
