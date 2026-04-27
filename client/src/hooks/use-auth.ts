import { API } from "@/lib/axios-client";
import type { LoginType, RegisterType, UserType } from "@/types/auth.type"
import { toast } from "sonner";
import {create} from "zustand"
import {persist} from "zustand/middleware"
import { useSocket } from "./use-socket";

interface AuthState {
    user: UserType | null;
    isLogingIn: boolean;
    isSigningUp: boolean;
    isAuthStatusLoading: boolean;

    register: (data: RegisterType) => void;
    login: (data: LoginType) => void;
    logout: () => void;
    isAuthStatus: () => void;
}

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isSigningUp: false,
            isLogingIn: false,
            isAuthStatusLoading: false,

            register: async (data: RegisterType) => {
                set({ isSigningUp: true});
                try {
                    const response  = await API.post("/auth/register",data)
                    set({ user: response.data.user })
                    useSocket.getState().connetSocket();
                }catch (err: any) {
                    toast.error(err.response?.data?.message || "Register failed")
                } finally {
                    set({ isSigningUp: false})
                }
            },
            login: async (data: LoginType) => {
                set({ isLogingIn: true })
                try {
                    const response = await API.post("/auth/login",data);
                    set({ user: response.data.user });
                    useSocket.getState().connetSocket();
                }catch(err: any) {
                    toast.error(err.response?.data?.message || "Login failed")
                }finally {
                    set({ isLogingIn: false })
                }
            },
            logout: async () => {
                try {
                    await API.post("/auth/logout");
                    set({ user: null });
                    useSocket.getState().disconnectSocket();
                } catch (err: any) {
                    toast.error(err.response?.data?.message || "Login failed")
                    
                }
            },
            isAuthStatus: async () => {
                set({ isAuthStatusLoading: true })
                try {
                    const response = await API.get("/auth/status");
                    set({ user: response.data.user });
                    useSocket.getState().connetSocket();
                }catch(err: any) {
                    toast.error(err.response?.data?.message || "Authentication failed")
                    console.log(err);
                    //set({ user: null });
                }finally {
                    set({ isAuthStatusLoading: false })
                }
            },
        }), {
            name: "Conexa:root"
        }
    )
)