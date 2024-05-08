import LoginForm from '@/components/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative' }}>
        <h1 style={{ color: 'white', position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          Break Event Point
        </h1>
        <p style={{ color: 'white', position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}>
          breaking news about events, with on point info
        </p>
        <Image src={"/abstract.jpg"} alt='' width={1080} height={450} style={{ zIndex: 0 }} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <LoginForm />
      </div>
      <div style={{ marginTop: '20px'}}>
        <Link href={"/register"} style={{ color: 'white', textDecoration: 'none'}}>Register</Link>
      </div>
    </main>
  );
}

