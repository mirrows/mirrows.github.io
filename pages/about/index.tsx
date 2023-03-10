import Head from 'next/head'
import Link from 'next/link'


export default function About() {
  return (
    <>
      <Head>
        <title>about</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        关于我页面
        <Link href="/">回到首页</Link>

      </main>
    </>
  )
}
