export class Car {
  constructor(
    public name: string,
    public year: number,
    public model: string,
    public color: string,
    public horsePower: number,
    public cylinder: number,
    public imagePath: string,
    public id?: number
  ) {}
}
