import { useState } from 'react' 

const LoginForm = ({login}) =>{
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  
  const handleLogin = async(event) => {
    event.preventDefault()
    login({
      username:username,
      password:password
    })
    setUsername('')
    setPassword('')
  }
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
      </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}
 
 export default LoginForm