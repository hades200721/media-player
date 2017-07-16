export enum LoopOption {
    none = 0,
    one = 1,
    all = 2
}

export function formatTime(duration: number) {
    if (!duration) {
        return '00:00';
    }
    duration /= 1000;
    if (duration > 3600) {
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor(duration % 3600 / 60);
        let seconds = Math.floor(duration % 3600 % 60);
        let hourStr = hours > 9 ? minutes.toString() : '0' + hours.toString();
        let minStr = minutes > 9 ? minutes.toString() : '0' + minutes.toString();
        let secStr = seconds > 9 ? seconds.toString() : '0' + seconds.toString();
        return hourStr + ':' + minStr + ':' + secStr;
    }
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    let minStr = minutes > 9 ? minutes.toString() : '0' + minutes.toString();
    let secStr = seconds > 9 ? seconds.toString() : '0' + seconds.toString();
    return minStr + ':' + secStr;
}