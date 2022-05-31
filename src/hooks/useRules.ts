import { reactive, toRefs } from 'vue'

export interface IRule {
    rule: string
}

export interface IRulesState {
    rules: IRule[];
}

const state = reactive<IRulesState>({
    rules: new Array<IRule>()
})

export default function useRules() {
    const setRules = (rules: IRule[]) => {
        state.rules = rules
    }
    return {
        ...toRefs(state),
        setRules
    }
}
