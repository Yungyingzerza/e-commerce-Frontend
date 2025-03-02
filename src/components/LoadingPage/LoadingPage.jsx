export default function LoadingPage() {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black/50">
            <span className="loading loading-spinner text-error"></span>
        </div>
    )
}