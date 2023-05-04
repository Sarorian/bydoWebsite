export const TeamDataCard = ({ teamData, onTeamDataClick }) => {
    return (
        <div
            onClick={() => {
                onTeamDataClick(teamData);
            }}
        >
            Team Data
        </div>
    );
};