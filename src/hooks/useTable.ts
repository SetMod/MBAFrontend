import { reactive, computed, toRefs } from "vue"

export interface ITableState {
    tableHeaders: Array<string>,
    tableData: Array<Record<string, string>>,
    pageIndex: number,
    pageSize: number,
}

const state = reactive<ITableState>({
    tableHeaders: new Array<string>(),
    tableData: new Array<Record<string, string>>(),
    pageIndex: 1,
    pageSize: 10,
})

export default function useTable(tableHeaders: Array<string>, tableData: Array<Record<string, string>>, pageSize?: number) {
    state.tableHeaders = tableHeaders
    state.tableData = tableData
    if (pageSize && pageSize <= state.tableData.length) {
        state.pageSize = pageSize
    }
    const pageCount = computed(() => {
        const count = Math.ceil(state.tableData.length / state.pageSize)
        if (state.pageIndex > count) { state.pageIndex = count }
        return count
    })
    const page = computed(() => {
        if (state.pageIndex <= pageCount.value) {
            const start = state.pageIndex * state.pageSize - state.pageSize
            const end = state.pageSize * state.pageIndex
            return state.tableData.slice(start, end)
        }
        return state.tableData.slice(0, state.pageSize)
    })

    const nextPage = () => {
        if ((state.pageIndex + 1) <= pageCount.value) {
            state.pageIndex++
        }
    }
    const previousPage = () => {
        if ((state.pageIndex - 1) > 0) {
            state.pageIndex--
        }
    }

    const goToPage = (pageIndex: number) => {
        if (pageIndex > 0 && pageIndex <= pageCount.value) {
            state.pageIndex = pageIndex
        }
    }
    const setPageSize = (pageSize: number) => {
        if (pageSize > 0 && pageSize <= state.tableData.length) {
            state.pageSize = pageSize
        }
    }
    return {
        ...toRefs(state),
        nextPage,
        previousPage,
        goToPage,
        setPageSize,
        pageCount,
        page
    }
}