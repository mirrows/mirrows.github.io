import { queryGithubToken, queryUser } from "@/req/main"
import { UserInfo } from "@/types/github"
import { parseObj2queryStr, parsequeryStr2Obj } from "@/utils/common"
import { logout, stone } from "@/utils/global"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import LazyImage from "../LazyImage"
import SVGIcon from "../SVGIcon"
import TriggerBtn from "../TriggerBtn"
import style from './index.module.scss'

const NavHeader = () => {
  const [user, setUser] = useState<UserInfo>()
  const [isOwner, setOwner] = useState(false)
  const router = useRouter();

  const login = () => {
    const par = {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      scope: 'user,repo',
    }
    location.href = `https://github.com/login/oauth/authorize${parseObj2queryStr(par)}`
  }

  const userLogout = () => {
    logout()
    setUser(undefined)
  }

  const queryToken = useCallback((code: any) => {
    queryGithubToken({ code }).then(res => {
      if (!res.access_token) return console.log('登录失败', res.msg);
      stone.set({ token: res.access_token })
      queryCurUser();
      router.push('/');
    })
  }, [router])
  const queryCurUser = () => {
    queryUser().then(data => {
      if (!data.id) return;
      stone.set({ userInfo: data, lastTime: Date.now() })
      // localStorage.setItem('tmpData', JSON.stringify(stone.data))
      setUser(data)
      stone.emit('github', data)
    })
  }

  useEffect(() => {
    const query = parsequeryStr2Obj(router.asPath)
    if (query.code) {
      queryToken(query.code);
    } else {
      if (!stone.data.token) return;
      if (stone.data.userInfo?.login) {
        setUser(stone.data.userInfo as UserInfo)
        return
      }
      queryCurUser();
    }
  }, [queryToken, router.asPath])

  useEffect(() => {
    stone.isGithubOwner((isowner) => setOwner(isowner))
  }, [])

  return (
    <div className={style['nav_wrap']}>
      <div className={style['nav']}>
        <Link href="/" aria-label="link to main page">
          {/* <img style={{ height: '45px', padding: '5px 20px' }} src="/name.png" alt="" /> */}
          <SVGIcon type="logo" style={{ height: '10vw', maxHeight: '45px', padding: '5px 20px' }} fill="#000" viewBox="0 0 418.462347 89.379659" />
        </Link>
        <div className={style['right_nav_wrap']}>
          <TriggerBtn type="select">
            <SVGIcon type="list" className={style['expand_icon']} style={{ width: '32px', padding: '5px 10px' }} />
            <div className={style['nav_list']}>
              <Link className={style['nav_item']} href="/" aria-label="link to homepage">
                <SVGIcon type="home" className={style['nav_icon']} />
                <span>Home</span>
              </Link>
              <Link className={style['nav_item']} href="/demos" aria-label="see more demos">
                <SVGIcon type="demos" className={style['nav_icon']} />
                <span>Demos</span>
              </Link>
              <Link className={style['nav_item']} href="/about" aria-label="read about me">
                <SVGIcon type="about_me" className={style['nav_icon']} />
                <span>About me</span>
              </Link>
              {isOwner && <Link className={style['nav_item']} href="/setting" aria-label="read about me">
                <SVGIcon type="setting" className={style['nav_icon']} />
                <span>Setting</span>
              </Link>}
              {user ? (<>
                <a className={`${style['nav_item']} ${style['item_right']}`} aria-label="link to github page" href={user.html_url} target="_blank">
                  <span>{user.login}</span>
                  <img src={user.avatar_url || 'https://wsrv.nl/?url=raw.githubusercontent.com/mirrows/photo/main/normal/2024_01_02/pic1704182038694276.jpeg'} width="32" height="32" className={style['nav_icon']} alt="" />
                </a>
                <div className={`${style['nav_item']} ${style['item_right']}`} onClick={userLogout}>
                  <span>Logout</span>
                  <SVGIcon type="logout" className={style['nav_icon']} />
                </div>
              </>)
                : (<div className={`${style['nav_item']} ${style['item_right']}`} onClick={login}>
                  <span>Login</span>
                  <SVGIcon type="github" className={style['nav_icon']} viewBox="0 0 16 16" />
                </div>)}
            </div>
          </TriggerBtn>
        </div>
      </div>
    </div>
  )
}

export default NavHeader