import { User, NewsArticle, Voucher } from "../models/interfaces";

export default class FeClass {

    constructor() {
        console.log('🍣 Hoshimo FeClass initialized');
    }

    // ✅ Změna URL z pizzalab na hoshimosushi
    ApiUrl = "https://gastroapp-backend.onrender.com/api/hoshimosushi";

    /**
     * Registrace/login uživatele přes OAuth (Apple/Google)
     * @param user Objekt uživatele k registraci
     * @returns Registrovaný uživatel nebo error
     */
    async registerUser(user: User) {
        try {
            const response = await fetch(`${this.ApiUrl}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });

            // Získání a parsování response v jednom kroku
            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(`Connected to Server, but received status ${response.status}`);
            }

            // Pokus parsovat text jako JSON
            try {
                return JSON.parse(responseText);
            } catch (e) {
                console.error("Nelze parsovat odpověď jako JSON:", e);
                throw new Error("Invalid JSON response from server");
            }
        } catch (error) {
            if (error instanceof TypeError) {
                console.error(`Unable to connect server with this status ${error.message}`);
            } else {
                console.error(`Failed to connect server with this error: ${error}`);
            }
            throw error; // Propagujeme chybu dál
        }
    }

    /**
     * Získá aktuální data uživatele z backendu
     * @param userId ID uživatele
     * @returns Aktualizovaný uživatelský objekt nebo null v případě chyby
     */
    async getUserById(userId: string): Promise<User | null> {
        try {
            const response = await fetch(`${this.ApiUrl}/users/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Chyba při načítání uživatele: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Chyba při získávání uživatele z backendu:', error);
            return null;
        }
    }

    /**
     * Použije voucher uživatele
     * @param userId ID uživatele
     * @param userVoucherId ID user voucheru k použití
     * @returns Aktualizovaný uživatel nebo null
     */
    async useVoucher(userId: string, userVoucherId: string): Promise<User | null> {
        try {
            const response = await fetch(`${this.ApiUrl}/users/${userId}/use-voucher/${userVoucherId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Chyba při použití voucheru: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Chyba při použití voucheru:', error);
            return null;
        }
    }

    /**
     * ✅ ZMĚNA: Aktualizuje loyalty points uživatele (místo tokens)
     * @param userId ID uživatele
     * @param loyaltyPointsChange Změna v loyalty points (může být záporná)
     * @returns Aktualizovaný uživatel nebo error objekt
     */
    async updateUserLoyaltyPoints(userId: string, loyaltyPointsChange: number) {
        try {
            // 1. Pokus o komunikaci se serverem
            const response = await fetch(`${this.ApiUrl}/users/${userId}/tokens`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tokenChange: loyaltyPointsChange }) // ✅ Backend očekává tokenChange
            });

            // 2. Spojení proběhlo, ale response není OK zjišťujeme problém
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    return {
                        error: "Chyba v požadavku",
                        code: response.status
                    };
                } else {
                    // spojení proběhlo, ale server selhal při jeho zpracování(500, 502, 503)
                    return {
                        error: "Chyba serveru",
                        code: response.status
                    };
                }
            }
            // úspěch 200-299 response
            return await response.json();
        }
            // síťové chyby, nespojili jsme se serverem, nedostupnost, cors, chyba dns, syntaktická chyba v url
        catch (error) {
            return {
                error: "Síťová chyba",
                code: 0
            };
        }
    }

    /**
     * Získá novinky z backendu
     * @returns Pole článků nebo error objekt
     */
    async getNews(): Promise<NewsArticle[] | any> {
        try {
            const response = await fetch(`${this.ApiUrl}/news`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    return {
                        error: "Chyba v požadavku",
                        code: response.status
                    };
                } else {
                    // spojení proběhlo, ale server selhal při jeho zpracování(500, 502, 503)
                    return {
                        error: "Chyba serveru",
                        code: response.status
                    };
                }
            }

            const newsArticles: NewsArticle[] = await response.json();
            return newsArticles;
        }
        catch (error) {
            return {
                error: "Síťová chyba",
                code: 0
            };
        }
    }

    /**
     * Získá menu z backendu
     * @returns Menu items nebo error objekt
     */
    async getMenu() {
        try {
            const response = await fetch(`${this.ApiUrl}/menu`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    return {
                        error: "Chyba v požadavku",
                        code: response.status
                    };
                } else {
                    return {
                        error: "Po spojení se serverem -> chyba serveru",
                        code: response.status
                    };
                }
            }

            return await response.json();
        }
        catch (error) {
            return {
                error: "Nespojili jsme se serverem -> síťová chyba",
                code: error
            };
        }
    }

    /**
     * ✅ HLAVNÍ FUNKCE: Metoda pro validaci QR kódu, ověření polohy a získání loyalty points
     * @param userId ID uživatele
     * @param qrCode Naskenovaný QR kód
     * @param latitude Zeměpisná šířka uživatele
     * @param longitude Zeměpisná délka uživatele
     * @returns Aktualizovaný objekt uživatele nebo objekt s informací o chybě
     */
    async validateQRCodeAndGetTokens(userId: string, qrCode: string, latitude: number, longitude: number) {
        try {
            // Vytvoříme data pro odeslání na backend
            const requestData = {
                userId,
                qrCode: qrCode,
                latitude: latitude,
                longitude: longitude
            };

            // Pošleme požadavek na backend
            const response = await fetch(`${this.ApiUrl}/validate-qr-and-add-tokens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            // Zpracování odpovědi podle HTTP kódu
            if (!response.ok) {
                if (response.status >= 400 && response.status < 500) {
                    // Klientská chyba - získáme detailní zprávu z odpovědi
                    const errorData = await response.json();
                    return {
                        error: errorData.error || "Chyba v požadavku",
                        code: response.status
                    };
                } else {
                    // Serverová chyba
                    return {
                        error: "Chyba serveru",
                        code: response.status
                    };
                }
            }

            // Úspěšná odpověď - aktualizovaná data uživatele
            const updatedUser: User = await response.json();

            // Rovnou vracíme aktualizovaného uživatele, aniž bychom ho ukládali do lokálního úložiště
            return updatedUser;
        } catch (error) {
            // Síťové chyby - nespojili jsme se serverem
            console.error("Síťová chyba při komunikaci se serverem:", error);
            return {
                error: "Síťová chyba",
                code: 0
            };
        }
    }

    /**
     * Aktualizuje profil uživatele
     * @param userId ID uživatele
     * @param profileData Objekt obsahující data k aktualizaci
     * @returns Aktualizovaný objekt uživatele nebo null v případě chyby
     */
    async updateUserProfile(userId: string, profileData: { firstName?: string; name?: string; email?: string }) {
        try {
            const response = await fetch(`${this.ApiUrl}/users/${userId}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Chyba při aktualizaci profilu: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Chyba při aktualizaci profilu uživatele:', error);
            throw error;
        }
    }

    /**
     * ✅ NOVÁ FUNKCE: Získá VIP vouchery pro exkluzivní nabídky
     * @returns Pole VIP voucherů nebo null v případě chyby
     */
    async getVipVouchers(): Promise<Voucher[] | null> {
        try {
            const response = await fetch(`${this.ApiUrl}/vip-vouchers`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Chyba při načítání VIP voucherů: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Chyba při získávání VIP voucherů:', error);
            return null;
        }
    }

    /**
     * Smaže uživatelský účet
     * @param userId ID uživatele k smazání
     * @returns true pokud úspěšné, jinak vyhodí error
     */
    async deleteUserAccount(userId: string): Promise<boolean> {
        try {
            console.log(`Volám API pro smazání účtu uživatele: ${userId}`);

            const response = await fetch(`${this.ApiUrl}/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Parsování odpovědi
            const data = await response.json();

            if (!response.ok) {
                // Server vrátil chybu
                console.error('Chyba při mazání účtu:', data);
                throw new Error(data.error || `HTTP ${response.status}: Chyba při mazání účtu`);
            }

            // Úspěšná odpověď
            console.log('Účet úspěšně smazán:', data);
            return data.success === true;

        } catch (error) {
            console.error('Chyba v deleteUserAccount:', error);

            if (error instanceof Error) {
                throw error; // Předáme původní chybu
            } else {
                throw new Error('Neočekávaná chyba při mazání účtu');
            }
        }
    };

    async getBranches() {
        try {
            const response = await fetch(`${this.ApiUrl}/branches`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`Chyba při načítáníbranches: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Chyba při získávání branches:', error);
            return null;
        }
    };
}

// ✅ Singleton instance - stejný název jako v Pizza Gapa
export const frontendClass = new FeClass();