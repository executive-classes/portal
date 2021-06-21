export default [
    {
        title: "Home",
        icon: "fas fa-home",
        to: { name: "home" },
    },
    {
        title: "Funcionários",
        icon: "fas fa-user-tie",
        to: { name: "employees" },
        privilege: 'employee:get'
    },
    {
        title: "Professores",
        icon: "fas fa-chalkboard-teacher",
        to: { name: "teachers" },
        privilege: 'teacher:get'
    },
    {
        title: "Alunos",
        icon: "fas fa-user-graduate",
        to: { name: "students" },
        privilege: 'student:get'
    },
    {
        title: "Bugs",
        icon: "fas fa-bug",
        to: { name: "bugs" },
        privilege: 'buglog:get'
    },
];
