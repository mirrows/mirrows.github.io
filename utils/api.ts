const githubApi = () => {
  const par = {
    url: 'https://api.github.com/user',
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `token ${sessionStorage.token}`,
    },
  }
  return fetch('https://mess.t-n.top/mess/', {
    method: 'POST',
    body: JSON.stringify(par),
  }).then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}
export default {

}