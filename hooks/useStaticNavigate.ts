import { useRouter } from "next/router";
import { IS_REDIRECTED } from "types/auth";
import { EStaticProtectedRoutes } from "types/config";

export default function useStaticNavigate() {
    const {push} = useRouter();

    return (path: EStaticProtectedRoutes) => push(`${path}?${IS_REDIRECTED}=true`) 
}