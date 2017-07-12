import { Injectable } from '@angular/core';
import { Song } from '../shared/song.model';
import { Events } from '../shared/event.model';
import { ISoundPlayer } from './sound-player.interface';

const soundCloudClientId = '8e1349e63dfd43dc67a63e0de3befc68';
const soundCloudURI = 'https://api.soundcloud.com/tracks/';

@Injectable()
export class SoundManagerSoundPlayer implements ISoundPlayer {
    private soundObject: any;
    private subscribers: Object = {};
    private lastSong: Song;
    constructor() { }

    initialize(song: Song, callback: (e: Error, data: any) => void) {
        if (this.lastSong) {
            window['soundManager'].unload(this.lastSong.id);
            window['soundManager'].destroySound(this.lastSong.id);
        }
        var soundObject = window['soundManager'].getSoundById(song.id);
        if (!soundObject) {
            soundObject = window['soundManager'].createSound({
                url: soundCloudURI + song.id + '/stream' + '?client_id=' + soundCloudClientId,
                id: song.id,
                volume: 100,
                onbufferchange: () => this.publish(Events.BufferingStart, null),
                ondataerror: () => this.publish(Events.AudioError, null),
                onfinish: () => this.publish(Events.Finish, null),
                onload: () => this.publish(Events.BufferingStart, null),
                onpause: () => this.publish(Events.Pause, null),
                onplay: () => this.publish(Events.Play, null),
                onresume: () => this.publish(Events.PlayResume, null),
                onstop: () => this.publish(Events.Finish, null),
                whileplaying: () => this.publish(Events.Time, this.currentTime()),
            });
            if (!soundObject) {
                return callback(new Error('Error while creating sound object'), null);
            }
            this.lastSong = song;
        }

        soundObject.play();
        this.soundObject = soundObject;
        return callback(null, song);
    }

    play() {
        if (this.soundObject) {
            this.soundObject.resume();
        }
    }

    pause() {
        if (this.soundObject) {
            this.soundObject.pause();
        }
    }

    seek(percent: number) {
        if (this.soundObject) {
            var time = this.soundObject.duration * percent / 100;
            this.soundObject.setPosition(time);
        }
    }

    currentTime(): number {
        if (!this.soundObject) return;
        return this.soundObject.position;
    }

    totalTime(): number {
        if (!this.soundObject) return;
        return this.soundObject.duration;
    }

    setVolume(value: number) {
        if (!this.soundObject) return;
        this.soundObject.setVolume(value);
    }

    getVolume(): number {
        if (!this.soundObject) return;
        return this.soundObject.volume;
    }

    on(event, handler: () => void) {
        if (!this.subscribers[event]) this.subscribers[event] = [];
        this.subscribers[event].push(handler);
    }

    publish(event, data: any) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(handler => {
                handler(data);
            });
        }
    }

    private subscribeSoundCloudPlayerEvent() {
        if (!this.soundObject) return;
    }
}