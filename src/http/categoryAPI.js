import { $authHost } from "./index";


export const createCategory = async (name) => {
    const { data } = await $authHost.post('category', {name})
    return data
}

export const fetchCategory = async () => {
    const { data } = await $authHost.get('category', {})
    return data
}