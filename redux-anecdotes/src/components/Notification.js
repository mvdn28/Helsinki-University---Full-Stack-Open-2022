import { useSelector } from 'react-redux'

const Notification = () => {
  const notificationFound = useSelector(state => state.notification)
  const notification=notificationFound.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display:notificationFound.display
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification