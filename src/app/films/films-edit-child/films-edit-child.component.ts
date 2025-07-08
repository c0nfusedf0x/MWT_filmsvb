import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Film } from '../../../entities/film';
import { MaterialModule } from '../../../modules/material.module';
import { FormsModule } from '@angular/forms';
import { Person } from '../../../entities/person';
import { Postava } from '../../../entities/postava';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-films-edit-child',
  imports: [MaterialModule,FormsModule,CommonModule],
  templateUrl: './films-edit-child.component.html',
  styleUrl: './films-edit-child.component.css'
})
export class FilmsEditChildComponent implements OnChanges{
  @Input() allFilms: Film[] = [];
  @Input("filmToEdit") film: Film = new Film('',0,'','',[],[],{});
  @Output() toSave = new EventEmitter<Film>();
  editedFilm = new Film('Nazov',0,'SNazov','imbdID',[],[],{});
  afi1998: number = 0;
  afi2007: number = 0;
  reziser: Person = new Person(0,'','','');
  postava: Postava= new Postava('','hlavná postava',new Person(0,'','',''))

  addReziser() {
  this.editedFilm.reziser.push({...this.reziser});
  this.reziser = new Person(0, '', '', '');
}

removeReziser(index: number) {
  this.editedFilm.reziser.splice(index, 1);
}

  addPostava() {
  this.editedFilm.postava.push({...this.postava});
  this.postava = new Postava('', 'hlavná postava', new Person(0, '', '', ''));
}

removePostava(index: number) {
  this.editedFilm.postava.splice(index, 1);
}


  ngOnChanges() {
    this.editedFilm = Film.clone(this.film);
    if (!this.editedFilm.reziser || this.editedFilm.reziser.length === 0) {
    this.editedFilm.reziser.push(new Person(0, '', '', ''));
  }
  if (!this.editedFilm.postava || this.editedFilm.postava.length === 0) {
    this.editedFilm.postava.push(new Postava('', 'hlavná postava', new Person(0, '', '', '')));
  }
    this.afi1998 = Number( this.editedFilm.poradieVRebricku['AFI 1998']) || 0;
    this.afi2007 = Number(this.editedFilm.poradieVRebricku['AFI 2007'])|| 0;
  }

  save(){
    this.editedFilm.reziser.forEach(r => {
    if (!r.id) r.id = 0;
    if (!r.krstneMeno || r.krstneMeno.trim() === '') r.krstneMeno = 'null';
    if (!r.stredneMeno || r.stredneMeno.trim() === '') r.stredneMeno = 'null';
    if (!r.priezvisko || r.priezvisko.trim() === '') r.priezvisko = 'null';
  });

  this.editedFilm.postava.forEach(p => {
    if (!p.postava || p.postava.trim() === '') p.postava = 'null';
    if (!p.dolezitost || p.dolezitost.trim() === '') p.dolezitost = 'hlavná postava';
    if (!p.herec.id)p.herec.id = 0;
    if (!p.herec.krstneMeno || p.herec.krstneMeno .trim() === '') p.herec.krstneMeno  = 'null';
    if (!p.herec.stredneMeno || p.herec.stredneMeno .trim() === '') p.herec.stredneMeno  = 'null';
    if (!p.herec.priezvisko || p.herec.priezvisko .trim() === '') p.herec.priezvisko  = 'null';
  });


  this.editedFilm.poradieVRebricku = {};
  if (this.afi1998) this.editedFilm.poradieVRebricku['AFI 1998'] = +this.afi1998;
  if (this.afi2007) this.editedFilm.poradieVRebricku['AFI 2007'] = +this.afi2007;

    console.log('Saving editedFilm:', this.editedFilm);
    this.toSave.emit(this.editedFilm);
  }

}
