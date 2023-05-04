export const TeamDataView = ({ teamData, onBackClick }) => {

    const winrate = ((teamData.reduce((acc, game) => acc + game.win, 0) / teamData.length) * 100).toFixed(2);

    return (
        <div>
            <div>
                <span>Winrate</span>
                <span>{winrate}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};