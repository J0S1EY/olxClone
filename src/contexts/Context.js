import { createContext, useState } from 'react';
import { fireBase,auth,storage } from '../fireBase/config'; // Import your initialized Firebase instance

export const FireBaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function Context({ children }) {
    const [user, setUser] = useState(null);

    return (
        <FireBaseContext.Provider value={{fireBase,auth,storage}}>
            <AuthContext.Provider value={{ user, setUser }}>
                {children}
            </AuthContext.Provider>
        </FireBaseContext.Provider>
    );
}
