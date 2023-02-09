import { View, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import {Feather} from "@expo/vector-icons";
import { useState } from "react";
import colors from "tailwindcss/colors";

const availableWeekDays = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"]

export function New() {
    const [weekDays, setWeekDays] = useState<Array<number>>([]);

    function handleToggleWeekDay(weekDayIndex : number) {
        if (weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
        } else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsHorizontalScrollIndicator={false}>
                <BackButton />

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual seu comprometimento ?
                </Text>

                <TextInput className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600" 
                    placeholder="Ex: Exercícios, dormir 8h, beber água..." placeholderTextColor={colors.zinc[400]}

                />

                <Text className="my-4 text-white font-semibold text-base">
                    Qual a recorrência ?
                </Text>
                
                {
                    availableWeekDays.map((weekDay,index) => {
                        return (
                            <Checkbox 
                                key={weekDay} 
                                title={weekDay} 
                                checked={weekDays.includes(index)}
                                onPress={() => handleToggleWeekDay(index)}
                            />
                        )
                    })
                }

                <TouchableOpacity activeOpacity={0.7} className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6">
                    <Feather name="check" size={20} color={colors.white}/>
                    <Text className="font-semibold text-base text-white ml-2">Confirmar</Text>
                </TouchableOpacity>


            </ScrollView>
        </View>
    )
}