export function VideoViewer() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-purple-100 overflow-y-auto">

            <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                allowFullScreen
                className="w-[80%] h-[70%]">
            </iframe>

            <ul className="w-[80%] mt-4">
                
            </ul>

        </div>
    )
}