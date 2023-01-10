function searchByName(
    data: Array<object>,
    value: string,
    excludes: string[]
): Array<object> {
    if (data.length === 0) return [];
    const instance = data[0];
    const props = Object.keys(instance).filter((v) => !excludes.includes(v));

    const s = data.filter((v) =>
        props.some((p) => {
            return (
                (v[p] as string)
                    ?.toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase()) || false
            );
        })
    );

    return s;
}

export { searchByName };
