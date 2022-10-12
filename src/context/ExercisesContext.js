import { createContext, useReducer } from 'react'

export const ExercisesContext = createContext()

export const exercisesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        exercises: action.payduration 
      }
    case 'CREATE_WORKOUT':
      return { 
        exercises: [action.payduration, ...state.exercises] 
      }
    case 'DELETE_WORKOUT':
      return { 
        exercises: state.exercises.filter(w => w._id !== action.payduration._id) 
      }
    default:
      return state
  }
}

export const ExercisesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(exercisesReducer, { 
    exercises: null
  })
  
  return (
    <ExercisesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ExercisesContext.Provider>
  )
}