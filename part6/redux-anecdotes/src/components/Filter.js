import { connect } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = props => {
  const handleChange = e => {
    e.preventDefault()
    props.setFilter(e.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)