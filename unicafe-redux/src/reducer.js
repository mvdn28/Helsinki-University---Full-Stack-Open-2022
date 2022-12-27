const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const stateToChangeGood = state.good
      const changedStateGood = {
        ...state,
        good: stateToChangeGood+1
      }
      return changedStateGood
    case 'OK':
      const stateToChangeOk = state.ok
      const changedStateOk = {
        ...state,
        ok: stateToChangeOk+1
      }
      return changedStateOk
    case 'BAD':
      const stateToChangeBad = state.bad
      const changedStateBad = {
        ...state,
        bad: stateToChangeBad+1
      }
      return changedStateBad
    case 'ZERO':
      
      return initialState
    default: return state
  }
  
}

export default counterReducer