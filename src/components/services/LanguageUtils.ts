// src/localization/LanguageUtils.ts
import * as Localization from 'expo-localization';
import {translations} from "../../localization/translations";

// Globální proměnná pro aktuální jazyk
let currentLanguage: 'cs' | 'en' = 'en';

/**
 * Detekce systémového jazyka uživatele
 * Pokud je čeština = 'cs', jinak = 'en'
 */
export const detectUserLanguage = (): 'cs' | 'en' => {
    try {
        const systemLocale = Localization.locale;
        console.log('🌍 Systémový jazyk:', systemLocale);

        // Získej pouze kód jazyka (první 2 znaky)
        const languageCode = systemLocale.substring(0, 2);

        if (languageCode === 'cs') {
            console.log('🌍 Detekována čeština');
            return 'cs';
        } else {
            console.log('🌍 Použita angličtina (default)');
            return 'en';
        }
    } catch (error) {
        console.error('❌ Chyba při detekci jazyka:', error);
        return 'en'; // Fallback na angličtinu
    }
};

/**
 * Inicializace jazyka při startu aplikace
 */
export const initializeLanguage = (): void => {
    currentLanguage = detectUserLanguage();
    console.log('🌍 Nastaven jazyk:', currentLanguage);
};

/**
 * Získání textu podle klíče
 * @param key - klíč ve formátu 'home.welcome' nebo 'profile.firstName'
 * @param params - objekty pro interpolaci (např. {name: 'John'})
 * @returns přeložený text
 */
export const getText = (key: string, params?: Record<string, string | number>): string => {
    try {
        // Rozdělení klíče na části (např. 'home.welcome' -> ['home', 'welcome'])
        const keyParts = key.split('.');

        // Získání překladu podle aktuálního jazyka
        let translation: any = translations[currentLanguage];

        // Procházení vnořeného objektu podle klíče
        for (const part of keyParts) {
            if (translation && translation[part]) {
                translation = translation[part];
            } else {
                // Pokud se nepodaří najít v aktuálním jazyce, zkus angličtinu
                console.warn(`⚠️ Klíč '${key}' nenalezen v jazyce '${currentLanguage}', zkouším angličtinu`);

                let fallbackTranslation: any = translations.en;
                for (const fallbackPart of keyParts) {
                    if (fallbackTranslation && fallbackTranslation[fallbackPart]) {
                        fallbackTranslation = fallbackTranslation[fallbackPart];
                    } else {
                        console.error(`❌ Klíč '${key}' nenalezen ani v angličtině`);
                        return key; // Vrať klíč jako fallback
                    }
                }
                translation = fallbackTranslation;
                break;
            }
        }

        // Pokud je výsledek string, aplikuj interpolaci
        if (typeof translation === 'string') {
            if (params) {
                // Jednoduchá interpolace - nahraď {{key}} za values
                let result = translation;
                for (const [paramKey, paramValue] of Object.entries(params)) {
                    result = result.replace(new RegExp(`\\{\\{${paramKey}\\}\\}`, 'g'), String(paramValue));
                }
                return result;
            }
            return translation;
        }

        // Pokud není string, vrať klíč
        console.error(`❌ Klíč '${key}' není string:`, translation);
        return key;

    } catch (error) {
        console.error(`❌ Chyba při získávání textu pro klíč '${key}':`, error);
        return key;
    }
};

/**
 * Získání aktuálního jazyka
 */
export const getCurrentLanguage = (): 'cs' | 'en' => {
    return currentLanguage;
};

/**
 * Manuální změna jazyka (pro budoucí použití)
 */
export const setLanguage = (language: 'cs' | 'en'): void => {
    currentLanguage = language;
    console.log('🌍 Jazyk změněn na:', language);
};