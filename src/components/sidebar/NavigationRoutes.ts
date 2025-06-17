export interface INavigationRoute {
  name: string;
  displayName: string;
  meta: { icon: string };
  children?: INavigationRoute[];
}

export default {
  root: {
    name: "/",
    displayName: "navigationRoutes.home",
  },
  routes: [
    {
      name: "dashboard",
      displayName: "menu.dashboard",
      meta: {
        icon: "vuestic-iconset-dashboard",
      },
    },
    {
      name: "users",
      displayName: "Usuarios",
      meta: {
        icon: "group",
      },
    },
    {
      name: "projects",
      displayName: "Concursos",
      meta: {
        icon: "folder_shared",
      },
    },
    {
      name: "fotoclubs",
      displayName: "Fotoclubs",
      meta: {
        icon: "folder_shared",
      },
    },
    {
      name: "secciones",
      displayName: "Secciones",
      meta: {
        icon: "folder_shared",
      },
    },
    {
      name: "categorias",
      displayName: "Categorías",
      meta: {
        icon: "folder_shared",
      },
    },
    {
      name: "metricas",
      displayName: "Métricas",
      meta: {
        icon: "folder_shared",
      },
    },
    {
      name: "auth",
      displayName: "menu.auth",
      meta: {
        icon: "login",
      },
      children: [
        {
          name: "login",
          displayName: "Ingresar",
        },
      ],
    },
    /*{
      name: "preferences",
      displayName: "menu.preferences",
      meta: {
        icon: "manage_accounts",
      },
    },*/
    /*{
      name: "settings",
      displayName: "menu.settings",
      meta: {
        icon: "settings",
      },
    },*/
  ] as INavigationRoute[],
};
