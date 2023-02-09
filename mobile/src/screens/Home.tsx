import { View, Text, ScrollView, Alert } from "react-native";
import { Header } from "../components/Header";
import { HabitDay } from "../components/HabitDay";
import { DAY_SIZE, WEEK_DAYS } from "../core/global";
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

const datesFromYearBeginning = generateDatesFromYearBeginning();
const mininumSummaryDates = 18 * 5;
const amountDaysToFill = () => {
    let precision : number = mininumSummaryDates - datesFromYearBeginning.length;

    return precision;
};  

export interface Summary {
    id : string
    date : string
    amount : number
    completed : number
}

export function Home() {

    const [summary, setSummary] = useState<Summary[]>([])
    const [loading, setLoading] = useState(true);
    const { navigate } = useNavigation();

    async function fetchData() {
        try {
            setLoading(true)
            const response = await api.get('/summary')
            console.log(summary)
            setSummary(response.data)
        } catch (error) {
            Alert.alert("Ops", "O servidor falhou!")
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {fetchData();}, [])

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />

            <View className="flex-row mt-6 mb-2">
                { WEEK_DAYS.map((day, i) => (
                    <Text 
                        key={i*WEEK_DAYS.length-i} 
                        className="text-zinc-400 font-bold text-xl text-center mx-1"
                        style={{width : DAY_SIZE}}
                        >
                        {day}
                    </Text>
                )) }
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom : 100}}
                >
            <View className="flex-row flex-wrap">

            { 
                datesFromYearBeginning
                .map(
                    date => <HabitDay 
                                key={`${date.toISOString()}`} 
                                onPress={() => navigate("habit", {date : date.toISOString()})} />) 
            }

            { 
                amountDaysToFill() > 0 
                    ? Array.from({length : amountDaysToFill()})
                        .map((_,i) => (
                            <View key={i} className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                            style={{width : DAY_SIZE, height : DAY_SIZE}}/>
                            )) 
                    : <></>
            } 

            </View>
            </ScrollView>
        </View>
    )
}