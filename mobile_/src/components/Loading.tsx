import { ActivityIndicator, View, Text } from "react-native";

export function Loading() {
    return (
        <View style={{flex:1, justifyContent: "center", alignItems: "center", backgroundColor: "#09090A"}}>
            <ActivityIndicator size={"large"} color="#7C3AED"></ActivityIndicator>
            <Text style={{color : "#7C3AED", marginTop: 10}}>Carregando...</Text>
        </View>
    )
    
}