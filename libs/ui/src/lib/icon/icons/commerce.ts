import {
    LucideCreditCard,
    LucideDollarSign,
    LucideGift,
    LucideShoppingBag,
    LucideShoppingCart,
    LucideTag,
} from "@lucide/angular";
import type { CupIconDef } from "./types";

export const cartIcon = { name: "cart", icon: LucideShoppingCart } as const satisfies CupIconDef;
export const cartFillIcon = { name: "cart.fill", icon: LucideShoppingCart } as const satisfies CupIconDef;
export const bagIcon = { name: "bag", icon: LucideShoppingBag } as const satisfies CupIconDef;
export const bagFillIcon = { name: "bag.fill", icon: LucideShoppingBag } as const satisfies CupIconDef;
export const creditcardIcon = { name: "creditcard", icon: LucideCreditCard } as const satisfies CupIconDef;
export const creditcardFillIcon = { name: "creditcard.fill", icon: LucideCreditCard } as const satisfies CupIconDef;
export const tagIcon = { name: "tag", icon: LucideTag } as const satisfies CupIconDef;
export const tagFillIcon = { name: "tag.fill", icon: LucideTag } as const satisfies CupIconDef;
export const giftIcon = { name: "gift", icon: LucideGift } as const satisfies CupIconDef;
export const giftFillIcon = { name: "gift.fill", icon: LucideGift } as const satisfies CupIconDef;
export const dollarsignIcon = { name: "dollarsign", icon: LucideDollarSign } as const satisfies CupIconDef;

export const COMMERCE_ICONS = [
    cartIcon,
    cartFillIcon,
    bagIcon,
    bagFillIcon,
    creditcardIcon,
    creditcardFillIcon,
    tagIcon,
    tagFillIcon,
    giftIcon,
    giftFillIcon,
    dollarsignIcon,
] as const;
