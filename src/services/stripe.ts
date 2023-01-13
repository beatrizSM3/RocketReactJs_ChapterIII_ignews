import Stripe from 'stripe';

//stripe pelo lado do servidor usando a chave secreta


export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2022-11-15",
    appInfo: {
        name: 'Ignews',
        version: '0.1.0',
      
    },
})

