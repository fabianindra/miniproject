import EventList from "@/components/EventList";
import React from "react";
import styles from '../page.module.css'

export default function DashboardPage() {
    return (
        <main className={styles.description}>
            <br />
            <h1>Events</h1>
            <EventList/>
        </main>
    )
}