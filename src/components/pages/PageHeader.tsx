type PageHeaderProps = {
    title: string;
    subtitle: string;
    buttonElement?: React.ReactNode;
    buttonText?: string;
    buttonTextColor?: string;
    handleShow?: () => void;
    state?: boolean;
    elementToShow?: React.ReactNode;
    theresButton: boolean
}


export function PageHeader({ title, subtitle, handleShow, buttonElement, buttonText, buttonTextColor, state, elementToShow, theresButton }: PageHeaderProps) {
    return (
        <header className="flex w-[80%] mx-auto h-15 items-center justify-between text-[#292524]">

                <h2 className="text-2xl font-bold tracking-tight">
                    {title}
                </h2>

            {theresButton && <button
                className="flex items-center justify-center gap-2 rounded-xl bg-[#292524] px-4 py-2.5 text-xs font-semibold text-[#D3CDBE] shadow-lg shadow-[#292524]/20 transition-all hover:-translate-y-0.5 hover:bg-[#44403C] hover:shadow-xl active:translate-y-0"
                onClick={handleShow}>
                {buttonElement}
                <span className={buttonTextColor ? buttonTextColor : "text-[#D3CDBE]"}>
                    {buttonText}
                </span>
            </button>
            }

            {state && elementToShow
            }

        </header>
    )
}