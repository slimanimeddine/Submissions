import { CoursePart } from './App'
interface Props {
    coursePart: CoursePart
}

const Part = (props: Props) => {
    const { coursePart } = props
    let details;
    switch (coursePart.type) {
        case "normal":
            details = <p>{coursePart.description}</p>
            break;
        case "special":
            details = <p>{coursePart.description}
            required skills: {coursePart.requirements.join(',')}
            </p>
            break;
        case "groupProject":
            details = <p>project exercises {coursePart.groupProjectCount}</p>
            break;
        case "submission":
            details = <p>{coursePart.description}
            submit to {coursePart.exerciseSubmissionLink}
            </p>
            break;
        default:
            break;
    }
  return (
    <div>
        <h3>{coursePart.name} {coursePart.exerciseCount}</h3>
        {details}
    </div>
  )
}

export default Part