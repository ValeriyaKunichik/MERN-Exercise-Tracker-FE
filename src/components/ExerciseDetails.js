import { useExercisesContext } from '../hooks/useExercisesContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ExerciseDetails = ({ exercise }) => {
  const { dispatch } = useExercisesContext()

  const handleClick = async () => {
    const response = await fetch('https://exercises-api.onrender.com/' + exercise._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payduration: json})
    }
  }

  return (
    <div className="exercise-details">
      <h4>{exercise.title}</h4>
      <p><strong>Duration (min): </strong>{exercise.duration}</p>
      <p><strong>Number of reps: </strong>{exercise.reps}</p>
      <p>{formatDistanceToNow(new Date(exercise.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ExerciseDetails