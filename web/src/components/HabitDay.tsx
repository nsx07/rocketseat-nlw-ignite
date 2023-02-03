
interface HabitProps {
    completed : number
    click? : any
}

export function HabitDay(props : HabitProps) {

    let color = props.completed <= 3 ?  'bg-zinc-900' : 'bg-violet-500' 


    return (
        <div className={`w-10 h-10 ${color} border-2 rounded-lg border-zinc-800`}>
            {/* {props.completed} */}
        </div>
    )
}