"use client"

import React, { useEffect, useState } from "react";
import { verifyTokenClient } from "../verifyToken";
import Link from "next/link";
import Cookies from "js-cookie";


const DashboardPage: React.FC = () => {
    // const [verified, setVerified] = useState(false);

    // useEffect(() => {
    //     const verifyAndSet = async () => {
    //         try {
    //             const token = Cookies.get("token");
    //             const isValidToken = await verifyTokenClient(token);
    //             setVerified(isValidToken)
    //         } catch (error) {
    //             console.error("Error verifying token:", error);
    //         }
    //     };
    //     verifyAndSet();
    // }, []);

    // if (!verified) {
    //     return (
    //         <div>
    //             <p>You are not authorized. Please log in to access this page.</p>
    //             <Link href="/">Go to Home Page</Link>
    //         </div>
    //     );
    // }

    return <div>user dashboard</div>;
};

export default DashboardPage;
