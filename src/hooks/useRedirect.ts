import { useRouter } from "vue-router";

export default function useRedirect() {
    const router = useRouter()

    const redirectHome = () => {
        router.push({
            path: '/'
        })
    }
    const redirectSignIn = () => {
        router.push({
            path: '/signin'
        })
    }
    const redirectSignUp = () => {
        router.push({
            path: '/signup'
        })
    }
    const redirectFiles = () => {
        router.push({
            path: '/files'
        })
    }
    const redirectReports = () => {
        router.push({
            path: '/reports'
        })
    }
    return {
        redirectHome,
        redirectSignIn,
        redirectSignUp,
        redirectFiles,
        redirectReports,
    }
}