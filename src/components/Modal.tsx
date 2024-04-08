import { useEffect } from "react";
import ButtonForm from "./ButtonForm";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    isAction?: boolean
    action?: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal(props: ModalProps) {
    const { isOpen, onClose, title, children, isAction, action } = props

    function execAction() {
        action!()
        onClose()
    }

    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => e.key === 'Escape' ? onClose() : null;
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => document.body.removeEventListener('keydown', closeOnEscapeKey);
    }, [onClose]);
    const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex w-auto flex-col"
            onClick={onClose}
        >
            <div
                className="relative md:p-8 p-5 bg-white w-auto max-w-md m-auto flex-col flex rounded-lg items-center dark:bg-[#eee] dark:text-gray-700"
                onClick={handleModalClick}
            >
                {isAction ?? false ? (<><div className="flex">
                    <h2 className="text-[1rem] font-semibold text-red-600">Atenção</h2>
                </div>
                    <div className="mt-4">
                        {children}
                    </div>
                    <div className="flex">
                        <ButtonForm name="Cancelar" bgColor="bg-red-600" onClick={onClose} width="w-[150px]" className="mr-2" />
                        <ButtonForm name="Confirmar" onClick={execAction} width="w-[150px]" className="ml-2" />
                    </div></>) : (
                    <>
                        <div className="flex">
                            <h2 className="text-[1rem] font-semibold">{title}</h2>
                        </div>
                        <div className="mt-4">
                            {children}
                        </div>
                        <div>
                            <ButtonForm name="Fechar" onClick={onClose} width="w-[250px]" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

