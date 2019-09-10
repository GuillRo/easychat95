import { store } from 'react-easy-state'

const user = store({
  username: '',
  logged: false,
  socket: null,
  colorUser: '',
  colorMsg: '',
  fontUser:'',
  fontMsg: '',
  updateUsername(username) { user.username = username },
  updateLogged(val) { user.logged = val },
  updateSocket(socket) { user.socket = socket },
  updateColorUser(color) {user.colorUser = color},
  updateColorMsg(color) { user.colorMsg = color}, 
  updateFontUser(font) {user.fontUser = font},
  updateFontMsg(font) {user.fontMsg = font}
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
