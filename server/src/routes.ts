import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";
import dayjs from "dayjs";

export async function appRoutes(app : FastifyInstance) {
    app.get("/habits", async  () => {
        const habits = await prisma.habit.findMany()
    
        return habits
    })

    app.post("/habits", async request => {
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

    app.get("/day", async request => {
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

    app.delete("/deleteHabit", request => {

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

    app.patch("/habits/:id/toggle", async request => {

        const toggleHabitParams = z.object({
            id : z.string().uuid()
        });

        const {id} = toggleHabitParams.parse(request.params)

        const today = dayjs().startOf('day').toDate();

        let day = await prisma.day.findUnique({
            where : {
                date : today
            }
        })

        if (!day) {
            day = await prisma.day.create({
                data : {
                    date : today
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where : {
                habit_id_day_id : {
                    day_id : day.id,
                    habit_id : id
                }
            }
        })

        if (dayHabit) {
            await prisma.dayHabit.delete({
                where : {
                    habit_id_day_id : {
                        day_id : day.id,
                        habit_id : id
                    }
                }
            });
        } else {
            await prisma.dayHabit.create({
                data : {
                    day_id : day.id,
                    habit_id : id
                }
            });
        }


    });

    app.get("/summary", async Ç => {
        
        const summary = await prisma.$queryRaw`
            SELECT 
                D.id,
                D.date,
                (
                    SELECT 
                        cast(count(*) as float)
                    FROM habitsDays DH
                    WHERE DH.day_id = D.id
                ) as completed
            FROM days d
        `
        return summary;

    } )
}