import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/authguard.service';

import { HomeComponent } from './components/home.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ResultsComponent } from './components/results/results.component';
import { SigninComponent } from './components/signin/signin.component';

const appPath: Routes = [
    { path: '', component: HomeComponent },
    { path: 'signin', component: SigninComponent, },
    { path: 'register', component: RegisterComponent, },
    { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard], },
    { path: 'results/:username', component: ResultsComponent, canActivate: [AuthGuard] },
    { path: 'results/:username/:query/:limit', component: ResultsComponent, canActivate: [AuthGuard] },
    { path: 'favourites/:username', component: FavouritesComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appPath, { useHash: true }),
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
