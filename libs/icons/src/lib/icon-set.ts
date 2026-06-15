import {
    LucideArrowDown,
    LucideArrowLeft,
    LucideArrowRight,
    LucideArrowUp,
    LucideBatteryFull,
    LucideBell,
    LucideBluetooth,
    LucideBookmark,
    LucideCalendar,
    LucideCamera,
    LucideCheck,
    LucideChevronDown,
    LucideChevronLeft,
    LucideChevronRight,
    LucideChevronUp,
    LucideCircleCheckBig,
    LucideCircleMinus,
    LucideCircleQuestionMark,
    LucideCircleUser,
    LucideCircleX,
    LucideClock,
    LucideCloud,
    LucideEllipsis,
    LucideEye,
    LucideEyeOff,
    LucideFile,
    LucideFlame,
    LucideFolder,
    LucideHeart,
    LucideHeartCrack,
    LucideHouse,
    type LucideIcon,
    LucideImage,
    LucideInfo,
    LucideLink,
    LucideLock,
    LucideMail,
    LucideMap,
    LucideMapPin,
    LucideMenu,
    LucideMic,
    LucideMinus,
    LucideMoon,
    LucidePause,
    LucidePencil,
    LucidePhone,
    LucidePlay,
    LucidePlus,
    LucideRefreshCw,
    LucideSearch,
    LucideSend,
    LucideSettings,
    LucideShare,
    LucideSlidersHorizontal,
    LucideSparkles,
    LucideSquare,
    LucideSquarePen,
    LucideStar,
    LucideSun,
    LucideSunDim,
    LucideTrash2,
    LucideTriangleAlert,
    LucideUmbrella,
    LucideUndo2,
    LucideUsers,
    LucideVolume,
    LucideVolume1,
    LucideVolume2,
    LucideWifi,
    LucideX,
    LucideZap,
} from "@lucide/angular";

/**
 * A registrable icon: a design-system SF Symbol `name` paired with its Lucide glyph.
 * Each icon is a standalone named export so consumers import only what they use — the bundle
 * grows on demand (tree-shaking), unlike a central map that pulls every icon in.
 */
export interface CupIconDef {
    readonly name: string;
    readonly icon: LucideIcon;
}

// — Navigation —
export const houseIcon = { name: "house", icon: LucideHouse } as const satisfies CupIconDef;
export const houseFillIcon = { name: "house.fill", icon: LucideHouse } as const satisfies CupIconDef;
export const envelopeIcon = { name: "envelope", icon: LucideMail } as const satisfies CupIconDef;
export const envelopeFillIcon = { name: "envelope.fill", icon: LucideMail } as const satisfies CupIconDef;
export const gearIcon = { name: "gear", icon: LucideSettings } as const satisfies CupIconDef;
export const gearshapeIcon = { name: "gearshape", icon: LucideSettings } as const satisfies CupIconDef;
export const magnifyingglassIcon = { name: "magnifyingglass", icon: LucideSearch } as const satisfies CupIconDef;
export const bellIcon = { name: "bell", icon: LucideBell } as const satisfies CupIconDef;
export const bellFillIcon = { name: "bell.fill", icon: LucideBell } as const satisfies CupIconDef;
export const personCircleIcon = { name: "person.circle", icon: LucideCircleUser } as const satisfies CupIconDef;
export const personCircleFillIcon = {
    name: "person.circle.fill",
    icon: LucideCircleUser,
} as const satisfies CupIconDef;
export const person2Icon = { name: "person.2", icon: LucideUsers } as const satisfies CupIconDef;

// — Actions —
export const starIcon = { name: "star", icon: LucideStar } as const satisfies CupIconDef;
export const starFillIcon = { name: "star.fill", icon: LucideStar } as const satisfies CupIconDef;
export const heartIcon = { name: "heart", icon: LucideHeart } as const satisfies CupIconDef;
export const heartFillIcon = { name: "heart.fill", icon: LucideHeart } as const satisfies CupIconDef;
export const heartCrackIcon = { name: "heart.crack", icon: LucideHeartCrack } as const satisfies CupIconDef;
export const bookmarkIcon = { name: "bookmark", icon: LucideBookmark } as const satisfies CupIconDef;
export const bookmarkFillIcon = { name: "bookmark.fill", icon: LucideBookmark } as const satisfies CupIconDef;
export const squareAndArrowUpIcon = { name: "square.and.arrow.up", icon: LucideShare } as const satisfies CupIconDef;
export const trashIcon = { name: "trash", icon: LucideTrash2 } as const satisfies CupIconDef;
export const trashFillIcon = { name: "trash.fill", icon: LucideTrash2 } as const satisfies CupIconDef;
export const pencilIcon = { name: "pencil", icon: LucidePencil } as const satisfies CupIconDef;
export const squareAndPencilIcon = { name: "square.and.pencil", icon: LucideSquarePen } as const satisfies CupIconDef;
export const plusIcon = { name: "plus", icon: LucidePlus } as const satisfies CupIconDef;
export const minusIcon = { name: "minus", icon: LucideMinus } as const satisfies CupIconDef;
export const xmarkIcon = { name: "xmark", icon: LucideX } as const satisfies CupIconDef;
export const xmarkCircleFillIcon = { name: "xmark.circle.fill", icon: LucideCircleX } as const satisfies CupIconDef;

// — Chevrons —
export const chevronLeftIcon = { name: "chevron.left", icon: LucideChevronLeft } as const satisfies CupIconDef;
export const chevronRightIcon = { name: "chevron.right", icon: LucideChevronRight } as const satisfies CupIconDef;
export const chevronUpIcon = { name: "chevron.up", icon: LucideChevronUp } as const satisfies CupIconDef;
export const chevronDownIcon = { name: "chevron.down", icon: LucideChevronDown } as const satisfies CupIconDef;

// — Arrows —
export const arrowRightIcon = { name: "arrow.right", icon: LucideArrowRight } as const satisfies CupIconDef;
export const arrowLeftIcon = { name: "arrow.left", icon: LucideArrowLeft } as const satisfies CupIconDef;
export const arrowUpIcon = { name: "arrow.up", icon: LucideArrowUp } as const satisfies CupIconDef;
export const arrowDownIcon = { name: "arrow.down", icon: LucideArrowDown } as const satisfies CupIconDef;
export const minusCircleIcon = { name: "minus.circle", icon: LucideCircleMinus } as const satisfies CupIconDef;
export const minusCircleFillIcon = { name: "minus.circle.fill", icon: LucideCircleMinus } as const satisfies CupIconDef;

// — More —
export const ellipsisIcon = { name: "ellipsis", icon: LucideEllipsis } as const satisfies CupIconDef;
export const line3HorizontalIcon = { name: "line.3.horizontal", icon: LucideMenu } as const satisfies CupIconDef;
export const sliderHorizontal3Icon = {
    name: "slider.horizontal.3",
    icon: LucideSlidersHorizontal,
} as const satisfies CupIconDef;
export const arrowClockwiseIcon = { name: "arrow.clockwise", icon: LucideRefreshCw } as const satisfies CupIconDef;
export const arrowCounterclockwiseIcon = {
    name: "arrow.counterclockwise",
    icon: LucideUndo2,
} as const satisfies CupIconDef;

// — Status —
export const checkmarkIcon = { name: "checkmark", icon: LucideCheck } as const satisfies CupIconDef;
export const checkmarkCircleFillIcon = {
    name: "checkmark.circle.fill",
    icon: LucideCircleCheckBig,
} as const satisfies CupIconDef;
export const exclamationmarkTriangleIcon = {
    name: "exclamationmark.triangle",
    icon: LucideTriangleAlert,
} as const satisfies CupIconDef;
export const infoCircleIcon = { name: "info.circle", icon: LucideInfo } as const satisfies CupIconDef;
export const questionmarkCircleIcon = {
    name: "questionmark.circle",
    icon: LucideCircleQuestionMark,
} as const satisfies CupIconDef;

// — Visibility —
export const eyeIcon = { name: "eye", icon: LucideEye } as const satisfies CupIconDef;
export const eyeSlashIcon = { name: "eye.slash", icon: LucideEyeOff } as const satisfies CupIconDef;

// — Security —
export const lockIcon = { name: "lock", icon: LucideLock } as const satisfies CupIconDef;
export const lockFillIcon = { name: "lock.fill", icon: LucideLock } as const satisfies CupIconDef;

// — Time —
export const calendarIcon = { name: "calendar", icon: LucideCalendar } as const satisfies CupIconDef;
export const clockIcon = { name: "clock", icon: LucideClock } as const satisfies CupIconDef;

// — Location —
export const mapIcon = { name: "map", icon: LucideMap } as const satisfies CupIconDef;
export const locationIcon = { name: "location", icon: LucideMapPin } as const satisfies CupIconDef;
export const locationFillIcon = { name: "location.fill", icon: LucideMapPin } as const satisfies CupIconDef;

// — Communication —
export const phoneIcon = { name: "phone", icon: LucidePhone } as const satisfies CupIconDef;
export const phoneFillIcon = { name: "phone.fill", icon: LucidePhone } as const satisfies CupIconDef;
export const micIcon = { name: "mic", icon: LucideMic } as const satisfies CupIconDef;
export const micFillIcon = { name: "mic.fill", icon: LucideMic } as const satisfies CupIconDef;

// — Media —
export const cameraIcon = { name: "camera", icon: LucideCamera } as const satisfies CupIconDef;
export const cameraFillIcon = { name: "camera.fill", icon: LucideCamera } as const satisfies CupIconDef;
export const photoIcon = { name: "photo", icon: LucideImage } as const satisfies CupIconDef;
export const playIcon = { name: "play", icon: LucidePlay } as const satisfies CupIconDef;
export const playFillIcon = { name: "play.fill", icon: LucidePlay } as const satisfies CupIconDef;
export const pauseIcon = { name: "pause", icon: LucidePause } as const satisfies CupIconDef;
export const pauseFillIcon = { name: "pause.fill", icon: LucidePause } as const satisfies CupIconDef;
export const stopIcon = { name: "stop", icon: LucideSquare } as const satisfies CupIconDef;
export const stopFillIcon = { name: "stop.fill", icon: LucideSquare } as const satisfies CupIconDef;

// — Files —
export const docIcon = { name: "doc", icon: LucideFile } as const satisfies CupIconDef;
export const folderIcon = { name: "folder", icon: LucideFolder } as const satisfies CupIconDef;
export const folderFillIcon = { name: "folder.fill", icon: LucideFolder } as const satisfies CupIconDef;
export const paperplaneIcon = { name: "paperplane", icon: LucideSend } as const satisfies CupIconDef;
export const paperplaneFillIcon = { name: "paperplane.fill", icon: LucideSend } as const satisfies CupIconDef;

// — Connectivity —
export const linkIcon = { name: "link", icon: LucideLink } as const satisfies CupIconDef;
export const wifiIcon = { name: "wifi", icon: LucideWifi } as const satisfies CupIconDef;
export const bluetoothIcon = { name: "bluetooth", icon: LucideBluetooth } as const satisfies CupIconDef;
export const battery100Icon = { name: "battery.100", icon: LucideBatteryFull } as const satisfies CupIconDef;

// — Weather —
export const sunMaxIcon = { name: "sun.max", icon: LucideSun } as const satisfies CupIconDef;
export const sunMinIcon = { name: "sun.min", icon: LucideSunDim } as const satisfies CupIconDef;
export const moonIcon = { name: "moon", icon: LucideMoon } as const satisfies CupIconDef;
export const cloudIcon = { name: "cloud", icon: LucideCloud } as const satisfies CupIconDef;
export const umbrellaIcon = { name: "umbrella", icon: LucideUmbrella } as const satisfies CupIconDef;

// — Misc —
export const sparklesIcon = { name: "sparkles", icon: LucideSparkles } as const satisfies CupIconDef;
export const flameIcon = { name: "flame", icon: LucideFlame } as const satisfies CupIconDef;
export const boltIcon = { name: "bolt", icon: LucideZap } as const satisfies CupIconDef;
export const boltFillIcon = { name: "bolt.fill", icon: LucideZap } as const satisfies CupIconDef;
export const speakerIcon = { name: "speaker", icon: LucideVolume } as const satisfies CupIconDef;
export const speakerWave1Icon = { name: "speaker.wave.1", icon: LucideVolume1 } as const satisfies CupIconDef;
export const speakerWave3Icon = { name: "speaker.wave.3", icon: LucideVolume2 } as const satisfies CupIconDef;

/**
 * Every built-in icon. **Only import this in tooling/galleries (Storybook), never in app code** —
 * it references every icon and would defeat tree-shaking. App code imports individual icons.
 */
export const ALL_ICONS = [
    houseIcon,
    houseFillIcon,
    envelopeIcon,
    envelopeFillIcon,
    gearIcon,
    gearshapeIcon,
    magnifyingglassIcon,
    bellIcon,
    bellFillIcon,
    personCircleIcon,
    personCircleFillIcon,
    person2Icon,
    starIcon,
    starFillIcon,
    heartIcon,
    heartFillIcon,
    heartCrackIcon,
    bookmarkIcon,
    bookmarkFillIcon,
    squareAndArrowUpIcon,
    trashIcon,
    trashFillIcon,
    pencilIcon,
    squareAndPencilIcon,
    plusIcon,
    minusIcon,
    xmarkIcon,
    xmarkCircleFillIcon,
    chevronLeftIcon,
    chevronRightIcon,
    chevronUpIcon,
    chevronDownIcon,
    arrowRightIcon,
    arrowLeftIcon,
    arrowUpIcon,
    arrowDownIcon,
    minusCircleIcon,
    minusCircleFillIcon,
    ellipsisIcon,
    line3HorizontalIcon,
    sliderHorizontal3Icon,
    arrowClockwiseIcon,
    arrowCounterclockwiseIcon,
    checkmarkIcon,
    checkmarkCircleFillIcon,
    exclamationmarkTriangleIcon,
    infoCircleIcon,
    questionmarkCircleIcon,
    eyeIcon,
    eyeSlashIcon,
    lockIcon,
    lockFillIcon,
    calendarIcon,
    clockIcon,
    mapIcon,
    locationIcon,
    locationFillIcon,
    phoneIcon,
    phoneFillIcon,
    micIcon,
    micFillIcon,
    cameraIcon,
    cameraFillIcon,
    photoIcon,
    playIcon,
    playFillIcon,
    pauseIcon,
    pauseFillIcon,
    stopIcon,
    stopFillIcon,
    docIcon,
    folderIcon,
    folderFillIcon,
    paperplaneIcon,
    paperplaneFillIcon,
    linkIcon,
    wifiIcon,
    bluetoothIcon,
    battery100Icon,
    sunMaxIcon,
    sunMinIcon,
    moonIcon,
    cloudIcon,
    umbrellaIcon,
    sparklesIcon,
    flameIcon,
    boltIcon,
    boltFillIcon,
    speakerIcon,
    speakerWave1Icon,
    speakerWave3Icon,
] as const;

/** Union of every built-in SF Symbol name. Type-only — no runtime / bundle cost. */
export type CupSfSymbolName = (typeof ALL_ICONS)[number]["name"];

/**
 * Name of an icon for `cup-icon` / `cup-button`.
 *
 * Autocompletes the design system's SF Symbol names; any other string (a direct Lucide name or a
 * manually registered icon) is still accepted via the `(string & {})` fallback. This is autocomplete
 * DX, not strict validation — an unknown name surfaces a dev-time warning from `cup-icon`.
 */
export type CupIconName = CupSfSymbolName | (string & {});
