import {createContext} from 'react';

const chatContext = createContext();

const chatProvider = ({children})=>{
    return <chatContext.Provider>
         {children}
    </chatContext.Provider>
}

export default chatProvider;