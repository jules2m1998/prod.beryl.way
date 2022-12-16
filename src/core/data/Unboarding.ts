interface IUnboarding {
    id: number
    name: string
    field1: string
    field2: string
    field3: string
}

const unboardings: Array<IUnboarding> = [
    {
        id: Math.floor(Math.random() * 99999) + 1,
        name: "Data name 1",
        field1: "Field 1",
        field2: "Field 2",
        field3: "Field 2"
    },
    {
        id: Math.floor(Math.random() * 99999) + 1,
        name: "Data name 2",
        field1: "Field 21",
        field2: "Field 22",
        field3: "Field 23"
    },
    {
        id: Math.floor(Math.random() * 99999) + 1,
        name: "Data name 3",
        field1: "Field 31",
        field2: "Field 32",
        field3: "Field 33"
    },
    {
        id: Math.floor(Math.random() * 99999) + 1,
        name: "Data name 4",
        field1: "Field 41",
        field2: "Field 42",
        field3: "Field 43"
    },
    {
        id: Math.floor(Math.random() * 99999) + 1,
        name: "Data name 5",
        field1: "Field 51",
        field2: "Field 52",
        field3: "Field 53"
    },
] 

export default unboardings;
export type { IUnboarding };