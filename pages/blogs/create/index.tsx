import { addArtical, bingQuery } from '@/req/main'
import { BingPic } from '@/types/global'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import BlogCreator from '@/components/Blogs/Creator'
import { useRouter } from 'next/router'
import { stone } from '@/utils/global'

export default function BlogCreate() {
  const [img, setImg] = useState<BingPic | null>()
  const router = useRouter();
  useEffect(() => {
    bingQuery(1).then(res => {
      if(res.data) {
        setImg(res.data[0])
      }
    })
  }, [])
  useEffect(() => {
    stone.isGithubOwner((isowner) => {
      if (!isowner) {
        router.replace('/');
      }
    })
  }, [router])
  return (
    <>
      <Head>
        <title>write a new blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <BlogCreator artical={{ img: img?.url || '' }} onSubmit={addArtical} />
      </main>
    </>
  )
}

// export const getStaticProps = async (context: any) => {
//   return {
//     props: {}
//   }
// }
