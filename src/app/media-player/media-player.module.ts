import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';

import { MediaPlayerComponent } from './media-player.component';
import { ResultItemComponent } from './result-list/result-item/result-item.component';
import { ResultListComponent } from './result-list/result-list.component';
import { ImageContainerComponent } from '../image-container/image-container.component';
import { TooltipModule } from "ngx-tooltip";

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
@NgModule({
    declarations: [
        MediaPlayerComponent,
        ResultListComponent,
        ResultItemComponent,
        ImageContainerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TooltipModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],
})

export class MediaPlayerModule {

}