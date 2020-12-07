import { Car } from './../models/car.model';
export const carMockData: Car[] = [
  new Car(
    'Porsche',
    2020,
    'Cyan',
    'Gray',
    434,
    8,
    'https://images.dealer.com/ddc/vehicles/2020/Porsche/Cayenne/SUV/color/Biscay%20Blue%20Metallic-4A-37,69,120-640-en_US.jpg',
    0
  ),
  new Car(
    'Range Rover',
    2015,
    'Vogue',
    'Black',
    340,
    6,
    'https://s.aolcdn.com/commerce/autodata/images/CAC40LRS021B021001_2.jpg',
    1
  ),
];
export const carMockEmptyData: Car[] = [
  new Car('', null, '', '', null, null, '', null),
];

export const carMockNewData: Car[] = [
  new Car('Ferrari', 2018, 'Enzo', 'red', 520, 8, 'ferrariMockImage'),
];

export const carMockEditedData: Car[] = [
  new Car(
    'Porsche',
    2020,
    'Cyan',
    'White',
    434,
    8,
    'https://images.dealer.com/ddc/vehicles/2020/Porsche/Cayenne/SUV/color/Biscay%20Blue%20Metallic-4A-37,69,120-640-en_US.jpg',
    0
  ),
];
