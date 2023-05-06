import { useState, useEffect } from "react";
import { CompCard } from "../comp-card/comp-card";
import { CompView } from "../comp-view/comp-view";

export const MapView = ({ map, onBackClick}) => {
    
    const[selectedComp, setSelectedComp] = useState(null);
    
    const { compStats } = map


    let totalAttack = {wins: 0,losses: 0};
    let totalDefence = {wins: 0,losses: 0};
    let totalWins = 0, totalLosses = 0;
    let totalPlantedAt= { a: 0, b: 0, c: 0 };
    let totalWinType = { bombDetonated: 0, bombDefused: 0, time: 0, kills: 0 };

    for (const comp of compStats) {
        totalAttack.wins += comp.attack.wins
        totalAttack.losses += comp.attack.losses
        totalDefence.wins += comp.defence.wins
        totalDefence.losses += comp.defence.losses
        totalWins += comp.totalWins
        totalLosses += comp.totalLosses
        totalPlantedAt.a += comp.plantedAt.a
        totalPlantedAt.b += comp.plantedAt.b
        totalPlantedAt.c += comp.plantedAt.c
        totalWinType.bombDetonated += comp.winType.bombDetonated
        totalWinType.bombDefused += comp.winType.bombDefused
        totalWinType.time += comp.winType.time
        totalWinType.kills += comp.winType.kills
    }

    const winrate = (totalWins / (totalWins + totalLosses) * 100).toFixed(2);
    const attackWinrate = (totalAttack.wins / (totalAttack.losses + totalAttack.wins) * 100).toFixed(2);
    const defenceWinrate = (totalDefence.wins / (totalDefence.losses + totalDefence.wins) * 100).toFixed(2);

    console.log(compStats);

    if (selectedComp) {
        return (
            <CompView
                comp={selectedComp}
                onBackClick={() => {
                    setSelectedComp(null);
                }}
            />
        );
    }

    return (
        <div>
            <div>
                {map.map} Stats
            </div>
            <div>
                <span>Winrate: </span>
                <span>{winrate}% </span>
                <span>W: </span>
                <span>{totalWins} </span>
                <span>L: </span>
                <span>{totalLosses} </span>
            </div>
            <div>
                <span>Attack Winrate: </span>
                <span>{attackWinrate}% </span>
                <span>RW: </span>
                <span>{totalAttack.wins} </span>
                <span>RL: </span>
                <span>{totalAttack.losses} </span>
            </div>
            <div>
                <span>Defence Winrate: </span>
                <span>{defenceWinrate}% </span>
                <span>RW: </span>
                <span>{totalDefence.wins} </span>
                <span>RL: </span>
                <span>{totalDefence.losses} </span>
            </div>
            <div>
                <span>Games Played: </span>
                <span>{totalWins + totalLosses}</span>
            </div>
            <div>
                <span>Comps: </span>
                {compStats.map((comp) => (
                    <CompCard
                        comp={comp}
                        onCompClick={() => {
                            setSelectedComp(comp);
                        }} 
                    />
                ))}
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
