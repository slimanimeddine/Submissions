import Part from "./Part"
import { CoursePart } from "./App"

interface Props {
  courseParts: CoursePart[]
}

function Content(props: Props) {
  const { courseParts } = props;
  return (
    <div>
      {courseParts.map(coursePart => {
        return <Part key={coursePart.name} coursePart={coursePart} />
      })}  
    </div>
  )
}

export default Content