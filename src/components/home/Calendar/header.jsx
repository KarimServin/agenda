import LogoutButton from "../../buttons/LogoutButton";
import FiltersComponent from "./filters";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDate } from "../../../provider/dateProvider";
import {
    Button,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger
} from '@chakra-ui/react';
import CreateTask from "../../buttons/CreateTask";
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useState } from "react";
import ToggleButtonGroup from "../../buttons/ToggleButtonGroup"; // Importa el nuevo componente

dayjs.locale('es');

const Header = () => {
    const { currentDate, setCurrentDate } = useDate();
    const [selectedYear, setSelectedYear] = useState(currentDate.year());

    const goToPreviousMonth = () => {
        setCurrentDate(currentDate.subtract(1, 'month'));
    };

    const goToNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
    };

    const goToPreviousYear = () => {
        setSelectedYear(selectedYear - 1);
    };

    const goToNextYear = () => {
        setSelectedYear(selectedYear + 1);
    };

    const formatMonthYear = (date) => {
        const month = date.format('MMMM');
        return month.charAt(0).toUpperCase() + month.slice(1) + ' ' + date.format('YYYY');
    };

    const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const monthsOfYear = Array.from({ length: 12 }, (_, i) => dayjs().month(i).year(selectedYear));

    const selectMonth = (monthIndex) => {
        const newDate = dayjs().year(selectedYear).month(monthIndex);
        setCurrentDate(newDate);
    };

    return (
        <Popover>
            <div className="bg-slate-50/90 backdrop-blur-md border-b border-slate-200/70 shadow-xs">
                {/* Upper bar with filters, navigation and actions */}
                <div className="grid grid-cols-5 items-center px-6 py-4 gap-4">
                    {/* Left - Filters */}
                    <div className="col-span-2 flex items-center">
                        <FiltersComponent />
                    </div>

                    {/* Center - Elegant Month/Year Navigator Capsule */}
                    <div className="col-span-1 flex items-center justify-center">
                        <div className="inline-flex items-center bg-slate-100/80 border border-slate-200/60 p-1 rounded-full shadow-inner transition-all hover:bg-slate-200/40">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={goToPreviousMonth}
                                className="rounded-full h-8 w-8 min-w-0 p-0 hover:bg-white hover:shadow-xs text-slate-600 hover:text-[#1b365d] transition-all"
                            >
                                <FaChevronLeft size={12} />
                            </Button>
                            
                            <PopoverTrigger>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className="h-8 px-4 text-sm font-bold text-slate-700 hover:text-[#1b365d] hover:bg-white hover:shadow-xs rounded-full font-sans tracking-tight transition-all flex items-center gap-1.5"
                                >
                                    <span>{formatMonthYear(currentDate)}</span>
                                    <svg className="w-3 h-3 text-slate-400 group-hover:text-[#1b365d] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </Button>
                            </PopoverTrigger>
                            
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={goToNextMonth}
                                className="rounded-full h-8 w-8 min-w-0 p-0 hover:bg-white hover:shadow-xs text-slate-600 hover:text-[#1b365d] transition-all"
                            >
                                <FaChevronRight size={12} />
                            </Button>
                        </div>
                    </div>

                    {/* Right - Action Buttons */}
                    <div className="col-span-2 flex items-center justify-end gap-3">
                        <ToggleButtonGroup />
                        <CreateTask />
                        <LogoutButton />
                    </div>
                </div>

                {/* Days of the week row - High-end style */}
                <div className="grid grid-cols-7 items-center bg-slate-100/40 border-t border-slate-200/50 py-2.5">
                    {daysOfWeek.map((day, index) => (
                        <div
                            key={index}
                            className="text-center text-[11px] font-bold uppercase tracking-widest text-slate-500/90 font-sans"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Styled Popover Content for month selector */}
                <PopoverContent className="border border-slate-200/80 shadow-2xl rounded-2xl p-4 bg-white/95 backdrop-blur-md">
                    <PopoverArrow />
                    <PopoverCloseButton className="text-slate-400 hover:text-slate-600 rounded-lg" />
                    <PopoverHeader className="border-b-0 pb-3 font-bold text-slate-800 text-sm tracking-tight text-center font-sans">
                        Seleccionar Período
                    </PopoverHeader>
                    <PopoverBody>
                        <div className="flex flex-col items-center">
                            {/* Year switcher */}
                            <div className="flex items-center justify-between w-full bg-slate-50 border border-slate-200/50 rounded-xl px-2 py-1 mb-4">
                                <Button 
                                    variant="ghost" 
                                    size="xs" 
                                    onClick={goToPreviousYear}
                                    className="rounded-lg hover:bg-white hover:shadow-xs text-slate-500 hover:text-[#1b365d]"
                                >
                                    <FaChevronLeft size={10} />
                                </Button>
                                <span className="text-sm font-extrabold text-slate-700 tracking-tight">{selectedYear}</span>
                                <Button 
                                    variant="ghost" 
                                    size="xs" 
                                    onClick={goToNextYear}
                                    className="rounded-lg hover:bg-white hover:shadow-xs text-slate-500 hover:text-[#1b365d]"
                                >
                                    <FaChevronRight size={10} />
                                </Button>
                            </div>
                            
                            {/* Months Grid */}
                            <div className="grid grid-cols-3 gap-2 w-full">
                                {monthsOfYear.map((month, index) => {
                                    const isCurrent = month.format('MM/YYYY') === currentDate.format('MM/YYYY');
                                    return (
                                        <Button
                                            key={index}
                                            onClick={() => selectMonth(index)}
                                            variant="ghost"
                                            size="sm"
                                            className={`rounded-xl text-xs font-semibold py-2 transition-all ${
                                                isCurrent 
                                                ? "bg-[#1b365d] text-white hover:bg-[#0f294a] shadow-md shadow-indigo-950/10" 
                                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                                            }`}
                                        >
                                            {month.format('MMMM').charAt(0).toUpperCase() + month.format('MMMM').slice(1)}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </PopoverBody>
                </PopoverContent>
            </div>
        </Popover>
    );
};

export default Header;
