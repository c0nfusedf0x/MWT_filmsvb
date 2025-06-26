import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Film } from '../../../entities/film';
import { MaterialModule } from '../../../modules/material.module';
import { FormsModule } from '@angular/forms';
import { Person } from '../../../entities/person';
import { Postava } from '../../../entities/postava';

@Component({
  selector: 'app-films-edit-child',
  imports: [MaterialModule,FormsModule],
  templateUrl: './films-edit-child.component.html',
  styleUrl: './films-edit-child.component.css'
})
export class FilmsEditChildComponent implements OnChanges{
  @Input() allFilms: Film[] = [];
  @Input("filmToEdit") film: Film = new Film('',0,'','',[],[],{});
  @Output() toSave = new EventEmitter<Film>();
  editedFilm = new Film('Nazov',0,'SNazov','imbdID',[],[],{});
  reziser: string = '';
  postavy: string ='';
  poradieText: string = '';
  afi1998: string = '';
  afi2007: string = '';

  ngOnChanges() {
    this.editedFilm = Film.clone(this.film);
  
  this.reziser = this.editedFilm.reziser.map(p =>
    `${p.id}:${p.krstneMeno}:${p.stredneMeno}:${p.priezvisko}`
  ).join(', ');

  this.postavy = this.editedFilm.postava.map(p =>
    `${p.postava}:${p.dolezitost}:${p.herec.id}:${p.herec.krstneMeno}:${p.herec.stredneMeno}:${p.herec.priezvisko}`
  ).join(', ');

  this.poradieText = Object.entries(this.editedFilm.poradieVRebricku)
    .map(([k, v]) => `${k}:${v}`).join(', ');
    
    this.afi1998 = this.editedFilm.poradieVRebricku['AFI 1998']?.toString() || '';
    this.afi2007 = this.editedFilm.poradieVRebricku['AFI 2007']?.toString() || '';
  }

  save(){
    //to je ci uz nachadza dilm s takym poradim v 1998
    const duplicate1998 = this.allFilms.find(f =>
    f.id !== this.editedFilm.id &&
    f.poradieVRebricku['AFI 1998'] === +this.afi1998
    );

  if (duplicate1998) {
    alert(`Film "${duplicate1998.nazov}" už má poradie ${this.afi1998} v AFI 1998.`);
    return;
  }

  //to je ci uz nachadza dilm s takym poradim v 2007
  const duplicate2007 = this.allFilms.find(f =>
    f.id !== this.editedFilm.id &&
    f.poradieVRebricku['AFI 2007'] === +this.afi2007
  );

  if (duplicate2007) {
    alert(`Film "${duplicate2007.nazov}" už má poradie ${this.afi2007} v AFI 2007.`);
    return;
  }


    this.editedFilm.reziser = this.reziser.split(',').map(line => {
    const [id, krstne, stredne, priezvisko] = line.trim().split(':');
    return new Person(+id, krstne, stredne, priezvisko);
  });

  this.editedFilm.postava = this.postavy.split(',').map(line => {
    const [postava, dolezitost, idStr, krstne, stredne, priezvisko] = line.trim().split(':');
    const id = idStr ? +idStr : 0;
    const herec = new Person(+id, krstne, stredne, priezvisko);
    return new Postava(postava, dolezitost as "hlavná postava" | "vedľajšia postava", herec);
  });

  this.editedFilm.poradieVRebricku = {};
  if (this.afi1998) this.editedFilm.poradieVRebricku['AFI 1998'] = +this.afi1998;
  if (this.afi2007) this.editedFilm.poradieVRebricku['AFI 2007'] = +this.afi2007;

    console.log('Saving editedFilm:', this.editedFilm);
    this.toSave.emit(this.editedFilm);
  }

}
