import { useDispatch,useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const anecdotesFound = useSelector(state => state.anecdotes)
    const filter =useSelector(state => state.filter)
    const anecdotes = [...anecdotesFound]
    const dispatch = useDispatch()


    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a,b) => a.votes>b.votes ? -1 : 1 ).filter(anec => anec.content.includes(filter.value)).map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => {
                        dispatch(showNotification(anecdote.content))
                        dispatch(voteAnecdote(anecdote.id))
                        setTimeout(() => {dispatch(hideNotification())},5000)
                        }}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList