import React from "react";
import Link from "next/link";
import styles from '../page.module.css';

export default function DashboardPage() {
    return (
        <div>
            <main className={styles.main}>
                <p>please log in if you want to access dashboard</p>
                <Link href={"/"}>back to home</Link>
            </main>
        </div>
    )
}