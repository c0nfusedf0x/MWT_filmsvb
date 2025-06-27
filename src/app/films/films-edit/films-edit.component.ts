import { Component, inject, OnInit } from '@angular/core';
import { FilmsEditChildComponent } from '../films-edit-child/films-edit-child.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { FilmsService } from '../../../services/films.service';
import { Film } from '../../../entities/film';

@Component({
  selector: 'app-films-edit',
  imports: [FilmsEditChildComponent],
  templateUrl: './films-edit.component.html',
  styleUrl: './films-edit.component.css'
})
export class FilmsEditComponent implements OnInit{
  route = inject(ActivatedRoute);
  router= inject(Router);
  filmsService =inject(FilmsService);
  film?: Film;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(filmId => this.filmsService.getFilm(filmId))).subscribe(film =>this.film= film);
  }

  saveFilm(filmToSave: Film){
    this.filmsService.saveFilm(filmToSave).subscribe(() => {
  this.router.navigate(['../../'], { relativeTo: this.route });});
  }


}
