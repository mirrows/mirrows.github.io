import LazyImage from '@/components/LazyImage'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const DIV = styled.div`
  overflow: hidden;
  .fire_wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    z-index: 0;
  }
  .items_wrap{
    position: relative;
    z-index: 2;
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 8rem);
    grid-gap: 10px;
    min-width: 200px;
    max-width: 1200px;
    width: 100%;
    padding: 10px 0;
    margin: 60px auto;
    pointer-events: none;
  }
  .item_wrap{
    position: relative;
    pointer-events: all;
    padding: 0.5rem;
  }
  .item{
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    overflow: hidden;
    cursor: pointer;
    
  }
  .item_middle{
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 3px dashed #f5f5f5;
    border-radius: 12px;
  }
  .item_img{
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
  .demo_name{
    margin: 10px 0;
    text-align: center;
    word-break: break-all;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }
  @media (min-width: 769px) {
    .item:hover ~ .item_mask{
      opacity: 1;
    }
  }
`

export default function Demos() {
  const [show, isShow] = useState(false)
  const [list] = useState([
    {
      name: '抽奖模型',
      icon: 'https://empty.t-n.top/pub_lic/2023_06_19/pic1687153304035427.png',
      link: '/demos/lottery',
    },
    {
      name: '2048',
      icon: 'https://empty.t-n.top/pub_lic/2023_06_26/pic1687749579236835.png',
      link: '/demos/2048',
    },
    {
      name: '图床列表',
      icon: 'https://empty.t-n.top/pub_lic/2023_07_03/pic1688351230372957.jpg',
      link: '/demos/imgSource',
    },
  ])
  useEffect(() => {
    isShow(true)
  }, [])
  return (
    <>
      <Head>
        <title>Demos</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DIV>
          {show && <iframe className='fire_wrap' src="https://empty.t-n.top/html/WebGL%20Fluid%20Simulation.html"></iframe>}
          <div className="items_wrap">
            {[...list, ...list, ...list, ...list, ...list, ...list].map((item, i) => (<Link key={i} className='item_wrap' aria-label={item.name} href={item.link}>
              <div className='item'>
                <div className='item_middle'>
                  <LazyImage className='item_img' width="100" height="100" src={item.icon} />
                </div>
              </div>
              <div className='demo_name two_line'>{item.name}</div>
            </Link>))}
          </div>
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
