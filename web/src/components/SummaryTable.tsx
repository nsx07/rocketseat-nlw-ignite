import { HabitDay } from "./HabitDay"

export function SummaryTable() {

    const weekDays = ['D','S','T','Q','Q','S','S']

    return (
        <div className="w-full flex ">
            <div className="grid grid-rows-7 grid-flw-row gap-3">
                {weekDays.map((weekDay, index) => {
                    return (
                        <div key={`${weekDay} - ${index}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"> 
                            {weekDay} 
                        </div>
                    )
                })}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                
                <HabitDay completed={5}/>
                <HabitDay completed={1}/>
                <HabitDay completed={2}/>
                <HabitDay completed={8}/>
                <HabitDay completed={5}/>
                <HabitDay completed={1}/>
                <HabitDay completed={2}/>
                <HabitDay completed={8}/>
                <HabitDay completed={5}/>
                <HabitDay completed={1}/>
                <HabitDay completed={2}/>
                <HabitDay completed={8}/>
                <HabitDay completed={5}/>
                <HabitDay completed={1}/>
                <HabitDay completed={2}/>
                <HabitDay completed={8}/>
                <HabitDay completed={5}/>
                <HabitDay completed={1}/>
                <HabitDay completed={2}/>
                <HabitDay completed={8}/>

            </div>

        </div>
    )
}