export const navigationItems = {
    main: [
        {
            name: `Dashboard `,
            to: '/home',
            text: 'Dashboard',
            icon: `fa-solid fa-gauge fa-2xl`

        },
        {
            name: `Pracownicy `,
            to: '/about-me',
            text: 'Pracownicy',
            icon: `fa-solid fa-person fa-2xl`

        },
        {
            name: 'Pojazdy',
            to: '/portfolio',
            text:'Pojazdy',
            icon: `fa-solid fa-car fa-2xl`,
        },
        {
            name: 'Oddziały',
            to: '/education',
            text:'Oddziały',
            icon: `fa-solid fa-building fa-2xl`,
        },
        {
            name: 'Ustawienia',
            to: '/education',
            text:'Ustawienia',
            icon: `fa-solid fa-gears fa-2xl`,
        },

    ],
    adminMenu: [
        {
            name: 'Glowna',
            to: '/admin/main',
            text: 'glowna',
            icon: `fa-solid fa-house `
        },
        {
            name: 'Projekty',
            to: '/admin/projects',
            text: 'projekty',
            icon: `fa-solid fa-house`
        },
        {
            name: 'O mnie',
            to: '/admin/about-me',
            text: 'o mnie',
            icon: `fa-solid fa-house `
        },
        {
            name: 'Edukacja',
            to: '/admin/education',
            text: 'edukacja',
            icon: `fa-solid fa-house`
        },

    ],



}