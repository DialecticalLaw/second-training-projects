import { InputsCarData } from '../../interfaces';

export function getCreateData(): InputsCarData {
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

export function getUpdateData(): InputsCarData {
  const textInput: HTMLInputElement | null = document.querySelector('.garage__update_text');
  const colorInput: HTMLInputElement | null = document.querySelector('.garage__update_color');

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
