import { ApolloClient, InMemoryCache } from '@apollo/client'
const client = new ApolloClient({
  uri: 'https://puertoiguazu.stepzen.net/api/excited-clam/__graphql',
  headers: {
    Authorization: `Apikey ${process.env.NEXT_PUBLIC_STEP_ZEN_KEY}`,
  },
  cache: new InMemoryCache(),
})

export default client
