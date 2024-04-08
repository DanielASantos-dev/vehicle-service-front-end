interface ButtonFormProps {
    name: string
    type?: "button" | "submit" | "reset";
    onClick: () => void,
    bgColor?: string
    bgColorHover?: string
    width?: string
    textColor?: string
    textSize?: string
    className?: string
    disable?: boolean
}

export default function ButtonForm(props: ButtonFormProps) {
    return (
        <button type={props.type ?? "button"}
            disabled={props.disable ?? false}
            onClick={() => props.onClick()}
            className={` 
            flex items-center justify-center hover:opacity-70
            ${props.width ?? "sm:w-[100%]"} h-12 btn-form ${props.disable ? props.bgColor ?? "bg-gray-300" : props.bgColor ?? "bg-green-700"}
             ${props.textColor ?? "text-white "}
            ${props.textSize ?? "text-[0.8rem]"}
            ${props.className ?? ""} 
            
        `}>{props.name}</button>
    )
}