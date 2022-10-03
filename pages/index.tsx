import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Cooking Blog!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>This is a new blog app</h1>
    </div>
  )
}

export default Home
