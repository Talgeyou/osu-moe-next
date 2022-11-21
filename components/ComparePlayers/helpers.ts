import { ChartData, ScatterDataPoint } from "chart.js";
import { ComponentProps } from "react";
import { OsuUser } from "types/osu.types";
import { Bar, Scatter } from "react-chartjs-2";

export function getAccuracyBarData(players: OsuUser[]): ChartData<"bar", number[], string> {
    return {
        labels: players.map((player) => player.username),
        datasets: [
            {
                label: "Accuracy",
                data: players.map((player) => player.statistics.hit_accuracy),
                backgroundColor: "#4caf50",
            },
        ],
    };
}

export function getBarOptions({
    min,
    max,
}: {
    min: number;
    max: number;
}): ComponentProps<typeof Bar>["options"] {
    return {
        indexAxis: "y" as const,
        responsive: true,
        elements: {
            bar: {
                borderRadius: 8,
            },
        },
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            x: {
                min,
                max,
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: false,
                },
            },
        },
    };
}

export function getAccuracyBarProps(players: OsuUser[]) {
    const accuracies = players.map((player) => player.statistics.hit_accuracy);

    const maxAccuracy = Math.max(...accuracies);
    const minAccuracy = Math.min(...accuracies);
    const deltaAccuracies = maxAccuracy - minAccuracy;

    return {
        data: getAccuracyBarData(players),
        options: getBarOptions({
            min: Math.max(minAccuracy - deltaAccuracies, 1),
            max: 100,
        }),
    };
}

export function getRankBarData(players: OsuUser[]): ComponentProps<typeof Scatter>["data"] {
    return {
        labels: players.map((player) => player.username),
        datasets: [
            {
                label: "Rank",
                data: players.map((player, index) => ({
                    y: player.statistics.global_rank,
                    x: index,
                })),
                backgroundColor: "#4caf50",
            },
        ],
    };
}

export function getRankScatterOptions(
    usernames: string[],
): ComponentProps<typeof Scatter>["options"] {
    return {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (item) => {
                        const datasetLabel = item.dataset.label;
                        const datasetItem = item.dataset.data[item.dataIndex] as ScatterDataPoint;
                        return `${datasetLabel}: #${datasetItem.y}`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    stepSize: 1,
                    callback: (value, index, values) => {
                        return usernames[index];
                    },
                },
            },
            y: {
                offset: true,
                min: 1,
                reverse: true,
            },
        },
    };
}

export function getRankScatterProps(players: OsuUser[]): ComponentProps<typeof Scatter> {
    return {
        data: getRankBarData(players),
        options: getRankScatterOptions(players.map((player) => player.username)),
    };
}

export function getPlaycountBarData(players: OsuUser[]): ChartData<"bar", number[], string> {
    return {
        labels: players.map((player) => player.username),
        datasets: [
            {
                label: "Playcount",
                data: players.map((player) => player.statistics.play_count),
                backgroundColor: "#4caf50",
            },
        ],
    };
}

export function getPlaycountBarProps(players: OsuUser[]) {
    const playcounts = players.map((player) => player.statistics.play_count);

    const maxPlaycount = Math.max(...playcounts);
    const minPlaycount = Math.min(...playcounts);
    const deltaPlaycounts = maxPlaycount - minPlaycount;

    return {
        data: getPlaycountBarData(players),
        options: getBarOptions({
            min: Math.max(minPlaycount - deltaPlaycounts, 0),
            max: maxPlaycount,
        }),
    };
}

export function getPlaytimeBarData(players: OsuUser[]): ChartData<"bar", number[], string> {
    return {
        labels: players.map((player) => player.username),
        datasets: [
            {
                label: "Playtime (in hours)",
                data: players.map((player) => player.statistics.play_time / 3600),
                backgroundColor: "#4caf50",
            },
        ],
    };
}

export function getPlaytimeBarProps(players: OsuUser[]) {
    const playtimes = players.map((player) => player.statistics.play_time / 3600);

    const maxPlaytime = Math.max(...playtimes);
    const minPlaytime = Math.min(...playtimes);
    const deltaPlayime = maxPlaytime - minPlaytime;

    return {
        data: getPlaytimeBarData(players),
        options: getBarOptions({
            min: Math.max(minPlaytime - deltaPlayime, 0),
            max: maxPlaytime,
        }),
    };
}

export function getPPBarData(players: OsuUser[]): ChartData<"bar", number[], string> {
    return {
        labels: players.map((player) => player.username),
        datasets: [
            {
                label: "Perfomance Points",
                data: players.map((player) => player.statistics.pp),
                backgroundColor: "#4caf50",
            },
        ],
    };
}

export function getPPBarProps(players: OsuUser[]) {
    const pps = players.map((player) => player.statistics.pp);

    const maxPP = Math.max(...pps);
    const minPP = Math.min(...pps);
    const deltaPP = maxPP - minPP;

    return {
        data: getPPBarData(players),
        options: getBarOptions({
            min: Math.max(minPP - deltaPP, 0),
            max: maxPP,
        }),
    };
}

export function getGradesData(players: OsuUser[]): ChartData<"doughnut", number[], string> {
    const mappedPlayers = players.map((player) => ({
        username: player.username,
        grades: player.statistics.grade_counts,
    }));
    return {
        labels: ["SS+", "S+", "SS", "S", "A"],
        datasets: mappedPlayers.map(({ username, grades: { ssh, sh, ss, s, a } }) => {
            return {
                label: `${username} Grades`,
                data: [ssh, sh, ss, s, a],
                backgroundColor: ["#263238", "#37474f", "#ffc107", "#ffd54f", "#4caf50"],
                hoverOffset: 4,
            };
        }),
    };
}
