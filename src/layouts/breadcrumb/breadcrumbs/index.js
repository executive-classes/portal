export default {
    "home": {
        text: "Home",
        exact: true,
        to: { name: "home" },
        parent: null,
    },
    "dashboard": {
        text: "Dashboard",
        exact: true,
        to: { name: "dashboard" },
        parent: 'home',
    },
    "profile": {
        text: "Perfil",
        exact: true,
        to: { name: "profile" },
        parent: 'home',
    },
    "employees.list": {
        text: "Funcionários",
        exact: true,
        to: { name: "employees.list" },
        parent: 'home',
    },
    "employees.show": {
        text: "Funcionário",
        exact: true,
        to: { name: "employees.show" },
        parent: 'employees.list',
    },
    "employees.create": {
        text: "Novo Funcionário",
        exact: true,
        to: { name: "employees.create" },
        parent: 'employees.list',
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
    "bugs.list": {
        text: "Bugs",
        exact: true,
        to: { name: "bugs.list" },
        parent: 'home',
    },
};
