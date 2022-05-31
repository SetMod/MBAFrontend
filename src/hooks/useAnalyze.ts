import { reactive, toRefs } from "vue";

export interface IAnalyzeState {
    support: number
    lift: number
    confidence: number
    ruleLength: number
    result: string
}

const state = reactive<IAnalyzeState>({
    support: 0.1,
    lift: 0.1,
    confidence: 0.1,
    ruleLength: 2,
    result: ''
})

export default function useAnalyze() {
    const setSupport = (support: number) => {
        state.support = support
        console.log(state.support);
    }
    const setLift = (lift: number) => {
        state.lift = lift
        console.log(state.lift);
    }
    const setRuleLength = (ruleLength: number) => {
        state.ruleLength = ruleLength
        console.log(state.ruleLength);
    }
    const setConfidence = (confidence: number) => {
        state.confidence = confidence
        console.log(state.confidence);
    }
    const submitAnalyze = () => {
        console.log(state);
    }
    return {
        ...toRefs(state),
        submitAnalyze,
        setRuleLength,
        setSupport,
        setLift,
        setConfidence,
    }
}
