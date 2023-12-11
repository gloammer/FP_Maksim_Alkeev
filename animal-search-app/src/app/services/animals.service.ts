import { Injectable } from '@angular/core';
import { Animal } from '../models/animal';
import { EType } from '../models/type';

@Injectable()
export class AnimalsService {
  private animals: Animal[] = [
    new Animal('Cat 1', 3, 'Brown', 5, EType.Cat),
    new Animal('Cat 2', 4, 'Green', 6, EType.Cat),
    new Animal('Cat 3', 2, 'Blue', 2, EType.Cat),
    new Animal('Dog 1', 2, 'Gray', 10, EType.Dog),
    new Animal('Bird 1', 2, 'Yellow', 10, EType.Bird),
    new Animal('Fish 1', 2, 'Red', 10, EType.Fish),
  ];

  public getFilterdAnimals(isHideCats: boolean): Animal[] {
    return this.animals.filter(
      (animal) => !isHideCats || animal.type !== EType.Cat
    );
  }
}
