import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";

export async function appRoutes(app : FastifyInstance) {
    app.get("/habits", async  () => {
        const habits = await prisma.habit.findMany()
    
        return habits
    })

    app.post("/habits", async (request, res) => {
        const createHabitBody = z.object({
            title : z.string(),
            weekDays : z.array(z.number().min(0).max(6))
        })

        const {title, weekDays} = createHabitBody.parse(request.body)
        const today = dayjs().startOf('day').toDate();

        await prisma.habit.create({
            data: {
                title,
                created_at : today,
                weekDays : {
                    create : weekDays.map(weekDay => {
                        return {
                            week_day : weekDay
                        }
                    })
                }
            }
        })
    })

    app.get("/day", async (request) => {
        const getDayParams = z.object({
            date : z.coerce.date()
        })

        const {date} = getDayParams.parse(request.query);

        const weekDay = dayjs(date).get("day")

        const possibleHabits = await prisma.habit.findMany({
            where : {
                created_at: {
                    lte: date
                },
                weekDays : {
                    some : {
                        week_day : weekDay
                    }
                }
            }
        })

        const day = await prisma.day.findUnique({
            where : {
                date : date
            },
            include : {
                DayHabits : true
            }
        })

        const completeHabits = day?.DayHabits.map(dayHabit => {
            return dayHabit.habit_id
        })

        return {
            possibleHabits,
            completeHabits
        }
    })

    app.delete("/deleteHabit", (request) => {

        const idHabit = z.object({
            id : z.string()
        })

        const {id} = idHabit.parse(request.query);

        const deleteHabit = prisma.habit.delete({
            where : {
                id : id
            }, include : {
                DayHabits : true
            }
        })

        return deleteHabit;
    })

    app.put("/changeStatus", (request) => {

    })
}