import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { WikipediaSearchComponent } from './wikipedia-search/wikipedia-search.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AboutComponent } from './about/about.component';


const appRoutes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'search', component: MediaPlayerComponent},
    { path: 'search-history', component: SearchHistoryComponent},
    { path: 'playlist', component: PlaylistComponent},
    { path: 'wiki', component: WikipediaSearchComponent},
    { path: 'about', component: AboutComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}