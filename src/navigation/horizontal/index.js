import { Mail, Home, truck, user, trello } from 'react-feather'

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
        icon: <truck size = { 20 }/>,
        navLink: '/sgsoil'
    },
    {
      id: 'timwood',
      title: 'Timber & Wood',
      icon: <truck size = { 20 }/>,
      navLink: '/timwood'
  },
  {
    id: 'divsect',
    title: 'Divisional Secretary',
    icon: <trello size = { 20 }/>,
    navLink: '/divsect'
},
{
  id: 'vehicle',
  title: 'Vehicle',
  icon: <Mail size = { 20 }/>,
  navLink: '/vehicle'
},
{
  id: 'users',
  title: 'Users',
  icon: <user size = { 20 }/>,
  navLink: '/users'
}
]
