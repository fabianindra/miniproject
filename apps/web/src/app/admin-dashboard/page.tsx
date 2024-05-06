import EventForm from "@/components/EventForm";
import React from "react";
import Image from "next/image";

export default function DashboardPage() {
    return (
        <div>
        <Image src={"/abstract3.jpg"} alt='' width={1080} height={200} style={{ zIndex: 0, objectFit: 'cover' }} />
        <h1 style={{position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1}}>
            Organizer Dashboard
        </h1>
        <EventForm />
        </div>
    )
}