import React from 'react';
interface SelectBoxProps {
    fields: any[]
    onChange: (e: any) => void
    selectItem?: string
}
function SelectBox(props: SelectBoxProps) {
    const { fields, onChange, selectItem } = props
    return (
        <select defaultValue={selectItem ?? ""} title='Select|Box' className="text-gray-700 border-2 border-gray-200 w-auto" onChange={onChange}>
            <option value={""} className='text-gray-500'>Todos</option>
            {fields.map(({ key, value }) => (
                <option key={key} value={key} className='text-gray-500'>
                    {value}
                </option>
            ))}
        </select>
    );
}

export default SelectBox;
