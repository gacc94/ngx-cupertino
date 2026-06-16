import {
    LucideAperture,
    LucideCamera,
    LucideFilm,
    LucideImage,
    LucideImages,
    LucideMusic,
    LucidePause,
    LucidePlay,
    LucideRepeat,
    LucideShuffle,
    LucideSkipBack,
    LucideSkipForward,
    LucideSquare,
    LucideVideo,
    LucideVolume,
    LucideVolume1,
    LucideVolume2,
    LucideVolumeX,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const cameraIcon = { name: "camera", icon: LucideCamera } as const satisfies CupIconDef;
export const cameraFillIcon = { name: "camera.fill", icon: LucideCamera } as const satisfies CupIconDef;
export const cameraApertureIcon = { name: "camera.aperture", icon: LucideAperture } as const satisfies CupIconDef;
export const photoIcon = { name: "photo", icon: LucideImage } as const satisfies CupIconDef;
export const photoFillIcon = { name: "photo.fill", icon: LucideImage } as const satisfies CupIconDef;
export const photoStackIcon = { name: "photo.stack", icon: LucideImages } as const satisfies CupIconDef;
export const playIcon = { name: "play", icon: LucidePlay } as const satisfies CupIconDef;
export const playFillIcon = { name: "play.fill", icon: LucidePlay } as const satisfies CupIconDef;
export const pauseIcon = { name: "pause", icon: LucidePause } as const satisfies CupIconDef;
export const pauseFillIcon = { name: "pause.fill", icon: LucidePause } as const satisfies CupIconDef;
export const stopIcon = { name: "stop", icon: LucideSquare } as const satisfies CupIconDef;
export const stopFillIcon = { name: "stop.fill", icon: LucideSquare } as const satisfies CupIconDef;
export const forwardIcon = { name: "forward", icon: LucideSkipForward } as const satisfies CupIconDef;
export const forwardFillIcon = { name: "forward.fill", icon: LucideSkipForward } as const satisfies CupIconDef;
export const backwardIcon = { name: "backward", icon: LucideSkipBack } as const satisfies CupIconDef;
export const backwardFillIcon = { name: "backward.fill", icon: LucideSkipBack } as const satisfies CupIconDef;
export const shuffleIcon = { name: "shuffle", icon: LucideShuffle } as const satisfies CupIconDef;
export const repeatIcon = { name: "repeat", icon: LucideRepeat } as const satisfies CupIconDef;
export const filmIcon = { name: "film", icon: LucideFilm } as const satisfies CupIconDef;
export const filmFillIcon = { name: "film.fill", icon: LucideFilm } as const satisfies CupIconDef;
export const videoIcon = { name: "video", icon: LucideVideo } as const satisfies CupIconDef;
export const videoFillIcon = { name: "video.fill", icon: LucideVideo } as const satisfies CupIconDef;
export const musicNoteIcon = { name: "music.note", icon: LucideMusic } as const satisfies CupIconDef;
export const speakerIcon = { name: "speaker", icon: LucideVolume } as const satisfies CupIconDef;
export const speakerFillIcon = { name: "speaker.fill", icon: LucideVolume } as const satisfies CupIconDef;
export const speakerWave1Icon = { name: "speaker.wave.1", icon: LucideVolume1 } as const satisfies CupIconDef;
export const speakerWave1FillIcon = { name: "speaker.wave.1.fill", icon: LucideVolume1 } as const satisfies CupIconDef;
export const speakerWave3Icon = { name: "speaker.wave.3", icon: LucideVolume2 } as const satisfies CupIconDef;
export const speakerWave3FillIcon = { name: "speaker.wave.3.fill", icon: LucideVolume2 } as const satisfies CupIconDef;
export const speakerSlashIcon = { name: "speaker.slash", icon: LucideVolumeX } as const satisfies CupIconDef;

export const MEDIA_ICONS = [
    cameraIcon,
    cameraFillIcon,
    cameraApertureIcon,
    photoIcon,
    photoFillIcon,
    photoStackIcon,
    playIcon,
    playFillIcon,
    pauseIcon,
    pauseFillIcon,
    stopIcon,
    stopFillIcon,
    forwardIcon,
    forwardFillIcon,
    backwardIcon,
    backwardFillIcon,
    shuffleIcon,
    repeatIcon,
    filmIcon,
    filmFillIcon,
    videoIcon,
    videoFillIcon,
    musicNoteIcon,
    speakerIcon,
    speakerFillIcon,
    speakerWave1Icon,
    speakerWave1FillIcon,
    speakerWave3Icon,
    speakerWave3FillIcon,
    speakerSlashIcon,
] as const;
