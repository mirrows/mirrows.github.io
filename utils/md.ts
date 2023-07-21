const map = {
  // 添加懒加载
  lazyImg: (str: string) => str.replace(/\<img src/g, `<img class="lazy" src="${process.env.NEXT_PUBLIC_LOADING_GIF}" data-src`),
  // 添加表格溢出滚动
  tableScroll: (str: string) => str.replace(/\<table\>/g, `<div class="scroll_table"><table>`).replace(/\<\/table\>/g, `</table></div>`),
}

// 辅助调整md样式
export const parseBody = (str: string, options?: Array<keyof typeof map>) => {
  const blackListMap: {[key in keyof typeof map]?: boolean} = {}
  options?.forEach(option => {
    blackListMap[option] = true
  })
  let html = str
  Object.keys(map).forEach((option) => {
    blackListMap[option as keyof typeof map] || (html = map[option as keyof typeof map](html))
  })
  return html
}