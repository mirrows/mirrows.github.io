import { bingQuery, dictQuery, queryToken2, queryUser } from '@/req/main';
import { githubApi } from '@/utils/api';
import { stone } from '@/utils/global';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { Carousel, Image, Menu } from 'antd';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  .nav{
    position:sticky;
    top: 0;
    z-index: 30;
    .ant-menu-overflow-item-rest{
      margin-left: auto;
    }
  }
  .pic_item{
    width: 100vw;
    height: 90vh;
    object-fit: cover;
  }
`

export default function Home() {
  const [pics, setPics] = useState([]);
  const navList = useRef([
    {
      label: 'Navigation One',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation One',
      key: 'ee',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation One',
      key: 'ww',
      icon: <MailOutlined />,
    },
  ])
  const router = useRouter();
  const parseObj2queryStr = (obj: { [key: string]: any }) => {
    const data = Object.keys(obj).map(key => `${key}=${String(obj[key])}`).join('&')
    return data ? `?${data}` : ''
  }
  const parsequeryStr2Obj = (str: string) => {
    const obj: { [key: string]: string } = {}
    const data = str.split('?')[1]?.split('&').forEach((item) => {
      const [key, value] = item.split('=')
      obj[key] = value
    })
    return obj
  }

  const login = () => {
    console.log(process.env.NEXT_PUBLIC_SECRET, process.env.NEXT_PUBLIC_CLIENT_ID, location.origin)
    const par = {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      // redirect_uri: location.origin,
      scope: 'repo',
    }
    // console.log(parseObj2queryStr(par));
    location.href = `https://github.com/login/oauth/authorize${parseObj2queryStr(par)}`
    // setGithub(`https://github.com/login/oauth/authorize${parseObj2queryStr(par)}`)
  }

  const queryToken = (code: any) => {
    // const par = {
    //   url: 'https://github.com/login/oauth/access_token',
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/vnd.github+json',
    //   },
    //   data: {
    //     client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    //     client_secret: process.env.NEXT_PUBLIC_SECRET,
    //     code,
    //   }
    // }
    // fetch(process.env.NEXT_PUBLIC_MESS_URL || '', {
    //   // fetch('/github/login/oauth/access_token', {
    //   method: 'POST',
    //   body: JSON.stringify(par),
    // }).then(res => res.json()).then(data => {
    //   if (!data.access_token) return;
    //   stone.set({ token: data.access_token })
    //   queryCurUser();
    //   router.push('/');
    // })
    queryToken2({ code }).then(res => {
      console.log(res)
    })
  }
  const queryCurUser = () => {
    queryUser().then(data => {
      stone.set({ userInfo: data })
    })
  }

  useEffect(() => {
    dictQuery().then((res) => {
      console.log(res)
    });
    bingQuery().then((res) => {
      if (!res?.images) return;
      setPics(res.images);
    })
    const query = parsequeryStr2Obj(router.asPath)
    if (query.code) {
      console.log(query.code);
      queryToken(query.code);
      // router.push('/');
    } else {
      console.log(stone.data.token)
      if (!stone.data.token) return;
      queryCurUser();
    }
  }, [])
  return (
    <>
      <Head>
        <title>welcome to my world</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      <main>
        <Div>
          <Menu
            mode="horizontal"
            items={navList.current}
            theme="dark"
            className="nav"
            overflowedIndicator={(<AppstoreOutlined />)}
          />
          <Carousel draggable autoplay>
            {pics.map((pic: { url: string }, i) => (
              <div key={i}>
                <Image className='pic_item' preview={false} src={`https://bing.com${pic.url}`} />
              </div>
            ))}
          </Carousel>
          <img src="/github.svg" style={{ width: '32px' }} alt='github' onClick={login} />
          <div>
            <Link href="/about">关于我们</Link>
            <div>现在已经可以在dev提交分支，通过github actions自动部署了</div>
          </div>
        </Div>
      </main>
    </>
  )
}

