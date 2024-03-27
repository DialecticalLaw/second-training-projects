import { CarBrands, InputsCarData } from '../../interfaces';
import { getRandomColor } from '../utils/get_random_color';

const carBrands: CarBrands = {
  Toyota: [
    'Camry',
    'Corolla',
    'RAV4',
    'Tacoma',
    'Tundra',
    'Prius',
    'Yaris',
    'Sienna',
    'Highlander',
    'Land Cruiser'
  ],
  Honda: [
    'Accord',
    'Civic',
    'CR-V',
    'Pilot',
    'Odyssey',
    'Ridgeline',
    'Passport',
    'HR-V',
    'Insight',
    'Clarity'
  ],
  Ford: [
    'F-150',
    'Mustang',
    'Escape',
    'Explorer',
    'Expedition',
    'Bronco',
    'Ranger',
    'Maverick',
    'Edge',
    'Taurus'
  ],
  Chevrolet: [
    'Silverado',
    'Camaro',
    'Equinox',
    'Traverse',
    'Tahoe',
    'Suburban',
    'Corvette',
    'Blazer',
    'Malibu',
    'Spark'
  ],
  Volkswagen: [
    'Jetta',
    'Golf',
    'Tiguan',
    'Atlas',
    'Taos',
    'Passat',
    'Arteon',
    'Touareg',
    'ID.4',
    'ID.Buzz'
  ],
  Hyundai: [
    'Elantra',
    'Sonata',
    'Tucson',
    'Santa Fe',
    'Palisade',
    'Kona',
    'Venue',
    'Nexo',
    'Ioniq 5',
    'Ioniq 6'
  ],
  Nissan: [
    'Altima',
    'Sentra',
    'Rogue',
    'Pathfinder',
    'Armada',
    'Frontier',
    'Titan',
    'Leaf',
    'Ariya',
    'GT-R'
  ],
  Jeep: [
    'Wrangler',
    'Gladiator',
    'Cherokee',
    'Grand Cherokee',
    'Wagoneer',
    'Compass',
    'Renegade',
    'Commander',
    'Grand Wagoneer',
    'Wrangler 4xe'
  ],
  Mercedes: [
    'C-Class',
    'E-Class',
    'S-Class',
    'GLC',
    'GLE',
    'GLS',
    'G-Class',
    'A-Class',
    'CLA',
    'GLA'
  ],
  BMW: ['3 Series', '5 Series', '7 Series', 'X3', 'X5', 'X7', 'M3', 'M5', 'M8', 'i4']
};

export function getCreateData(isRandom?: boolean): InputsCarData {
  if (isRandom) {
    const randomBrand =
      Object.keys(carBrands)[Math.floor(Math.random() * Object.keys(carBrands).length)];
    const randomModel: string = carBrands[randomBrand][Math.floor(Math.random() * 10)];
    const randomName = `${randomBrand} ${randomModel}`;
    const randomColor: string = getRandomColor();
    return {
      name: randomName,
      color: randomColor
    };
  }

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
