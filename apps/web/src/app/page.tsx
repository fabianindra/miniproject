import LoginForm from '@/components/LoginForm';
import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {

  return (
    <main className={styles.main}>
      <h1>Events</h1>
      <div>
        <Image src={"/photo-1492684223066-81342ee5ff30.jpeg"} alt='' width={500} height={300} />
      </div>
      
      <LoginForm />

      <Link href={"/register"}>Register</Link>
    </main>
  );
}

