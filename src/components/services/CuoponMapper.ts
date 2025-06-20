// services/CouponMapper.ts
import { getText } from "./LanguageUtils";
import { UserVoucher } from "../models/interfaces";

// Mapování pro názvy kupónů (name)
const COUPON_NAME_MAPPINGS: Record<string, string> = {
    "Coca Cola for free": "coupons.coca_cola.name",
    "Children running sushi gratis": "coupons.children_sushi.name",
    "Saké welcome drink ": "coupons.sake_drink.name",
    "-10% running sushi discount": "coupons.discount_10.name",
    "Premium Dragon Boat Sushi": "coupons.premium_boat.name"
};

// Mapování pro popisy kupónů (description)
const COUPON_DESCRIPTION_MAPPINGS: Record<string, string> = {
    "Complimentary Coca Cola for each person when ordering running sushi. Valid with any running sushi order.": "coupons.coca_cola.description",
    "Kids under 10 years old eat running sushi for free when accompanied by paying adult. Valid ID required.": "coupons.children_sushi.description",
    "Complimentary welcome saké shot for each person at your table. Must be 18+ with valid ID.": "coupons.sake_drink.description",
    "Get 10% off running sushi price for each person at your table. Valid for up to 6 people.": "coupons.discount_10.description",
    "Complimentary premium sushi boat worth £100 with your running sushi experience. Must order for 2+ people.": "coupons.premium_boat.description"
};

// Funkce pro překlad jednotlivého kupónu
export const translateCoupon = (userVoucher: UserVoucher): UserVoucher => {
    const translatedVoucher = { ...userVoucher };

    // Přeložíme název pokud existuje mapování
    const nameKey = COUPON_NAME_MAPPINGS[userVoucher.voucher.name];
    if (nameKey) {
        try {
            translatedVoucher.voucher.name = getText(nameKey);
        } catch (error) {
            // Pokud translation key neexistuje, necháme původní text
            console.warn(`Translation key not found: ${nameKey}`);
        }
    }

    // Přeložíme popis pokud existuje mapování
    const descriptionKey = COUPON_DESCRIPTION_MAPPINGS[userVoucher.voucher.description];
    if (descriptionKey) {
        try {
            translatedVoucher.voucher.description = getText(descriptionKey);
        } catch (error) {
            // Pokud translation key neexistuje, necháme původní text
            console.warn(`Translation key not found: ${descriptionKey}`);
        }
    }

    return translatedVoucher;
};

// Funkce pro překlad celého pole kupónů
export const translateCoupons = (userVouchers: UserVoucher[]): UserVoucher[] => {
    return userVouchers.map(voucher => translateCoupon(voucher));
};