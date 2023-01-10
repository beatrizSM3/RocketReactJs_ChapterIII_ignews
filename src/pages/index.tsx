import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from './home.module.scss'
import { SubscribeButton } from '../components/SubscribeButton/subscribeButton'
import { GetServerSideProps, GetStaticProps } from 'next'
import { stripe } from '../services/stripe'


const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  product:{
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  console.log(product)
  return (
    <>
    <Head>
      <title>Home | ig.news</title>
    </Head>
        <main className={styles.contentContainer}>
          <section className={styles.hero}>
              <span>👏 Hey, welcome</span>
              <h1>News about the <span>React </span> world.</h1>
              <p>
                Get access to all the publications <br/>
                <span>for {product.amount} month</span>
              </p>
              <SubscribeButton priceId={product.priceId}/> 
          </section>
          <img src="/images/avatar.svg" alt='avatar'/>
        </main>
     

    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KpcQFIyFKuNEHhN78Hod13V',{
    expand: ['product']
  })


 const product = {
  priceId: price.id,
  amount: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format((price.unit_amount! / 100)),
 }

  return {
    props : {
        product   //as props são retornadas para o componente Home
    }, 
    revalidate: 60 * 60 * 24, //24 hours
  }
}