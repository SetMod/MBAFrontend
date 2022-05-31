import { reactive, toRefs } from "vue"

export interface IFileState {
  file: File | null
}

const state = reactive<IFileState>({
  file: null
})

export default function useFile() {
  const setFile = (file?: File) => {
    if (file) {
      state.file = file
    } else {
      state.file = null
    }
  }
  return {
    ...toRefs(state),
    setFile,
  }
}
