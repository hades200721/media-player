import { Injectable } from '@angular/core';
import { SoundManagerSoundPlayer } from './sound-cloud-player-manager.service';
import { Song } from '../shared/song.model';
import { Events } from '../shared/event.model';
import { ISoundPlayer } from './sound-player.interface';
import { PlaylistService } from '../playlist/playlist.service';
import { MediaPlayerService } from '../media-player/media-player.service';
import { LoopOption } from '../shared/helpers';

@Injectable()
export class SoundManager {

    private soundPlayer: ISoundPlayer;
    private subscribers: Object = {};
    private currentSong: Song;
    private playing = false;
    private shuffle = false;
    private loop:LoopOption = LoopOption.none;

    constructor(
        private soundManagerSoundPlayer: SoundManagerSoundPlayer,
        private playlistService: PlaylistService,
        private mediaPlayerService: MediaPlayerService
    ){
        this.mediaPlayerService.selectedSongChanged
            .subscribe(
            (song: Song) => {
                this.play(song);
            })
    }

    isMuted() {
        return this.getVolume() === 0;
    }

    isPlaying() {
        return this.playing;
    }

    isShuffle() {
        return this.shuffle;
    }

    setShuffle() {
        this.shuffle = !this.shuffle;
    }

    isLoop() {
        return this.loop;
    }

    setLoop(loopOpt: string) {
        this.loop = LoopOption[loopOpt];
    }

    getVolume(): number {
        return this.soundPlayer.getVolume();
    }

    setVolume(vol: number) {
        this.soundPlayer.setVolume(vol);
    }

    private getSoundPlayer(song: Song) {
        return this.soundManagerSoundPlayer;
    }

    play(song: Song) {
        this.currentSong = song;
        if (!this.soundPlayer) {
            this.soundPlayer = this.getSoundPlayer(song);
            this.subscribSoundPlayerEvent(this.soundPlayer);
        }

        this.soundPlayer.initialize(song, (e: Error) => {
            if (!e) {
                this.soundPlayer.play();
                this.publish(Events.ChangeSong, song);
                this.playing = true;
            } else {
                alert(e.message);
            }
        });
    }

    togglePlayPause(song: Song) {
        if (!this.playing) {
            this.play(song);
        } else {
            this.soundPlayer.pause();
        }
    }

    next() {
        let song = (this.loop === LoopOption.one) ? this.currentSong : this.playlistService.findNextSong(this.currentSong.id, this.loop, this.shuffle);
        if (song) {
            this.mediaPlayerService.setSelectedSong(song);
        }
    }

    previous() {
        let song = (this.loop === LoopOption.one) ? this.currentSong : this.playlistService.findPreviousSong(this.currentSong.id, this.shuffle);
        if (song) {
            this.mediaPlayerService.setSelectedSong(song);
        }
    }

    seek(time: number) {
        if (this.soundPlayer && this.currentSong) {
            this.soundPlayer.seek(time);
        }
    }

    toggleMute() {
        if (this.currentSong) {
            if (this.isMuted()) {
                this.soundPlayer.setVolume(100);
                this.publish(Events.Volume, false);
            } else {
                this.soundPlayer.setVolume(0);
                this.publish(Events.Volume, true);
            }
        }
    }

    getTotalTime() {
        if (this.soundPlayer && this.currentSong) {
            return this.soundPlayer.totalTime();
        }
        return null;
    }

    on(event, handler: any) {
        if (!this.subscribers[event]) this.subscribers[event] = [];
        this.subscribers[event].push(handler);
    }

    private publish(event, data: any) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(function (handler) {
                handler(data);
            });
        }
    }

    getCurrentSong(): Song {
        return this.currentSong;
    }

    onSongFinish() {
        const loopOption = this.loop;
        let nextSong = (loopOption === LoopOption.one) ? this.currentSong : this.playlistService.findNextSong(this.currentSong.id, this.loop, this.shuffle);;
        if (nextSong) {
            this.mediaPlayerService.setSelectedSong(nextSong);
        } else {
            this.publish(Events.Finish, null);
        }
    }

    subscribSoundPlayerEvent(soundPlayer: ISoundPlayer) {

        soundPlayer.on(Events.Play, () => {
            this.publish(Events.Play, null);
            this.playing = true;
        });

        soundPlayer.on(Events.PlayStart, () => {
            this.publish(Events.PlayStart, null);
            this.playing = true;
        });

        soundPlayer.on(Events.PlayResume, () => {
            this.publish(Events.PlayResume, null);
            this.playing = true;
        });

        soundPlayer.on(Events.Pause, () => {
            this.publish(Events.Pause, null);
            this.playing = false;
        });

        soundPlayer.on(Events.Finish, () => {
            this.publish(Events.Finish, null);
            this.playing = false;
            this.onSongFinish();
        });

        soundPlayer.on(Events.Seek, () => this.publish(Events.Seek, null));

        soundPlayer.on(Events.Seeked, () => this.publish(Events.Seeked, null));

        soundPlayer.on(Events.Time, (time) => {
            this.publish(Events.Time, time);
        });

        soundPlayer.on(Events.AudioError, () => {
            this.publish(Events.AudioError, null);
            this.playing = false;
        });

        soundPlayer.on(Events.NoStreams, () => this.publish(Events.NoStreams, null));

    }
}