import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { WikipediaSearchComponent } from './wikipedia-search/wikipedia-search.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';


const appRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'search', component: MediaPlayerComponent },
    { path: 'search-history', component: SearchHistoryComponent },
    { path: 'playlist', component: PlaylistComponent },
    { path: 'wiki', component: WikipediaSearchComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'about', component: AboutComponent },
    { path: 'sign-in', component: SigninComponent },
    { path: 'sign-up', component: SignupComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}