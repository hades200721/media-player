import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { PlaylistService } from './playlist.service';
import { PlaylistComponent } from './playlist.component';
import { SortAlphabeticalPipe } from '../pipes/sort-alphabetical.pipe';

@NgModule({
    imports: [
        NgxPaginationModule,
        CommonModule
    ],
    declarations: [
        PlaylistComponent,
        SortAlphabeticalPipe
    ],
    providers: [
        PlaylistService
    ]

})

export class PlaylistModule { }