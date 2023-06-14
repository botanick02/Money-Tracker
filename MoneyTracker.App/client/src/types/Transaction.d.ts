interface Transaction {
    id: number,
    amount: number,
    category: Category,
    dateTime: string,
    note: string | null,
    title: string
}