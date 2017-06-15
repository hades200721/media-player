import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ResultItemComponent } from './result-list/result-item/result-item.component';

import { SoundCloudService } from './shared/sound-cloud.service';
import { ResultListComponent } from './result-list/result-list.component';
import { ImageContainerComponent } from './image-container/image-container.component';
import { SearchHistoryComponent } from './search-history/search-history.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultItemComponent,
    ResultListComponent,
    ImageContainerComponent,
    SearchHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SoundCloudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
