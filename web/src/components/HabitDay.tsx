import * as Popover from "@radix-ui/react-popover";
import dayjs from "dayjs";
import { ProgressBar } from "./ProgressBar";
import clsx from "clsx";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface HabitProps {
    completed? : number
    amount? : number
    date : Date
}

export enum daysEnum {
    "Domingo" = 0,
    "Segunda" = 1,
    "Terça" = 2,
    "Quarta" = 3,
    "Quinta" = 4,
    "Sexta" = 5,
    "Sábado" = 6
}

export function HabitDay({completed = 0, amount = 0, date} : HabitProps) {

    const completePercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

    return (
        <Popover.Root>
            <Popover.Trigger className={clsx("w-10 h-10 bg-zinc-900 border-2 rounded-lg border-zinc-800", {
                    "bg-violet-900 border-violet-800" : completePercentage > 80,
                    "bg-violet-800 border-violet-700" : completePercentage > 60 && completePercentage < 80,
                    "bg-violet-700 border-violet-600" : completePercentage > 40 && completePercentage < 60,
                    "bg-violet-600 border-violet-500" : completePercentage > 20 && completePercentage < 40,
                    "bg-zinc-900 border-zinc-800" : completePercentage < 20,
                })} />
            
            <Popover.Portal>
                <Popover.Content className="min-w-[320px] w-full p-6 rounded-2xl bg-zinc-900 flex flex-col">

                    <span className="font-semibold text-zinc-400">{daysEnum[dayjs(date).day()]}</span>
                    <span className="mt-1 font-extrabold leading-tight text-3xl"> {dayjs(date).format("DD/MM")} </span>

                    <ProgressBar progress={completePercentage}/>

                    <div className="mt-6 flex flex-col gap-3">
                        <Checkbox.Root className="flex items-center gap-3 group">

                            <div className="h-8 w-8 rounded-lg flex items-center justify-center  bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white"></Check>
                                </Checkbox.Indicator>
                            </div>

                            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:text-opacity-50 group-data-[state=checked]:line-through">
                                Beber água
                            </span>

                        </Checkbox.Root>
                    </div>

                    <Popover.Arrow height={10} width={10} className="fill-zinc-900" />
                </Popover.Content>
            </Popover.Portal>

        </Popover.Root>
    )
}