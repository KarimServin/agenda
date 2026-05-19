import Header from "./Calendar/header.jsx";
import Calendar from "./Calendar/calendar.jsx";
import { checkLoginService } from "../../service/sesion/index.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from "dayjs";
import { useTask } from "../../provider/taskProvider.jsx";
dayjs.extend(customParseFormat);

const Home = () => {
    const navigate = useNavigate()
    const { refreshFilters } = useTask();

    const getSesion = async () => {
        const req = await checkLoginService()
        if (req.Errorid === '92') {
            navigate("/")
        }
    }

    useEffect(() => {
        getSesion()
        // Load filter options (types, tags, users, status) for existing sessions
        refreshFilters()
    }, []);

    return (
        <div className="h-full w-full overflow-x-hidden">
            <div>
                <Header />
            </div>
            <div>
                <Calendar />
            </div>
        </div>
    );
}

export default Home;