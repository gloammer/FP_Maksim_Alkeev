import { EType } from './type';

export class Animal {
  constructor(
    public name: string,
    public age: number,
    public color: string,
    public weight: number,
    public type: EType
  ) {}
}
