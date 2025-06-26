import { Routes } from "@angular/router";
import { authGuard } from "../../guards/auth.guard";
import { canDeactivateGuard } from "../../guards/can-deactivate.guard";
import FilmsComponent from "./films.component";
import { FilmsNewComponent } from "./films-new/films-new.component";
import { FilmsEditComponent } from "./films-edit/films-edit.component";
import { authAsyncGuard } from "../../guards/auth-async.guard";

export const FILMS_ROUTES : Routes = [
    { path: '',
      children:[
        { path: '', component: FilmsComponent,pathMatch:'full'},
        { path: 'new', component: FilmsNewComponent,canActivate:[authAsyncGuard],},
        { path: 'edit/:id', component: FilmsEditComponent,canActivate:[authAsyncGuard],},
      ] },
];