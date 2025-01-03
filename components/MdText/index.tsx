import { parseBody } from "@/utils/md"
import MarkdownIt from "markdown-it"
import { HTMLAttributes } from "react"
import xss from "xss"

type Props = {
  className?: string
  text: string
} & HTMLAttributes<HTMLDivElement>
& {
  style?: Partial<CSSStyleDeclaration> | undefined
}

const MdText = ({ className, text, ...props }: Props) => {
  const md = new MarkdownIt()
  return <div
    className={`md_detail ${className}`}
    {...props}
    dangerouslySetInnerHTML={{ __html: parseBody(xss(md.render(text || ''))) }}
  ></div>
}

export default MdText;