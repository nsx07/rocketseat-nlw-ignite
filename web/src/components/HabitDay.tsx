import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";

interface HabitProps {
    completed : number
    amount : number
    date : Date
}

export enum days {
    "Domingo" = 0,
    "Segunda" = 1,
    "Terça" = 2,
    "Quarta" = 3,
    "Quinta" = 4,
    "Sexta" = 5,
    "Sábado" = 6
}

export function HabitDay(props : HabitProps) {

    const completePercentage = Math.round((props.completed / props.amount) * 100);

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx("w-10 h-10 bg-zinc-900 border-2 rounded-lg border-zinc-800", {
                    "bg-violet-900 border-violet-800" : completePercentage > 80,
                    "bg-violet-800 border-violet-700" : completePercentage > 60 && completePercentage < 80,
                    "bg-violet-700 border-violet-600" : completePercentage > 40 && completePercentage < 60,
                    "bg-violet-600 border-violet-500" : completePercentage > 20 && completePercentage < 40,
                    "bg-violet-400 border-violet-300" : completePercentage < 20,
                    "bg-zinc-900 border-zinc-800" : completePercentage === 0,
                })} />
            
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col">

                    <span className="font-semibold text-zinc-400">{days[dayjs(props.date).day()]}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl"> {dayjs(props.date).format("DD/MM")} </span>

                    <ProgressBar progress={completePercentage}/>

                    <Popover.Arrow height={10} width={10} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>

        </Popover.Root>
    )
}