import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
    const sortedAnecdotes = [...props.anecdotes].sort((a,b) => b.votes - a.votes)
  
    const vote = id => {
        props.voteAnecdote(id)
        props.displayNotification(`you voted '${props.anecdotes.find(a => a.id === id).content}'`, 10)
    }

    return (
        <div>
            {sortedAnecdotes
                .map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        anecdotes: state.anecdotes
    }
}

const mapDispatchToProps = {
    voteAnecdote,
    displayNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)