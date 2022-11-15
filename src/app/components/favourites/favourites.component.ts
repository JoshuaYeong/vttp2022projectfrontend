import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Flat } from 'src/app/models';
import { JwtTokenService } from 'src/app/services/jwt-token.service';
import { SearchService } from 'src/app/services/search.service';
import { SignInService } from 'src/app/services/signin.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  username!: string
  favArr: Flat[] = []
  sub$!: Subscription
  favId?: number
  flat?: Flat

  constructor(private activatedRoute: ActivatedRoute, private searchSvc: SearchService, private router: Router, private signInSvc: SignInService) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username']
    this.sub$ = this.activatedRoute.params.subscribe(data => {
      this.searchSvc.getFavourites(this.username)
        .then(result => {
          this.favArr = result
        }).catch(error => {
          console.error(':::::Favourite Comp Error: ', error)
        })
    })
  }

  ngOnDestroy() {
    this.sub$.unsubscribe()
  }

  toProfilePage() {
    // this.username = this.appCookieSvc.get("username")
    // console.log("Username: ", this.username)
    console.log(':::::toProfilePage() Called')
    this.router.navigate([`/profile/${ this.username }`])
  }

  deleteFavourites(idx: number) {
    console.log(':::::deleteFavourites() Called')
    this.favId = this.favArr.at(idx)?._id
    this.searchSvc.deleteFavourite(this.username, this.favId)
    window.location.reload()
  }

  signOut(): void {
    this.signInSvc.doSignOut()
  }

}
