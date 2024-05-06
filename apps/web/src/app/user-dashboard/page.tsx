"use client"

import React, { useEffect, useState } from "react";
import { verifyTokenClient } from "../verifyToken";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from 'axios';

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

        const [points, setPoints] = useState<Event[]>([]);
        const [columnCount, setColumnCount] = useState<number | null>(null); // Initialize columnCount state to null
    
        const id = Cookies.get('id');
    
        useEffect(() => {
            const fetchPoints = async () => {
                try {
                    const response = await axios.get(`http://localhost:6570/api/points?id=${id}`);
                    setPoints(response.data.rows);
                    // Check if response.data.columnCount is null or undefined
                    // If yes, set columnCount to 0, otherwise, set it to the value returned from the backend
                    setColumnCount(response.data.columnCount !== null && response.data.columnCount !== undefined ? response.data.columnCount : 0);
                } catch (error) {
                    console.error('Error fetching points:', error);
                }
            };
            fetchPoints();
        }, [id]); // Include id in the dependency array to trigger useEffect when id changes
    
        return (
            <div>
                <br />
                <h1>USER DASHBOARD</h1>
                <br />
                {/* Display columnCount. If columnCount is null or undefined, display 0 */}
                <p>Member Points in Rupiah: {columnCount !== null ? columnCount : 0}</p>
            </div>
        );
    };

export default DashboardPage;
