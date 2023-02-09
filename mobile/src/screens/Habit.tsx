import { ScrollView, View, Text } from "react-native";
import { BackButton } from "../components/BackButton";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";

interface Params {
    date : string
    amount : number
    complete : number
}

export function Habit() {

    const route = useRoute();
    const {date} = route.params as Params;
    const parseDate = dayjs(date);
    const weekDay = parseDate.format("dddd");
    const dayAndMonth = parseDate.format("DD/MM")

    const [taskIds, setTaskIds] = useState<Array<string>>([]);

    function handleToggleTask(id : string) {
        if (taskIds.includes(id)) {
            setTaskIds(prevState => prevState.filter(taskId => taskId !== id));
        } else {
            setTaskIds(prevState => [...prevState, id]);
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom : 100}}
                >
                <View className="flex-1 flex-row items-center justify-start">
                    <BackButton />
                    
                    <Text className="text-white font-bold text-lg ml-32">Habits</Text>
                </View>

                <View className="flex-1 flex-row justify-between items-center">
                    <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                        {weekDay}    
                    </Text>

                    <Text className="mt-6 text-zinc-400 font-extrabold text-3xl lowercase">
                        {dayAndMonth}
                    </Text>
                </View>

                <ProgressBar progress={50}/>

                <View className="mt-6">
                    <Checkbox 
                        title="Beber 2L de água"
                        checked={taskIds.includes("0")}
                        onPress={() => handleToggleTask("0")}
                        />
                    <Checkbox 
                        title="Fumar diamba"
                        checked={taskIds.includes("1")}
                        onPress={() => handleToggleTask("1")}
                    />
                </View>


            </ScrollView>

        </View>
    )
}