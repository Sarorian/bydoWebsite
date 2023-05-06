import { useState, useEffect } from "react";
import { CompCard } from "../comp-card/comp-card";

export const CompView = ({ comp, onBackClick}) => {
    
    const compTemp = Object.values(comp.comp);
    const stringComp = compTemp.join(" ");
    const agentArray = stringComp.split(" ");
    const [agentImages, setAgentImages] = useState([]);

    const winrate = (comp.totalWins / (comp.totalWins + comp.totalLosses) * 100).toFixed(2);

    useEffect(() => {
      const fetchAgentImages = async () => {
        try {
          const response = await fetch("https://valorant-api.com/v1/agents");
          const data = await response.json();
          const images = agentArray.map((agent) => {
            const agentObj = data.data.find(
              (agentData) => agentData.displayName === agent
            );
            return agentObj ? agentObj.displayIconSmall : null;
          });
          setAgentImages(images);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchAgentImages();
    }, [agentArray]);

    return (
        <div>
            <div>
            {agentImages.map((image, index) => (
            <img
                key={index}
                src={image}
                alt={`Agent ${index + 1}`}
                style={{ width: "50px", height: "50px" }}
            />
             ))}
            </div>
            <div>
                <span>Winrate: </span>
                <span>{winrate}% </span>
                <span>W: </span>
                <span>{comp.totalWins} </span>
                <span>L: </span>
                <span>{comp.totalLosses} </span>
            </div>
           <button onClick={onBackClick}>Back</button>
        </div>
    );
};
