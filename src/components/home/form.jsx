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
import { useState } from 'react';
import { createTaskService } from '../../service/tarea';
import dayjs from 'dayjs';
import { useTask } from '../../provider/taskProvider';
import { useNavigate } from 'react-router-dom';

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
        <div className="p-1 sm:p-2">
            <div className="bg-slate-50/50 rounded-2xl p-4 sm:p-6 border border-slate-100 shadow-sm">
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    {/* Tipo */}
                    <GridItem colSpan={1}>
                        <FormControl isRequired isInvalid={errors.selectedType}>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Tipo</FormLabel>
                            <Select
                                name='selectedType'
                                onChange={handleInputChange}
                                defaultValue={''}
                                className="bg-white border-slate-200 hover:border-slate-300 rounded-xl text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all shadow-sm"
                                focusBorderColor="#1b365d"
                            >
                                <option value='' disabled>Seleccione el tipo</option>
                                {filterOptions.types.map(type => (
                                    <option key={type.codigo} value={type.codigo}>{type.codigod}</option>
                                ))}
                            </Select>
                            {!errors.selectedType ? (
                                <FormHelperText className="text-[11px] text-slate-400">Seleccione el tipo de tarea.</FormHelperText>
                            ) : (
                                <FormErrorMessage>{errors.selectedType}</FormErrorMessage>
                            )}
                        </FormControl>
                    </GridItem>

                    {/* Asunto */}
                    <GridItem colSpan={{ base: 3, md: 2 }}>
                        <FormControl isRequired isInvalid={errors.title}>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Asunto</FormLabel>
                            <Input
                                type='text'
                                name='title'
                                value={formData.title}
                                onChange={handleInputChange} 
                                className="bg-white border-slate-200 hover:border-slate-300 rounded-xl text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all shadow-sm"
                                focusBorderColor="#1b365d"
                                placeholder="Ej: Revisión de informe trimestral..."
                            />
                            {!errors.title ? (
                                <FormHelperText className="text-[11px] text-slate-400">Introduce el asunto (mín. 10 caracteres).</FormHelperText>
                            ) : (
                                <FormErrorMessage>{errors.title}</FormErrorMessage>
                            )}
                        </FormControl>
                    </GridItem>

                    {/* Descripción */}
                    <GridItem colSpan={3}>
                        <FormControl isRequired isInvalid={errors.description}>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Descripción</FormLabel>
                            <Textarea
                                name='description'
                                value={formData.description}
                                onChange={handleInputChange} 
                                rows={4}
                                className="bg-white border-slate-200 hover:border-slate-300 rounded-xl text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all resize-y shadow-sm"
                                focusBorderColor="#1b365d"
                                placeholder="Describe los detalles de la tarea aquí..."
                            />
                            {!errors.description ? (
                                <FormHelperText className="text-[11px] text-slate-400">Introduce una descripción detallada.</FormHelperText>
                            ) : (
                                <FormErrorMessage>{errors.description}</FormErrorMessage>
                            )}
                        </FormControl>
                    </GridItem>

                    {/* Fecha */}
                    <GridItem colSpan={{ base: 3, md: 1 }}>
                        <FormControl isRequired isInvalid={errors.date}>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Fecha y Hora</FormLabel>
                            <Input
                                type='datetime-local'
                                name='date'
                                value={formData.date}
                                onChange={handleInputChange} 
                                className="bg-white border-slate-200 hover:border-slate-300 rounded-xl text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all shadow-sm"
                                focusBorderColor="#1b365d"
                            />
                            {!errors.date ? (
                                <FormHelperText className="text-[11px] text-slate-400">Fecha de publicación/vencimiento.</FormHelperText>
                            ) : (
                                <FormErrorMessage>{errors.date}</FormErrorMessage>
                            )}
                        </FormControl>
                    </GridItem>

                    {/* Tags */}
                    <GridItem colSpan={{ base: 3, md: 1 }}>
                        <FormControl isRequired isInvalid={errors.selectedTags}>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Etiquetas</FormLabel>
                            <Select
                                name='selectedTags'
                                onChange={handleSelectChange}
                                defaultValue={''}
                                className="bg-white border-slate-200 hover:border-slate-300 rounded-xl text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all shadow-sm"
                                focusBorderColor="#1b365d"
                            >
                                <option value='' disabled>Seleccione etiquetas</option>
                                {filterOptions.tags.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </Select>
                            {formData.selectedTags.length === 0 && (
                                <FormErrorMessage>{errors.selectedTags}</FormErrorMessage>
                            )}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {formData.selectedTags.map(value => (
                                    <Tag
                                        key={value}
                                        variant='subtle'
                                        colorScheme='blue'
                                        className="rounded-lg font-semibold"
                                    >
                                        <TagLabel>{value}</TagLabel>
                                        <TagCloseButton onClick={() => handleTagRemove('selectedTags', value)} />
                                    </Tag>
                                ))}
                            </div>
                        </FormControl>
                    </GridItem>

                    {/* Usuarios */}
                    <GridItem colSpan={{ base: 3, md: 1 }}>
                        <FormControl isRequired isInvalid={errors.selectedUsers}>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Usuarios Afectados</FormLabel>
                            <Select
                                name='selectedUsers'
                                onChange={handleSelectChange}
                                defaultValue={''}
                                className="bg-white border-slate-200 hover:border-slate-300 rounded-xl text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all shadow-sm"
                                focusBorderColor="#1b365d"
                            >
                                <option value='' disabled>Seleccione usuarios</option>
                                {filterOptions.users.map(user => (
                                    <option key={user.codigo} value={user.codigo}>{user.denominacion}</option>
                                ))}
                            </Select>
                            {formData.selectedUsers.length === 0 && (
                                <FormErrorMessage>{errors.selectedUsers}</FormErrorMessage>
                            )}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {formData.selectedUsers.map(value => (
                                    <Tag
                                        key={value}
                                        variant='subtle'
                                        colorScheme='indigo'
                                        className="rounded-lg font-semibold"
                                    >
                                        <TagLabel>{value}</TagLabel>
                                        <TagCloseButton onClick={() => handleTagRemove('selectedUsers', value)} />
                                    </Tag>
                                ))}
                            </div>
                        </FormControl>
                    </GridItem>

                    {/* Alcance (Conditional) */}
                    {formData.selectedType === '3' && (
                        <GridItem colSpan={{ base: 3, md: 1 }}>
                            <FormControl isRequired isInvalid={errors.alcance}>
                                <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Alcance</FormLabel>
                                <Input
                                    type='text'
                                    name='alcance'
                                    value={formData.alcance}
                                    onChange={handleInputChange} 
                                    className="bg-white border-slate-200 hover:border-slate-300 rounded-xl text-slate-800 focus:border-[#1b365d] focus:ring-1 focus:ring-[#1b365d] transition-all shadow-sm"
                                    focusBorderColor="#1b365d"
                                    placeholder="Defina el alcance..."
                                />
                                {!errors.alcance ? (
                                    <FormHelperText className="text-[11px] text-slate-400">Introduce el alcance de la tarea.</FormHelperText>
                                ) : (
                                    <FormErrorMessage>{errors.alcance}</FormErrorMessage>
                                )}
                            </FormControl>
                        </GridItem>
                    )}

                    {/* Privacidad */}
                    <GridItem colSpan={formData.selectedType === '3' ? { base: 3, md: 2 } : 3}>
                        <FormControl isRequired isInvalid={errors.selectedPriv}>
                            <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Privacidad</FormLabel>
                            <RadioGroup
                                onChange={(value) => setFormData({ ...formData, privado: Number(value) })}
                                value={formData.privado}
                            >
                                <Stack direction="row" spacing={8}>
                                    <Radio value={0} colorScheme="blue" className="border-slate-300">
                                        <span className="text-sm font-semibold text-slate-700">Pública (Global)</span>
                                    </Radio>
                                    <Radio value={1} colorScheme="blue" className="border-slate-300">
                                        <span className="text-sm font-semibold text-slate-700">Privada</span>
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                            {errors.selectedPriv && (
                                <FormErrorMessage>{errors.selectedPriv}</FormErrorMessage>
                            )}
                        </FormControl>
                    </GridItem>
                </Grid>

                <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="group relative overflow-hidden bg-[#1b365d] hover:bg-[#0f294a] active:bg-[#0a1c33] text-white py-3 px-8 rounded-xl text-sm font-bold tracking-wide shadow-lg shadow-indigo-950/20 flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5"
                    >
                        <span className="relative z-10">Crear Nueva Tarea</span>
                        <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormComponent;
