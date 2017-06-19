import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MediaPlayerComponent } from './media-player.component';
import { ResultItemComponent } from './result-list/result-item/result-item.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ImageContainerComponent } from '../image-container/image-container.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

@NgModule({
    declarations: [
        MediaPlayerComponent,
        ResultListComponent,
        ResultItemComponent,
        ImageContainerComponent,
        SearchHistoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
})

export class MediaPlayerModule {

}