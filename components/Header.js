import Link from 'next/link'

export default function Header() {
  return (
    <header>
        <Link href='/' passHref>
         <img src='/img/name1.svg'/>
        </Link>
    </header>
  )
}
