import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import PaymentIcon from '@material-ui/icons/Payment';

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
        title: 'PROFILE',
        link: '/profile',
        icon: <PaymentIcon />
    }
]