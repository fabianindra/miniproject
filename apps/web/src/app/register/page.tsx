import RegisterForm from "@/components/RegisterForm";
import React from "react";
import Image from "next/image";

export default function DashboardPage() {
    return (
        <main>
        <Image src={"/concert.jpeg"} alt='' width={1080} height={200} style={{ zIndex: 0, objectFit: 'cover' }} />
                <h1 style={{position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1}}>
                    Registration Form
                </h1>
        <div style={{marginTop: '30px'}}>
        <RegisterForm />
        </div>
        </main>
    )
}