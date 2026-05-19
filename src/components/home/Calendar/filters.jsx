import {
    Button,
    Checkbox,
    CheckboxGroup,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverCloseButton,
    PopoverArrow,
    RadioGroup,
    Radio,
} from '@chakra-ui/react';
import { capitalizeFirstLetter } from '../../../utils/index';
import { useTask } from '../../../provider/taskProvider';

const FiltersComponent = () => {
    const { filters, setFilters, filterOptions, loading } = useTask();

    const handleFilterChange = (selectedValues, type) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: selectedValues,
        }));
    };

    if (loading) {
        return <div>Cargando...</div>;
    }
    return (
        <div className="flex items-center gap-3">
            {/* Tipos de tarea */}
            <Popover>
                <PopoverTrigger>
                    <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold tracking-wide shadow-sm transition-all duration-200 active:scale-98">
                        <span>Tipos</span>
                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="shadow-xl rounded-2xl border-slate-100">
                    <PopoverArrow />
                    <PopoverCloseButton className="top-3 right-3" />
                    <PopoverHeader className="font-bold border-b-slate-100 text-slate-700 py-3">Filtrar por Tipos</PopoverHeader>
                    <PopoverBody className="py-4">
                        <RadioGroup
                            value={filters.types}
                            onChange={(values) => handleFilterChange(values, 'types')}
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {filterOptions.types.map((e, index) => (
                                    <Radio
                                        key={`type-${e.codigo || index}`}
                                        value={e.codigo}
                                        className="whitespace-nowrap overflow-hidden text-sm"
                                        colorScheme="blue"
                                    >
                                        {e.codigod &&
                                            capitalizeFirstLetter(e.codigod.toLowerCase())}
                                    </Radio>
                                ))}
                                <Radio
                                    key="type-todos"
                                    value=""
                                    className="whitespace-nowrap overflow-hidden text-sm"
                                    colorScheme="blue"
                                >
                                    Todos
                                </Radio>
                            </div>
                        </RadioGroup>
                    </PopoverBody>
                </PopoverContent>
            </Popover>

            {/* Etiquetas */}
            <Popover>
                <PopoverTrigger>
                    <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold tracking-wide shadow-sm transition-all duration-200 active:scale-98">
                        <span>Etiquetas</span>
                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="shadow-xl rounded-2xl border-slate-100">
                    <PopoverArrow />
                    <PopoverCloseButton className="top-3 right-3" />
                    <PopoverHeader className="font-bold border-b-slate-100 text-slate-700 py-3">Filtrar por Etiquetas</PopoverHeader>
                    <PopoverBody className="py-4">
                        <CheckboxGroup
                            value={filters.tags}
                            onChange={(values) => handleFilterChange(values, 'tags')}
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {filterOptions.tags.map((e, index) => (
                                    <Checkbox
                                        key={`tag-${e || index}`}
                                        value={e}
                                        className="whitespace-nowrap overflow-hidden text-sm"
                                        colorScheme="blue"
                                    >
                                        {e && capitalizeFirstLetter(e.toLowerCase())}
                                    </Checkbox>
                                ))}
                            </div>
                        </CheckboxGroup>
                    </PopoverBody>
                </PopoverContent>
            </Popover>

            {/* Usuarios */}
            <Popover>
                <PopoverTrigger>
                    <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold tracking-wide shadow-sm transition-all duration-200 active:scale-98">
                        <span>Usuarios</span>
                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="shadow-xl rounded-2xl border-slate-100">
                    <PopoverArrow />
                    <PopoverCloseButton className="top-3 right-3" />
                    <PopoverHeader className="font-bold border-b-slate-100 text-slate-700 py-3">Filtrar por Usuarios</PopoverHeader>
                    <PopoverBody className="py-4">
                        <CheckboxGroup
                            value={filters.users}
                            onChange={(values) => handleFilterChange(values, 'users')}
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {filterOptions.users.map((e, index) => (
                                    <Checkbox
                                        key={`user-${e.codigo || index}`}
                                        value={e.codigo}
                                        className="whitespace-nowrap overflow-hidden text-sm"
                                        colorScheme="blue"
                                    >
                                        {e.denominacion &&
                                            capitalizeFirstLetter(e.denominacion.toLowerCase())}
                                    </Checkbox>
                                ))}
                            </div>
                        </CheckboxGroup>
                    </PopoverBody>
                </PopoverContent>
            </Popover>

            {/* Estados */}
            <Popover>
                <PopoverTrigger>
                    <button className="flex items-center justify-between gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-bold tracking-wide shadow-sm transition-all duration-200 active:scale-98">
                        <span>Estados</span>
                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="shadow-xl rounded-2xl border-slate-100">
                    <PopoverArrow />
                    <PopoverCloseButton className="top-3 right-3" />
                    <PopoverHeader className="font-bold border-b-slate-100 text-slate-700 py-3">Filtrar por Estados</PopoverHeader>
                    <PopoverBody className="py-4">
                        <RadioGroup
                            value={filters.status}
                            onChange={(values) => handleFilterChange(values, 'status')}
                        >
                            <div className="grid grid-cols-2 gap-2">
                                {filterOptions.status.map((e, index) => (
                                    <Radio
                                        key={`status-${e.codigo || index}`}
                                        value={e.codigo}
                                        className="whitespace-nowrap overflow-hidden text-sm"
                                        colorScheme="blue"
                                    >
                                        {e.codigod &&
                                            capitalizeFirstLetter(e.codigod.toLowerCase())}
                                    </Radio>
                                ))}
                                <Radio
                                    key="status-todos"
                                    value=""
                                    className="whitespace-nowrap overflow-hidden text-sm"
                                    colorScheme="blue"
                                >
                                    Todos
                                </Radio>
                            </div>
                        </RadioGroup>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FiltersComponent;
