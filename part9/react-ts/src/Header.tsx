interface Props {
    courseName: string
}

function Header({ courseName }: Props) {
  return (
    <h1>{courseName}</h1>
  )
}

export default Header