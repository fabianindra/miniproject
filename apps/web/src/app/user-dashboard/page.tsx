"use client"

import React, { useEffect, useState } from "react";
import { verifyTokenClient } from "../verifyToken";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from 'axios';

const DashboardPage: React.FC = () => {
    const [verified, setVerified] = useState(false);
    const [points, setPoints] = useState<Event[]>([]);
    const [columnCount, setColumnCount] = useState<number | null>(null); // Initialize columnCount state to null
    const [refCode, setRefCode] = useState('')
    
    const id = Cookies.get('id')

    useEffect(() => {
        const verifyAndSet = async () => {
            try {
                const token = Cookies.get("token");
                const isValidToken = await verifyTokenClient();
                setVerified(isValidToken)

                //check verified
                console.log(isValidToken)

            } catch (error) {
                console.error("Error verifying token:", error);
            }
        };
        verifyAndSet();
    }, []);

        useEffect(() => {
            const fetchPoints = async () => {
                try {
                    const response = await axios.get(`http://localhost:6570/api/points/${id}`);
                    setPoints(response.data.rows);
                    // Check if response.data.columnCount is null or undefined
                    // If yes, set columnCount to 0, otherwise, set it to the value returned from the backend
                    setColumnCount(response.data.columnCount !== null && response.data.columnCount !== undefined ? response.data.columnCount : 0);

                    //check response
                    console.log(response.data.rows)
                    console.log(response.data.columnCount)
                } catch (error) {
                    console.error('Error fetching points:', error);
                }
            };
            fetchPoints();
        }, [id]); // Include id in the dependency array to trigger useEffect when id changes
    
        useEffect(() => {
            const fetchRefCode = async () => {
                try {
                    const response = await axios.get(`http://localhost:6570/api/users/${id}`);
                    setRefCode(response.data.data)

                    //check response
                    console.log(response.data.data)
                } catch (error) {
                    console.error('Error fetching code:', error)
                }
            };
            fetchRefCode();
        }, [id]);
        
        if (!verified) {
            return (
                <div>
                    <p>You are not authorized. Please log in to access this page.</p>
                    <Link href="/">Go to Home Page</Link>
                </div>
            );
        } else { 
            return (
            <div>
                <br />
                <h1>USER DASHBOARD</h1>
                <br />
                {/* Display columnCount. If columnCount is null or undefined, display 0 */}
                <p>Referral Code: {refCode}</p>
                <p>Member Points in Rupiah: {columnCount !== null ? columnCount : 0}</p>
            </div>
            );
        }}

export default DashboardPage;
