import { NgModule } from "@angular/core";
import FilmsComponent from "./films.component";
import { RouterModule } from "@angular/router";
import { FILMS_ROUTES } from "./films.routes";

@NgModule({
    declarations:[],
    imports:[FilmsComponent,RouterModule.forChild(FILMS_ROUTES)]
})
export default class FilmsModule{ }