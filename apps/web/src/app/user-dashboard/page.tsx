"use client"

import React, { useEffect, useState } from "react";
import { verifyTokenClient } from "../verifyToken";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from 'axios';
import Image from "next/image";

const DashboardPage: React.FC = () => {
    const [verified, setVerified] = useState(false);
    const [point, setPoint] = useState<number | null>(null);
    const [rupiah, setRupiah] = useState<number | null>(null);
    const [refCode, setRefCode] = useState('')
    const [rupiahAdd, setRupiahAdd] = useState<number>(0);
    
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
            const fetchPoint = async () => {
                try {
                    const response = await axios.get(`http://localhost:6570/api/points/${id}`);
                    setPoint(response.data.totalAmount);
                    setRupiah(response.data.totalRupiah);

                    //check response
                    console.log(response.data.totalAmount)
                    console.log(response.data.totalRupiah)
                } catch (error) {
                    console.error('Error fetching point:', error);
                }
            };
            fetchPoint();
        }, [id]);
    
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

        const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
    
            try {
                const response = await axios.post('http://localhost:6570/api/points/submit_rupiah', { id, rupiahAdd });

                console.log('Rupiah sent', rupiahAdd);

                window.location.reload()

            } catch (error) {
                console.error('Error submitting Rupiah amount:', error);
            }
        };

        
        if (!verified) {
            return (
                <div>
                    <p>You are not authorized. Please log in to access this page.</p>
                    <Link href="/">Go to Home Page</Link>
                </div>
            );
        } else { 
            return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Image src={"/abstract3.jpg"} alt='' width={1080} height={200} style={{ zIndex: 0, objectFit: 'cover' }} />
                <h1 style={{position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1}}>
                    Participant Dashboard
                </h1>

                <div style={{ background: 'white', width: '25%' }}>
                <p style={{ color: 'black' }}>Referral Code: </p>
                </div>
                <h1>{refCode}</h1>
                <div style={{ background: 'white', width: '25%' }}>
                <p style={{ color: 'black' }}>Member Point: </p>
                </div>
                <h1>{point !== null ? point : 0}</h1>
                <div style={{ background: 'white', width: '25%' }}>
                <p style={{ color: 'black' }}>IDR </p>
                </div>
                <h1>{rupiah !== null ? rupiah : 0}</h1>

                 {/* Form for entering Rupiah amount */}
                 <form onSubmit={handleSubmit}>
                    <div style={{ background: 'blue', width: '25%' }}>
                        <p style={{ color: 'black' }}>Enter Rupiah Amount:</p>
                        <input
                            type="number"
                            value={rupiahAdd}
                            onChange={(e) => setRupiahAdd(Number(e.target.value))}
                            min={0}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
            );
        }}

export default DashboardPage;
