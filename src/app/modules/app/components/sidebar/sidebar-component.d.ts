type SidebarLink = {
  icon: string;
  label: string;
  href: string[] | string;
};

type SidebarButton = {
  icon: string;
  label: string;
  action: () => void;
};
