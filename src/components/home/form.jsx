import {
    Button,
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    FormErrorMessage,
    Textarea,
    GridItem,
    Grid,
    Select,
    Tag,
    TagLabel,
    TagCloseButton,
    useToast,
    RadioGroup,
    Stack,
    Radio
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { createTaskService } from '../../service/tarea';
import dayjs from 'dayjs';
import { useTask } from '../../provider/taskProvider';
import { useNavigate } from 'react-router-dom';

const CustomSelect = ({ label, placeholder, options, value, onChange, isInvalid, errorMsg, helperText, renderOptionLabel, isMulti }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => 
        typeof opt === 'object' ? opt.value === value : opt === value
    );

    // Filter options in real-time based on keyboard input
    const filteredOptions = options.filter(opt => {
        const labelStr = (typeof opt === 'object' ? opt.label : opt).toLowerCase();
        return labelStr.includes(searchTerm.toLowerCase());
    });

    const getInputValue = () => {
        if (isOpen) {
            return searchTerm;
        }
        if (isMulti) {
            return '';
        }
        if (selectedOption) {
            return typeof selectedOption === 'object' ? selectedOption.label : selectedOption;
        }
        return '';
    };

    const handleFocus = () => {
        setIsOpen(true);
        if (!isMulti && selectedOption) {
            setSearchTerm(typeof selectedOption === 'object' ? selectedOption.label : selectedOption);
        } else {
            setSearchTerm('');
        }
    };

    return (
        <FormControl isInvalid={isInvalid} ref={containerRef} className="relative">
            <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">{label}</FormLabel>
            
            <div className="relative w-full">
                <input
                    type="text"
                    value={getInputValue()}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={handleFocus}
                    placeholder={!isMulti && selectedOption ? (typeof selectedOption === 'object' ? selectedOption.label : selectedOption) : placeholder}
                    className={`w-full flex items-center justify-between pl-3 pr-8 py-1.5 bg-white border ${
                        isInvalid ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 focus:border-[#1b365d] focus:ring-[#1b365d]'
                    } hover:border-slate-300 rounded-2xl text-xs text-slate-700 font-semibold transition-all shadow-sm focus:outline-none focus:ring-1 h-[32px] placeholder-slate-400`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className="absolute left-0 z-50 w-full mt-1.5 bg-white border border-slate-100 shadow-xl rounded-2xl max-h-[160px] overflow-y-auto p-1.5 pr-1 scrollbar-custom">
                    <style>{`
                        .scrollbar-custom::-webkit-scrollbar {
                            width: 8px;
                        }
                        .scrollbar-custom::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .scrollbar-custom::-webkit-scrollbar-thumb {
                            background-color: #94a3b8; /* slate-400: High Contrast */
                            border: 2px solid white; /* Elegant floating pill gutter */
                            border-radius: 9999px;
                        }
                        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
                            background-color: #475569; /* slate-600 */
                        }
                    `}</style>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt, index) => {
                            const optValue = typeof opt === 'object' ? opt.value : opt;
                            const optLabel = typeof opt === 'object' ? opt.label : opt;
                            const isSelected = optValue === value;

                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        onChange(optValue);
                                        setSearchTerm('');
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-3 py-1.5 text-xs rounded-xl transition-colors ${
                                        isSelected 
                                            ? 'bg-slate-100 font-bold text-slate-900' 
                                            : 'text-slate-700 hover:bg-slate-50 font-medium'
                                    }`}
                                >
                                    {optLabel}
                                </button>
                            );
                        })
                    ) : (
                        <div className="text-[10px] text-slate-400 py-2 px-3 font-semibold text-center uppercase tracking-wider">
                            Sin resultados
                        </div>
                    )}
                </div>
            )}

            {!isInvalid ? (
                helperText && <FormHelperText className="text-[10px] text-slate-400 mt-1">{helperText}</FormHelperText>
            ) : (
                errorMsg && <FormErrorMessage className="text-[10px] mt-1">{errorMsg}</FormErrorMessage>
            )}
        </FormControl>
    );
};

const FormComponent = () => {
    const navigate = useNavigate()
    const { filterOptions, loading } = useTask()
    const toast = useToast()
    const { triggerUpdate } = useTask();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        date: '',
        title: '',
        description: '',
        selectedTags: [],
        selectedType: '',
        selectedUsers: [],
        alcance: '',
        privado: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => {
            const selectedItems = [...prevFormData[name], value].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
            return {
                ...prevFormData,
                [name]: selectedItems
            };
        });
    };

    const handleCustomSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCustomMultiSelectChange = (name, value) => {
        setFormData(prevFormData => {
            const selectedItems = [...prevFormData[name], value].filter((v, i, a) => a.indexOf(v) === i);
            return {
                ...prevFormData,
                [name]: selectedItems
            };
        });
    };

    const handleTagRemove = (name, value) => {
        setFormData({
            ...formData,
            [name]: formData[name].filter(item => item !== value)
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.date) {
            newErrors.date = 'La fecha y hora son requeridos.';
        }

        if (!formData.title) {
            newErrors.title = 'El asunto es requerido.';
        } else if (formData.title.length < 10) {
            newErrors.title = 'El asunto debe tener un mínimo de 10 caracteres.';
        }

        if (!formData.description) {
            newErrors.description = 'La descripción es requerida.';
        } else if (formData.description.length < 10) {
            newErrors.description = 'La descripción debe tener un mínimo de 10 caracteres.';
        }

        if (!formData.selectedType) {
            newErrors.selectedType = 'El tipo es requerido.';
        }

        if (formData.selectedTags.length === 0) {
            newErrors.selectedTags = 'Al menos un tag es requerido.';
        }

        if (formData.selectedUsers.length === 0) {
            newErrors.selectedUsers = 'Al menos un usuario es requerido.';
        }

        if (formData.privado === null || formData.privado === undefined) {
            newErrors.selectedPriv = 'Debe seleccionar si quiere que la tarea sea privada o global.';
        }

        // Validación específica para alcance si el tipo es 3
        if (formData.selectedType === '3' && !formData.alcance) {
            newErrors.alcance = 'El alcance es requerido para este tipo de tarea.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const req = await createTaskService({
                    Usuario: localStorage.getItem('user'),
                    Sesion: localStorage.getItem('sesion'),
                    Asunto: formData.title,
                    Cuerpo: formData.description,
                    Fecha: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    Fechav: dayjs(formData.date).format('DD/MM/YYYY HH:mm:ss'),
                    Tag: formData.selectedTags.join(','),
                    Tarea: formData.selectedType,
                    Afecta: formData.selectedUsers.join(','),
                    Alcance: formData.alcance ? formData.alcance : 'todos',
                    Privado: formData.privado
                });

                triggerUpdate()

                // Mostrar toast de éxito
                toast({
                    title: 'Tarea Creada',
                    description: `La tarea se ha creado correctamente. Id: ${req.id}`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                })

                navigate(`/agenda-comunicacion/${req.id}`);
            } catch (error) {
                console.error('Error creating task:', error);
                // Mostrar toast de error
                toast({
                    title: 'Tarea no creada',
                    description: `Hubo un problema al crear la tarea. Por favor, inténtalo de nuevo. Id: ${error}`,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
                <div className="relative">
                    <svg className="animate-spin h-10 w-10 text-[#1b365d]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                        <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Cargando opciones...</p>
            </div>
        );
    }

    return (
        <div className="p-1">
            <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
                <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                    {/* Fila 1: Tipo, Asunto, Fecha y Hora (Elementos de igual altura) */}
                    <GridItem colSpan={{ base: 3, md: 1 }}>
                        <CustomSelect
                            label="Tipo"
                            placeholder="Seleccione el tipo"
                            options={filterOptions.types.map(type => ({ value: type.codigo, label: type.codigod }))}
                            value={formData.selectedType}
                            onChange={(val) => handleCustomSelectChange('selectedType', val)}
                            isInvalid={errors.selectedType}
                            errorMsg={errors.selectedType}
                            helperText="Seleccione el tipo de tarea."
                        />
                    </GridItem>

                    <GridItem colSpan={{ base: 3, md: 1 }}>
                        <FormControl isRequired isInvalid={errors.title}>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Asunto</FormLabel>
                            <Input
                                size="sm"
                                type='text'
                                name='title'
                                value={formData.title}
                                onChange={handleInputChange} 
                                borderRadius="2xl"
                                className="bg-white border-slate-200 hover:border-slate-300 text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all shadow-sm"
                                focusBorderColor="#1b365d"
                                placeholder="Ej: Revisión de informe..."
                            />
                            {!errors.title ? (
                                <FormHelperText className="text-[10px] text-slate-400 mt-1">Introduce el asunto.</FormHelperText>
                            ) : (
                                <FormErrorMessage className="text-[10px] mt-1">{errors.title}</FormErrorMessage>
                            )}
                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={{ base: 3, md: 1 }}>
                        <FormControl isRequired isInvalid={errors.date}>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Fecha y Hora</FormLabel>
                            <Input
                                size="sm"
                                type='datetime-local'
                                name='date'
                                value={formData.date}
                                onChange={handleInputChange} 
                                borderRadius="2xl"
                                className="bg-white border-slate-200 hover:border-slate-300 text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all shadow-sm"
                                focusBorderColor="#1b365d"
                            />
                            {!errors.date ? (
                                <FormHelperText className="text-[10px] text-slate-400 mt-1">Fecha de publicación.</FormHelperText>
                            ) : (
                                <FormErrorMessage className="text-[10px] mt-1">{errors.date}</FormErrorMessage>
                            )}
                        </FormControl>
                    </GridItem>

                    {/* Fila 2: Etiquetas, Usuarios Afectados, y Privacidad (o Alcance si Tipo es 3) */}
                    <GridItem colSpan={{ base: 3, md: 1 }}>
                        <CustomSelect
                            label="Etiquetas"
                            placeholder="Seleccione etiquetas"
                            options={filterOptions.tags}
                            value=""
                            onChange={(val) => handleCustomMultiSelectChange('selectedTags', val)}
                            isInvalid={formData.selectedTags.length === 0 && errors.selectedTags}
                            errorMsg={errors.selectedTags}
                            isMulti={true}
                        />
                        <div className="mt-2 flex flex-wrap gap-1.5 max-h-[70px] overflow-y-auto">
                            {formData.selectedTags.map(value => (
                                <Tag
                                    key={value}
                                    size="sm"
                                    variant='subtle'
                                    colorScheme='blue'
                                    borderRadius="lg"
                                    className="font-semibold"
                                >
                                    <TagLabel>{value}</TagLabel>
                                    <TagCloseButton onClick={() => handleTagRemove('selectedTags', value)} />
                                </Tag>
                            ))}
                        </div>
                    </GridItem>

                    <GridItem colSpan={{ base: 3, md: 1 }}>
                        <CustomSelect
                            label="Usuarios Afectados"
                            placeholder="Seleccione usuarios"
                            options={filterOptions.users.map(user => ({ value: user.codigo, label: user.denominacion }))}
                            value=""
                            onChange={(val) => handleCustomMultiSelectChange('selectedUsers', val)}
                            isInvalid={formData.selectedUsers.length === 0 && errors.selectedUsers}
                            errorMsg={errors.selectedUsers}
                            isMulti={true}
                        />
                        <div className="mt-2 flex flex-wrap gap-1.5 max-h-[70px] overflow-y-auto">
                            {formData.selectedUsers.map(value => (
                                <Tag
                                    key={value}
                                    size="sm"
                                    variant='subtle'
                                    colorScheme='indigo'
                                    borderRadius="lg"
                                    className="font-semibold"
                                >
                                    <TagLabel>{value}</TagLabel>
                                    <TagCloseButton onClick={() => handleTagRemove('selectedUsers', value)} />
                                </Tag>
                            ))}
                        </div>
                    </GridItem>

                    {/* Columna condicional en Fila 2: Alcance si Tipo 3, de lo contrario Privacidad */}
                    {formData.selectedType === '3' ? (
                        <GridItem colSpan={{ base: 3, md: 1 }}>
                            <FormControl isRequired isInvalid={errors.alcance}>
                                <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Alcance</FormLabel>
                                <Input
                                    size="sm"
                                    type='text'
                                    name='alcance'
                                    value={formData.alcance}
                                    onChange={handleInputChange} 
                                    borderRadius="2xl"
                                    className="bg-white border-slate-200 hover:border-slate-300 text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all shadow-sm"
                                    focusBorderColor="#1b365d"
                                    placeholder="Defina el alcance..."
                                />
                                {!errors.alcance ? (
                                    <FormHelperText className="text-[10px] text-slate-400 mt-1">Alcance de la tarea.</FormHelperText>
                                ) : (
                                    <FormErrorMessage className="text-[10px] mt-1">{errors.alcance}</FormErrorMessage>
                                )}
                            </FormControl>
                        </GridItem>
                    ) : (
                        <GridItem colSpan={{ base: 3, md: 1 }}>
                            <FormControl isRequired isInvalid={errors.selectedPriv}>
                                <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Privacidad</FormLabel>
                                <RadioGroup
                                    onChange={(value) => setFormData({ ...formData, privado: Number(value) })}
                                    value={formData.privado}
                                    className="h-[32px] flex items-center"
                                >
                                    <Stack direction="row" spacing={6}>
                                        <Radio value={0} size="sm" colorScheme="blue" className="border-slate-300">
                                            <span className="text-xs font-semibold text-slate-700">Pública (Global)</span>
                                        </Radio>
                                        <Radio value={1} size="sm" colorScheme="blue" className="border-slate-300">
                                            <span className="text-xs font-semibold text-slate-700">Privada</span>
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                                {errors.selectedPriv && (
                                    <FormErrorMessage className="text-[10px] mt-1">{errors.selectedPriv}</FormErrorMessage>
                                )}
                            </FormControl>
                        </GridItem>
                    )}

                    {/* Fila 3: Descripción (Ancho completo) */}
                    <GridItem colSpan={3}>
                        <FormControl isRequired isInvalid={errors.description}>
                            <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Descripción</FormLabel>
                            <Textarea
                                size="sm"
                                name='description'
                                value={formData.description}
                                onChange={handleInputChange} 
                                rows={2}
                                borderRadius="2xl"
                                className="bg-white border-slate-200 hover:border-slate-300 text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all resize-y shadow-sm"
                                focusBorderColor="#1b365d"
                                placeholder="Describe los detalles de la tarea aquí..."
                            />
                            {errors.description && (
                                <FormErrorMessage className="text-[10px] mt-1">{errors.description}</FormErrorMessage>
                            )}
                        </FormControl>
                    </GridItem>

                    {/* Fila 4 Condicional: Privacidad si Tipo es 3 (ya que Alcance ocupó su lugar en la Fila 2) */}
                    {formData.selectedType === '3' && (
                        <GridItem colSpan={3}>
                            <FormControl isRequired isInvalid={errors.selectedPriv}>
                                <FormLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Privacidad</FormLabel>
                                <RadioGroup
                                    onChange={(value) => setFormData({ ...formData, privado: Number(value) })}
                                    value={formData.privado}
                                    className="h-[32px] flex items-center"
                                >
                                    <Stack direction="row" spacing={6}>
                                        <Radio value={0} size="sm" colorScheme="blue" className="border-slate-300">
                                            <span className="text-xs font-semibold text-slate-700">Pública (Global)</span>
                                        </Radio>
                                        <Radio value={1} size="sm" colorScheme="blue" className="border-slate-300">
                                            <span className="text-xs font-semibold text-slate-700">Privada</span>
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                                {errors.selectedPriv && (
                                    <FormErrorMessage className="text-[10px] mt-1">{errors.selectedPriv}</FormErrorMessage>
                                )}
                            </FormControl>
                        </GridItem>
                    )}
                </Grid>

                <div className="mt-5 pt-4 border-t border-slate-200 flex justify-end">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="group relative overflow-hidden bg-[#1b365d] hover:bg-[#0f294a] active:bg-[#0a1c33] text-white py-2 px-6 rounded-xl text-xs font-bold tracking-wide shadow-md shadow-indigo-950/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                    >
                        <span className="relative z-10">Crear Nueva Tarea</span>
                        <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;
