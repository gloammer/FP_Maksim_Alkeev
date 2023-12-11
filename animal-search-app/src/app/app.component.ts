import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Animal } from './models/animal';
import { EType } from './models/type';
import { AnimalsService } from './services/animals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AnimalsService],
})
export class AppComponent implements OnInit {
  public animals: Animal[] = [];
  public selectedAnimal: Animal | null = null;

  public isHideCats = false;

  constructor(
    private readonly animalsService: AnimalsService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.animals = this.animalsService.getFilterdAnimals(this.isHideCats);
  }

  public showAnimalDetails(animal: Animal): void {
    this.selectedAnimal = animal;

    this.cdr.detectChanges();
  }

  public closeDetails(): void {
    this.selectedAnimal = null;

    this.cdr.detectChanges();
  }

  public toggleCatVisibility(): void {
    this.toggleIsHideCats();

    this.animals = this.animalsService.getFilterdAnimals(this.isHideCats);
  }

  private toggleIsHideCats(): void {
    this.isHideCats = !this.isHideCats;
  }
}
