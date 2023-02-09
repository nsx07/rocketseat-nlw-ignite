import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { daysEnum } from "./HabitDay";
import { v4 as uuidv4} from "uuid";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

export function NewHabitForm() {

    const Days = new Array(7).fill(0);
    const [title, setTitle] = useState('');
    const [weekDays, setWeekDays] = useState<number[]>([])

    function createNewHabit(event : FormEvent) {
        event.preventDefault();
        console.log(title,weekDays)

        if (title && weekDays.length) {
            api.post("habits", {title : title, weekDays : weekDays})
                .then( habitSave => {
                    alert("Hábito salvo com sucesso")
                    setTitle('');
                    setWeekDays([]);
                })
                .catch( err => {
                    alert("Erro ao salvar hábito")
                    console.error(err);
                })
        } else {
            alert("Formulário inválido!")
        }

    }

    const handlerToggleWeekDay = (weekDayIndex : number) => {
        if (weekDays.includes(weekDayIndex)) {
            const weekDayWithoutThis = weekDays.filter(weekDay => weekDay !== weekDayIndex)
            setWeekDays(weekDayWithoutThis);
        } else {
            const weekDaysWithThis = [...weekDays, weekDayIndex]
            setWeekDays(weekDaysWithThis);
        }
    }

    return (
        <form onSubmit={createNewHabit} className="w-full flex flex-col mt-6 ">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input 
                type="text"
                id="title"
                value={title}
                placeholder="ex... : Exercícios, dormir bem, etc..."
                onChange={event => setTitle(event.target.value)}
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência ? 
            </label>

            <div className="mt-6 flex flex-col gap-3">
                {
                    Days.map((weekDay,index) => {
                        return (
                            <Checkbox.Root checked={weekDays.includes(index)} onCheckedChange={() => {handlerToggleWeekDay(index)}} key={daysEnum[index]} className="flex items-center gap-3 group">

                            <div className="h-8 w-8 rounded-lg flex items-center justify-center  bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                                <Checkbox.Indicator >
                                    <Check size={20} className="text-white" />
                                </Checkbox.Indicator>
                            </div>

                            <span className="text-white leading-tight">
                                {daysEnum[index]}
                            </span>

                        </Checkbox.Root>
                        )
                    })
                }            
            </div>

            <button disabled={!title && weekDays.length < 1} type="submit" className="mt-6 rounded-lg p-4 flex items-center gap-3 justify-center font-semibold bg-green-600 hover:bg-green-400">
                <Check size={20} weight="bold"/>
                Confirmar
            </button>
        </form>
    )
}