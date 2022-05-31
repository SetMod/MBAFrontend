import { reactive, toRefs } from "vue"

export interface IApiState {
    url: RequestInfo
    options?: RequestInit | undefined
}

const state = reactive<IApiState>({
    url: '',
    options: {}
})

export default function useApi(url: RequestInfo, options?: RequestInit) {
    const setUrl = (url: RequestInfo) => {
        state.url = url
    }
    const setOptions = (options: RequestInit) => {
        state.options = options
    }
    setUrl(url)
    options ? setOptions(options) : setOptions({})
    return {
        ...toRefs(state),
        setUrl,
        setOptions
    }
}
