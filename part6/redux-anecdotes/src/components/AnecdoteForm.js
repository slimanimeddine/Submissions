import { createAnecdote } from "../reducers/anecdoteReducer"
import { displayNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecdoteForm = props => {
    const addAnecdote = async e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        e.target.anecdote.value = ''
        props.createAnecdote(content)
        props.displayNotification(`you created '${content}'`, 10)
    }
    
    return (
        <form onSubmit={addAnecdote}>
            <input name='anecdote' />
            <button type='submit'>create</button>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    createAnecdote,
    displayNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)