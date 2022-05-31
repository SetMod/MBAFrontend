import { reactive, ref, toRefs } from "vue";
import useTable from "./useTable";

export interface ICSVState {
    csvFile: File | null
    data: Array<Record<string, string>>
    headers: Array<string>
    delimiter: string,
    isLoading: boolean,
    errorMsg: string
}

const state = reactive<ICSVState>({
    csvFile: null,
    data: new Array<Record<string, string>>(),
    headers: new Array<string>(),
    delimiter: ",",
    isLoading: false,
    errorMsg: ''
})

export default function useCSV(delimiter?: string) {
    const table = useTable(state.headers, state.data);
    if (delimiter) {
        state.delimiter = delimiter
    }

    const loadCSV = () => {
        state.isLoading = true
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            state.errorMsg = ''
            const CSVtext = fileReader.result
            if (typeof CSVtext === 'string') {
                const result = strToCSV(CSVtext)
                state.data = result.csv
                state.headers = result.headers
                table.tableData.value = state.data
                table.tableHeaders.value = state.headers
            }
            state.isLoading = false
        };
        fileReader.onerror = (event) => {
            if (event.target) {
                const name = event.target.error?.name
                const code = event.target.error?.code
                const message = event.target.error?.message
                state.errorMsg = `${name} ${code} ${message}`
            }
            state.isLoading = false
        }
        if (state.csvFile) fileReader.readAsText(state.csvFile);
    }

    const handleCSVChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files) { state.csvFile = target.files[0] }
    }

    const clearCSV = () => {
        // state.csvFile = null
        state.data = new Array<Record<string, string>>()
        state.headers = new Array<string>()
        table.tableData.value = state.data
        table.tableHeaders.value = state.headers
    }

    return {
        ...toRefs(state),
        handleCSVChange,
        loadCSV,
        clearCSV,
        table
    }
}

export const strToCSV = (textCSV: string, delimiter: string = ",") => {
    const headers = textCSV.slice(0, textCSV.indexOf("\n")).split(delimiter)
    const rows = textCSV.slice(textCSV.indexOf("\n") + 1).split("\n");
    const csv = rows.map(function (row: string) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
            object[header] = values[index];
            return object;
        }, {} as Record<string, string>);
        return el;
    });

    return { csv, headers, rows }
}