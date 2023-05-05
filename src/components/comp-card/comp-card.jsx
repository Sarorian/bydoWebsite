import React, { useState, useEffect } from "react";

export const CompCard = ({ comp, onCompClick }) => {
  const compTemp = Object.values(comp.comp);
  const stringComp = compTemp.join(" ");
  const agentArray = stringComp.split(" ");
  const [agentImages, setAgentImages] = useState([]);

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
    <div
      onClick={() => {
        onCompClick(comp);
      }}
    >
      {agentImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Agent ${index + 1}`}
          style={{ width: "50px", height: "50px" }}
        />
      ))}
    </div>
  );
};