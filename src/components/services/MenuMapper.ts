// services/MenuMapper.ts
import { getText } from "./LanguageUtils";
import { MenuCategory, MenuItem, Menu as MenuType } from "../models/interfaces";

// Mapování pro názvy kategorií
const CATEGORY_NAME_MAPPINGS: Record<string, string> = {
    "All You Can Eat": "restaurantMenu.categories.allYouCanEat",
    "Sushi": "restaurantMenu.categories.sushi",
    "Maki": "restaurantMenu.categories.maki",
    "Hot Dishes": "restaurantMenu.categories.hotDishes",
    "Drinks": "restaurantMenu.categories.drinks",
    "Desserts": "restaurantMenu.categories.desserts"
};

// Mapování pro názvy položek menu
const ITEM_NAME_MAPPINGS: Record<string, string> = {
    // All You Can Eat
    "Adult All You Can Eat": "restaurantMenu.items.adultAllYouCanEat.name",
    "Child All You Can Eat": "restaurantMenu.items.childAllYouCanEat.name",

    // Sushi
    "Eel Nigiri": "restaurantMenu.items.eelNigiri.name",
    "Mackerel Nigiri": "restaurantMenu.items.mackerelNigiri.name",
    "Octopus Nigiri": "restaurantMenu.items.octopusNigiri.name",
    "Prawn Nigiri": "restaurantMenu.items.prawnNigiri.name",
    "Salmon Nigiri": "restaurantMenu.items.salmonNigiri.name",
    "Sea Bass Nigiri": "restaurantMenu.items.seaBassNigiri.name",
    "Tuna Sashimi": "restaurantMenu.items.tunaSashimi.name",
    "Yellowtail Sashimi": "restaurantMenu.items.yellowtailSashimi.name",

    // Maki
    "California Roll": "restaurantMenu.items.californiaRoll.name",
    "Dragon Roll": "restaurantMenu.items.dragonRoll.name",
    "Philadelphia Roll": "restaurantMenu.items.philadelphiaRoll.name",
    "Rainbow Roll": "restaurantMenu.items.rainbowRoll.name",
    "Salmon Avocado Roll": "restaurantMenu.items.salmonAvocadoRoll.name",
    "Spicy Tuna Roll": "restaurantMenu.items.spicyTunaRoll.name",
    "Tempura Prawn Roll": "restaurantMenu.items.tempuraPrawnRoll.name",
    "Vegetable Roll": "restaurantMenu.items.vegetableRoll.name",

    // Hot Dishes
    "Beef Yakitori": "restaurantMenu.items.beefYakitori.name",
    "Chicken Katsu Curry": "restaurantMenu.items.chickenKatsuCurry.name",
    "Chicken Teriyaki": "restaurantMenu.items.chickenTeriyaki.name",
    "Gyoza Dumplings": "restaurantMenu.items.gyozaDumplings.name",
    "Miso Glazed Cod": "restaurantMenu.items.misoGlazedCod.name",
    "Salmon Teriyaki": "restaurantMenu.items.salmonTeriyaki.name",
    "Tempura Selection": "restaurantMenu.items.tempuraSelection.name",
    "Vegetable Stir Fry": "restaurantMenu.items.vegetableStirFry.name",

    // Drinks
    "Asahi Super Dry": "restaurantMenu.items.asahiSuperDry.name",
    "Hot Sake": "restaurantMenu.items.hotSake.name",
    "Iced Green Tea": "restaurantMenu.items.icedGreenTea.name",
    "Japanese Green Tea": "restaurantMenu.items.japaneseGreenTea.name",
    "Japanese Whisky": "restaurantMenu.items.japaneseWhisky.name",
    "Premium Sake Selection": "restaurantMenu.items.premiumSakeSelection.name",
    "Ramune Soda": "restaurantMenu.items.ramuneSoda.name",
    "Sparkling Water": "restaurantMenu.items.sparklingWater.name",

    // Desserts
    "Dorayaki Pancakes": "restaurantMenu.items.dorayakiPancakes.name",
    "Matcha Cheesecake": "restaurantMenu.items.matchaCheesecake.name",
    "Mixed Fruit Mochi": "restaurantMenu.items.mixedFruitMochi.name",
    "Mochi Ice Cream": "restaurantMenu.items.mochiIceCream.name",
    "Taiyaki Fish Cake": "restaurantMenu.items.taiyakiFishCake.name"
};

// Mapování pro perex (krátký popis)
const ITEM_PEREX_MAPPINGS: Record<string, string> = {
    // All You Can Eat
    "Unlimited access to our complete running sushi experience": "restaurantMenu.items.adultAllYouCanEat.perex",
    "Unlimited running sushi for children under 15": "restaurantMenu.items.childAllYouCanEat.perex",

    // Sushi
    "Glazed freshwater eel with sweet sauce": "restaurantMenu.items.eelNigiri.perex",
    "Cured mackerel with traditional vinegar preparation": "restaurantMenu.items.mackerelNigiri.perex",
    "Tender octopus with delicate preparation": "restaurantMenu.items.octopusNigiri.perex",
    "Sweet cooked prawns with traditional preparation": "restaurantMenu.items.prawnNigiri.perex",
    "Norwegian salmon on seasoned sushi rice": "restaurantMenu.items.salmonNigiri.perex",
    "Fresh sea bass with light seasoning": "restaurantMenu.items.seaBassNigiri.perex",
    "Premium bluefin tuna, expertly sliced": "restaurantMenu.items.tunaSashimi.perex",
    "Delicate yellowtail with citrus notes": "restaurantMenu.items.yellowtailSashimi.perex",

    // Maki
    "Classic roll with crab, avocado and cucumber": "restaurantMenu.items.californiaRoll.perex",
    "Chef Yamasaki signature creation with eel and avocado": "restaurantMenu.items.dragonRoll.perex",
    "Smoked salmon with cream cheese and cucumber": "restaurantMenu.items.philadelphiaRoll.perex",
    "Colourful roll topped with assorted sashimi": "restaurantMenu.items.rainbowRoll.perex",
    "Fresh salmon with creamy avocado": "restaurantMenu.items.salmonAvocadoRoll.perex",
    "Fresh tuna with spicy mayo and crisp vegetables": "restaurantMenu.items.spicyTunaRoll.perex",
    "Crispy tempura prawn with vegetables and sauce": "restaurantMenu.items.tempuraPrawnRoll.perex",
    "Fresh vegetables with avocado and cucumber": "restaurantMenu.items.vegetableRoll.perex",

    // Hot Dishes
    "Grilled beef skewers with tare sauce": "restaurantMenu.items.beefYakitori.perex",
    "Crispy breaded chicken with Japanese curry sauce": "restaurantMenu.items.chickenKatsuCurry.perex",
    "Grilled chicken glazed with traditional teriyaki sauce": "restaurantMenu.items.chickenTeriyaki.perex",
    "Pan-fried pork and vegetable dumplings": "restaurantMenu.items.gyozaDumplings.perex",
    "Delicate cod fillet with sweet miso glaze": "restaurantMenu.items.misoGlazedCod.perex",
    "Grilled salmon with teriyaki glaze and vegetables": "restaurantMenu.items.salmonTeriyaki.perex",
    "Assorted vegetables and prawns in light crispy batter": "restaurantMenu.items.tempuraSelection.perex",
    "Seasonal vegetables wok-fried with garlic and ginger": "restaurantMenu.items.vegetableStirFry.perex",

    // Drinks
    "Crisp Japanese lager beer": "restaurantMenu.items.asahiSuperDry.perex",
    "Warmed sake in traditional tokkuri": "restaurantMenu.items.hotSake.perex",
    "Refreshing cold-brewed sencha": "restaurantMenu.items.icedGreenTea.perex",
    "Traditional sencha green tea": "restaurantMenu.items.japaneseGreenTea.perex",
    "Premium Suntory Toki whisky": "restaurantMenu.items.japaneseWhisky.perex",
    "Junmai sake served warm or chilled": "restaurantMenu.items.premiumSakeSelection.perex",
    "Traditional Japanese marble soda": "restaurantMenu.items.ramuneSoda.perex",
    "Japanese mineral water with natural bubbles": "restaurantMenu.items.sparklingWater.perex",

    // Desserts
    "Fluffy pancakes filled with sweet red bean paste": "restaurantMenu.items.dorayakiPancakes.perex",
    "Creamy cheesecake infused with premium matcha": "restaurantMenu.items.matchaCheesecake.perex",
    "Assorted fruit-flavoured mochi selection": "restaurantMenu.items.mixedFruitMochi.perex",
    "Traditional rice cake filled with premium ice cream": "restaurantMenu.items.mochiIceCream.perex",
    "Fish-shaped pastry filled with sweet custard": "restaurantMenu.items.taiyakiFishCake.perex"
};

// Mapování pro description (dlouhý popis) - pouze klíčové, kvůli délce
const ITEM_DESCRIPTION_MAPPINGS: Record<string, string> = {
    // All You Can Eat
    "Enjoy unlimited access to our entire running sushi belt featuring fresh sushi, maki, hot dishes and desserts. Our chefs continuously prepare new items throughout your dining experience. Drinks are ordered separately.": "restaurantMenu.items.adultAllYouCanEat.description",
    "Children under 15 years enjoy the same unlimited access to our complete running sushi experience at a reduced price. Perfect introduction to authentic Japanese cuisine for young diners.": "restaurantMenu.items.childAllYouCanEat.description",

    // Sushi (výběr nejdůležitějších)
    "Hand-pressed nigiri featuring fresh Norwegian salmon atop perfectly seasoned sushi rice. A classic combination that showcases the buttery texture of premium salmon.": "restaurantMenu.items.salmonNigiri.description",
    "Fresh bluefin tuna sourced from Tokyo fish markets, served as traditional sashimi. Our skilled chefs prepare each piece to highlight the natural flavours and texture of this premium fish.": "restaurantMenu.items.tunaSashimi.description",

    // Maki (výběr nejpopulárnějších)
    "The timeless California roll featuring fresh crab meat, creamy avocado, and crisp cucumber wrapped in seasoned sushi rice and nori. A perfect introduction to maki for newcomers.": "restaurantMenu.items.californiaRoll.description",
    "Our head chef signature roll featuring grilled eel, cucumber and avocado, topped with sliced avocado arranged to resemble dragon scales. Finished with sweet eel sauce and sesame seeds.": "restaurantMenu.items.dragonRoll.description",

    // Hot Dishes (výběr nejpopulárnějších)
    "Tender grilled chicken thigh glazed with our house-made teriyaki sauce, served with steamed rice and seasonal vegetables. The sauce is prepared using traditional Japanese methods with soy sauce, mirin, and sake.": "restaurantMenu.items.chickenTeriyaki.description",
    "Handmade dumplings filled with seasoned pork mince, cabbage, and chives. Pan-fried until golden and served with soy-vinegar dipping sauce. Each dumpling is carefully pleated by our skilled chefs.": "restaurantMenu.items.gyozaDumplings.description"
};

// Funkce pro překlad kategorie
export const translateCategory = (category: MenuCategory): MenuCategory => {
    const translatedCategory = { ...category };

    // Přeložíme název kategorie
    const categoryNameKey = CATEGORY_NAME_MAPPINGS[category.name];
    if (categoryNameKey) {
        try {
            translatedCategory.name = getText(categoryNameKey);
        } catch (error) {
            console.warn(`Translation key not found: ${categoryNameKey}`);
        }
    }

    // Přeložíme všechny položky v kategorii
    translatedCategory.items = category.items.map(item => translateMenuItem(item));

    return translatedCategory;
};

// Funkce pro překlad jednotlivé položky menu
export const translateMenuItem = (item: MenuItem): MenuItem => {
    const translatedItem = { ...item };

    // Přeložíme název položky
    const nameKey = ITEM_NAME_MAPPINGS[item.name];
    if (nameKey) {
        try {
            translatedItem.name = getText(nameKey);
        } catch (error) {
            console.warn(`Translation key not found: ${nameKey}`);
        }
    }

    // Přeložíme perex
    const perexKey = ITEM_PEREX_MAPPINGS[item.perex];
    if (perexKey) {
        try {
            translatedItem.perex = getText(perexKey);
        } catch (error) {
            console.warn(`Translation key not found: ${perexKey}`);
        }
    }

    // Přeložíme description
    const descriptionKey = ITEM_DESCRIPTION_MAPPINGS[item.description];
    if (descriptionKey) {
        try {
            translatedItem.description = getText(descriptionKey);
        } catch (error) {
            console.warn(`Translation key not found: ${descriptionKey}`);
        }
    }

    return translatedItem;
};

// Funkce pro překlad celého menu
export const translateMenu = (menu: MenuType): MenuType => {
    const translatedMenu = { ...menu };

    // Přeložíme všechny kategorie
    translatedMenu.categories = menu.categories.map(category => translateCategory(category));

    return translatedMenu;
};