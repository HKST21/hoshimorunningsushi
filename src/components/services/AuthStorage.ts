import * as SecureStore from 'expo-secure-store';
import {User} from "../models/interfaces";

const USER_KEY = 'loggedInUser';

// tato funkce uloží uživatele do zabezpečeného úložiště
export const addUserToStore = async (user: User) => {
    try {
        // VYLEPŠENÍ: Kontrola, že user má ID před uložením
        if (!user || !user.id) {
            console.error('Pokus o uložení neplatného uživatele');
            return false;
        }

        const jsonUser = JSON.stringify(user);
        await SecureStore.setItemAsync(USER_KEY, jsonUser);

        return true;
    }
    catch (error) {
        console.error('failed to store user' + error);
        return false;
    }
}

export const loadUserFromStore = async () => {
    try {
        const jsonUser = await SecureStore.getItemAsync(USER_KEY);
        if (!jsonUser) {
            return null;
        }

        // VYLEPŠENÍ: Kontrola, že načtený uživatel má ID
        const user = JSON.parse(jsonUser);

        // Kontrola platnosti načtených dat
        if (!user || !user.id) {

            // Smazat neplatná data
            await SecureStore.deleteItemAsync(USER_KEY);
            return null;
        }

        return user;
    }
    catch (error) {
        console.error('failed to load user' + error);
        // VYLEPŠENÍ: Vyčistit úložiště při chybě
        try {
            await SecureStore.deleteItemAsync(USER_KEY);
        } catch (e) {
            // Ignorovat chybu při mazání
        }
        return null;
    }
}