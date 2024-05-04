"use client"

import Link from "next/link";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Nav() {
    const [userRole, setUserRole] = useState<string | undefined>(undefined)
    const dashboardHref = userRole ? (userRole === 'admin' ? '/admin-dashboard' : '/user-dashboard') : '/no-dashboard';
  
    useEffect(() => {
      const role = Cookies.get('role');
      setUserRole(role);
    }, []);

    return (
        <header>
            <nav
                className="flex items-center justify-between p-6 lg:px-8 h-20 border 
                border-t-0 border-l-0 border-r-0 border-b-gray-600"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        Mini Project Fabian
                    </Link>
                </div>
                <div>
                    <Link href="/eventlist">Events</Link>
                    <br />
                    <div>
                        <Link href={dashboardHref} passHref>
                            <div className="link">DASHBOARD</div>
                        </Link>
                    </div>
                </div>
               
            </nav>
        </header>
    )
}
