import { DataForCreate } from '../../interfaces';

export function getCreateData(): DataForCreate {
  const textInput: HTMLInputElement | null = document.querySelector('.garage__create_text');
  const colorInput: HTMLInputElement | null = document.querySelector('.garage__create_color');

  if (textInput && colorInput) {
    const name: string = textInput.value;
    const color: string = colorInput.value;
    textInput.value = '';
    return {
      name,
      color
    };
  }
  throw new Error('text or color input is undefined');
}
