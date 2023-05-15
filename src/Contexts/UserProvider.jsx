import React, { useState } from 'react';
import UserContext from './UserContext';

const UserProvider = (props) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;