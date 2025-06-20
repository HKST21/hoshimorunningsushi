// src/localization/translations.ts
export const translations = {
    cs: {
        // Navigation and tab bar
        navigation: {
            home: 'Domů',
            coupons: 'Kupóny',
            news: 'Novinky',
            sushi: 'Sushi',
            more: 'Více'
        },

        // Hamburger menu
        menu: {
            reservation: 'REZERVACE',
            vip: 'VIP',
            coupons: 'KUPÓNY',
            confirmVisit: 'POTVRDIT NÁVŠTĚVU',
            faq: 'JAK TO FUNGUJE',
            myProfile: 'MŮJ PROFIL',
            contact: 'KONTAKT',
            celebs: 'OSLAVY'
        },

        // Home screen
        home: {
            welcome: '🍣 Ahoj {{name}}! Vítej v naší řetězci Running Sushi. Užij si své výhody.',
            welcomeDefault: '🍣 Ahoj uživateli! Vítej v naší řetězci Running Sushi. Užij si své výhody.',
            daysWithUs: 'Dní s námi',
            coupons: 'Kupóny',
            visits: 'Návštěvy',
            discoverBenefits: 'Objevte své výhody',
            confirmVisit: 'Potvrdit návštěvu',
            browseCoupons: 'Procházet kupóny',
            howItWorks: 'Jak to funguje',
            ourBranches: 'Naše pobočky',
            loadingBranches: 'Načítání poboček...',
            member: 'ČLEN',
            levels: {
                bronze: 'BRONZOVÝ',
                silver: 'STŘÍBRNÝ',
                gold: 'ZLATÝ'
            }
        },

        // How it works screen
        howItWorks: {
            headerText: 'Posláním aplikace je odměňovat vás za návštěvy naší restaurace! Systém je naprosto jednoduchý:',
            steps: {
                scanQR: 'Naskenujte QR kód',
                scanQRDesc: 'Tím potvrdíte každou ze svých návštěv, čím více návštěv tím více výhod. QR kód je na stole nebo v menu.',
                getBenefits: 'Získejte výhody',
                getBenefitsDesc: 'Čím více nás navštěvujete, tím více vás milujeme! Uvítací nápoje, VIP vouchery, prioritní rezervace...',
                useVouchers: 'Použijte vouchery',
                useVouchersDesc: 'Užívejte si vouchery, které jsme pro vás připravili, vouchery lze použít při každé objednávce ukázáním personálu.',
                visitRegularly: 'Navštěvujte nás pravidelně',
                visitRegularlyDesc: 'Čím více k nám chodíte a skenujete návštěvy, tím více výhod získáte.',
                becomeVIP: 'Staňte se VIP členem',
                becomeVIPDesc: 'Po 20 a více návštěvách získáte přístup do VIP, kde dostanete např. celoživotní 10% slevu'
            },
            startToday: 'Začněte sbírat výhody ještě dnes!',
            confirmVisit: 'Potvrdit návštěvu',
            browseVouchers: 'Procházet vouchery',
            additionalInfo: 'Další informace',
            infoText1: 'Naše aplikace je navržena tak, aby vám přinesla co nejvíce výhod při návštěvě naší restaurace. Všechny vouchery lze snadno uplatnit při objednávce ukázáním QR kódu personálu.',
            infoText2: 'Pro jakékoliv otázky týkající se věrnostního programu nebo jak aplikace funguje, neváhejte kontaktovat náš personál.'
        },

        // Contact screen
        contact: {
            contactInfo: 'Kontaktní informace',
            manager: 'manažerka: Sofia Hu',
            visitWebsite: 'NAVŠTÍVIT WEBOVÉ STRÁNKY',
            whereToFind: 'Kde nás najdete',
            shoppingMall: 'obchodní centrum',
            openGoogleMaps: 'Otevřít Google mapy',
            openingHours: 'Otevírací doba',
            mondayFriday: 'Pondělí - Pátek',
            saturday: 'Sobota',
            sunday: 'Neděle',
            hours1: '11:00 - 21:00',
            hours2: '11:00 - 21:00',
            hours3: '11:00 - 20:00',
            lookForward: 'Těšíme se na vaši návštěvu v kterékoliv z našich poboček v obchodních centrech ve Spojeném království'
        },

        // Coupons screen
        coupons: {
            loginRequired: 'Přihlášení vyžadováno',
            loginMessage: 'Pro používání kupónů a souvisejících funkcí se musíte přihlásit pomocí svého Apple účtu',
            back: 'Zpět',
            signIn: 'Přihlásit se',
            collectVisits: '🍣Sbírejte návštěvy a získávejte více voucherů',
            visitCount: 'Počet návštěv restaurace:',
            couponsTitle: 'Kupóny',
            noCoupons: 'Zatím nemáte žádné kupóny.',
            visitsRemaining: 'návštěv zbývá',
            oneVisitRemaining: 'návštěva zbývá',
            twoVisitsRemaining: 'návštěvy zbývají',
            usedUp: 'Vyčerpáno',
            remaining: 'zbývá',
            unlimitedUses: 'Neomezené použití',
            availableFrom: 'Dostupné od',
            availableImmediately: 'Dostupné okamžitě',
            visit: 'návštěvy',
            showQrCode: 'Ukažte tento QR kód personálu pro uplatnění vašeho voucheru',
            close: 'Zavřít',
            ordinals: {
                first: '.',
                second: '.',
                third: '.',
                other: '.'
            },

            coca_cola: {
                name: 'Coca Cola zdarma',
                description: 'Coca Cola zdarma pro každou osobu při objednání running sushi. Platí s jakoukoliv objednávkou running sushi.'
            },

            children_sushi: {
                name: 'Dětské running sushi zdarma',
                description: 'Děti do 10 let jedí running sushi zdarma v doprovodu platící dospělé osoby. Vyžadován platný doklad totožnosti.'
            },

            sake_drink: {
                name: 'Uvítací saké nápoj',
                description: 'Uvítací panák saké zdarma pro každou osobu u vašeho stolu. Pouze 18+ s platným dokladem totožnosti.'
            },

            discount_10: {
                name: '-10% sleva na running sushi',
                description: 'Získejte 10% slevu na cenu running sushi pro každou osobu u vašeho stolu. Platí až pro 6 osob.'
            },

            premium_boat: {
                name: 'Prémiový Dragon Boat Sushi',
                description: 'Prémiový sushi talíř v hodnotě £100 zdarma k vašemu running sushi zážitku. Musíte objednat pro 2+ osoby.'
            }

        },

        // News screen


        login: {
            unsupportedPlatform: 'Nepodporovaná platforma',
            appleSignInNotAvailable: 'Apple Sign In není na tomto zařízení dostupný.',
            loginSuccessful: 'Přihlášení úspěšné',
            welcomeBack: 'Vítej zpět, {{name}}!',
            loginError: 'Chyba přihlášení',
            appleSignInFailed: 'Apple přihlášení selhalo. Zkuste to prosím znovu.',
            redirecting: 'Přesměrovávání...',
            back: '← Zpět',
            welcomeTitle: 'Vítejte v Hoshimo Running Sushi',
            signInSubtitle: 'Pro pokračování se prosím přihlaste',
            privacyText: 'Přihlášením souhlasíte s našimi podmínkami používání a zásadami ochrany osobních údajů'
        },

        // Profile modal
        profile: {
            completeProfileTitle: 'Dokončete svůj profil',
            completeProfileSubtitle: 'Pro poskytnutí lepších služeb prosím doplňte své údaje. Můžete to udělat i později.',
            firstName: 'Křestní jméno',
            surname: 'Příjmení',
            email: 'Email',
            firstNamePlaceholder: 'Vaše křestní jméno',
            surnamePlaceholder: 'Vaše příjmení',
            emailPlaceholder: 'vas.email@priklad.cz',
            emailHint: 'Pro oznámení o nových kupónech a VIP nabídkách',
            completeProfile: 'Dokončit profil',
            updating: 'Aktualizuji...',
            maybeLater: 'Možná později',

            // Error messages
            userNotLoggedIn: 'Uživatel není přihlášen',
            enterFirstName: 'Prosím zadejte své křestní jméno',
            enterValidEmail: 'Prosím zadejte platnou emailovou adresu',
            profileUpdatedSuccessfully: 'Váš profil byl úspěšně aktualizován!',
            invalidData: 'Neplatná data. Zkontrolujte prosím zadané informace.',
            userNotFound: 'Uživatel nenalezen. Přihlaste se prosím znovu.',
            serverError: 'Chyba serveru. Zkuste to prosím později.',
            connectionProblem: 'Problém s připojením. Zkontrolujte prosím internetové připojení.',
            updateFailed: 'Nepodařilo se aktualizovat profil. Zkuste to prosím znovu.',
            unexpectedError: 'Neočekávaná chyba. Zkuste to prosím znovu.'
        },

        celebrations: {
            headerSubtitle: '✨ Proměňte své výjimečné okamžiky v nezapomenutelné vzpomínky! Oslavte narozeniny, výročí nebo rozlučku se svobodou s námi a získejte 2 láhve prémiového Saké jako dárek od nás 🥂✨',
            types: {
                birthday: 'Oslava narozenin',
                anniversary: 'Výročí',
                bachelor: 'Rozlučka se svobodou'
            },
            form: {
                fullName: 'Celé jméno *',
                fullNamePlaceholder: 'Zadejte své jméno',
                email: 'Email *',
                emailPlaceholder: 'Zadejte svůj email',
                phone: 'Telefon *',
                phonePlaceholder: 'Zadejte své telefonní číslo',
                numberOfGuests: 'Počet hostů *',
                numberOfGuestsPlaceholder: 'Zadejte počet hostů',
                date: 'Datum *',
                time: 'Čas *',
                celebrationType: 'Typ oslavy *',
                note: 'Poznámka (volitelné)',
                notePlaceholder: 'Pokud máte nějaké speciální požadavky nebo přání, dejte nám vědět',
                submitBooking: 'Odeslat rezervaci',
                requiredFields: '* Povinná pole',
                noNote: 'Žádná poznámka'
            },
            success: {
                title: 'Rezervace odeslána',
                message: 'Děkujeme za vaši rezervaci na oslavu. Brzy vás budeme kontaktovat pro potvrzení.\n\nTyp oslavy: {{celebrationType}}',
                ok: 'OK'
            },
            errors: {
                error: 'Chyba',
                fillAllFields: 'Prosím vyplňte všechna povinná pole',
                emailRequired: 'Email je povinný',
                sendingError: 'Chyba při odesílání',
                sendingErrorMessage: 'Omlouváme se, ale nepodařilo se nám odeslat vaši rezervaci. Zkuste to prosím později nebo nás kontaktujte přímo telefonicky.'
            },
            promotionText: '💝 S rezervací získáváte 2x láhev prémiového Saké 💝'
        },

        myprofile: {
            loginRequired: 'Přihlášení vyžadováno',
            loginMessage: 'Pro zobrazení vašeho profilu se musíte přihlásit pomocí svého Apple účtu',
            back: 'Zpět',
            signIn: 'Přihlásit se',
            loadingProfile: 'Načítám profil...',

            levels: {
                bronze: 'Bronzový',
                silver: 'Stříbrný',
                gold: 'Zlatý',
                bronzeDescription: 'Možnost získávat a využívat vouchery',
                silverDescription: 'Přístup k exkluzivním nabídkám',
                goldDescription: '10% celoživotní sleva na všechny objednávky'
            },

            summary: {
                visits: 'Návštěvy',
                runningSushi: 'Running Sushi',
                coupons: 'Kupóny'
            },

            loyaltyProgram: 'Věrnostní program',
            level: 'Level',
            visitsCount: '{{count}} návštěv',
            nextLevelIn: 'Příští level za: {{visits}} návštěv',
            nextLevelBrings: 'Váš příští level vám přinese:',
            congratulations: 'Gratulujeme! Dosáhli jste nejvyššího levelu!',
            enjoyDiscount: 'Užívejte si svou 10% celoživotní slevu na všechny objednávky.',

            yourVisits: 'Vaše návštěvy',
            confirmVisit: 'Potvrdit návštěvu',
            myCoupons: 'Moje kupóny',

            exclusiveOffers: 'Exkluzivní nabídky',
            specialOffersTitle: 'Speciální nabídky jen pro vás',
            specialOffersSubtitle: 'Díky vašemu {{level}} statusu máte přístup k těmto nabídkám',
            tenPercentDiscount: '10% SLEVA',
            viewOffers: 'Zobrazit nabídky',

            lockedContent: 'Uzamčený obsah',
            lockedDescription: 'Dosáhněte STŘÍBRNÉHO levelu (10+ návštěv) pro odemčení exkluzivních nabídek.',
            progressVisits: '{{current}}/{{total}} návštěv',

            yourMembership: 'Vaše členství',
            memberSince: 'Člen od',
            daysWithUs: 'Dní s námi',
            email: 'Email',

            signOut: 'Odhlásit se',
            deletingAccount: 'Mazání účtu...',

            logout: {
                title: 'Odhlásit se',
                message: 'Opravdu se chcete odhlásit?',
                cancel: 'Zrušit',
                signOut: 'Odhlásit se',
                success: 'Úspěšně odhlášen',
                successMessage: 'Děkujeme za návštěvu. Těšíme se na vás!',
                error: 'Chyba při odhlášení',
                errorMessage: 'Zkuste to prosím znovu.'
            },

            deleteAccount: {
                title: 'Smazat účet',
                message: 'Opravdu chcete trvale smazat svůj účet?\n\nTato akce je nevratná a smaže:\n• Všechny vaše návštěvy\n• Všechny vaše kupóny\n• Historii návštěv\n• Všechna osobní data',
                cancel: 'Zrušit',
                delete: 'Smazat účet',
                finalTitle: 'Konečné potvrzení',
                finalMessage: 'Toto je vaše poslední šance. Opravdu chcete trvale smazat svůj účet?',
                keepAccount: 'Ne, ponechat účet',
                yesDelete: 'Ano, smazat',
                buttonText: 'Smazat účet',

                errorTitle: 'Chyba',
                userNotFound: 'Nepodařilo se identifikovat uživatele',
                successTitle: 'Účet smazán',
                successMessage: 'Váš účet byl úspěšně smazán. Děkujeme za vaši důvěru.',
                defaultError: 'Nepodařilo se smazat účet. Zkuste to prosím znovu.',
                accountNotFound: 'Uživatelský účet nebyl nalezen.',
                connectionError: 'Chyba připojení. Zkontrolujte prosím své internetové připojení.'
            }
        },

        reservation: {
            headerSubtitle: '🍱 Připraveni na čerstvé sushi? Rezervujte si svůj stůl a nechte začít lahodnou cestu!',
            form: {
                firstName: 'Křestní jméno',
                firstNamePlaceholder: 'Vaše křestní jméno',
                surname: 'Příjmení',
                surnamePlaceholder: 'Vaše příjmení',
                phoneNumber: 'Telefonní číslo',
                phoneNumberPlaceholder: 'Telefonní číslo',
                date: 'Datum',
                time: 'Čas',
                numberOfGuests: 'Počet hostů',
                numberOfGuestsPlaceholder: 'Počet hostů',
                note: 'Poznámka (volitelné)',
                notePlaceholder: 'Máte nějaká speciální přání nebo požadavky?',
                reserveTable: 'Rezervovat stůl',
                noNote: 'Žádná poznámka'
            },
            validation: {
                firstNameRequired: 'Křestní jméno je povinné',
                surnameRequired: 'Příjmení je povinné',
                phoneRequired: 'Telefonní číslo je povinné',
                phoneInvalid: 'Zadejte platné telefonní číslo (9 číslic)',
                guestsRequired: 'Počet hostů je povinný',
                guestsInvalid: 'Zadejte platný počet hostů'
            },
            success: {
                title: 'Rezervace odeslána',
                message: 'Vaše rezervace byla úspěšně odeslána. Brzy vás budeme kontaktovat pro potvrzení.',
                ok: 'OK'
            },
            error: {
                title: 'Chyba',
                message: 'Nepodařilo se odeslat rezervaci. Zkuste to prosím znovu.'
            },
            disclaimer: 'Po odeslání formuláře obdržíte potvrzení rezervace prostřednictvím SMS.'
        },
        vip: {
            loginRequired: 'Přihlášení vyžadováno',
            loginMessage: 'Pro používání kupónů a souvisejících funkcí se musíte přihlásit pomocí svého Apple účtu',
            back: 'Zpět',
            signIn: 'Přihlásit se',

            loadingOffers: 'Načítám exkluzivní nabídky...',
            unlimitedValidity: 'Neomezená platnost',

            // Bronze level
            bronze: {
                description: 'Tento obsah je dostupný pouze pro uživatele se STŘÍBRNÝM a ZLATÝM levelem.',
                info: 'Dosáhněte 10 nebo více návštěv pro odemčení exkluzivních nabídek.',
                progress: 'Váš pokrok: {{current}}/{{total}} návštěv',
                getMoreVisits: 'Jak získat více návštěv?'
            },

            // Silver level
            silver: {
                headerSubtitle: 'Děkujeme za vaši věrnost! Zde jsou vaše exkluzivní výhody.',
                welcomeTitle: 'Vítejte mezi VIP členy!',
                welcomeText: 'Dosáhli jste STŘÍBRNÉHO levelu! Jako poděkování za vaši věrnost vám nabízíme speciální výhody, které můžete využívat při každé návštěvě naší restaurace.',
                upgradeText: 'Dosáhněte ZLATÉHO levelu (20+ návštěv) a získejte další exkluzivní výhody!',
                howToGetMore: 'Jak získat více výhod',
                usageInstructions: 'Pro využití nabídky jednoduše ukažte QR kód z vybrané nabídky personálu během vaší návštěvy.',
                upgradeInfo: 'Dosáhněte 20 nebo více návštěv pro získání ZLATÉHO levelu a přístupu ke všem exkluzivním nabídkám včetně 10% slevy na všechny objednávky.',
                progressTitle: 'Váš pokrok do ZLATÉHO levelu'
            },

            // Gold level
            gold: {
                headerSubtitle: 'Děkujeme za vaši věrnost! Užívejte si všechny VIP výhody.',
                welcomeTitle: 'Vítejte mezi elitními členy!',
                welcomeText: 'Jako ZLATÝ člen máte přístup ke všem exkluzivním nabídkám včetně 10% slevy na všechny objednávky. Níže najdete všechny své VIP výhody, které můžete využívat při každé návštěvě.',
                howToUse: 'Jak využívat své výhody',
                usageInstructions: 'Jednoduše ukažte QR kód z vybrané nabídky personálu během vaší příští návštěvy. Jako ZLATÝ člen vám automaticky poskytneme 10% slevu na váš účet.'
            },

            goldMember: 'ZLATÝ ČLEN',
            goldBadge: 'ZLATO',
            goldMembersOnly: 'Dostupné pouze pro ZLATÉ členy',

            yourExclusiveOffers: 'Vaše exkluzivní nabídky',
            noOffers: 'Momentálně nejsou dostupné žádné exkluzivní nabídky.',
            validUntil: 'Platí do',
            progressToGold: '{{current}}/{{total}} návštěv',

            // Modal
            qrCodeTitle: 'QR kód pro uplatnění',
            qrCodeHelp: 'Ukažte tento QR kód personálu',
            close: 'Zavřít'
        },

        visits: {
            loginRequired: 'Přihlášení vyžadováno',
            loginMessage: 'Pro používání kupónů a souvisejících funkcí se musíte přihlásit pomocí svého Apple účtu',
            back: 'Zpět',
            signIn: 'Přihlásit se',

            howToCollect: 'Jak sbírat návštěvy?',
            howToCollectDescription: 'Je to jednoduché, stačí naskenovat QR kód na stole nebo účtence při každé naší návštěvě.',

            steps: {
                step1: 'Najděte QR kód na vašem stole v restauraci',
                step2: 'Naskenujte QR kód pomocí tlačítka níže',
                step3: 'Povolte aplikaci přístup k vaší poloze',
                step4: 'Aplikace zaznamená vaši návštěvu a odemkne vám další výhody'
            },

            scanQRCode: 'Naskenovat QR kód',
            disclaimer: 'Návštěvy můžete sbírat jednou denně v každé z našich restaurací.',

            // Permissions and dialogs
            notice: 'Upozornění',
            mustSignInFirst: 'Nejprve se musíte přihlásit, abyste mohli sbírat tokeny.',
            waitingForPermission: 'Čekání na povolení kamery',
            pleaseWait: 'Prosím počkejte...',
            cameraAccessDenied: 'Přístup ke kameře zamítnut',
            cameraAccessRequired: 'Přístup ke kameře je vyžadován pro sbírání tokenů. Můžete to změnit v nastavení.',
            openSettings: 'Otevřít nastavení',
            cancel: 'Zrušit',
            locationAccessDenied: 'Přístup k poloze zamítnut',
            locationAccessRequired: 'Bohužel bez povolení polohy nemůžeme ověřit vaši návštěvu restaurace.',
            error: 'Chyba',
            qrCodeError: 'Při zpracování QR kódu došlo k chybě.',

            // Camera view
            verifyingLocation: 'Ověřování vaší polohy...',
            pointCamera: 'Namiřte kameru na QR kód na stole',

            // Success modal
            success: {
                congratulations: 'Gratulujeme!',
                visitRecorded: 'Právě jsme zaznamenali vaši návštěvu.',
                currentVisits: 'Aktuální počet návštěv: {{count}}',
                moreVisitsInfo: 'Čím více návštěv máte, tím lepší kupóny získáte. Těšíme se na vaši další návštěvu!',
                greatThanks: 'Skvělé, děkujeme!'
            }
        },

        restaurantMenuCommon: {
            loadingMenu: 'Načítání menu...',
            infoText: 'Užijte si neomezeně všechna jídla níže',
            prepTime: 'Čas přípravy:',
            popularity: 'Oblíbenost:',
            thankYouRating: 'Děkujeme za vaše hodnocení!',
            allergens: 'Alergeny:',
            backToMenu: 'Zpět do menu'
        },

        restaurantMenu: {
            categories: {
                allYouCanEat: 'ALL YOU CAN EAT',
                sushi: 'Sushi',
                maki: 'Maki',
                hotDishes: 'Teplá jídla',
                drinks: 'Nápoje',
                desserts: 'Dezerty'
            },

            items: {
                // All You Can Eat
                adultAllYouCanEat: {
                    name: 'Dospělý - All you can eat',
                    perex: 'Neomezený přístup k naší kompletní running sushi zkušenosti',
                    description: 'Užijte si neomezený přístup k našemu celému running sushi pásu s čerstvým sushi, maki, teplými jídly a dezerty. Naši šéfkuchaři průběžně připravují nové položky během vaší návštěvy. Nápoje se objednávají zvlášť.'
                },
                childAllYouCanEat: {
                    name: 'Dětské - All you can eat',
                    perex: 'Neomezené running sushi pro děti do 15 let',
                    description: 'Děti do 15 let si užívají stejný neomezený přístup k naší kompletní running sushi zkušenosti za sníženou cenu. Perfektní uvedení do autentické japonské kuchyně pro mladé jedlíky.'
                },

                // Sushi
                eelNigiri: {
                    name: 'Úhoř Nigiri',
                    perex: 'Glazovaný sladkovodní úhoř se sladkou omáčkou'
                },
                mackerelNigiri: {
                    name: 'Makrela Nigiri',
                    perex: 'Nakládaná makrela s tradiční octovou přípravou'
                },
                octopusNigiri: {
                    name: 'Chobotnice Nigiri',
                    perex: 'Jemná chobotnice s delikátní přípravou'
                },
                prawnNigiri: {
                    name: 'Kreveta Nigiri',
                    perex: 'Sladké vařené krevety s tradiční přípravou'
                },
                salmonNigiri: {
                    name: 'Losos Nigiri',
                    perex: 'Norský losos na ochucené sushi rýži',
                    description: 'Ručně lisované nigiri s čerstvým norským lososem na dokonale ochucené sushi rýži. Klasická kombinace, která zdůrazňuje máslovou texturu prémiového lososa.'
                },
                seaBassNigiri: {
                    name: 'Mořský okoun Nigiri',
                    perex: 'Čerstvý mořský okoun s lehkým kořeněním'
                },
                tunaSashimi: {
                    name: 'Tuňák Sashimi',
                    perex: 'Prémiový tuňák modrý, odborně nakrájený',
                    description: 'Čerstvý tuňák modrý pocházející z tokijských rybích trhů, podávaný jako tradiční sashimi. Naši zkušení kuchaři připravují každý kus tak, aby zvýraznili přirozené chutě a texturu této prémiové ryby.'
                },
                yellowtailSashimi: {
                    name: 'Žlutochvost Sashimi',
                    perex: 'Delikátní žlutochvost s citrusovými tóny'
                },

                // Maki
                californiaRoll: {
                    name: 'California Roll',
                    perex: 'Klasický roll s krabem, avokádem a okurou',
                    description: 'Nadčasový California roll s čerstvým krabím masem, krémovým avokádem a křupavou okurou zabaleným v ochucené sushi rýži a nori. Perfektní uvedení do maki pro nováčky.'
                },
                dragonRoll: {
                    name: 'Dragon Roll',
                    perex: 'Autorská kreace šéfkuchaře Yamasaki s úhořem a avokádem',
                    description: 'Náš podpisový roll hlavního kuchaře s grilovaným úhořem, okurou a avokádem, přikrytý plátky avokáda uspořádanými tak, aby připomínaly dračí šupiny. Dokončeno sladkou úhořskou omáčkou a sezamovými semínky.'
                },
                philadelphiaRoll: {
                    name: 'Philadelphia Roll',
                    perex: 'Uzený losos se smetanovým sýrem a okurou'
                },
                rainbowRoll: {
                    name: 'Rainbow Roll',
                    perex: 'Barevný roll přikrytý směsí sashimi'
                },
                salmonAvocadoRoll: {
                    name: 'Losos Avokádo Roll',
                    perex: 'Čerstvý losos s krémovým avokádem'
                },
                spicyTunaRoll: {
                    name: 'Pikantní Tuňák Roll',
                    perex: 'Čerstvý tuňák s pikantní majonézou a křupavou zeleninou'
                },
                tempuraPrawnRoll: {
                    name: 'Tempura Kreveta Roll',
                    perex: 'Křupavá tempura kreveta se zeleninou a omáčkou'
                },
                vegetableRoll: {
                    name: 'Zeleninový Roll',
                    perex: 'Čerstvá zelenina s avokádem a okurou'
                },

                // Hot Dishes
                beefYakitori: {
                    name: 'Hovězí Yakitori',
                    perex: 'Grilované hovězí špízy s tare omáčkou'
                },
                chickenKatsuCurry: {
                    name: 'Kuřecí Katsu Curry',
                    perex: 'Křupavé obalované kuře s japonskou kari omáčkou'
                },
                chickenTeriyaki: {
                    name: 'Kuřecí Teriyaki',
                    perex: 'Grilované kuře glazované tradiční teriyaki omáčkou',
                    description: 'Jemné grilované kuřecí stehno glazované naší domácí teriyaki omáčkou, podávané s párovanou rýží a sezónní zeleninou. Omáčka je připravována tradičními japonskými metodami se sójovou omáčkou, mirin a saké.'
                },
                gyozaDumplings: {
                    name: 'Gyoza Knedlíčky',
                    perex: 'Pažené vepřové a zeleninové knedlíčky',
                    description: 'Ručně dělané knedlíčky plněné ochuceným vepřovým mletým masem, zelím a pažitkou. Pažené dozlatova a podávané s sójovo-octovou omáčkou na namáčení. Každý knedlíček je pečlivě skládán našimi zkušenými kuchaři.'
                },
                misoGlazedCod: {
                    name: 'Miso Glazovaný Treska',
                    perex: 'Jemný tresčí filet se sladkou miso glazurou'
                },
                salmonTeriyaki: {
                    name: 'Losos Teriyaki',
                    perex: 'Grilovaný losos s teriyaki glazurou a zeleninou'
                },
                tempuraSelection: {
                    name: 'Tempura Výběr',
                    perex: 'Směs zeleniny a krevet v lehkém křupavém těstíčku'
                },
                vegetableStirFry: {
                    name: 'Smažená Zelenina',
                    perex: 'Sezónní zelenina smažená ve woku s česnekem a zázvorem'
                },

                // Drinks
                asahiSuperDry: {
                    name: 'Asahi Super Dry',
                    perex: 'Křupavé japonské ležák pivo'
                },
                hotSake: {
                    name: 'Teplé Saké',
                    perex: 'Ohřáté saké v tradiční tokkuri'
                },
                icedGreenTea: {
                    name: 'Ledový Zelený Čaj',
                    perex: 'Osvěžující studeně vařená sencha'
                },
                japaneseGreenTea: {
                    name: 'Japonský Zelený Čaj',
                    perex: 'Tradiční sencha zelený čaj'
                },
                japaneseWhisky: {
                    name: 'Japonská Whisky',
                    perex: 'Prémiová Suntory Toki whisky'
                },
                premiumSakeSelection: {
                    name: 'Prémiový Výběr Saké',
                    perex: 'Junmai saké podávané teplé nebo chlazené'
                },
                ramuneSoda: {
                    name: 'Ramune Soda',
                    perex: 'Tradiční japonská kuličková soda'
                },
                sparklingWater: {
                    name: 'Perlivá Voda',
                    perex: 'Japonská minerální voda s přírodními bublinkamy'
                },

                // Desserts
                dorayakiPancakes: {
                    name: 'Dorayaki Palačinky',
                    perex: 'Nadýchané palačinky plněné sladkou pastou z červených fazolí'
                },
                matchaCheesecake: {
                    name: 'Matcha Cheesecake',
                    perex: 'Krémový cheesecake s prémiovou matcha'
                },
                mixedFruitMochi: {
                    name: 'Smíšené Ovocné Mochi',
                    perex: 'Směs ovocných mochi v různých příchutích'
                },
                mochiIceCream: {
                    name: 'Mochi Zmrzlina',
                    perex: 'Tradiční rýžový koláček plněný prémiovou zmrzlinou'
                },
                taiyakiFishCake: {
                    name: 'Taiyaki Rybí Koláček',
                    perex: 'Koláček ve tvaru ryby plněný sladkým pudingem'
                }
            }
        },

        news: {
            close: 'Zavřít',

            articles: {
                loyaltyAppLaunch: {
                    heading: 'Spuštění věrnostní aplikace',
                    perex: 'Stáhněte si naši novou věrnostní aplikaci a odemkněte exkluzivní odměny.',
                    text: 'S nadšením oznamujeme spuštění oficiální věrnostní aplikace Hoshimo Running Sushi, navržené tak, aby vylepšila váš zážitek ze stravování a odměnila vaši věrnost.\n\nKlíčové vlastnosti:\nZískávejte body při každé návštěvě a vyměňujte je za zdarma sushi, nápoje a exkluzivní položky menu. Jednoduše naskenujte naše QR kódy v restauraci pro automatické sbírání bodů. Přístup k slevám a speciálním nabídkám pouze v aplikaci. Procházejte naše kompletní menu, včetně sezónních specialit a podpisových jídel šéfkuchaře Yamasaki.\n\nSpeciální nabídka při spuštění:\nStáhněte si aplikaci nyní a získejte 100 uvítacích bodů - dost na zdarma miso polévku nebo zelený čaj při vaší příští návštěvě! Navíc získáte dvojnásobné body za všechny nákupy během prvního týdne.\n\nJak to funguje:\nStáhněte si aplikaci Hoshimo z App Store nebo Google Play, vytvořte si účet, navštivte jakoukoli pobočku Hoshimo a naskenujte QR kód, pak začněte získávat body a odemykejte lahodné odměny.\n\nDostupné nyní pro iOS a Android zařízení. Začněte svou cestu k exkluzivním odměnám ještě dnes!'
                },

                newHeadChefJoins: {
                    heading: 'Nový šéfkuchař se připojuje',
                    perex: 'Proslulý mistr sushi šéfkuchař Kuniro Yamasaki se připojuje k Hoshimo.',
                    text: 'Po 15 letech zdokonalování svého řemesla v prestižní tokijské čtvrti Tsukiji přináší šéfkuchař Kuniro Yamasaki mimořádnou vášeň pro autentickou japonskou kuchyni do Spojeného království. Narozen v Kjótu a vyškolený pod legendárním mistrem sushi Jiro Tanaka, šéfkuchař Yamasaki pracoval v některých z nejoslavovanějších japonských restaurací.\n\nŠéfkuchař Yamasaki říká: "Jsem potěšen, že mohu přinést pravého ducha japonské sushi kultury britským strávníkům. V Hoshimo věříme, že každý kousek sushi vypráví příběh - od pečlivě vybrané ryby až po dokonale ochucené rýže."\n\nŠéfkuchař Yamasaki se specializuje na tradiční Edomae-style sushi a představil několik podpisových jídel do našeho menu, včetně svého slavného Dragon Roll a sezónních sashimi výběrů. Jeho filozofie se soustředí na používání pouze nejkvalitnějších ingrediencí, s rybami příletěnými čerstvě z proslulého tokijského trhu Toyosu dvakrát týdně.\n\nZveme vás k návštěvě kterékoli z našich poboček Hoshimo, abyste zažili výjimečné výtvory šéfkuchaře Yamasaki a byli svědky uměleckého zpracování autentické japonské kuchyně.'
                },

                gloucesterOpening: {
                    heading: 'Otevření v Gloucester',
                    perex: 'Otevíráme 1. srpna v Eastgate Shopping Centre, Gloucester.',
                    text: 'Ve čtvrtek 1. srpna 2025 oficiálně otevře Hoshimo Running Sushi své dveře v Eastgate Shopping Centre v Gloucester a přinese naši charakteristickou running sushi zkušenost do tohoto historického katedrálního města.\n\nDetail umístění:\nAdresa: Eastgate Street, Gloucester GL1 1PA\nOtevírací doba: Pondělí-Neděle, 11:00 - 21:00\n\nCo očekávat:\nNaše pobočka v Gloucester disponuje spektakulárním 40metrovým dopravníkovým pásem s více než 100 druhy čerstvého sushi, sashimi a teplých japonských jídel. Restaurace se pyšní 80 místy s moderním japonským interiérovým designem, doplněným tradičními dřevěnými prvky.\n\nVelikonoční oslavy otevření:\nZdarma miso polévka pro prvních 50 zákazníků, 20% sleva na všechny položky během otevíracího víkendu, živé sushi demonstrace od našich zkušených kuchařů a tradiční degustace saké pro hosty 18+.\n\nZávazek k místním dodavatelům:\nNaše restaurace v Gloucester bude nakupovat čerstvou zeleninu a byliny od místních dodavatelů z Gloucestershire, přičemž si zachováme náš závazek k prémiovým japonským ingrediencím příletěným čerstvě z Tokia.\n\nAť už nakupujete v Eastgate Centre nebo prozkoumáváte historické památky Gloucester, zveme vás k zážitku autentického running sushi. Nemůžeme se dočkat, až vás přivítáme!'
                },

                norwichOpening: {
                    heading: 'Otevření v Norwich',
                    perex: 'Otevíráme 1. září v Castle Quarter, Norwich.',
                    text: 'Hoshimo Running Sushi otevře své dveře v Norwich v neděli 1. září 2025, umístěné v populární nákupní destinaci Castle Quarter v srdci města.\n\nDetail umístění:\nAdresa: Castle Meadow, Norwich NR1 3DD\nOtevírací doba: Pondělí-Neděle, 11:00 - 21:00\n\nDokonalé přivítání v Norwich:\nNaše restaurace v Norwich byla speciálně navržena tak, aby odrážela jedinečný charakter města při zachování autentické japonské estetiky. 75místná restaurace má akcenty z místně získaného Norfolk dřeva, které doplňují náš charakteristický dopravníkový systém.\n\nVelikonoční víkend otevření (1.-3. září):\nZdarma edamame pro všechny hosty, 25% sleva na prémiové sushi výběry, demonstrace tradičního čajového obřadu a dětské sushi workshopy v sobotu a neděli ve 14:00.\n\nPodpora místního Norfolk:\nJsme hrdí na partnerství s dodavateli z Norfolk pro naše čerstvé produkty, včetně zeleniny z místních farem a bylin ze zahrad komunity Norwich. Najali jsme 25 místních členů týmu a budeme podporovat charitativní organizace Norfolk.\n\nSpeciální Norwich menu položky:\nŠéfkuchař Yamasaki vytvořil exkluzivní menu doplňky včetně Norfolk Coast Roll s místně získaným krabem, Cathedral City Special a Canary Sunset v barvách Norwich City FC.\n\nPřipojte se k nám na nezapomenutelný otevírací víkend!'
                },

                wakefieldOpening: {
                    heading: 'Otevření ve Wakefield',
                    perex: 'Otevíráme 1. října v Trinity Walk Shopping Centre.',
                    text: 'Hoshimo Running Sushi otevře svou nejnovější restauraci ve Wakefield ve středu 1. října 2025, umístěnou v rušném Trinity Walk Shopping Centre.\n\nDetail umístění:\nAdresa: Marsh Way, Wakefield WF1 1QS\nOtevírací doba: Pondělí-Neděle, 11:00 - 21:00\n\nPřinášíme Japonsko do West Yorkshire:\nNaše pobočka ve Wakefield představuje naši expanzi do Yorkshire, přinášející autentické japonské chutě do tohoto historického tržního města. Restaurace má 85 míst uspořádaných kolem našeho charakteristického 45metrového dopravníkového pásu, s moderním designem, který vzdává hold jak japonskému minimalismu, tak průmyslovému dědictví Yorkshire.\n\nVelikonočních slavnosti otevření (1.-7. října):\nZdarma gyoza pro prvních 100 zákazníků, 30% sleva na všechny prémiové sashimi, Yorkshire-Japonsko kulturní výstava s místními umělci a rodinné sushi workshopy každý víkendový odpoledne.\n\nYorkshire ingredience, japonské techniky:\nNaše restaurace ve Wakefield bude nabízet čerstvé produkty z místních farem, včetně zeleniny z Rhubarb Triangle a bylin od dodavatelů Yorkshire Dales, kombinované s prémiovými ingrediencemi importovanými přímo z Japonska.\n\nExkluzivní Wakefield speciality:\nPředstavujeme Yorkshire Gold Roll s místní uzenou pstruhí, Rhubarb Dessert Maki s proslulým Yorkshire rebarborou a Cathedral City Salmon se skotským lososem.\n\nNavštivte nás od 1. října a objevte autentické running sushi v Yorkshire!'
                }
            }
        },


        // Common
        common: {
            ok: 'OK',
            success: 'Úspěch',
            error: 'Chyba'
        }
    },

    en: {
        // Navigation and tab bar
        navigation: {
            home: 'Home',
            coupons: 'Coupons',
            news: 'News',
            sushi: 'Sushi',
            more: 'More'
        },

        // Hamburger menu
        menu: {
            reservation: 'RESERVATION',
            vip: 'VIP',
            coupons: 'COUPONS',
            confirmVisit: 'CONFIRM VISIT',
            faq: 'FAQ',
            myProfile: 'MY PROFILE',
            contact: 'CONTACT',
            celebs: 'CELEBS'
        },

        // Home screen
        home: {
            welcome: '🍣 Hey {{name}}! welcome in our Running Sushi chain. Enjoy your benefits.',
            welcomeDefault: '🍣 Hey user! welcome in our Running Sushi chain. Enjoy your benefits.',
            daysWithUs: 'Days with us',
            coupons: 'Coupons',
            visits: 'Visits',
            discoverBenefits: 'Discover your benefits',
            confirmVisit: 'Confirm visit',
            browseCoupons: 'Browse coupons',
            howItWorks: 'How it works',
            ourBranches: 'Our branches',
            loadingBranches: 'Loading branches...',
            member: 'MEMBER',
            levels: {
                bronze: 'BRONZE',
                silver: 'SILVER',
                gold: 'GOLD'
            }
        },

        // How it works screen
        howItWorks: {
            headerText: 'The app\'s mission is to reward you for visiting our restaurant! The system is absolutely simple:',
            steps: {
                scanQR: 'Scan the QR code',
                scanQRDesc: 'This confirms each of your visits, the more visits the more benefits. The QR code is on the table or in the menu.',
                getBenefits: 'Get benefits',
                getBenefitsDesc: 'The more you visit us, the more we love you! Welcome drinks, VIP vouchers, priority reservations...',
                useVouchers: 'Use vouchers',
                useVouchersDesc: 'Enjoy the vouchers we have prepared for you, vouchers can be used with every order when showing to staff.',
                visitRegularly: 'Visit us regularly',
                visitRegularlyDesc: 'The more you come to us and scan visits, the more benefits you will get.',
                becomeVIP: 'Become a VIP member',
                becomeVIPDesc: 'After 20 or more visits you get access to VIP, where you get e.g. lifetime 10% discount'
            },
            startToday: 'Start collecting benefits today!',
            confirmVisit: 'Confirm visit',
            browseVouchers: 'Browse vouchers',
            additionalInfo: 'Additional information',
            infoText1: 'Our app is designed to bring you the most benefits when visiting our restaurant. All vouchers can be easily redeemed when ordering by showing the QR code to staff.',
            infoText2: 'For any questions about the loyalty programme or how the app works, please don\'t hesitate to contact our staff.'
        },

        // Contact screen
        contact: {
            contactInfo: 'Contact information',
            manager: 'manager: Sofia Hu',
            visitWebsite: 'VISIT WEBSITE',
            whereToFind: 'Where you find us',
            shoppingMall: 'shopping mall',
            openGoogleMaps: 'Open Google maps',
            openingHours: 'Opening Hours',
            mondayFriday: 'Monday - Friday',
            saturday: 'Saturday',
            sunday: 'Sunday',
            hours1: '11:00 AM - 9:00 PM',
            hours2: '11:00 AM - 9:00 PM',
            hours3: '11:00 AM - 8:00 PM',
            lookForward: 'We look forward to your visit at any of our branches in shopping centers in the United Kingdom'
        },

        // Coupons screen
        coupons: {
            loginRequired: 'Login required',
            loginMessage: 'To use coupons and related features, you must sign in with your Apple account',
            back: 'Back',
            signIn: 'Sign in',
            collectVisits: '🍣Collect visits and gain more vouchers',
            visitCount: 'Number of restaurant visits:',
            couponsTitle: 'Coupons',
            noCoupons: 'You don\'t have any coupons yet.',
            visitsRemaining: 'visits remaining',
            oneVisitRemaining: 'visit remaining',
            twoVisitsRemaining: 'visits remaining',
            usedUp: 'Used up',
            remaining: 'remaining',
            unlimitedUses: 'Unlimited uses',
            availableFrom: 'Available from',
            availableImmediately: 'Available immediately',
            visit: 'visit',
            showQrCode: 'Show this QR code to the staff to redeem your voucher',
            close: 'Close',
            ordinals: {
                first: 'st',
                second: 'nd',
                third: 'rd',
                other: 'th'
            },
            coca_cola: {
                name: 'Coca Cola for free',
                description: 'Complimentary Coca Cola for each person when ordering running sushi. Valid with any running sushi order.'
            },

            children_sushi: {
                name: 'Children running sushi gratis',
                description: 'Kids under 10 years old eat running sushi for free when accompanied by paying adult. Valid ID required.'
            },

            sake_drink: {
                name: 'Saké welcome drink',
                description: 'Complimentary welcome saké shot for each person at your table. Must be 18+ with valid ID.'
            },

            discount_10: {
                name: '-10% running sushi discount',
                description: 'Get 10% off running sushi price for each person at your table. Valid for up to 6 people.'
            },

            premium_boat: {
                name: 'Premium Dragon Boat Sushi',
                description: 'Complimentary premium sushi boat worth £100 with your running sushi experience. Must order for 2+ people.'
            }
        },

        // News screen
        // News screen - kompletní sekce
        news: {
            close: 'Close',

            articles: {
                loyaltyAppLaunch: {
                    heading: 'Loyalty App Launch',
                    perex: 'Download our new loyalty app and unlock exclusive rewards.',
                    text: 'We are excited to announce the launch of the official Hoshimo Running Sushi loyalty app, designed to enhance your dining experience and reward your loyalty.\n\nKey Features:\nEarn points with every visit and redeem them for free sushi, drinks, and exclusive menu items. Simply scan our in-restaurant QR codes to collect points automatically. Access app-only discounts and special offers. Browse our full menu, including seasonal specials and Chef Yamasaki\'s signature dishes.\n\nLaunch Special Offer:\nDownload the app now and receive 100 welcome points - enough for a complimentary miso soup or green tea on your next visit! Plus, earn double points on all purchases during your first week.\n\nHow It Works:\nDownload the Hoshimo app from the App Store or Google Play, create your account, visit any Hoshimo location and scan the QR code, then start earning points and unlock delicious rewards.\n\nAvailable now for iOS and Android devices. Start your journey towards exclusive rewards today!'
                },

                newHeadChefJoins: {
                    heading: 'New Head Chef Joins',
                    perex: 'Renowned sushi master Chef Kuniro Yamasaki joins Hoshimo.',
                    text: 'After 15 years perfecting his craft in Tokyo\'s prestigious Tsukiji district, Chef Kuniro Yamasaki brings extraordinary passion for authentic Japanese cuisine to the UK. Born in Kyoto and trained under legendary sushi master Jiro Tanaka, Chef Yamasaki has worked in some of Japan\'s most celebrated restaurants.\n\nChef Yamasaki states: "I am delighted to bring the true spirit of Japanese sushi culture to British diners. At Hoshimo, we believe that every piece of sushi tells a story - from the carefully selected fish to the perfectly seasoned rice."\n\nChef Yamasaki specialises in traditional Edomae-style sushi and has introduced several signature dishes to our menu, including his famous Dragon Roll and seasonal sashimi selections. His philosophy centres on using only the finest ingredients, with fish flown in fresh from Tokyo\'s renowned Toyosu Market twice weekly.\n\nWe invite you to visit any of our Hoshimo locations to experience Chef Yamasaki\'s exceptional creations and witness the artistry of authentic Japanese cuisine firsthand.'
                },

                gloucesterOpening: {
                    heading: 'Gloucester Opening',
                    perex: 'Opening 1st August at Eastgate Shopping Centre, Gloucester.',
                    text: 'On Thursday, 1st August 2025, Hoshimo Running Sushi will officially open its doors at Eastgate Shopping Centre in Gloucester, bringing our signature running sushi experience to this historic cathedral city.\n\nLocation Details:\nAddress: Eastgate Street, Gloucester GL1 1PA\nOpening Hours: Monday-Sunday, 11:00 AM - 9:00 PM\n\nWhat to Expect:\nOur Gloucester location features a spectacular 40-metre conveyor belt showcasing over 100 varieties of fresh sushi, sashimi, and hot Japanese dishes. The restaurant boasts 80 seats with modern Japanese interior design, complete with traditional wooden elements.\n\nGrand Opening Celebrations:\nFree miso soup for the first 50 customers, 20% discount on all items for the opening weekend, live sushi demonstrations by our skilled chefs, and traditional sake tasting for guests 18+.\n\nLocal Sourcing Commitment:\nOur Gloucester restaurant will source fresh vegetables and herbs from local Gloucestershire suppliers, whilst maintaining our commitment to premium Japanese ingredients flown in fresh from Tokyo.\n\nWhether you\'re shopping at Eastgate Centre or exploring Gloucester\'s historic attractions, we invite you to experience authentic running sushi. We can\'t wait to welcome you!'
                },

                norwichOpening: {
                    heading: 'Norwich Opening',
                    perex: 'Opening 1st September at Castle Quarter, Norwich.',
                    text: 'Hoshimo Running Sushi will open its doors in Norwich on Sunday, 1st September 2025, located in the popular Castle Quarter shopping destination in the heart of the city.\n\nLocation Details:\nAddress: Castle Meadow, Norwich NR1 3DD\nOpening Hours: Monday-Sunday, 11:00 AM - 9:00 PM\n\nA Perfect Norwich Welcome:\nOur Norwich restaurant has been specially designed to reflect the city\'s unique character whilst maintaining authentic Japanese aesthetics. The 75-seat restaurant features locally-sourced Norfolk timber accents, complementing our signature conveyor belt system.\n\nGrand Opening Weekend (1st-3rd September):\nComplimentary edamame for all guests, 25% discount on premium sushi selections, traditional tea ceremony demonstrations, and children\'s sushi-making workshops on Saturday and Sunday at 2:00 PM.\n\nSupporting Local Norfolk:\nWe\'re proud to partner with Norfolk suppliers for our fresh produce, including vegetables from local farms and herbs from Norwich\'s community gardens. We\'ve hired 25 local team members and will support Norfolk charities.\n\nSpecial Norwich Menu Items:\nChef Yamasaki has created exclusive menu additions including Norfolk Coast Roll featuring locally-sourced crab, Cathedral City Special, and Canary Sunset in Norwich City FC colours.\n\nJoin us for an unforgettable opening weekend!'
                },

                wakefieldOpening: {
                    heading: 'Wakefield Opening',
                    perex: 'Opening 1st October at Trinity Walk Shopping Centre.',
                    text: 'Hoshimo Running Sushi will open its newest restaurant in Wakefield on Wednesday, 1st October 2025, located in the bustling Trinity Walk Shopping Centre.\n\nLocation Details:\nAddress: Marsh Way, Wakefield WF1 1QS\nOpening Hours: Monday-Sunday, 11:00 AM - 9:00 PM\n\nBringing Japan to West Yorkshire:\nOur Wakefield location represents our expansion into Yorkshire, bringing authentic Japanese flavours to this historic market town. The restaurant features 85 seats arranged around our signature 45-metre conveyor belt, with contemporary design that pays homage to both Japanese minimalism and Yorkshire\'s industrial heritage.\n\nGrand Opening Festivities (1st-7th October):\nFree gyoza for the first 100 customers, 30% discount on all premium sashimi, Yorkshire-Japan cultural showcase featuring local artists, and family sushi workshops every weekend afternoon.\n\nYorkshire Ingredients, Japanese Techniques:\nOur Wakefield restaurant will feature fresh produce from local farms, including vegetables from the Rhubarb Triangle and herbs from Yorkshire Dales suppliers, combined with premium ingredients imported directly from Japan.\n\nExclusive Wakefield Specials:\nWe\'re introducing Yorkshire Gold Roll featuring local smoked trout, Rhubarb Dessert Maki using famous Yorkshire rhubarb, and Cathedral City Salmon with Scottish salmon.\n\nVisit us from 1st October and discover authentic running sushi in Yorkshire!'
                }
            }
        },

        // Profile modal
        profile: {
            completeProfileTitle: 'Complete your profile',
            completeProfileSubtitle: 'To provide you with better services, please complete your details. You can do this later as well.',
            firstName: 'First name',
            surname: 'Surname',
            email: 'Email',
            firstNamePlaceholder: 'Your first name',
            surnamePlaceholder: 'Your surname',
            emailPlaceholder: 'your.email@example.com',
            emailHint: 'For notifications about new coupons and VIP offers',
            completeProfile: 'Complete profile',
            updating: 'Updating...',
            maybeLater: 'Maybe later',

            // Error messages
            userNotLoggedIn: 'User is not logged in',
            enterFirstName: 'Please enter your first name',
            enterValidEmail: 'Please enter a valid email address',
            profileUpdatedSuccessfully: 'Your profile has been successfully updated!',
            invalidData: 'Invalid data. Please check the entered information.',
            userNotFound: 'User not found. Please log in again.',
            serverError: 'Server error. Please try again later.',
            connectionProblem: 'Connection problem. Please check your internet connection.',
            updateFailed: 'Failed to update profile. Please try again.',
            unexpectedError: 'Unexpected error. Please try again.'
        },
        celebrations: {
            headerSubtitle: '✨ Transform your special moments into unforgettable memories! Celebrate birthdays, anniversaries, or bachelor/bachelorette parties with us and receive 2 bottles of premium Saké as a gift from us 🥂✨',
            types: {
                birthday: 'Birthday celebration',
                anniversary: 'Anniversary',
                bachelor: 'Bachelor/Bachelorette party'
            },
            form: {
                fullName: 'Full name *',
                fullNamePlaceholder: 'Enter your name',
                email: 'Email *',
                emailPlaceholder: 'Enter your email',
                phone: 'Phone *',
                phonePlaceholder: 'Enter your phone number',
                numberOfGuests: 'Number of guests *',
                numberOfGuestsPlaceholder: 'Enter number of guests',
                date: 'Date *',
                time: 'Time *',
                celebrationType: 'Celebration type *',
                note: 'Note (optional)',
                notePlaceholder: 'If you have any special requests or wishes, let us know',
                submitBooking: 'Submit booking',
                requiredFields: '* Required fields',
                noNote: 'No note'
            },
            success: {
                title: 'Booking sent',
                message: 'Thank you for your celebration booking. We will contact you soon for confirmation.\n\nCelebration type: {{celebrationType}}',
                ok: 'OK'
            },
            errors: {
                error: 'Error',
                fillAllFields: 'Please fill in all required fields',
                emailRequired: 'Email is required',
                sendingError: 'Sending error',
                sendingErrorMessage: 'We apologise, but we were unable to send your booking. Please try again later or contact us directly by phone.'
            },
            promotionText: '💝 With reservation you are getting 2x bottle of premium Saké 💝'
        },

        myprofile: {
            loginRequired: 'Login required',
            loginMessage: 'To view your profile, you must sign in with your Apple account',
            back: 'Back',
            signIn: 'Sign in',
            loadingProfile: 'Loading profile...',

            levels: {
                bronze: 'Bronze',
                silver: 'Silver',
                gold: 'Gold',
                bronzeDescription: 'Ability to earn and redeem vouchers',
                silverDescription: 'Access to exclusive offers',
                goldDescription: '10% lifetime discount on all orders'
            },

            summary: {
                visits: 'Visits',
                runningSushi: 'Running Sushi',
                coupons: 'Coupons'
            },

            loyaltyProgram: 'Loyalty programme',
            level: 'Level',
            visitsCount: '{{count}} visits',
            nextLevelIn: 'Next level in: {{visits}} visits',
            nextLevelBrings: 'Your next level will bring you:',
            congratulations: 'Congratulations! You\'ve reached the highest level!',
            enjoyDiscount: 'Enjoy your 10% lifetime discount on all orders.',

            yourVisits: 'Your visits',
            confirmVisit: 'Confirm visit',
            myCoupons: 'My coupons',

            exclusiveOffers: 'Exclusive offers',
            specialOffersTitle: 'Special offers just for you',
            specialOffersSubtitle: 'Thanks to your {{level}} status, you have access to these offers',
            tenPercentDiscount: '10% DISCOUNT',
            viewOffers: 'View offers',

            lockedContent: 'Locked content',
            lockedDescription: 'Reach SILVER level (10+ visits) to unlock exclusive offers.',
            progressVisits: '{{current}}/{{total}} visits',

            yourMembership: 'Your membership',
            memberSince: 'Member since',
            daysWithUs: 'Days with us',
            email: 'Email',

            signOut: 'Sign out',
            deletingAccount: 'Deleting account...',

            logout: {
                title: 'Sign out',
                message: 'Are you sure you want to sign out?',
                cancel: 'Cancel',
                signOut: 'Sign out',
                success: 'Signed out successfully',
                successMessage: 'Thank you for visiting. We look forward to seeing you!',
                error: 'Sign out error',
                errorMessage: 'Please try again.'
            },

            deleteAccount: {
                title: 'Delete account',
                message: 'Are you sure you want to permanently delete your account?\n\nThis action is irreversible and will delete:\n• All your visits\n• All your coupons\n• Visit history\n• All personal data',
                cancel: 'Cancel',
                delete: 'Delete account',
                finalTitle: 'Final confirmation',
                finalMessage: 'This is your last chance. Are you absolutely sure you want to permanently delete your account?',
                keepAccount: 'No, keep account',
                yesDelete: 'Yes, delete',
                buttonText: 'Delete account',

                errorTitle: 'Error',
                userNotFound: 'Failed to identify user',
                successTitle: 'Account deleted',
                successMessage: 'Your account has been successfully deleted. Thank you for your trust.',
                defaultError: 'Failed to delete account. Please try again.',
                accountNotFound: 'User account not found.',
                connectionError: 'Connection error. Please check your internet connection.'
            }
        },

        reservation: {
            headerSubtitle: '🍱 Ready for fresh sushi? Reserve your table and let the delicious journey begin!',
            form: {
                firstName: 'First name',
                firstNamePlaceholder: 'Your first name',
                surname: 'Surname',
                surnamePlaceholder: 'Your surname',
                phoneNumber: 'Phone number',
                phoneNumberPlaceholder: 'Phone number',
                date: 'Date',
                time: 'Time',
                numberOfGuests: 'Number of guests',
                numberOfGuestsPlaceholder: 'Number of guests',
                note: 'Note (optional)',
                notePlaceholder: 'Do you have any special wishes or requirements?',
                reserveTable: 'Reserve table',
                noNote: 'No note'
            },
            validation: {
                firstNameRequired: 'First name is required',
                surnameRequired: 'Surname is required',
                phoneRequired: 'Phone number is required',
                phoneInvalid: 'Enter a valid phone number (9 digits)',
                guestsRequired: 'Number of guests is required',
                guestsInvalid: 'Enter a valid number of guests'
            },
            success: {
                title: 'Reservation sent',
                message: 'Your reservation has been successfully sent. We will contact you soon for confirmation.',
                ok: 'OK'
            },
            error: {
                title: 'Error',
                message: 'Failed to send reservation. Please try again.'
            },
            disclaimer: 'After submitting the form, you will receive a reservation confirmation via SMS.'
        },

        vip: {
            loginRequired: 'Login required',
            loginMessage: 'You must sign in with your Apple account to use coupons and related features',
            back: 'Back',
            signIn: 'Sign in',

            loadingOffers: 'Loading exclusive offers...',
            unlimitedValidity: 'Unlimited validity',

            // Bronze level
            bronze: {
                description: 'This content is available only for users with SILVER and GOLD levels.',
                info: 'Reach 10 or more visits to unlock exclusive offers.',
                progress: 'Your progress: {{current}}/{{total}} visits',
                getMoreVisits: 'How to get more visits?'
            },

            // Silver level
            silver: {
                headerSubtitle: 'Thank you for your loyalty! Here are your exclusive benefits.',
                welcomeTitle: 'Welcome amongst VIP members!',
                welcomeText: 'You have reached SILVER level! As a thank you for your loyalty we offer you special benefits that you can use with every visit to our restaurant.',
                upgradeText: 'Reach GOLD level (20+ visits) and get additional exclusive benefits!',
                howToGetMore: 'How to get more benefits',
                usageInstructions: 'To use an offer simply show the QR code from your selected offer to the staff during your visit.',
                upgradeInfo: 'Reach 20 or more visits to get GOLD level and access to all exclusive offers including 10% discount on all orders.',
                progressTitle: 'Your progress to GOLD level'
            },

            // Gold level
            gold: {
                headerSubtitle: 'Thank you for your loyalty! Enjoy all VIP benefits.',
                welcomeTitle: 'Welcome amongst elite members!',
                welcomeText: 'As a GOLD member you have access to all exclusive offers including 10% discount on all orders. Below you will find all your VIP benefits that you can use with every visit.',
                howToUse: 'How to use your benefits',
                usageInstructions: 'Simply show the QR code from your selected offer to the staff during your next visit. As a GOLD member we will automatically provide you with 10% discount on your bill.'
            },

            goldMember: 'GOLD MEMBER',
            goldBadge: 'GOLD',
            goldMembersOnly: 'Available only for GOLD members',

            yourExclusiveOffers: 'Your exclusive offers',
            noOffers: 'No exclusive offers are currently available.',
            validUntil: 'Valid until',
            progressToGold: '{{current}}/{{total}} visits',

            // Modal
            qrCodeTitle: 'QR code for redemption',
            qrCodeHelp: 'Show this QR code to the staff',
            close: 'Close'
        },

        visits: {
            loginRequired: 'Login required',
            loginMessage: 'You must sign in with your Apple account to use coupons and related features',
            back: 'Back',
            signIn: 'Sign in',

            howToCollect: 'How to collect visits?',
            howToCollectDescription: 'It\'s simple, just scan the QR code on the table or receipt every time you visit us.',

            steps: {
                step1: 'Find the QR code on your table in the restaurant',
                step2: 'Scan the QR code using the button below',
                step3: 'Allow the app access to your location',
                step4: 'The app will record your visit and unlock further benefits for you'
            },

            scanQRCode: 'Scan QR code',
            disclaimer: 'You can collect visits once per day in each of our restaurants.',

            // Permissions and dialogs
            notice: 'Notice',
            mustSignInFirst: 'You must sign in first to collect tokens.',
            waitingForPermission: 'Waiting for camera permission',
            pleaseWait: 'Please wait...',
            cameraAccessDenied: 'Camera access not permitted',
            cameraAccessRequired: 'Camera access is required to collect tokens. You can change this in settings.',
            openSettings: 'Open settings',
            cancel: 'Cancel',
            locationAccessDenied: 'Location access not permitted',
            locationAccessRequired: 'Unfortunately, without location permission we cannot verify your visit to the restaurant.',
            error: 'Error',
            qrCodeError: 'An error occurred whilst processing the QR code.',

            // Camera view
            verifyingLocation: 'Verifying your location...',
            pointCamera: 'Point the camera at the QR code on the table',

            // Success modal
            success: {
                congratulations: 'Congratulations!',
                visitRecorded: 'We\'ve just recorded your visit.',
                currentVisits: 'Current number of visits: {{count}}',
                moreVisitsInfo: 'The more visits you have, the better coupons you get access to. We look forward to your next visit!',
                greatThanks: 'Great, thanks!'
            }
        },

        restaurantMenuCommon: {
            loadingMenu: 'Loading menu...',
            infoText: 'Enjoy all you can eat with all dishes bellow',
            prepTime: 'Prep time:',
            popularity: 'Popularity:',
            thankYouRating: 'Thank you for your rating!',
            allergens: 'Allergens:',
            backToMenu: 'Back to menu'
        },

        restaurantMenu: {
            categories: {
                allYouCanEat: 'All You Can Eat',
                sushi: 'Sushi',
                maki: 'Maki',
                hotDishes: 'Hot Dishes',
                drinks: 'Drinks',
                desserts: 'Desserts'
            },

            items: {
                // All You Can Eat
                adultAllYouCanEat: {
                    name: 'Adult All You Can Eat',
                    perex: 'Unlimited access to our complete running sushi experience',
                    description: 'Enjoy unlimited access to our entire running sushi belt featuring fresh sushi, maki, hot dishes and desserts. Our chefs continuously prepare new items throughout your dining experience. Drinks are ordered separately.'
                },
                childAllYouCanEat: {
                    name: 'Child All You Can Eat',
                    perex: 'Unlimited running sushi for children under 15',
                    description: 'Children under 15 years enjoy the same unlimited access to our complete running sushi experience at a reduced price. Perfect introduction to authentic Japanese cuisine for young diners.'
                },

                // Sushi
                eelNigiri: {
                    name: 'Eel Nigiri',
                    perex: 'Glazed freshwater eel with sweet sauce'
                },
                mackerelNigiri: {
                    name: 'Mackerel Nigiri',
                    perex: 'Cured mackerel with traditional vinegar preparation'
                },
                octopusNigiri: {
                    name: 'Octopus Nigiri',
                    perex: 'Tender octopus with delicate preparation'
                },
                prawnNigiri: {
                    name: 'Prawn Nigiri',
                    perex: 'Sweet cooked prawns with traditional preparation'
                },
                salmonNigiri: {
                    name: 'Salmon Nigiri',
                    perex: 'Norwegian salmon on seasoned sushi rice',
                    description: 'Hand-pressed nigiri featuring fresh Norwegian salmon atop perfectly seasoned sushi rice. A classic combination that showcases the buttery texture of premium salmon.'
                },
                seaBassNigiri: {
                    name: 'Sea Bass Nigiri',
                    perex: 'Fresh sea bass with light seasoning'
                },
                tunaSashimi: {
                    name: 'Tuna Sashimi',
                    perex: 'Premium bluefin tuna, expertly sliced',
                    description: 'Fresh bluefin tuna sourced from Tokyo fish markets, served as traditional sashimi. Our skilled chefs prepare each piece to highlight the natural flavours and texture of this premium fish.'
                },
                yellowtailSashimi: {
                    name: 'Yellowtail Sashimi',
                    perex: 'Delicate yellowtail with citrus notes'
                },

                // Maki
                californiaRoll: {
                    name: 'California Roll',
                    perex: 'Classic roll with crab, avocado and cucumber',
                    description: 'The timeless California roll featuring fresh crab meat, creamy avocado, and crisp cucumber wrapped in seasoned sushi rice and nori. A perfect introduction to maki for newcomers.'
                },
                dragonRoll: {
                    name: 'Dragon Roll',
                    perex: 'Chef Yamasaki signature creation with eel and avocado',
                    description: 'Our head chef signature roll featuring grilled eel, cucumber and avocado, topped with sliced avocado arranged to resemble dragon scales. Finished with sweet eel sauce and sesame seeds.'
                },
                philadelphiaRoll: {
                    name: 'Philadelphia Roll',
                    perex: 'Smoked salmon with cream cheese and cucumber'
                },
                rainbowRoll: {
                    name: 'Rainbow Roll',
                    perex: 'Colourful roll topped with assorted sashimi'
                },
                salmonAvocadoRoll: {
                    name: 'Salmon Avocado Roll',
                    perex: 'Fresh salmon with creamy avocado'
                },
                spicyTunaRoll: {
                    name: 'Spicy Tuna Roll',
                    perex: 'Fresh tuna with spicy mayo and crisp vegetables'
                },
                tempuraPrawnRoll: {
                    name: 'Tempura Prawn Roll',
                    perex: 'Crispy tempura prawn with vegetables and sauce'
                },
                vegetableRoll: {
                    name: 'Vegetable Roll',
                    perex: 'Fresh vegetables with avocado and cucumber'
                },

                // Hot Dishes
                beefYakitori: {
                    name: 'Beef Yakitori',
                    perex: 'Grilled beef skewers with tare sauce'
                },
                chickenKatsuCurry: {
                    name: 'Chicken Katsu Curry',
                    perex: 'Crispy breaded chicken with Japanese curry sauce'
                },
                chickenTeriyaki: {
                    name: 'Chicken Teriyaki',
                    perex: 'Grilled chicken glazed with traditional teriyaki sauce',
                    description: 'Tender grilled chicken thigh glazed with our house-made teriyaki sauce, served with steamed rice and seasonal vegetables. The sauce is prepared using traditional Japanese methods with soy sauce, mirin, and sake.'
                },
                gyozaDumplings: {
                    name: 'Gyoza Dumplings',
                    perex: 'Pan-fried pork and vegetable dumplings',
                    description: 'Handmade dumplings filled with seasoned pork mince, cabbage, and chives. Pan-fried until golden and served with soy-vinegar dipping sauce. Each dumpling is carefully pleated by our skilled chefs.'
                },
                misoGlazedCod: {
                    name: 'Miso Glazed Cod',
                    perex: 'Delicate cod fillet with sweet miso glaze'
                },
                salmonTeriyaki: {
                    name: 'Salmon Teriyaki',
                    perex: 'Grilled salmon with teriyaki glaze and vegetables'
                },
                tempuraSelection: {
                    name: 'Tempura Selection',
                    perex: 'Assorted vegetables and prawns in light crispy batter'
                },
                vegetableStirFry: {
                    name: 'Vegetable Stir Fry',
                    perex: 'Seasonal vegetables wok-fried with garlic and ginger'
                },

                // Drinks
                asahiSuperDry: {
                    name: 'Asahi Super Dry',
                    perex: 'Crisp Japanese lager beer'
                },
                hotSake: {
                    name: 'Hot Sake',
                    perex: 'Warmed sake in traditional tokkuri'
                },
                icedGreenTea: {
                    name: 'Iced Green Tea',
                    perex: 'Refreshing cold-brewed sencha'
                },
                japaneseGreenTea: {
                    name: 'Japanese Green Tea',
                    perex: 'Traditional sencha green tea'
                },
                japaneseWhisky: {
                    name: 'Japanese Whisky',
                    perex: 'Premium Suntory Toki whisky'
                },
                premiumSakeSelection: {
                    name: 'Premium Sake Selection',
                    perex: 'Junmai sake served warm or chilled'
                },
                ramuneSoda: {
                    name: 'Ramune Soda',
                    perex: 'Traditional Japanese marble soda'
                },
                sparklingWater: {
                    name: 'Sparkling Water',
                    perex: 'Japanese mineral water with natural bubbles'
                },

                // Desserts
                dorayakiPancakes: {
                    name: 'Dorayaki Pancakes',
                    perex: 'Fluffy pancakes filled with sweet red bean paste'
                },
                matchaCheesecake: {
                    name: 'Matcha Cheesecake',
                    perex: 'Creamy cheesecake infused with premium matcha'
                },
                mixedFruitMochi: {
                    name: 'Mixed Fruit Mochi',
                    perex: 'Assorted fruit-flavoured mochi selection'
                },
                mochiIceCream: {
                    name: 'Mochi Ice Cream',
                    perex: 'Traditional rice cake filled with premium ice cream'
                },
                taiyakiFishCake: {
                    name: 'Taiyaki Fish Cake',
                    perex: 'Fish-shaped pastry filled with sweet custard'
                }
            }
        },



        // Common
        common: {
            ok: 'OK',
            success: 'Success',
            error: 'Error'
        }
    }
};