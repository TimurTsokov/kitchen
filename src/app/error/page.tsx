"use client"

import {useSearchParams} from "next/navigation";

const ErrorPage = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get("message") || "Uncnoun error"
    return (
        <div className="flex justify-center items-center">
            <p className="text-red-600 text-xl">{message}</p>
        </div>
    )
}
export default ErrorPage;