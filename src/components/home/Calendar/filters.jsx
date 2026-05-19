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
    Portal,
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
        return <div className="text-xs font-semibold text-slate-500 animate-pulse">Cargando filtros...</div>;
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-wrap gap-3">
                {/* Tipos de tarea */}
                <div className="flex flex-col min-w-[110px]">
                    <Popover>
                        <PopoverTrigger>
                            <Button 
                                size="sm" 
                                className="bg-slate-100 hover:bg-slate-200/60 border border-slate-200/80 text-slate-700 font-bold text-xs tracking-tight rounded-xl px-3 py-2 transition-all flex items-center justify-between gap-2 shadow-xs group"
                            >
                                <span>Tipos</span>
                                <svg className="w-2.5 h-2.5 text-slate-400 group-hover:text-[#1b365d] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent zIndex={1500} className="border border-slate-200/80 shadow-2xl rounded-2xl p-3 bg-white/95 backdrop-blur-md">
                                <PopoverArrow />
                                <PopoverCloseButton className="text-slate-400 hover:text-slate-600 rounded-lg" />
                                <PopoverHeader className="border-b-0 pb-2 font-bold text-slate-800 text-xs uppercase tracking-wider font-sans">
                                    Filtrar por Tipo
                                </PopoverHeader>
                                <PopoverBody>
                                    <RadioGroup
                                        value={filters.types}
                                        onChange={(values) => handleFilterChange(values, 'types')}
                                    >
                                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                                            {filterOptions.types.map((e, index) => (
                                                <Radio
                                                    key={`type-${e.codigo || index}`}
                                                    value={e.codigo}
                                                    colorScheme="blue"
                                                    size="sm"
                                                    className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                                                >
                                                    <span className="text-xs">
                                                        {e.codigod && capitalizeFirstLetter(e.codigod.toLowerCase())}
                                                    </span>
                                                </Radio>
                                            ))}
                                            <Radio
                                                key="type-todos"
                                                value=""
                                                colorScheme="blue"
                                                size="sm"
                                                className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                                            >
                                                <span className="text-xs font-semibold text-[#1b365d]">Todos</span>
                                            </Radio>
                                        </div>
                                    </RadioGroup>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </div>

                {/* Etiquetas */}
                <div className="flex flex-col min-w-[110px]">
                    <Popover>
                        <PopoverTrigger>
                            <Button 
                                size="sm" 
                                className="bg-slate-100 hover:bg-slate-200/60 border border-slate-200/80 text-slate-700 font-bold text-xs tracking-tight rounded-xl px-3 py-2 transition-all flex items-center justify-between gap-2 shadow-xs group"
                            >
                                <span>Etiquetas</span>
                                <svg className="w-2.5 h-2.5 text-slate-400 group-hover:text-[#1b365d] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent zIndex={1500} className="border border-slate-200/80 shadow-2xl rounded-2xl p-3 bg-white/95 backdrop-blur-md">
                                <PopoverArrow />
                                <PopoverCloseButton className="text-slate-400 hover:text-slate-600 rounded-lg" />
                                <PopoverHeader className="border-b-0 pb-2 font-bold text-slate-800 text-xs uppercase tracking-wider font-sans">
                                    Filtrar por Etiquetas
                                </PopoverHeader>
                                <PopoverBody>
                                    <CheckboxGroup
                                        value={filters.tags}
                                        onChange={(values) => handleFilterChange(values, 'tags')}
                                    >
                                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                                            {filterOptions.tags.map((e, index) => (
                                                <Checkbox
                                                    key={`tag-${e || index}`}
                                                    value={e}
                                                    colorScheme="blue"
                                                    size="sm"
                                                    className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                                                >
                                                    <span className="text-xs">
                                                        {e && capitalizeFirstLetter(e.toLowerCase())}
                                                    </span>
                                                </Checkbox>
                                            ))}
                                        </div>
                                    </CheckboxGroup>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </div>

                {/* Usuarios */}
                <div className="flex flex-col min-w-[110px]">
                    <Popover>
                        <PopoverTrigger>
                            <Button 
                                size="sm" 
                                className="bg-slate-100 hover:bg-slate-200/60 border border-slate-200/80 text-slate-700 font-bold text-xs tracking-tight rounded-xl px-3 py-2 transition-all flex items-center justify-between gap-2 shadow-xs group"
                            >
                                <span>Usuarios</span>
                                <svg className="w-2.5 h-2.5 text-slate-400 group-hover:text-[#1b365d] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent zIndex={1500} className="border border-slate-200/80 shadow-2xl rounded-2xl p-3 bg-white/95 backdrop-blur-md">
                                <PopoverArrow />
                                <PopoverCloseButton className="text-slate-400 hover:text-slate-600 rounded-lg" />
                                <PopoverHeader className="border-b-0 pb-2 font-bold text-slate-800 text-xs uppercase tracking-wider font-sans">
                                    Filtrar por Usuarios
                                </PopoverHeader>
                                <PopoverBody>
                                    <CheckboxGroup
                                        value={filters.users}
                                        onChange={(values) => handleFilterChange(values, 'users')}
                                    >
                                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                                            {filterOptions.users.map((e, index) => (
                                                <Checkbox
                                                    key={`user-${e.codigo || index}`}
                                                    value={e.codigo}
                                                    colorScheme="blue"
                                                    size="sm"
                                                    className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                                                >
                                                    <span className="text-xs">
                                                        {e.denominacion && capitalizeFirstLetter(e.denominacion.toLowerCase())}
                                                    </span>
                                                </Checkbox>
                                            ))}
                                        </div>
                                    </CheckboxGroup>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </div>

                {/* Estados */}
                <div className="flex flex-col min-w-[110px]">
                    <Popover>
                        <PopoverTrigger>
                            <Button 
                                size="sm" 
                                className="bg-slate-100 hover:bg-slate-200/60 border border-slate-200/80 text-slate-700 font-bold text-xs tracking-tight rounded-xl px-3 py-2 transition-all flex items-center justify-between gap-2 shadow-xs group"
                            >
                                <span>Estados</span>
                                <svg className="w-2.5 h-2.5 text-slate-400 group-hover:text-[#1b365d] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent zIndex={1500} className="border border-slate-200/80 shadow-2xl rounded-2xl p-3 bg-white/95 backdrop-blur-md">
                                <PopoverArrow />
                                <PopoverCloseButton className="text-slate-400 hover:text-slate-600 rounded-lg" />
                                <PopoverHeader className="border-b-0 pb-2 font-bold text-slate-800 text-xs uppercase tracking-wider font-sans">
                                    Filtrar por Estados
                                </PopoverHeader>
                                <PopoverBody>
                                    <RadioGroup
                                        value={filters.status}
                                        onChange={(values) => handleFilterChange(values, 'status')}
                                    >
                                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                                            {filterOptions.status.map((e, index) => (
                                                <Radio
                                                    key={`status-${e.codigo || index}`}
                                                    value={e.codigo}
                                                    colorScheme="blue"
                                                    size="sm"
                                                    className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                                                >
                                                    <span className="text-xs">
                                                        {e.codigod && capitalizeFirstLetter(e.codigod.toLowerCase())}
                                                    </span>
                                                </Radio>
                                            ))}
                                            <Radio
                                                key="status-todos"
                                                value=""
                                                colorScheme="blue"
                                                size="sm"
                                                className="whitespace-nowrap overflow-hidden overflow-ellipsis"
                                            >
                                                <span className="text-xs font-semibold text-[#1b365d]">Todos</span>
                                            </Radio>
                                        </div>
                                    </RadioGroup>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default FiltersComponent;
