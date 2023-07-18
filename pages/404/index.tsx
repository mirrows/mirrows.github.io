import LazyImage from '@/components/LazyImage'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const DIV = styled.div`
  &.wrap{
    width: fit-content;
    margin: 10vh auto;
    text-align: center;
  }
  .img{
    max-width: 100%;
    height: unset;
    max-height: 60vh;
    object-fit: contain;
  }
  .back{
    display: block;
    text-shadow: 0 0 10px gray;
    font-weight: bold;
    font-size: 6vh;
    color: #fff
  }
`

export default function Error() {
  const cur = useRef(true)
  const router = useRouter()
  // useEffect(() => {
  //   if(cur.current) {
  //     cur.current = false
  //     router.replace('/')
  //     const timer = setTimeout(() => {
  //       cur.current = true
  //       clearTimeout(timer)
  //     }, 1000)
  //   }
  // }, [router])
  return (
    <>
      <Head>
        <title>404</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DIV className='wrap'>
          <img className='img' width="800" height="600" src='https://empty.t-n.top/pub_lic/2023_07_06/pic1688608901221777.gif' alt="404" />
          <Link href="/" className='back' aria-label="back to homepage">BACK</Link>
        </DIV>
      </main>
    </>
  )
}

export const getStaticProps = async (context: any) => {
  return {
    props: {}
  }
}
