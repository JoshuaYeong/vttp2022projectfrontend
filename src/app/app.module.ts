import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { ResultsComponent } from './components/results/results.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { HomeComponent } from './components/home.component';
import { NavbarComponent } from './components/navigation/navbar.component';
import { HeadersComponent } from './components/navigation/headers.component';

import { AppRoutingModule } from './app-routing.module';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { SignInService } from './services/signin.service';
import { AuthGuard } from './services/authguard.service';
import { AppCookieService } from './services/app-cookie.service';
import { JwtTokenService } from './services/jwt-token.service';
import { SearchService } from './services/search.service';
// import { TokenStorageService } from './services/token-storage.service';

const materialModules = [
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTableModule,
  MatDividerModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatTabsModule,
  MatSidenavModule,
  MatListModule,

]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    RegisterComponent,
    ProfileComponent,
    ResultsComponent,
    FavouritesComponent,
    HeadersComponent,
    NavbarComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    materialModules,
    AppRoutingModule,
  ],
  providers: [
    authInterceptorProviders,
    AppCookieService,
    SignInService,
    AuthGuard,
    JwtTokenService,
    SearchService,
    // TokenStorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
