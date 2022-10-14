import { useState } from 'react'
import { useExercisesContext } from '../hooks/useExercisesContext'

const ExerciseForm = () => {
  const { dispatch } = useExercisesContext()

  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const exercise = {title, duration, reps}
    
    const response = await fetch('https://exercises-api.onrender.com', {
      method: 'POST',
      body: JSON.stringify(exercise),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setTitle('')
      setDuration('')
      setReps('')
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Exercise</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Duration (in min):</label>
      <input 
        type="number" 
        onChange={(e) => setDuration(e.target.value)} 
        value={duration}       
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps}
      />

      <button>Add Exercise</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ExerciseForm