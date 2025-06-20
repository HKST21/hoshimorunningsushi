// services/NewsMapper.ts
import { getText } from "./LanguageUtils";
import { NewsArticle } from "../models/interfaces";

// Mapování pro nadpisy článků
const ARTICLE_HEADING_MAPPINGS: Record<string, string> = {
    "Loyalty App Launch": "news.articles.loyaltyAppLaunch.heading",
    "New Head Chef Joins": "news.articles.newHeadChefJoins.heading",
    "Gloucester Opening": "news.articles.gloucesterOpening.heading",
    "Norwich Opening": "news.articles.norwichOpening.heading",
    "Wakefield Opening": "news.articles.wakefieldOpening.heading"
};

// Mapování pro perex (krátký popis)
const ARTICLE_PEREX_MAPPINGS: Record<string, string> = {
    "Download our new loyalty app and unlock exclusive rewards.": "news.articles.loyaltyAppLaunch.perex",
    "Renowned sushi master Chef Kuniro Yamasaki joins Hoshimo.": "news.articles.newHeadChefJoins.perex",
    "Opening 1st August at Eastgate Shopping Centre, Gloucester.": "news.articles.gloucesterOpening.perex",
    "Opening 1st September at Castle Quarter, Norwich.": "news.articles.norwichOpening.perex",
    "Opening 1st October at Trinity Walk Shopping Centre.": "news.articles.wakefieldOpening.perex"
};

// Mapování pro plný text článků (pouze klíčové části kvůli délce)
const ARTICLE_TEXT_MAPPINGS: Record<string, string> = {
    // Loyalty App Launch article
    "We are excited to announce the launch of the official Hoshimo Running Sushi loyalty app, designed to enhance your dining experience and reward your loyalty.\n\nKey Features:\nEarn points with every visit and redeem them for free sushi, drinks, and exclusive menu items. Simply scan our in-restaurant QR codes to collect points automatically. Access app-only discounts and special offers. Browse our full menu, including seasonal specials and Chef Yamasaki's signature dishes.\n\nLaunch Special Offer:\nDownload the app now and receive 100 welcome points - enough for a complimentary miso soup or green tea on your next visit! Plus, earn double points on all purchases during your first week.\n\nHow It Works:\nDownload the Hoshimo app from the App Store or Google Play, create your account, visit any Hoshimo location and scan the QR code, then start earning points and unlock delicious rewards.\n\nAvailable now for iOS and Android devices. Start your journey towards exclusive rewards today!": "news.articles.loyaltyAppLaunch.text",

    // New Head Chef article
    "After 15 years perfecting his craft in Tokyo's prestigious Tsukiji district, Chef Kuniro Yamasaki brings extraordinary passion for authentic Japanese cuisine to the UK. Born in Kyoto and trained under legendary sushi master Jiro Tanaka, Chef Yamasaki has worked in some of Japan's most celebrated restaurants.\n\nChef Yamasaki states: \"I am delighted to bring the true spirit of Japanese sushi culture to British diners. At Hoshimo, we believe that every piece of sushi tells a story - from the carefully selected fish to the perfectly seasoned rice.\"\n\nChef Yamasaki specialises in traditional Edomae-style sushi and has introduced several signature dishes to our menu, including his famous Dragon Roll and seasonal sashimi selections. His philosophy centres on using only the finest ingredients, with fish flown in fresh from Tokyo's renowned Toyosu Market twice weekly.\n\nWe invite you to visit any of our Hoshimo locations to experience Chef Yamasaki's exceptional creations and witness the artistry of authentic Japanese cuisine firsthand.": "news.articles.newHeadChefJoins.text",

    // Gloucester Opening article
    "On Thursday, 1st August 2025, Hoshimo Running Sushi will officially open its doors at Eastgate Shopping Centre in Gloucester, bringing our signature running sushi experience to this historic cathedral city.\n\nLocation Details:\nAddress: Eastgate Street, Gloucester GL1 1PA\nOpening Hours: Monday-Sunday, 11:00 AM - 9:00 PM\n\nWhat to Expect:\nOur Gloucester location features a spectacular 40-metre conveyor belt showcasing over 100 varieties of fresh sushi, sashimi, and hot Japanese dishes. The restaurant boasts 80 seats with modern Japanese interior design, complete with traditional wooden elements.\n\nGrand Opening Celebrations:\nFree miso soup for the first 50 customers, 20% discount on all items for the opening weekend, live sushi demonstrations by our skilled chefs, and traditional sake tasting for guests 18+.\n\nLocal Sourcing Commitment:\nOur Gloucester restaurant will source fresh vegetables and herbs from local Gloucestershire suppliers, whilst maintaining our commitment to premium Japanese ingredients flown in fresh from Tokyo.\n\nWhether you're shopping at Eastgate Centre or exploring Gloucester's historic attractions, we invite you to experience authentic running sushi. We can't wait to welcome you!": "news.articles.gloucesterOpening.text",

    // Norwich Opening article
    "Hoshimo Running Sushi will open its doors in Norwich on Sunday, 1st September 2025, located in the popular Castle Quarter shopping destination in the heart of the city.\n\nLocation Details:\nAddress: Castle Meadow, Norwich NR1 3DD\nOpening Hours: Monday-Sunday, 11:00 AM - 9:00 PM\n\nA Perfect Norwich Welcome:\nOur Norwich restaurant has been specially designed to reflect the city's unique character whilst maintaining authentic Japanese aesthetics. The 75-seat restaurant features locally-sourced Norfolk timber accents, complementing our signature conveyor belt system.\n\nGrand Opening Weekend (1st-3rd September):\nComplimentary edamame for all guests, 25% discount on premium sushi selections, traditional tea ceremony demonstrations, and children's sushi-making workshops on Saturday and Sunday at 2:00 PM.\n\nSupporting Local Norfolk:\nWe're proud to partner with Norfolk suppliers for our fresh produce, including vegetables from local farms and herbs from Norwich's community gardens. We've hired 25 local team members and will support Norfolk charities.\n\nSpecial Norwich Menu Items:\nChef Yamasaki has created exclusive menu additions including Norfolk Coast Roll featuring locally-sourced crab, Cathedral City Special, and Canary Sunset in Norwich City FC colours. \n\nJoin us for an unforgettable opening weekend!": "news.articles.norwichOpening.text",

    // Wakefield Opening article
    "Hoshimo Running Sushi will open its newest restaurant in Wakefield on Wednesday, 1st October 2025, located in the bustling Trinity Walk Shopping Centre.\n\nLocation Details:\nAddress: Marsh Way, Wakefield WF1 1QS\nOpening Hours: Monday-Sunday, 11:00 AM - 9:00 PM\n\nBringing Japan to West Yorkshire:\nOur Wakefield location represents our expansion into Yorkshire, bringing authentic Japanese flavours to this historic market town. The restaurant features 85 seats arranged around our signature 45-metre conveyor belt, with contemporary design that pays homage to both Japanese minimalism and Yorkshire's industrial heritage.\n\nGrand Opening Festivities (1st-7th October):\nFree gyoza for the first 100 customers, 30% discount on all premium sashimi, Yorkshire-Japan cultural showcase featuring local artists, and family sushi workshops every weekend afternoon.\n\nYorkshire Ingredients, Japanese Techniques:\nOur Wakefield restaurant will feature fresh produce from local farms, including vegetables from the Rhubarb Triangle and herbs from Yorkshire Dales suppliers, combined with premium ingredients imported directly from Japan.\n\nExclusive Wakefield Specials:\nWe're introducing Yorkshire Gold Roll featuring local smoked trout, Rhubarb Dessert Maki using famous Yorkshire rhubarb, and Cathedral City Salmon with Scottish salmon.\n\nVisit us from 1st October and discover authentic running sushi in Yorkshire!": "news.articles.wakefieldOpening.text"
};

// Funkce pro překlad jednotlivého článku
export const translateNewsArticle = (article: NewsArticle): NewsArticle => {
    const translatedArticle = { ...article };

    // Přeložíme nadpis
    const headingKey = ARTICLE_HEADING_MAPPINGS[article.heading];
    if (headingKey) {
        try {
            translatedArticle.heading = getText(headingKey);
        } catch (error) {
            console.warn(`Translation key not found: ${headingKey}`);
        }
    }

    // Přeložíme perex
    const perexKey = ARTICLE_PEREX_MAPPINGS[article.perex];
    if (perexKey) {
        try {
            translatedArticle.perex = getText(perexKey);
        } catch (error) {
            console.warn(`Translation key not found: ${perexKey}`);
        }
    }

    // Přeložíme text
    const textKey = ARTICLE_TEXT_MAPPINGS[article.text];
    if (textKey) {
        try {
            translatedArticle.text = getText(textKey);
        } catch (error) {
            console.warn(`Translation key not found: ${textKey}`);
        }
    }

    return translatedArticle;
};

// Funkce pro překlad pole článků
export const translateNewsArticles = (articles: NewsArticle[]): NewsArticle[] => {
    return articles.map(article => translateNewsArticle(article));
};