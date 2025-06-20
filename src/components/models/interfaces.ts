export interface User {
    id: string,              // Jedinečný identifikátor v tvé aplikaci
    providerId: string,      // ID od poskytovatele (Google/Apple)
    providerType: 'google' | 'apple',  // Typ poskytovatele
    email: string,           // E-mail uživatele
    name: string,            // Celé jméno
    firstName?: string,      // Křestní jméno (nemusí být vždy dostupné)
    lastName?: string,       // Příjmení (nemusí být vždy dostupné)
    profilePicture?: string, // URL profilového obrázku (nemusí být dostupné od Apple)
    // Vlastní data aplikace
    tokens: number, // Tokeny pro kolo štěstí
    vouchers?: UserVoucher[],//
    createdAt: Date,         // Datum vytvoření účtu
    lastLogin: Date,         // Datum posledního přihlášení
    visitCount?: number
}

export interface Voucher {
    id: string,
    name: string,
    description: string,       // Popis voucheru (např. "Druhá pizza zdarma")
    amount?: number,           // ✅ NOVÉ - počet použití (null = neomezený)
    requiredVisits: number,    // ✅ NOVÉ - od kolika návštěv se zobrazí
    tokenCost: number,         // Kolik tokenů stojí tento voucher
    expiryDate?: Date,         // Datum, do kdy je voucher platný
    imageUrl?: string,         // URL obrázku pro voucher
    isActive: boolean,         // Je voucher aktuálně v nabídce?
    code: string,              // Kód voucheru pro uplatnění v restauraci
    vip?: boolean,
}

export interface UserVoucher {
    id: string,
    userId: string,            // ID uživatele, kterému voucher patří
    voucher: Voucher,          // Celý voucher (nejen ID) pro snadnější práci v UI
    acquiredDate: Date,        // Kdy uživatel voucher získal
    isUsed: boolean,           // Byl už voucher použit?
    usedDate?: Date,           // Kdy byl voucher použit (pokud byl)
    usageCount?: number;
}

export interface Vouchers {
    vouchers: Voucher[]
}
export interface Item {
    key: number,
    title: string,
    text: string,
    image: string,
    backgroundColor: string,
}

export interface NewsArticle {
    id: string,
    heading: string,
    perex: string,
    text: string,
    imageUrl: string,
    createdAt: Date,
    isActive: boolean,

}

export interface MenuItems {
    id: string,
    category: string,
    name: string,
    description: string,
    alergens: string[],
    imageUrl: string,
    weightGrams: string,
    price: number,
}

export interface MenuItem {
    id: string;
    name: string;
    perex: string;               // Krátký úvod/popis pro přehled
    description: string;         // Podrobný popis pro detail položky
    allergens: string[];
    imageUrl: string;
    weightGrams: number;
    price: number;
    popularity: number;          // Hodnocení 1-5 pro zobrazení hvězdiček
    calories: number;            // Kalorická hodnota v kcal
    isActive: boolean;           // Zda je položka aktuálně dostupná
    specialCategory?: string[];  // Pole speciálních kategorií: "vegan", "gluten-free", "low-carb"
    voucherOption: boolean;      // Zda lze na položku uplatnit voucher
    voucherId?: string,
    preparationTimeMinutes?: number; // Volitelné: průměrná doba přípravy
}

// Definice kategorie menu
export interface MenuCategory {
    id: string;
    name: string;
    displayOrder: number;        // Pro určení pořadí kategorií
    items: MenuItem[];           // Položky v této kategorii
    icon?: string;               // Ikona pro kategorii - může být užitečné v navigaci
}

// Kompletní menu
export interface Menu {
    categories: MenuCategory[];
    lastUpdated: Date;           // Datum poslední aktualizace menu
    isActive: boolean;           // Zda je menu aktuálně aktivní (např. sezónní menu)
}

export interface Restaurant {
    id: string,
    type: string,          // Typ restaurace (např. "pizza", "chinese", "fine-dining")
    name: string,          // Název restaurace
    address: string,       // Adresa restaurace
    latitude: number,      // Zeměpisná šířka pro ověření polohy
    longitude: number,     // Zeměpisná délka pro ověření polohy
    maxDistanceMeters: number, // Maximální povolená vzdálenost pro validaci (defaultně 100m)
    phoneNumber: string,   // Telefonní kontakt
    email: string,         // Emailový kontakt
    insideQr: string,      // QR kód uvnitř restaurace pro validaci
    openHours: string,     // Otevírací hodiny (volitelné)
    isActive: boolean,     // Je restaurace aktivní?
    createdAt: Date,       // Datum vytvoření záznamu
    updatedAt?: Date        // Datum poslední aktualizace záznamu
}

