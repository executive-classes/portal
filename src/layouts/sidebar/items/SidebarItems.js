export default [
    {
        title: "Home",
        icon: "fas fa-home",
        to: { name: "home" },
    },
    {
        group: "/people",
        model: false,
        icon: "fas fa-users",
        title: "Gestão de Pessoas",
        to: "/people",
        privilege: 'pages:people',
        children: [
            {
                title: "Funcionários",
                icon: "fas fa-user-tie",
                to: { name: "employees.list" },
                privilege: 'employee:get'
            },
            {
                title: "Professores",
                icon: "fas fa-chalkboard-teacher",
                to: { name: "teachers.list" },
                privilege: 'teacher:get'
            },
            {
                title: "Clientes",
                icon: "fas fa-users",
                to: { name: "customers.list" },
                privilege: 'customer:get'
            },
            {
                title: "Alunos",
                icon: "fas fa-user-graduate",
                to: { name: "profile.students" },
                privilege: 'student:get'
            },
        ],
    },
    {
        title: "Bugs",
        icon: "fas fa-bug",
        to: { name: "bugs.list" },
        privilege: 'buglog:get'
    },
];
