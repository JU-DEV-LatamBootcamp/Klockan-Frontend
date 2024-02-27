export const SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: 'dashboard',
    href: ['', 'app', 'dashboard'],
    icon: 'home',
  },
  {
    label: 'programs',
    href: ['', 'app', 'programs'],
    icon: 'school',
  },
  {
    label: 'courses',
    href: ['', 'app', 'courses'],
    icon: 'workspace_premium',
  },
  {
    label: 'classrooms',
    href: ['', 'app', 'classrooms'],
    icon: 'book',
  },
  {
    label: 'meetings',
    href: ['', 'app', 'meetings'],
    icon: 'cast',
  },
  {
    label: 'users',
    href: ['', 'app', 'users'],
    icon: 'group',
  },
];

export const TRAINER_SIDEBAR_LINKS: SidebarLink[] = [
  {
    label: 'dashboard',
    href: ['', 'app', 'dashboard'],
    icon: 'home',
  },
  {
    label: 'classrooms',
    href: ['', 'app', 'classrooms'],
    icon: 'book',
  },
  {
    label: 'meetings',
    href: ['', 'app', 'meetings'],
    icon: 'cast',
  },
  {
    label: 'users',
    href: ['', 'app', 'users'],
    icon: 'group',
  },
];

export const PROFILE_BUTTON: Omit<SidebarButton, 'action'> = {
  icon: 'person',
  label: 'Profile',
};

export const LOGOUT_BUTTON: Omit<SidebarButton, 'action'> = {
  icon: 'logout',
  label: 'Logout',
};
