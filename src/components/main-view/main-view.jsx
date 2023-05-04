import { useState, useEffect } from "react";
import { TeamDataCard } from "../team-data-card/team-data-card";
import { TeamDataView } from "../team-data-view/team-data-view";
const axios = require('axios');

export const MainView = () => {
    
    const [selectedData, setSelectedData] = useState(null);
    const [teamData, setTeamData] = useState(null);
    const [dataType, setDataType] = useState("");
    useEffect(() => {
        fetch("https://bydo.herokuapp.com/teamdata")
            .then((res) => res.json())
            .then((data) => {
                console.log("data returned form api" + data);
                setTeamData(data);
            })

    }, [])

    if (dataType === "teamData") {
        return (
            teamData &&
            <TeamDataView
                teamData={selectedData}
                onBackClick={() => {
                    setSelectedData(null);
                    setDataType("");
                }}
            />
        );
    }

    return (
        <div>
            <TeamDataCard
                teamData={teamData}
                onTeamDataClick={() => {
                    setSelectedData(teamData);
                    setDataType("teamData")
                }}
            />    
        </div>
    )

}