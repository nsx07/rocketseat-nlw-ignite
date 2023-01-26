
interface HabitProps {
    completed : number
    click? : any
}

export function HabitDay(props : HabitProps) {
    return (
        <div className="w-10 h-10 bg-zinc-900 border-2 rounded-lg border-zinc-800 flex items-center justify-center">
            {props.completed}
        </div>
    )
}