// import React, { useEffect, useState } from 'react'

// import { Firebase } from '../firebase'

// import CircularProgress from '@material-ui/core/CircularProgress';


// export const AuthContext = React.createContext();

// export const AuthProvider = ({ children }) => {
//     const [personState, setPersonstate] = useState({
//         person: null,
//         loading: true,
//     });

//     const { person, loading } = personState;


//     useEffect(() => {
//         Firebase
//             .auth()
//             .onAuthStateChanged((user) => {
//                 console.log(user)
//                 setPersonstate({ person: user, loading: false });
//                 console.log("userstatechanged")
//             })

//     }, [])

//     // if (loading) {
//     //     return (
//     //         <div style={{ marginTop: "27%", marginLeft: "50%"}}>
//     //             <CircularProgress />
//     //         </div>
//     //     )
//     // }


//     return (
//         <AuthContext.Provider
//             value={{
//                 person
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     )

// }





import React, { useEffect, useState } from 'react';

// Package Imports
import { Firebase } from '../firebase'

// Material-UI Imports
import CircularProgress from '@material-ui/core/CircularProgress';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [adminState, setAdminState] = useState({
        admin: null,
        loading: true,
    });

    const { admin, loading } = adminState;



    useEffect(() => {
        Firebase.auth().onAuthStateChanged((user) => {
            console.log(user)
            setAdminState({ admin: user, loading: false });
        });
    }, []);

    if (loading) {
        return (
            <div style={{ marginTop: "27%", marginLeft: "50%" }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <AuthContext.Provider
            value={{
                admin,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};