/*DESIGN SYSTEM*/

const designSystem = {
    colors : {
        primary: '#C41E3A',       // je hlavní akční barva, identita appky, motiv aplikace, třeba CTA buttons, důležité ceny, označení akce nebo stavu, vybraný stav boxu
        background: "#fefdfb",    // hlavní pozadí appky, scrollable oblasti, layout
        surface: "#fefdfb",       // je vrstva nad backgroundem, něco jako papír, tuto barvu mají komponenty, boxy, karty, tlačítka, spodní taby
        navigationBackground: "#f6bac4", // Světle růžová pro navigační prvky
        textPrimary: "#111111",   // barva hlavních textů aplikace, nadpisy, ceny, hlavní štítky, musí kontrastovat s pozadím
        textSecondary: "#6B6B6B", // barva textu méně důležitých informací, popisků, detailů, 60-70% opacity nebo světlejší odstín od primary. typicky střední šedá, jemnější než primary.
        textMuted: "#B8B8B8",     // barva hodně slabého textu jako třeba placeholderu, disabled prvky, časová razítka
        textHighlight: "#e1374b", // barva písma pro zvýraznění něčeho, jako je třeba cena, hot, spicy.., limited, akce, bývá stejná jako primary, může být i tučný
        textOnPrimary: "#FFFFFF", // barva textu na tlačítku, nebo barva ikony v tlačítku. Barva tohoto textu by měla být kontrast proti primary
        tileBackground: '#f19bc0',  // predtim '#8883bd' fialova #8661a8
        tileText: '#FFFFFF', // Bílý text pro dlaždice
        // u borderu je zásadní pravidlo, netransparentní background elementu => border colour je stejná jak background, transparentní tak barva borderu je stejná jako barava textu je n s opacity 0.8
        border: {
            // Obecné nastavení pro barvu rámečků (borderColor)
            // Používá se u boxů, inputů, karet, oddělovačů a tlačítek
            // Barva se liší dle stavu a kontextu komponenty

            default: "#E5E7EB",
            // Výchozí stav elementu (nevybraný, neaktivní)
            // Pravidlem je neutrální šedá – nenarušuje vizuální hierarchii

            selected: "#E1374B",
            // Element je uživatelem vybraný (např. radio, button, topping)
            // Pokud má komponenta výplň (filled), border je obvykle stejný jako background

            selectedSoft: "rgba(225, 55, 75, 0.8)",
            // Používá se pro outlined varianty (průhledné pozadí)
            // Border má brand barvu (primary) s opacity pro jemnější vzhled

            primary: "#E1374B",
            // Používá se pro vizuálně výrazné elementy (např. CTA, active cards)
            // Slouží k upoutání pozornosti bez nutnosti výběru uživatelem

            error: "#Ef4444",
            // Validace chyb – např. invalid input nebo formulář

            focus: "rgba(225, 55, 75, 0.3)",
            // Hover/focus stav (např. input on focus, button on hover), většinou se používá u forms
            // Používá se opacity brand barvy pro jemný zvýrazňující efekt

            transparent: "transparent",
            // Když border nemá být vidět – např. fully filled button
        },

        selectedBackground: "#e1374b",
        // barva elementu, který vybereme kliknutím, filtry, taby, radio-like ui, button groups třeba S/M/L.
        // všude, kde je víc možností a uživatel jednu z nich vybere. z 90% stejná barva jako primary, teoreticky může být i světlejší nebo desaturated
        selectedText: "#FFFFFF",
        // je doplněk selected background, takže barva textu v selected elementu, měl by splňovat kontrastní poměr 4.5:1 vůči selectedbackground
        accent: "#b8a9db",               // Světlejší fialová jako doplňková barva
        success: "#95bfa4",              // Jemná pastelová zelená pro úspěch
        warning: "#f0c987",              // Jemná pastelová žlutá pro varování

    },

    typography: {
        fontFamily: "Satoshi", // základní font pro celou aplikaci

        // Nadpisy (hierarchie)
        h1: {
            fontSize: 32,
            fontWeight: "700",           // Bold nebo-li tučnost textu
            lineHeight: 38,             // řádkování vzdálenost mezi spodní linii textu a dalším řádkem
                                        // Text typ	Doporučený poměr (vůči fontSize)
                                        // Nadpis (h1)	1.1–1.3×
                                        // Body text	1.4–1.6×
                                        // Caption	1.2–1.4×
            letterSpacing: 0,           // mezera mezi písmeny, tendem je mallý letter spacing a uppercase
        },
        h2: {
            fontSize: 24,
            fontWeight: "600",           // Semibold je víc používaný dnes než klasický bold, víc se používá v appkách
            lineHeight: 30,
            letterSpacing: 0,
        },
        h3: {
            fontSize: 20,
            fontWeight: "600",
            lineHeight: 26,
            letterSpacing: 0,
        },

        // Tělo textu
        body: {
            fontSize: 16,
            fontWeight: "400",           // Regular
            lineHeight: 24,
            letterSpacing: 0,
        },
        bodyStrong: {
            fontSize: 16,
            fontWeight: "600",           // Semibold
            lineHeight: 24,
            letterSpacing: 0,
        },

        // Menší texty
        small: {
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 20,
            letterSpacing: 0,
        },
        caption: {
            fontSize: 12,
            fontWeight: "400",
            lineHeight: 16,
            letterSpacing: 0,
        },

        // Tlačítka
        button: {
            fontSize: 16,
            fontWeight: "700",
            lineHeight: 20,
            letterSpacing: 0.5,
            textTransform: "uppercase",
        },

        // Labely, kategorie, tagy
        label: {
            fontSize: 12,
            fontWeight: "500",
            lineHeight: 16,
            letterSpacing: 1,
            textTransform: "uppercase",
        },

        // Placeholder, disabled texty
        muted: {
            fontSize: 14,
            fontWeight: "400",
            lineHeight: 20,
            letterSpacing: 0,
            color: "#B8B8B8", // můžeš propojit s colors.textMuted
        },
    },
    spacing: { // konzistentní mezery mezi elementy, marginy, gapy, paddingy
        none: 0,
        xs: 4, // např mezera mezi ikonou a textem
        sm: 8, // např padding mezi tlačítky
        md: 16, // np. padding uvnitř karty
        lg: 24, // np. mezera mezi dvěma kartami
        xl: 32, // np. margin mezi sekcemi na obrazovce
        '2xl': 40, // np. top spacing hlavní stránky
    },

    radius: { // zaoblení rohů elementů
        none: 0,    // bez zaoblení
        sm: 4,      // velmi lehké změkčení (např. input fields)
        md: 8,      // běžné tlačítka, boxy
        lg: 16,     // karty, sekce
        xl: 24,     // modály, velké bloky
        full: 9999, // úplně kulaté (badge, tagy)
    },

    shadows: { // trendem je blur a malé opacity
        none: {
            shadowColor: "transparent",
            shadowOpacity: 0,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
            elevation: 0,
        },
        sm: { // malý shadow, jemný malý stín, malý blur, nízká opacity. Ideální pro tlačítka, drobné elementy
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 1 }, // určuje směr a vzdálenost stínu od objektu, wdth horizontalne, hght vertikalne. trendem je stín dolu, napodobujeme osvětlení shora
            shadowRadius: 2, // toto vytváří blur, ovlivňuje rozostření stínu, čím vyšší tím víc rozostřené. opacity reguluje jak moc tmavý viditelný stín bude
            elevation: 1, // toto je typická vlastnost pouze pro android, objekt vrhá stín ačkoliv nemá explicitně nastavené shadowColor. Čím větší číslo od 0 do 10 tím výraznější stín
        },
        md: { // střední shadow, normální měkký stín, decentní oddělení od pozadí. Ideální pro karty boxy, základní sekce
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6, // toto vytváří blur, ovlivňuje rozostření stínu, čím vyšší tím víc rozostřené
            elevation: 4,
        },
        lg: { // výrazný stín, větší blur, větší vzdálenost od pozadí. Ideální pro modály, velké popovery, hero bloky
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 15, // toto vytváří blur, ovlivňuje rozostření stínu, čím vyšší tím víc rozostřené
            elevation: 8,
        },
    },


    icons: { // používáme knihovnu lucide
        size: { // velikost ikony
            sm: 16,
            md: 24,
            lg: 32,
        },
        strokeWidth: { // tloušťka čáry ikony
            light: 1,
            regular: 1.5,
            bold: 2,
        },

    },

    components: { // zde se již vytvoři stylování jednotlivých komponent viz předchozí vlastnosti
        button: {
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 16,
            fontSize: 16,
            fontWeight: "500",
            justifyContent: "center",
            alignItems: "center",
        },
        card: {
            borderRadius: 16,
            padding: 16,
            backgroundColor: "#fefdfb",
            shadow: "md",
        },
        input: {
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 16,
            backgroundColor: "#fefdfb",
            borderColor: "#E5E7EB",
            borderWidth: 1,
        },
        gridTile: {
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)', // Jemný, téměř neviditelný okraj
            borderRadius: 0, // Bez zaoblení pro efekt mřížky
            backgroundColor: '#8883bd', // Průhledné pozadí
            padding: 16,
            margin: 0, // Žádné mezery mezi dlaždicemi
        },
        // Nová sekce pro stylování video
        video: {
            container: {
                height: 220,
                position: 'relative',
                marginBottom: 8,
                overflow: 'hidden',
            },
            player: {
                width: '100%',
                height: 220,
                position: 'absolute',
                top: 0,
            },
            infoCard: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 90, // přibližně 1/3 výšky kontejneru
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 16,
                justifyContent: 'center',
                alignItems: 'center',
            },
            floatingInfoCard: {
                position: 'absolute',
                bottom: -20, // Mírně přesahuje pod video
                left: 16,
                right: 16,
                backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 8,
                padding: 16,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 8,
                elevation: 5,
            }
        }
    },
    interactions: { // interakce na uživatolovou touchování primárních elementů, tzn primary buttons (addtocart,cta),
        //nebo secundary buttons, karty třeba položky v eshopu
        activeOpacity: 0.8, // ztmavnutí elementu
        pressScale: 0.98, // smrsknutí elementu pro apple feeling
        pressDuration: 100, // animace zpět (v ms)
    },
    animations: {
        textReveal: { // animace písmen například v headings
            initial: { opacity: 0, translateY: 10 }, // výchozí stav písmena před animací
            animate: { opacity: 1, translateY: 0 }, // cílový stav písmena po animaci
            transition: {
                type: "timing", // typ animace - časovaná
                duration: 600,             // doba trvání přechodu 0.6s jemné elegantní tempo
                easing: "ease-out",        // způsob plynutí animace, jemné se zpomalením na konci viz ease out
                staggerDelay: 50           // delay mezi jednotlivými písmeny, efekt skládání písmen postupne nastaven na 50 ms mezi písmeny
            }
        },
        sharedElement: { // Shared element animation HOT. reakce na otevření třeba detailu, kdy se obrázek(ten element) otevře ale obrázek "cestuje". Obrázek přechází mezi screeny plynule
            duration: 500,
            easing: "ease-in-out",
        },
        opening: { // Modal! smooth opening animation, animace při otevření modalu, jemné zjevení místo okamžitého renderu
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: {
                type: "timing",
                duration: 400,
                easing: "ease-out",
            }
        },
        fadeBetweenScreens: { // FADE BETWEEN SCREENS(TABY), používáme při přecházení na jiné screens pomocí tabů jen těch neskytých. efekt fade in fade out
            type: "timing",
            duration: 300,
            easing: "ease-in-out",
            animation: {
                opacity: [0, 1],
                scale: [0.98, 1], // jemné zvětšení
            }
        }
    },
    transitions: {
        screen: { // SCREEN TRANSITION(NON TABY) na přechody mezi stack screens a také mezi taby, ale těmi skrytými. Jednoduše všechny přechody na jiné screens kromě komponent v tab navigatoru.
            type: "timing",
            duration: 300, // plynulý přechod mezi screens
            easing: "ease-in-out",
            animation: {
                opacity: [0, 1], // jemný fade in protože z 0 opacity jdeme na 1 opacity
                scale: [0.98, 1], // lehké "vyrostlé" přiblížení
                translateX: [20, 0], // malý posun doprava na začátku ➔ přirozený pohyb
            }
        },
    },

    // NOVÉ PŘIDANÉ KONSTANTY PRO PŘÍMÉ POUŽITÍ V STYLEHEET.CREATE()
    COLORS: {
        PRIMARY: 'rgba(185, 28, 28, 0.9)',
        BACKGROUND: "#fefdfb",
        SURFACE: "#fefdfb",
        TEXT_PRIMARY: "#111111",
        TEXT_SECONDARY: "#6B6B6B",
        TEXT_MUTED: "#B8B8B8",
        TEXT_HIGHLIGHT: "#e1374b",
        TEXT_ON_PRIMARY: "#FFFFFF",
        BORDER_DEFAULT: "#E5E7EB",
        BORDER_SELECTED: "#E1374B",
        BORDER_SELECTED_SOFT: "rgba(225, 55, 75, 0.8)",
        BORDER_PRIMARY: "#E1374B",
        BORDER_ERROR: "#Ef4444",
        BORDER_FOCUS: "rgba(225, 55, 75, 0.3)",
        BORDER_TRANSPARENT: "transparent",
        SELECTED_BACKGROUND: "#e1374b",
        SELECTED_TEXT: "#FFFFFF",
        OVERLAY_DARK: "rgba(0,0,0,0.5)",
        OVERLAY_DARKER: "rgba(0,0,0,0.7)",
        NAVIGATION_BACKGROUND: "#f4a7b4",
        TILE_BACKGROUND: '#f19bc0',
        TILE_TEXT: '#FFFFFF', // Bílý text pro dlaždice
        ACCENT: "#b8a9db",
        SUCCESS: "#95bfa4",
        WARNING: "#f0c987",
        GRADIENT_START: "#9ed89c",
        GRADIENT_END: "#afcaa8",
    },

    SPACING: {
        NONE: 0,
        XS: 4,
        SM: 8,
        MD: 16,
        LG: 24,
        XL: 32,
        XXL: 40,
    },

    RADIUS: {
        NONE: 0,
        SM: 4,
        MD: 8,
        LG: 16,
        XL: 24,
        FULL: 9999,
    },

    SHADOWS: {
        NONE: {
            shadowColor: "transparent",
            shadowOpacity: 0,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 0,
            elevation: 0,
        },
        SM: {
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 2,
            elevation: 1,
        },
        MD: {
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            elevation: 4,
        },
        LG: {
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 15,
            elevation: 8,
        },
    },

    TYPOGRAPHY: {
        H1: {
            fontSize: 32,
            fontWeight: "700" as const,
            lineHeight: 38,
            letterSpacing: 0,
            fontFamily: "Satoshi"
        },
        H2: {
            fontSize: 24,
            fontWeight: "600" as const,
            lineHeight: 30,
            letterSpacing: 0,
            fontFamily: "Satoshi"
        },
        H3: {
            fontSize: 20,
            fontWeight: "600" as const,
            lineHeight: 26,
            letterSpacing: 0,
            fontFamily: "Satoshi"
        },
        BODY: {
            fontSize: 16,
            fontWeight: "400" as const ,
            lineHeight: 24,
            letterSpacing: 0,
            fontFamily: "Satoshi"
        },
        BODY_STRONG: {
            fontSize: 16,
            fontWeight: "600" as const,
            lineHeight: 24,
            letterSpacing: 0,
            fontFamily: "Satoshi"
        },
        SMALL: {
            fontSize: 14,
            fontWeight: "400" as const,
            lineHeight: 20,
            letterSpacing: 0,
            fontFamily: "Satoshi"
        },
        CAPTION: {
            fontSize: 12,
            fontWeight: "400" as const,
            lineHeight: 16,
            letterSpacing: 0,
            fontFamily: "Satoshi"
        },
        BUTTON: {
            fontSize: 16,
            fontWeight: "700" as const, // Změněno na tučnější (bold) z původního 600
            lineHeight: 20,
            letterSpacing: 0.5,
            textTransform: "uppercase" as const,
            fontFamily: "Satoshi"
        },
        LABEL: {
            fontSize: 12,
            fontWeight: "500" as const,
            lineHeight: 16,
            letterSpacing: 1,
            textTransform: "uppercase" as const,
        },
    },

    COMPONENTS: {
        BUTTON: {
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 16,
            fontSize: 16,
            fontWeight: "500" as const,
            justifyContent: "center" as const,
            alignItems: "center" as const,
        },
        CARD: {
            borderRadius: 16,
            padding: 16,
            backgroundColor: "#fefdfb",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            elevation: 4,
        },
        INPUT: {
            height: 48,
            borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 16,
            backgroundColor: "#fefdfb",
            borderColor: "#E5E7EB",
            borderWidth: 1,
        },
        GRID_TILE: {
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.1)',
            borderRadius: 0,
            backgroundColor: '#a29dc8', // Nová barva pozadí dlaždic
            padding: 16,
            margin: 0,
        },
        VIDEO: {
            CONTAINER: {
                height: 280,
                position: 'relative',
                marginBottom: 8,
                overflow: 'hidden',
            },
            PLAYER: {
                width: '100%',
                height: 220,
                position: 'absolute',
                top: 0,
            },
            INFO_CARD: {
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 90,
                backgroundColor: 'rgba(0,0,0,0.7)',
                padding: 16,
                justifyContent: 'center',
                alignItems: 'center',
            },
            FLOATING_INFO_CARD: {
                position: 'absolute',
                bottom: -20,
                left: 16,
                right: 16,
                backgroundColor: 'rgba(0,0,0,0.75)',
                borderRadius: 8,
                padding: 16,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 8,
                elevation: 5,
            }
        }
    },

    INTERACTIONS: {
        // stávající vlastnosti...
        ACTIVE_OPACITY: 0.8,
        PRESS_SCALE: 0.98,
        PRESS_DURATION: 100,

        // Nové nastavení pro ikony v tab navigatoru
        IOS_TAB_ICON: {
            SCALE_DOWN: 0.85,  // Míra stlačení ikony při stisknutí
            PRESS_DURATION: 70,  // Rychlé stlačení dolů
            RELEASE_DURATION: 400,  // Pomalejší uvolnění pro pružný pocit
            TIMING_FUNCTION: 'spring',  // Typ animace
        }
    },

// Můžeš přidat speciální konstanty pro animace tab ikon
    ANIMATIONS: {
        // stávající animace...

        // Přidej iOS tab animaci
        IOS_ICON_PRESS: {
            type: "spring",  // Typ animace
            duration: 400,  // Délka animace
            tension: 300,  // Napětí pružiny
            friction: 10,  // Tření (menší = pružnější)
            // Tyto hodnoty dávají ten typický iOS "bounce" efekt
        }
    }
};

export default designSystem;