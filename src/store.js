import { store } from 'react-easy-state'

const user = store({
  username: '',
  logged: false,
  socket: null,
  colorUser: '',
  colorMsg: '',
  updateUsername(username) { user.username = username },
  updateLogged(val) { user.logged = val },
  updateSocket(socket) { user.socket = socket },
  updateColorUser(color) {user.colorUser = color},
  updateColorMsg(color) { user.colorMsg = color}
})

//pas utilisé
const chatData = store({
  users: [],
  lastTenMessages: [
    {
      '###admin###': "don't forget to be polite and civil"
    }
  ]
})

export default { user, chatData }
