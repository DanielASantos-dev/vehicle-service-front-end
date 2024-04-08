import React from 'react';

interface YearSelectProps {
    startYear: number;
    endYear: number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    selectItem?: number;
}

function YearSelect(props: YearSelectProps) {
    const { startYear, endYear, onChange, selectItem } = props;
    const years = Array.from({ length: endYear - startYear + 1 }, (v, k) => startYear + k);

    return (
        <select
            title='Year'
            className="text-gray-700 border-2 border-gray-200 w-auto"
            onChange={onChange}
            defaultValue={selectItem ?? ""}
        >
            <option value="" className='text-gray-500'>Todos</option>

            {years.map(year => (
                <option key={year} value={year} className='text-gray-500'>
                    {year}
                </option>
            ))}
        </select>
    );
}

export default YearSelect;
