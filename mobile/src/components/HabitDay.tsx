import { Dimensions, TouchableOpacity } from "react-native";
import { DAY_SIZE } from "../core/global";

export function HabitDay() {
    return (
        <TouchableOpacity 
            className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800"
            style={{width : DAY_SIZE, height : DAY_SIZE}}
            activeOpacity={0.7}
        />
    )
}