import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { checkTaskService, statusTasksService, tagService, typesTasksService, usersService } from '../service/tarea';

dayjs.locale('es'); // Establecer locale en español

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({
        dateStart: "",
        dateEnd: "",
        tags: "",
        types: "",
        users: "",
        status: ""
    });
    const [filterOptions, setFilterOptions] = useState({ tags: [], users: [], types: [], status: [] });

    const isMounted = useRef(false);

    const getFilters = useCallback(async () => {
        // Only fetch if there is an active session
        const user = localStorage.getItem('user');
        const sesion = localStorage.getItem('sesion');
        if (!user || !sesion) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true)
            const tags = await tagService();
            const users = await usersService();
            const types = await typesTasksService();
            const status = await statusTasksService();
            setFilterOptions({ tags: tags.tags, users: users.items, types: types.items, status: status.items });
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, []);

    // Función para obtener las tareas según los filtros
    const getTask = useCallback(async (filters) => {
        try {
            const req = await checkTaskService(
                filters.dateStart,
                filters.dateEnd,
                filters.tags,
                filters.types,
                filters.users,
                filters.status,
                "",
                "",
                "0",
                filters.privado
            );
            setTask(req.items);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const triggerUpdate = () => {
        getTask(filters);
    };

    // Called after login to populate filter options
    const refreshFilters = useCallback(() => {
        getFilters();
    }, [getFilters]);

    useEffect(() => {
        getFilters();
    }, [getFilters]);

    useEffect(() => {
        if (isMounted.current) {
            getTask(filters);
        } else {
            isMounted.current = true;
        }
    }, [filters, getTask]);

    return (
        <TaskContext.Provider value={{ task, loading, filters, filterOptions, setFilters, triggerUpdate, refreshFilters }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = () => {
    return useContext(TaskContext);
};
