"use client"

import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";

export default function Nav() {
    const [userRole, setUserRole] = useState<string | undefined>(undefined)
  
    useEffect(() => {
      const role = Cookies.get('role');
      setUserRole(role as string);
    }, []);

    return (
        <header>
            <nav style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    height: '20px',
                    border: '1px solid #ccc',
                    borderTop: '0',
                    borderLeft: '0',
                    borderRight: '0',
                    borderBottom: '1px solid #666'
                }}
                aria-label="Global">

                <div style={{ flex: '1' }}>
                    <Link href="/" style={{ margin: '-1.5px', padding: '1.5px', color: 'white', textDecoration: 'none' }}>
                        Mini Project Fabian
                    </Link>
                </div>

                <Link href="/eventlist" style={{ color: 'white', textDecoration: 'none' }}>Events</Link>

                {userRole === "admin" && (
                    <Link href="/admin-dashboard" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>Dashboard</Link>
                )}
                {userRole === "user" && (
                    <Link href="/user-dashboard" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>Dashboard</Link>
                )}

            </nav>
        </header>
    )
}
