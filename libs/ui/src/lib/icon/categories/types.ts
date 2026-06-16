import type { LucideIcon } from "@lucide/angular";

/**
 * A registrable icon: a design-system SF Symbol `name` paired with its Lucide glyph.
 * Each icon is a standalone named export so consumers import only what they use — the bundle
 * grows on demand (tree-shaking), unlike a central map that pulls every icon in.
 */
export interface CupIconDef {
    readonly name: string;
    readonly icon: LucideIcon;
}
