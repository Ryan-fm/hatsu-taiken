export let AUDIODATA = {
	BGMMAIN: "assets/audio/bgm.mp3",
	PRESS:"assets/audio/press.mp3",
	OPEN: "assets/audio/open.mp3",
	FADE:"assets/audio/fade.mp3",
}
interface bg {
	'src': string,
	'volume':number,
    'loop':boolean,
    currentTime:number,
	play:any,
	paused:any
}
let bgm : bg = new Audio()
bgm.src = AUDIODATA.BGMMAIN

let se_open = new Audio();
se_open.src = AUDIODATA.OPEN;

let se_press = new Audio();
se_press.src = AUDIODATA.PRESS;

let se_fade = new Audio();
se_fade.src = AUDIODATA.FADE;

export function playSeOpen():object{
	se_open.currentTime = 0
	se_open.volume = 100 / 100;
	se_open.muted = true
	se_open.play()
	return se_open
}

export function playSeFade():object{
	se_fade.currentTime = 0
	se_fade.volume = 100 / 100;
	se_fade.play()
	return se_fade
}
export function playSePress():object{
	se_press.currentTime = 0
	se_press.volume = 100 / 100;
	se_press.play()
	return se_press
}
export function playBGM (continuate:Boolean = true) :any{
	if (!continuate) bgm.currentTime = 0;
	bgm.volume = 60 / 100;
    bgm.loop = true;
	bgm.play();
	return bgm
}
export function stopBGM() :void{
	if (!bgm) return;
	bgm.paused();
	bgm.currentTime = 0;
}