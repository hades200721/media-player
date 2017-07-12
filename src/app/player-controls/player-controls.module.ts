import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerControlsComponent } from './player-controls.component';
import { SoundManagerSoundPlayer } from './sound-cloud-player-manager.service';
import { SoundManager } from './sound-manager.service';
import { Draggable } from '../directives/dragger.directive';


import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [
        CommonModule,
        TooltipModule
    ],
    declarations: [
        PlayerControlsComponent,
        Draggable
    ],
    exports: [
        PlayerControlsComponent
    ],
    providers: [
        SoundManagerSoundPlayer,
        SoundManager
    ]
})

export class PlayerControlsModule {
}