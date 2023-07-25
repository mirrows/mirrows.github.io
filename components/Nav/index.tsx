import { queryGithubToken, queryUser } from "@/req/main"
import { UserInfo } from "@/types/github"
import { parseObj2queryStr, parsequeryStr2Obj } from "@/utils/common"
import { stone } from "@/utils/global"
import Link from "next/link"
import { useRouter } from "next/router"
import { Fragment, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import SVGIcon from "../SVGIcon"
import { env } from "process"
import TriggerBtn from "../TriggerBtn"


const Div = styled.div`
.nav{
  display: flex;
  justify-content:space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 30;
  box-shadow: inset 0 60px 20px -30px #fff;
  .expand_icon{
    display:none;
  }
  .nav_list{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 420px;
    padding: 5px 20px;
    font-weight: bold;
    .nav_item{
      display: block;
      text-decoration: underline;
      color: #000;
      .nav_icon{
        width: 32px;
        border-radius: 50%;
      }
    }
    .item_right{
      justify-content: flex-end;
      text-align: right;
      span{
        display: none;
      }
    }
  }
}

@media (max-width: 769px) {
  .nav{
    box-shadow: inset 0 48px 20px -30px #fff;
    .nav_list{
      display: none;
      .item_right span{
        display: inline;
      }
    }
    .expand_icon{
      display: block;
    }
    .nav_list.modal-active{
      display: block;
      position: absolute;
      right: 0;
      top: 50px;
      width: 180px;
      padding: 10px 0;
      background-color: rgba(0,0,0,.5);
      .nav_item{
        display: flex;
        align-items: center;
        padding: 5px 10px;
        color: #fff;
        fill: #fff;
        text-decoration: none;
        .nav_icon{
          margin: 0 10px;
        }
      }
    }
  }
}
`

const NavHeader = () => {
  const [user, setUser] = useState<UserInfo>()
  const router = useRouter();

  const login = () => {
    const par = {
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      scope: 'user,repo',
    }
    location.href = `https://github.com/login/oauth/authorize${parseObj2queryStr(par)}`
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
      localStorage.setItem('tmpData', JSON.stringify(stone.data))
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

  return (
    <Div>
      <div className='nav'>
        <Link href="/" aria-label="link to main page">
          {/* <img style={{ height: '45px', padding: '5px 20px' }} src="/name.png" alt="" /> */}
          <SVGIcon type="logo" style={{ height: '10vw', maxHeight: '45px', padding: '5px 20px' }} fill="#000" viewBox="0 0 418.462347 89.379659" />
        </Link>
        <div className="right_nav_wrap">
          <TriggerBtn type="select">
            <SVGIcon type="list" className="expand_icon" style={{ width: '32px', padding: '5px 10px' }} />
            <div className='nav_list'>
              <Link className="nav_item" href="/" aria-label="link to homepage">
                <SVGIcon type="home" className="nav_icon" />
                <span>Home</span>
              </Link>
              <Link className="nav_item" href="/demos" aria-label="see more demos">
                <SVGIcon type="demos" className="nav_icon" />
                <span>Demos</span>
              </Link>
              <Link className="nav_item" href="/about" aria-label="read about me">
                <SVGIcon type="about_me" className="nav_icon" />
                <span>About me</span>
              </Link>
              {user ? (<a className="nav_item item_right" aria-label="link to github page" href={user.html_url} target="_blank">
                <span>{user.login}</span>
                <img src={user.avatar_url} className="nav_icon" alt="" />
              </a>)
                : (<div className="nav_item item_right" onClick={login}>
                  <span>Login</span>
                  <SVGIcon type="github" className="nav_icon" viewBox="0 0 16 16" />
                </div>)}
            </div>
          </TriggerBtn>
        </div>
      </div>
    </Div>
  )
}

export default NavHeader