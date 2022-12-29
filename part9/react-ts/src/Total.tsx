import { CoursePart } from "./App"

interface Props {
  courseParts: CoursePart[]
}

function Total(props: Props) {
  const { courseParts } = props;
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Total