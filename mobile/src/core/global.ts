import { Dimensions } from "react-native";

export const NUM_WEEK_DAYS = 7;
export const DAY_MARGIN_BETWEEN = 8;
export const SCREEN_HORIZONTAL_PADDING = 64 / 5;
export const WEEK_DAYS = ['D','S','T','Q','Q','S','S']
export const DAY_SIZE = (Dimensions.get('screen').width / NUM_WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)
