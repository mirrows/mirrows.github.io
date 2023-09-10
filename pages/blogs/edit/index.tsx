import { editArtical, listArtical } from '@/req/main'
import { Artical } from '@/types/global'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import BlogCreator from '../components/creator'
import { useRouter } from 'next/router'
import { parsequeryStr2Obj } from '@/utils/common'

type Props = {
  artical: Artical
}

export default function BlogEdit() {
  const [artical, setArtical] = useState<Artical>()
  const router = useRouter()
  useEffect(() => {
    const query = parsequeryStr2Obj(router.asPath)
    if(query?.number) {
      listArtical({number: +query.number}).then(res => {
        res?.data && setArtical(res.data)
      })
    }
  }, [router])
  return (
    <>
      <Head>
        <title>edit blog</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {artical && <BlogCreator artical={artical} onSubmit={editArtical} />}
      </main>
    </>
  )
}

// export async function getStaticPaths() {
//   const artical = await listArtical()
//   const paths = artical?.data?.map((atl: Artical) => ({
//     params: { number: String(atl.number) }
//   })) || []
//   return {
//     paths,
//     fallback: true, // See the "fallback" section below
//   };
// }

// export const getStaticProps = async (context: any) => {
//   const { number } = context.params
//   const props: Partial<Props> = {}
//   if (+String(number) + 1) {
//     const reqs = [listArtical(+number)]
//     const [artical] = await Promise.allSettled(reqs);
//     if (artical.status === 'fulfilled' && artical.value?.data) {

//       const data = artical.value.data
//       props.artical = data
//     }
//   }
//   return { props }
// }