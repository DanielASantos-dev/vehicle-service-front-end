interface CardInfoProps {
    className?: string
    title: string
    width?: string
    value: string
}

export default function CardInfo(props: CardInfoProps) {

    return (
        <div className={`${props.className}  text-start`} >
            <span className="text-[0.7rem] text-gray-400">{props.title}</span>
            <div className={`
                flex items-center ${props.width ?? "w-[240px]"} bg-white py-1  
                shadow-sm rounded-sm border-[#E5E5E5] h-7
            `}>
                <span className="px-2">{props.value}</span>
            </div>
        </div>
    )
}