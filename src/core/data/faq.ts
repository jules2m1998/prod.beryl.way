interface Question {
    id: number;
    title: string;
    nbrVue: number;
    steps: string[];
}

const exemple: Question[] = [
    {
        id: 1,
        title: "Question 1",
        nbrVue: 10,
        steps: [
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
        ],
    },
    {
        id: 1,
        title: "Question 2",
        nbrVue: 9,
        steps: [
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
        ],
    },
    {
        id: 1,
        title: "Question 2",
        nbrVue: 30,
        steps: [
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
        ],
    },
    {
        id: 1,
        title: "Question 2",
        nbrVue: 17,
        steps: [
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
        ],
    },
    {
        id: 1,
        title: "Question 2",
        nbrVue: 8,
        steps: [
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus suscipit vero modi mollitia est eum facilis cum voluptate! Deserunt suscipit eveniet id numquam recusandae ad ea possimus saepe iusto amet?",
        ],
    },
];

export type {Question};
export default exemple;
