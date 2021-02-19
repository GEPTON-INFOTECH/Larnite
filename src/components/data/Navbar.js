import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

export const NavItems = [
    {
        title: 'DASHBOARD',
        link: '/',
        icon: <DashboardIcon />
    },
    {
        title: 'COURSES',
        link: '/courses',
        icon: <MenuBookIcon />
    },
    {
        title: 'NOTIFICATIONS',
        link: '/notifications',
        icon: <NotificationsActiveIcon />
    }
]