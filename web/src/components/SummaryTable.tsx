import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { HabitDay } from "./HabitDay"
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";

interface Summary {
    id : string
    date : string
    amount : number
    completed : number
}

export function SummaryTable() {

    const minimunDates = 18 * 7;
    const weekDays = ['D','S','T','Q','Q','S','S'];
    const summaryDates = generateDatesFromYearBeginning();
    const amountOfDaysToFill = minimunDates - summaryDates.length;

    // console.log(summaryDates);
    const rand = () => {
        return Math.random() * 10
    }
    const [summary, setSummary] = useState<Summary[]>([])
    

    useEffect(() => {
        api.get("summary").then(
            res => {
                console.log(res.data)
                setSummary(res.data) 
            }
        )
    }, [])

    return (
        <div className="w-full flex ">
            <div className="grid grid-rows-7 grid-flw-row gap-3">
                {weekDays.map((weekDay, index) => {
                    return (
                        <div key={`${uuidv4()}`} 
                        className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"> 
                            {weekDay} 
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                
                {summaryDates.map(date => {
                    const dayInSummary = summary.find(day => {
                        return dayjs(date).isSame(day.date, "day")
                    })

                    return (
                        <HabitDay key={uuidv4()} 
                            completed={dayInSummary?.completed} 
                            amount={dayInSummary?.amount} 
                            date={date}/>
                    )
                })}

                { amountOfDaysToFill > 0 && Array.from({length : amountOfDaysToFill}).map(() => {
                    return (
                        <div key={uuidv4()} className={`w-10 h-10 bg-zinc-900 border-2 rounded-lg border-zinc-800 opacity-40 cursor-not-allowed`} />
                    )
                })}

            </div>

        </div>
    )
}