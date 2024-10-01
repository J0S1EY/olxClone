import React, { createContext, useContext, useState } from "react";

export const postContext = createContext(null)

export default function Posts({ children }) {
    const [postData, setPostData] = useState([])
    return (
        <postContext.Provider value={{ postData, setPostData }}>
            {children}
        </postContext.Provider>
    )
}
 