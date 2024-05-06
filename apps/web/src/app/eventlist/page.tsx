import EventList from "@/components/EventList";
import React from "react";
import Image from "next/image";

export default function DashboardPage() {
    return (
        <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '1600px', overflow: 'hidden' }}>
                <Image src={"/abstract.jpg"} alt='' width={1080} height={200} style={{ zIndex: 0, objectFit: 'cover' }} />
            </div>
            <h1 style={{position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1}}>Events</h1>
            <div style={{ width: '50%', maxWidth: '1000px' }}>
                <EventList/>
            </div>
        </main>
    )
}
