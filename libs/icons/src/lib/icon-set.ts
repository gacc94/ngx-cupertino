import {
    // — expanded set —
    LucideAlarmClock,
    LucideAperture,
    LucideArrowDown,
    LucideArrowDownLeft,
    LucideArrowDownRight,
    LucideArrowLeft,
    LucideArrowRight,
    LucideArrowUp,
    LucideArrowUpDown,
    LucideArrowUpLeft,
    LucideArrowUpRight,
    LucideAtSign,
    LucideBattery,
    LucideBatteryCharging,
    LucideBatteryFull,
    LucideBell,
    LucideBellOff,
    LucideBellRing,
    LucideBike,
    LucideBluetooth,
    LucideBookmark,
    LucideBus,
    LucideCalendar,
    LucideCalendarPlus,
    LucideCamera,
    LucideCar,
    LucideCheck,
    LucideChevronDown,
    LucideChevronLeft,
    LucideChevronRight,
    LucideChevronUp,
    LucideCircleCheckBig,
    LucideCircleMinus,
    LucideCirclePlus,
    LucideCircleQuestionMark,
    LucideCircleUser,
    LucideCircleX,
    LucideClipboard,
    LucideClock,
    LucideCloud,
    LucideCloudLightning,
    LucideCloudRain,
    LucideCloudSnow,
    LucideCompass,
    LucideCopy,
    LucideCpu,
    LucideCreditCard,
    LucideCrown,
    LucideDollarSign,
    LucideDownload,
    LucideEllipsis,
    LucideExternalLink,
    LucideEye,
    LucideEyeOff,
    LucideFile,
    LucideFilePlus,
    LucideFilm,
    LucideFilter,
    LucideFlag,
    LucideFlame,
    LucideFolder,
    LucideFolderPlus,
    LucideFrown,
    LucideGift,
    LucideGlobe,
    LucideHammer,
    LucideHand,
    LucideHeart,
    LucideHeartCrack,
    LucideHourglass,
    LucideHouse,
    type LucideIcon,
    LucideImage,
    LucideImages,
    LucideInbox,
    LucideInfo,
    LucideKey,
    LucideKeyboard,
    LucideLaptop,
    LucideLayoutGrid,
    LucideLightbulb,
    LucideLink,
    LucideList,
    LucideListOrdered,
    LucideLock,
    LucideLockOpen,
    LucideMail,
    LucideMap,
    LucideMapPin,
    LucideMaximize,
    LucideMedal,
    LucideMenu,
    LucideMessageCircle,
    LucideMessageSquare,
    LucideMic,
    LucideMicOff,
    LucideMinimize,
    LucideMinus,
    LucideMonitor,
    LucideMoon,
    LucideMusic,
    LucideNavigation,
    LucidePaintbrush,
    LucidePanelLeft,
    LucidePaperclip,
    LucidePause,
    LucidePencil,
    LucidePhone,
    LucidePin,
    LucidePlane,
    LucidePlay,
    LucidePlus,
    LucideRefreshCw,
    LucideRepeat,
    LucideRotateCw,
    LucideScissors,
    LucideSearch,
    LucideSend,
    LucideServer,
    LucideSettings,
    LucideShare,
    LucideShield,
    LucideShieldCheck,
    LucideShip,
    LucideShoppingBag,
    LucideShoppingCart,
    LucideShuffle,
    LucideSkipBack,
    LucideSkipForward,
    LucideSlidersHorizontal,
    LucideSmartphone,
    LucideSmile,
    LucideSparkles,
    LucideSquare,
    LucideSquarePen,
    LucideStar,
    LucideSun,
    LucideSunDim,
    LucideSunrise,
    LucideSunset,
    LucideTablet,
    LucideTag,
    LucideTarget,
    LucideTerminal,
    LucideThumbsDown,
    LucideThumbsUp,
    LucideTimer,
    LucideTrainFront,
    LucideTrash2,
    LucideTriangleAlert,
    LucideTrophy,
    LucideUmbrella,
    LucideUndo2,
    LucideUser,
    LucideUserPlus,
    LucideUsers,
    LucideVideo,
    LucideVolume,
    LucideVolume1,
    LucideVolume2,
    LucideVolumeX,
    LucideWifi,
    LucideWifiOff,
    LucideWrench,
    LucideX,
    LucideZap,
    LucideZapOff,
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

// — Communication (expanded) —
export const messageIcon = { name: "message", icon: LucideMessageCircle } as const satisfies CupIconDef;
export const messageFillIcon = { name: "message.fill", icon: LucideMessageCircle } as const satisfies CupIconDef;
export const bubbleLeftIcon = { name: "bubble.left", icon: LucideMessageSquare } as const satisfies CupIconDef;
export const atIcon = { name: "at", icon: LucideAtSign } as const satisfies CupIconDef;
export const paperclipIcon = { name: "paperclip", icon: LucidePaperclip } as const satisfies CupIconDef;
export const trayIcon = { name: "tray", icon: LucideInbox } as const satisfies CupIconDef;

// — Commerce —
export const cartIcon = { name: "cart", icon: LucideShoppingCart } as const satisfies CupIconDef;
export const bagIcon = { name: "bag", icon: LucideShoppingBag } as const satisfies CupIconDef;
export const creditcardIcon = { name: "creditcard", icon: LucideCreditCard } as const satisfies CupIconDef;
export const tagIcon = { name: "tag", icon: LucideTag } as const satisfies CupIconDef;
export const tagFillIcon = { name: "tag.fill", icon: LucideTag } as const satisfies CupIconDef;
export const giftIcon = { name: "gift", icon: LucideGift } as const satisfies CupIconDef;
export const giftFillIcon = { name: "gift.fill", icon: LucideGift } as const satisfies CupIconDef;
export const dollarsignIcon = { name: "dollarsign", icon: LucideDollarSign } as const satisfies CupIconDef;

// — Editing —
export const scissorsIcon = { name: "scissors", icon: LucideScissors } as const satisfies CupIconDef;
export const docOnDocIcon = { name: "doc.on.doc", icon: LucideCopy } as const satisfies CupIconDef;
export const clipboardIcon = { name: "clipboard", icon: LucideClipboard } as const satisfies CupIconDef;
export const listBulletIcon = { name: "list.bullet", icon: LucideList } as const satisfies CupIconDef;
export const listNumberIcon = { name: "list.number", icon: LucideListOrdered } as const satisfies CupIconDef;

// — Objects & Tools —
export const lightbulbIcon = { name: "lightbulb", icon: LucideLightbulb } as const satisfies CupIconDef;
export const lightbulbFillIcon = { name: "lightbulb.fill", icon: LucideLightbulb } as const satisfies CupIconDef;
export const keyIcon = { name: "key", icon: LucideKey } as const satisfies CupIconDef;
export const flagIcon = { name: "flag", icon: LucideFlag } as const satisfies CupIconDef;
export const flagFillIcon = { name: "flag.fill", icon: LucideFlag } as const satisfies CupIconDef;
export const pinIcon = { name: "pin", icon: LucidePin } as const satisfies CupIconDef;
export const pinFillIcon = { name: "pin.fill", icon: LucidePin } as const satisfies CupIconDef;
export const paintbrushIcon = { name: "paintbrush", icon: LucidePaintbrush } as const satisfies CupIconDef;
export const wrenchIcon = { name: "wrench", icon: LucideWrench } as const satisfies CupIconDef;
export const hammerIcon = { name: "hammer", icon: LucideHammer } as const satisfies CupIconDef;

// — People —
export const personIcon = { name: "person", icon: LucideUser } as const satisfies CupIconDef;
export const personFillIcon = { name: "person.fill", icon: LucideUser } as const satisfies CupIconDef;
export const personBadgePlusIcon = { name: "person.badge.plus", icon: LucideUserPlus } as const satisfies CupIconDef;
export const handThumbsupIcon = { name: "hand.thumbsup", icon: LucideThumbsUp } as const satisfies CupIconDef;
export const handThumbsupFillIcon = {
    name: "hand.thumbsup.fill",
    icon: LucideThumbsUp,
} as const satisfies CupIconDef;
export const handThumbsdownIcon = { name: "hand.thumbsdown", icon: LucideThumbsDown } as const satisfies CupIconDef;
export const handThumbsdownFillIcon = {
    name: "hand.thumbsdown.fill",
    icon: LucideThumbsDown,
} as const satisfies CupIconDef;
export const handRaisedIcon = { name: "hand.raised", icon: LucideHand } as const satisfies CupIconDef;

// — Transport —
export const carIcon = { name: "car", icon: LucideCar } as const satisfies CupIconDef;
export const carFillIcon = { name: "car.fill", icon: LucideCar } as const satisfies CupIconDef;
export const airplaneIcon = { name: "airplane", icon: LucidePlane } as const satisfies CupIconDef;
export const busIcon = { name: "bus", icon: LucideBus } as const satisfies CupIconDef;
export const bicycleIcon = { name: "bicycle", icon: LucideBike } as const satisfies CupIconDef;
export const tramIcon = { name: "tram", icon: LucideTrainFront } as const satisfies CupIconDef;
export const ferryIcon = { name: "ferry", icon: LucideShip } as const satisfies CupIconDef;

// — Diagonal arrows / sizing —
export const arrowUpRightIcon = { name: "arrow.up.right", icon: LucideArrowUpRight } as const satisfies CupIconDef;
export const arrowUpLeftIcon = { name: "arrow.up.left", icon: LucideArrowUpLeft } as const satisfies CupIconDef;
export const arrowDownRightIcon = {
    name: "arrow.down.right",
    icon: LucideArrowDownRight,
} as const satisfies CupIconDef;
export const arrowDownLeftIcon = { name: "arrow.down.left", icon: LucideArrowDownLeft } as const satisfies CupIconDef;
export const arrowUpArrowDownIcon = {
    name: "arrow.up.arrow.down",
    icon: LucideArrowUpDown,
} as const satisfies CupIconDef;
export const maximizeIcon = {
    name: "arrow.up.left.and.arrow.down.right",
    icon: LucideMaximize,
} as const satisfies CupIconDef;
export const minimizeIcon = {
    name: "arrow.down.right.and.arrow.up.left",
    icon: LucideMinimize,
} as const satisfies CupIconDef;
export const rotateClockwiseIcon = {
    name: "arrow.clockwise.circle",
    icon: LucideRotateCw,
} as const satisfies CupIconDef;

// — Layout & actions —
export const squareGrid2x2Icon = { name: "square.grid.2x2", icon: LucideLayoutGrid } as const satisfies CupIconDef;
export const sidebarLeftIcon = { name: "sidebar.left", icon: LucidePanelLeft } as const satisfies CupIconDef;
export const filterIcon = { name: "line.3.horizontal.decrease", icon: LucideFilter } as const satisfies CupIconDef;
export const downloadIcon = { name: "arrow.down.to.line", icon: LucideDownload } as const satisfies CupIconDef;
export const externalLinkIcon = {
    name: "arrow.up.right.square",
    icon: LucideExternalLink,
} as const satisfies CupIconDef;
export const squareAndArrowUpFillIcon = {
    name: "square.and.arrow.up.fill",
    icon: LucideShare,
} as const satisfies CupIconDef;

// — Files & media —
export const folderBadgePlusIcon = { name: "folder.badge.plus", icon: LucideFolderPlus } as const satisfies CupIconDef;
export const docBadgePlusIcon = { name: "doc.badge.plus", icon: LucideFilePlus } as const satisfies CupIconDef;
export const photoStackIcon = { name: "photo.stack", icon: LucideImages } as const satisfies CupIconDef;
export const filmIcon = { name: "film", icon: LucideFilm } as const satisfies CupIconDef;
export const cameraApertureIcon = { name: "camera.aperture", icon: LucideAperture } as const satisfies CupIconDef;
export const musicNoteIcon = { name: "music.note", icon: LucideMusic } as const satisfies CupIconDef;
export const videoIcon = { name: "video", icon: LucideVideo } as const satisfies CupIconDef;
export const videoFillIcon = { name: "video.fill", icon: LucideVideo } as const satisfies CupIconDef;
export const forwardIcon = { name: "forward", icon: LucideSkipForward } as const satisfies CupIconDef;
export const forwardFillIcon = { name: "forward.fill", icon: LucideSkipForward } as const satisfies CupIconDef;
export const backwardIcon = { name: "backward", icon: LucideSkipBack } as const satisfies CupIconDef;
export const backwardFillIcon = { name: "backward.fill", icon: LucideSkipBack } as const satisfies CupIconDef;
export const shuffleIcon = { name: "shuffle", icon: LucideShuffle } as const satisfies CupIconDef;
export const repeatIcon = { name: "repeat", icon: LucideRepeat } as const satisfies CupIconDef;
export const speakerSlashIcon = { name: "speaker.slash", icon: LucideVolumeX } as const satisfies CupIconDef;

// — Tech & connectivity —
export const cpuIcon = { name: "cpu", icon: LucideCpu } as const satisfies CupIconDef;
export const serverIcon = { name: "server.rack", icon: LucideServer } as const satisfies CupIconDef;
export const terminalIcon = { name: "terminal", icon: LucideTerminal } as const satisfies CupIconDef;
export const keyboardIcon = { name: "keyboard", icon: LucideKeyboard } as const satisfies CupIconDef;
export const desktopcomputerIcon = { name: "desktopcomputer", icon: LucideMonitor } as const satisfies CupIconDef;
export const laptopcomputerIcon = { name: "laptopcomputer", icon: LucideLaptop } as const satisfies CupIconDef;
export const iphoneIcon = { name: "iphone", icon: LucideSmartphone } as const satisfies CupIconDef;
export const ipadIcon = { name: "ipad", icon: LucideTablet } as const satisfies CupIconDef;
export const batteryIcon = { name: "battery.0", icon: LucideBattery } as const satisfies CupIconDef;
export const batteryChargingIcon = {
    name: "battery.100.bolt",
    icon: LucideBatteryCharging,
} as const satisfies CupIconDef;
export const wifiSlashIcon = { name: "wifi.slash", icon: LucideWifiOff } as const satisfies CupIconDef;
export const globeIcon = { name: "globe", icon: LucideGlobe } as const satisfies CupIconDef;
export const navigationIcon = { name: "location.north", icon: LucideNavigation } as const satisfies CupIconDef;
export const compassIcon = { name: "safari", icon: LucideCompass } as const satisfies CupIconDef;

// — Achievement & security —
export const targetIcon = { name: "target", icon: LucideTarget } as const satisfies CupIconDef;
export const trophyIcon = { name: "trophy", icon: LucideTrophy } as const satisfies CupIconDef;
export const trophyFillIcon = { name: "trophy.fill", icon: LucideTrophy } as const satisfies CupIconDef;
export const medalIcon = { name: "medal", icon: LucideMedal } as const satisfies CupIconDef;
export const crownIcon = { name: "crown", icon: LucideCrown } as const satisfies CupIconDef;
export const shieldIcon = { name: "shield", icon: LucideShield } as const satisfies CupIconDef;
export const shieldFillIcon = { name: "shield.fill", icon: LucideShield } as const satisfies CupIconDef;
export const checkmarkShieldIcon = { name: "checkmark.shield", icon: LucideShieldCheck } as const satisfies CupIconDef;
export const lockOpenIcon = { name: "lock.open", icon: LucideLockOpen } as const satisfies CupIconDef;
export const bellSlashIcon = { name: "bell.slash", icon: LucideBellOff } as const satisfies CupIconDef;
export const bellBadgeIcon = { name: "bell.badge", icon: LucideBellRing } as const satisfies CupIconDef;

// — Time & weather (expanded) —
export const calendarBadgePlusIcon = {
    name: "calendar.badge.plus",
    icon: LucideCalendarPlus,
} as const satisfies CupIconDef;
export const alarmIcon = { name: "alarm", icon: LucideAlarmClock } as const satisfies CupIconDef;
export const timerIcon = { name: "timer", icon: LucideTimer } as const satisfies CupIconDef;
export const hourglassIcon = { name: "hourglass", icon: LucideHourglass } as const satisfies CupIconDef;
export const cloudRainIcon = { name: "cloud.rain", icon: LucideCloudRain } as const satisfies CupIconDef;
export const cloudSnowIcon = { name: "cloud.snow", icon: LucideCloudSnow } as const satisfies CupIconDef;
export const cloudBoltIcon = { name: "cloud.bolt", icon: LucideCloudLightning } as const satisfies CupIconDef;
export const sunriseIcon = { name: "sunrise", icon: LucideSunrise } as const satisfies CupIconDef;
export const sunsetIcon = { name: "sunset", icon: LucideSunset } as const satisfies CupIconDef;

// — Expression —
export const faceSmilingIcon = { name: "face.smiling", icon: LucideSmile } as const satisfies CupIconDef;
export const faceSmilingFillIcon = { name: "face.smiling.fill", icon: LucideSmile } as const satisfies CupIconDef;
export const faceFrowningIcon = { name: "face.frowning", icon: LucideFrown } as const satisfies CupIconDef;

// — SF Symbol variants: `.circle` / `.slash` —
// SF Symbols ships several variants per glyph (outline, .fill, .circle, .slash, .badge, .square…).
// Of these, `.circle` and `.slash` map cleanly to Lucide. Below we round out the circle pairs that
// previously had only one half (fill or non-fill) and add the `.slash` (off-state) names Lucide
// supports natively. `.square` and generic `.badge` variants are intentionally omitted: Lucide has
// no faithful equivalents and would render mismatched geometry.
export const plusCircleIcon = { name: "plus.circle", icon: LucideCirclePlus } as const satisfies CupIconDef;
export const plusCircleFillIcon = { name: "plus.circle.fill", icon: LucideCirclePlus } as const satisfies CupIconDef;
export const xmarkCircleIcon = { name: "xmark.circle", icon: LucideCircleX } as const satisfies CupIconDef;
export const checkmarkCircleIcon = {
    name: "checkmark.circle",
    icon: LucideCircleCheckBig,
} as const satisfies CupIconDef;
export const infoCircleFillIcon = { name: "info.circle.fill", icon: LucideInfo } as const satisfies CupIconDef;
export const questionmarkCircleFillIcon = {
    name: "questionmark.circle.fill",
    icon: LucideCircleQuestionMark,
} as const satisfies CupIconDef;
export const micSlashIcon = { name: "mic.slash", icon: LucideMicOff } as const satisfies CupIconDef;
export const boltSlashIcon = { name: "bolt.slash", icon: LucideZapOff } as const satisfies CupIconDef;

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
    messageIcon,
    messageFillIcon,
    bubbleLeftIcon,
    atIcon,
    paperclipIcon,
    trayIcon,
    cartIcon,
    bagIcon,
    creditcardIcon,
    tagIcon,
    tagFillIcon,
    giftIcon,
    giftFillIcon,
    dollarsignIcon,
    scissorsIcon,
    docOnDocIcon,
    clipboardIcon,
    listBulletIcon,
    listNumberIcon,
    lightbulbIcon,
    lightbulbFillIcon,
    keyIcon,
    flagIcon,
    flagFillIcon,
    pinIcon,
    pinFillIcon,
    paintbrushIcon,
    wrenchIcon,
    hammerIcon,
    personIcon,
    personFillIcon,
    personBadgePlusIcon,
    handThumbsupIcon,
    handThumbsupFillIcon,
    handThumbsdownIcon,
    handThumbsdownFillIcon,
    handRaisedIcon,
    carIcon,
    carFillIcon,
    airplaneIcon,
    busIcon,
    bicycleIcon,
    tramIcon,
    ferryIcon,
    arrowUpRightIcon,
    arrowUpLeftIcon,
    arrowDownRightIcon,
    arrowDownLeftIcon,
    arrowUpArrowDownIcon,
    maximizeIcon,
    minimizeIcon,
    rotateClockwiseIcon,
    squareGrid2x2Icon,
    sidebarLeftIcon,
    filterIcon,
    downloadIcon,
    externalLinkIcon,
    squareAndArrowUpFillIcon,
    folderBadgePlusIcon,
    docBadgePlusIcon,
    photoStackIcon,
    filmIcon,
    cameraApertureIcon,
    musicNoteIcon,
    videoIcon,
    videoFillIcon,
    forwardIcon,
    forwardFillIcon,
    backwardIcon,
    backwardFillIcon,
    shuffleIcon,
    repeatIcon,
    speakerSlashIcon,
    cpuIcon,
    serverIcon,
    terminalIcon,
    keyboardIcon,
    desktopcomputerIcon,
    laptopcomputerIcon,
    iphoneIcon,
    ipadIcon,
    batteryIcon,
    batteryChargingIcon,
    wifiSlashIcon,
    globeIcon,
    navigationIcon,
    compassIcon,
    targetIcon,
    trophyIcon,
    trophyFillIcon,
    medalIcon,
    crownIcon,
    shieldIcon,
    shieldFillIcon,
    checkmarkShieldIcon,
    lockOpenIcon,
    bellSlashIcon,
    bellBadgeIcon,
    calendarBadgePlusIcon,
    alarmIcon,
    timerIcon,
    hourglassIcon,
    cloudRainIcon,
    cloudSnowIcon,
    cloudBoltIcon,
    sunriseIcon,
    sunsetIcon,
    faceSmilingIcon,
    faceSmilingFillIcon,
    faceFrowningIcon,
    plusCircleIcon,
    plusCircleFillIcon,
    xmarkCircleIcon,
    checkmarkCircleIcon,
    infoCircleFillIcon,
    questionmarkCircleFillIcon,
    micSlashIcon,
    boltSlashIcon,
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
