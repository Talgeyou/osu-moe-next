import { ChartData } from "chart.js";
import { OsuUser } from "types/osu.types";

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

export function getBarOptions(scales?: { min: number; max: number }) {
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
                ...scales,
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

export function getRankBarData(players: OsuUser[]): ChartData<"bar", number[], string> {
    return {
        labels: players.map((player) => player.username),
        datasets: [
            {
                label: "Rank",
                data: players.map((player) => player.statistics.global_rank),
                backgroundColor: "#4caf50",
            },
        ],
    };
}

export function getRankBarProps(players: OsuUser[]) {
    const ranks = players.map((player) => player.statistics.global_rank);

    const maxRank = Math.max(...ranks);
    const minRank = Math.min(...ranks);
    const deltaRanks = maxRank - minRank;

    return {
        data: getRankBarData(players),
        options: getBarOptions({
            min: Math.max(minRank - deltaRanks, 1),
            max: maxRank,
        }),
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
