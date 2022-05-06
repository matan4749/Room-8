import React, { createContext } from 'react';
export const AppContext = createContext({
    showMenu: false,
    toggleMenu:()=>{}
});
