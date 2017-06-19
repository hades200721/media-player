import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaPlayerComponent } from './media-player/media-player.component';
import { HomePageComponent } from './home-page/home-page.component';
import { WikipediaSearchComponent } from './wikipedia-search/wikipedia-search.component';


const appRoutes: Routes = [
    { path: '', component: HomePageComponent},    
    { path: 'music-player', component: MediaPlayerComponent},    
    { path: 'wiki', component: WikipediaSearchComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {

}