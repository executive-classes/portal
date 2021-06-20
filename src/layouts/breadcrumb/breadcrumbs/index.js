export default {
    home: {
        text: "Home",
        exact: true,
        to: { name: "home" },
        parent: null,
    },
    dashboard: {
        text: "Dashboard",
        exact: true,
        to: { name: "dashboard" },
        parent: 'home',
    },
    profile: {
        text: "Perfil",
        exact: true,
        to: { name: "profile" },
        parent: 'home',
    },
    employees: {
        text: "Funcionários",
        exact: true,
        to: { name: "employees" },
        parent: 'home',
    },
    employee: {
        text: "Funcionário",
        exact: true,
        to: { name: "employee" },
        parent: 'employees',
    },
    teachers: {
        text: "Professores",
        exact: true,
        to: { name: "teachers" },
        parent: 'home',
    },
    teacher: {
        text: "Professor",
        exact: true,
        to: { name: "teacher" },
        parent: 'teachers',
    },
    students: {
        text: "Alunos",
        exact: true,
        to: { name: "students" },
        parent: 'home',
    },
    bugs: {
        text: "Bugs",
        exact: true,
        to: { name: "bugs" },
        parent: 'home',
    },
};
