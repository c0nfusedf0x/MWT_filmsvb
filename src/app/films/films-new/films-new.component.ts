import { Component, inject } from '@angular/core';
import { FilmsEditChildComponent } from '../films-edit-child/films-edit-child.component';
import { Film } from '../../../entities/film';
import { FilmsService } from '../../../services/films.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-films-new',
  imports: [FilmsEditChildComponent],
  templateUrl: './films-new.component.html',
  styleUrl: './films-new.component.css'
})
export class FilmsNewComponent {
  filmsService = inject(FilmsService);
  router= inject(Router);
  route =inject(ActivatedRoute);
  film = new Film(
    'novy film',
    0,
    'novy film',
    'imbdID',
    [],
    [],
    {},
  )

  saveFilm(filmToSave: Film){
    this.filmsService.saveFilm(filmToSave).subscribe(saved =>{
      this.router.navigate(['../'],{relativeTo: this.route});
    })

  }

}
