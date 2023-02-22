type TRegExp = {
  [key: string]: RegExp;
}

const regExp: TRegExp = {
  first_name: /^[A-ZА-ЯЁ][a-zа-яё]*(?:-[A-ZА-ЯЁ][a-zа-яё]*)?\r?$/,  
  second_name: /^[A-ZА-ЯЁ][a-zа-яё]*(?:-[A-ZА-ЯЁ][a-zа-яё]*)?\r?$/,  
  login: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
  display_name: /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.+[a-zA-Z]{2,4}$/, 
  password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/,
  phone: /^[+]?[0-9]{10,15}$/, 
  message: /^.+$/ 
}

export default regExp;
