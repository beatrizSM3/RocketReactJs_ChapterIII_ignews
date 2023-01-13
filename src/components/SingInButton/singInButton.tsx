import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'
import {signIn, signOut, useSession} from 'next-auth/react'

export function SingInButton(){

    const session = useSession()
    const name = session.data?.name

    // console.log(session)
    // console.log(name)
    return session.data != undefined  ? (
        <button type="button" className={styles.singInButton} onClick={()=> signOut()}>
            <FaGithub color="#04d361"/>
            {name}
            <FiX color="#737380" className={styles.closeIcon}/>
        </button>
    ): (
        <button type="button" className={styles.singInButton} onClick={()=>signIn('github')}>
        <FaGithub color="#eba417"/>
        Sing in with Github
    </button>
    )
}