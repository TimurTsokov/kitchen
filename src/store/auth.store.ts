import {create} from "zustand" // типа редакса только легче
import {Session} from "next-auth";
type SessionStatus = "authenticated" | "loading" | "unauthenticated"
interface AuthState {
    isAuth: boolean,
    status: SessionStatus,
    session: Session | null,
    setAuthState: (state: SessionStatus, session: Session | null) => void,
}
export const useAuthStore = create<AuthState>((set) => ({
    isAuth: false,
    status: "loading",
    session: null,
    setAuthState: (status: SessionStatus, session: Session | null) =>
        set({ // записывание в стор значений
            isAuth: status === "authenticated",
            status,
            session
        })
}))