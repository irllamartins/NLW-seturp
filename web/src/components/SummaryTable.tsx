import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromYearsBenning } from "../utils/generate-dates-from-year-beginnig"
import { HabitDay } from "./HabitDay"

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

//array com os dias
const summaryDates = generateDatesFromYearsBenning()
const minimumSammaryDateSize = 18 * 7
const amountOfToFill = minimumSammaryDateSize - summaryDates.length

type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
  }[]

export const SummaryTable = () => {
    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {
        api.get('summary').then(response =>
            setSummary(response.data)
        )
    }, [])
    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => {
                    return (
                        <div key={`${weekDay}-${i}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
                            {weekDay}
                        </div>
                    )
                })}

            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summary.length  && summaryDates.map((date)=> {
                    //checa se existe um dia com essa data
                    const dayInSummary = summary.find(day => { return dayjs(date).isSame(day.date, 'day') })
                    console.log(dayInSummary)
                    return (
                        <HabitDay 
                          key={date.toString()}
                          date={date.toDate()}
                          amount={dayInSummary?.amount} 
                          defaultCompleted={dayInSummary?.completed} 
                        />
                      )
                    })}

                {amountOfToFill > 0 && Array.from({ length: amountOfToFill }).map((_, i) => {
                    return (
                        <div key={i} className="bg-zinc-900 w-10 h-10 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed" />
                    )
                })}
            </div>
        </div>
    )
}