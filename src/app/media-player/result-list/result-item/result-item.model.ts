export class Song {
    public id: number;
    public name: string;
    public genre: string;
    public description: string;
    public duration: string;
    public imagePath: string;

    constructor(id?: number, name?: string, genre?: string, desc?: string, duration?: string, imagePath?: string) {
        this.id = id || 0;
        this.name = name || '';
        this.genre = genre || '';
        this.description = desc || '';
        // this.duration = (duration) ?
        //     (duration > 3600000) ? Math.floor(duration / 1000 / 3600) + ':' + Math.floor(duration / 1000 % 3600 / 60) + ':' + Math.floor(duration / 1000 % 3600 % 60) // longer than 1 hour
        //         : Math.floor(duration / 1000 / 60) + ':' + Math.floor(duration / 1000 % 60)
        //     : '0';
        // if (!duration) {
        //     this.duration = '-';
        // } else {
        //     duration /= 1000;
        //     if (duration > 3600000) {
        //         let hours = Math.floor(duration / 3600);
        //         let minutes = Math.floor(duration % 3600 / 60);
        //         let seconds = Math.floor(duration % 3600 % 60);
        //         this.duration = hours + ':' + minutes + ':' + seconds;
        //     } else {
        //         let minutes = Math.floor(duration / 60);
        //         let seconds = Math.floor(duration % 60);
        //         this.duration = minutes + ':' + seconds;
        //     }
        // }
        this.duration = duration;
        this.imagePath = (imagePath) ? imagePath.replace('large', 't500x500') : '';
    }
}