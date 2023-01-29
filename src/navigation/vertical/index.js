import { Mail, Home, Shield, Truck, User, Trello } from 'react-feather'

export default [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <Home size = { 20 }/>,
    navLink: '/dashboard'
},
    {
        id: 'sgsoil',
        title: 'Sand & Soil',
        icon: <Shield size = { 20 }/>,
        navLink: '/sgsoil'
    },
    {
      id: 'timwood',
      title: 'Timber & Wood',
      icon: <Shield size = { 20 }/>,
      navLink: '/timwood'
  },
  {
    id: 'divsect',
    title: 'Divisional Secretary',
    icon: <Trello size = { 20 }/>,
    navLink: '/divsect'
},
{
  id: 'vehicle',
  title: 'Vehicle',
  icon: <Truck size = { 20 }/>,
  navLink: '/vehicle'
},
{
  id: 'users',
  title: 'Users',
  icon: <User size = { 20 }/>,
  navLink: '/users'
}
]
