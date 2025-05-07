type ButtonProp = {
  className: string
  Btntext: string
  href?: string
}

export function Button({ className, Btntext, href }: ButtonProp) {
  return (
    <>
      {href ? (
        <a href={href} className={`${className}`}>
          {Btntext}
        </a>
      ) : (
        <button className={className}>{Btntext}</button>
      )}
    </>
  )
}
