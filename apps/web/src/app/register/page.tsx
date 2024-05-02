import RegisterForm from "@/components/RegisterForm";
import React from "react";
import styles from '../page.module.css'

export default function DashboardPage() {
    return (
        <main className={styles.description}>
        <br />
        <RegisterForm />
        </main>
    )
}