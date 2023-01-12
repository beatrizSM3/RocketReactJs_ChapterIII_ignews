import { SingInButton } from '../SingInButton/singInButton';
import styles from './styles.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ActiveLink } from '../ActiveLink/activeLink';

export function Header(){
   


    return(
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news"/>
                <nav>
                    <ActiveLink href="/" legacyBehavior activeClassName={styles.active}><a>Home</a></ActiveLink>
                    <ActiveLink href='/posts' legacyBehavior prefetch activeClassName={styles.active}><a >Posts</a></ActiveLink>
                </nav>

                <SingInButton/>
            </div>
        </header>
    )
}