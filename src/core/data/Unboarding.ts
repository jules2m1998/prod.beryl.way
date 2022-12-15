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
        name: "A Data to display",
        field1: "Data to display",
        field2: "Data to display",
        field3: "Data to display"
    },
    {
        id: Math.floor(Math.random() * 99999) + 1,
        name: "B Data to display",
        field1: "Data to display",
        field2: "Data to display",
        field3: "Data to display"
    },
    {
        id: Math.floor(Math.random() * 99999) + 1,
        name: "C Data to display",
        field1: "Data to display",
        field2: "Data to display",
        field3: "Data to display"
    },
    {
        id: Math.floor(Math.random() * 99999) + 1,
        name: "D Data to display",
        field1: "Data to display",
        field2: "Data to display",
        field3: "Data to display"
    },
    {
        id: Math.floor(Math.random() * 99999) + 1,
        name: "E Data to display",
        field1: "Data to display",
        field2: "Data to display",
        field3: "Data to display"
    },
] 

export default unboardings;
export type { IUnboarding };