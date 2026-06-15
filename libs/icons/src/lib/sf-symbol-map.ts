export const SF_SYMBOL_MAP = {
    // Navigation
    house: "home",
    "house.fill": "home",
    envelope: "mail",
    "envelope.fill": "mail",
    gear: "settings",
    gearshape: "settings",
    magnifyingglass: "search",
    bell: "bell",
    "bell.fill": "bell",
    "person.circle": "user-circle",
    "person.circle.fill": "user-circle",
    "person.2": "users",

    // Actions
    star: "star",
    "star.fill": "star",
    heart: "heart",
    "heart.fill": "heart",
    "heart.crack": "heart-crack",
    bookmark: "bookmark",
    "bookmark.fill": "bookmark",
    "square.and.arrow.up": "share",
    trash: "trash-2",
    "trash.fill": "trash-2",
    pencil: "pencil",
    "square.and.pencil": "square-pen",
    plus: "plus",
    minus: "minus",
    xmark: "x",
    "xmark.circle.fill": "circle-x",

    // Navigation chevrons
    "chevron.left": "chevron-left",
    "chevron.right": "chevron-right",
    "chevron.up": "chevron-up",
    "chevron.down": "chevron-down",

    // Navigation arrows
    "arrow.right": "arrow-right",
    "arrow.left": "arrow-left",
    "arrow.up": "arrow-up",
    "arrow.down": "arrow-down",
    "minus.circle": "minus-circle",
    "minus.circle.fill": "minus-circle",

    // More
    ellipsis: "more-horizontal",
    "line.3.horizontal": "menu",
    "slider.horizontal.3": "sliders-horizontal",
    "arrow.clockwise": "refresh-cw",
    "arrow.counterclockwise": "undo-2",

    // Status
    checkmark: "check",
    "checkmark.circle.fill": "check-circle",
    "exclamationmark.triangle": "triangle-alert",
    "info.circle": "info",
    "questionmark.circle": "help-circle",

    // Visibility
    eye: "eye",
    "eye.slash": "eye-off",

    // Security
    lock: "lock",
    "lock.fill": "lock",

    // Time
    calendar: "calendar",
    clock: "clock",

    // Location
    map: "map",
    location: "map-pin",
    "location.fill": "map-pin",

    // Communication
    phone: "phone",
    "phone.fill": "phone",
    mic: "mic",
    "mic.fill": "mic",

    // Media
    camera: "camera",
    "camera.fill": "camera",
    photo: "image",
    play: "play",
    "play.fill": "play",
    pause: "pause",
    "pause.fill": "pause",
    stop: "square",
    "stop.fill": "square",

    // Files
    doc: "file",
    folder: "folder",
    "folder.fill": "folder",
    paperplane: "send",
    "paperplane.fill": "send",

    // Connectivity
    link: "link",
    wifi: "wifi",
    bluetooth: "bluetooth",
    "battery.100": "battery-full",

    // Weather
    "sun.max": "sun",
    moon: "moon",
    cloud: "cloud",
    umbrella: "umbrella",

    // Misc
    sparkles: "sparkles",
    flame: "flame",
    bolt: "zap",
    "bolt.fill": "zap",

    "sun.min": "sun-dim",
    speaker: "volume",
    "speaker.wave.1": "volume-1",
    "speaker.wave.3": "volume-2",
} as const satisfies Record<string, string>;

export type CupSfSymbolName = keyof typeof SF_SYMBOL_MAP;
