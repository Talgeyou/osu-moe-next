import { ChartData } from "chart.js";
import { OsuGrades } from "types/osu.types";

export function getGradesData({
    a,
    s,
    sh,
    ss,
    ssh,
}: OsuGrades): ChartData<"doughnut", number[], string> {
    return {
        labels: ["SS+", "S+", "SS", "S", "A"],
        datasets: [
            {
                label: "Grades",
                data: [ssh, sh, ss, s, a],
                backgroundColor: ["#263238", "#37474f", "#ffc107", "#ffd54f", "#4caf50"],
                hoverOffset: 4,
            },
        ],
    };
}
