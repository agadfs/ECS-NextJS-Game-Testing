import React, { useState } from "react";


  /* This is a function that first gets all entities with components then
   will iterate over all the attacks component of the entity player 
    and return all available attacks
  */

export const RenderMapAndEntitiesSystem = ({ mapEntities, entities,skillsUpgrade }) => {

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        justifyItems: "center",
        alignContent: "center",
        justifyContent: "center",
        display: "flex",
        top: "10%",
        left: "20%",
      }}
    >
      <div
        style={{
          position: "absolute",
          zIndex: 5,
          width: "500px",
          height: "500px",
          backgroundColor: "rgb(0,0,0,0.7)",
          color: "white",
          right: "60%",
          top: "10%",

          alignItems: "center",
          display:
            entities.find((entity) => entity.components.isPlayer)?.components
              ?.stopGame === true
              ? "flex"
              : "none",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Choose a upgrade</h1>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {entities.find((entity) => entity.components.isPlayer)?.components?.skillsToUpgrade?.map((attack, index) => (
            <div
              style={{
                border: "1px solid white",
                padding: "10px",
                cursor: "pointer",
              }}
              key={index}
              onClick={() => {
                /* need to add the upgrade to the player here */
                /* then just update thee state of the gameStop of the player */
                const findStopGame = entities.filter(
                  (entity) => entity.components.isPlayer
                );
                findStopGame[0].components.stopGame = false;
                let upgradedAttack = attack;
                if (upgradedAttack.selected === false){
                  upgradedAttack.selected = true;
                }else{
                  upgradedAttack.tier += 1;
                }
                
                findStopGame[0].components.attacks.filter((attacks) => attacks.name !== attack.name).push(upgradedAttack);
                console.log(findStopGame[0].components.attacks);
              }}
            >
              <h2>{attack.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        {entities
          ?.filter((entity) => !entity.components.itemType)
          .map((entity) => (
            <div key={entity.components.id}>
              <div>{entity.components.name}</div>

              <div>HP: {entity.components.hp}</div>
              <div>Level: {entity.components.level}</div>
              {entity.components.isPlayer && (
                <>
                <div>Xp: {entity.components.xp}</div>
                {entity.components.attacks?.filter((attack) => attack.selected === true).map((attack, index) => (
                  <div key={index} >
                    <div>
                    Attack : {attack.name}

                    </div>
                    <div>
                    Tier : {attack.tier}
                    </div>
                  </div>
                ))}
               
                </>
              )}
            </div>
          ))}
      </div>
      {mapEntities?.map((tile) => (
        <div
          key={tile.id}
          style={{
            position: "absolute",
            left: `${tile.components.x * 50}px`,
            top: `${tile.components.y * 50}px`,
            width: "50px",
            height: "50px",
            backgroundColor: tile.components.walkable ? "#ddd" : "#555",
            border: "1px solid #000",
            zIndex: 2,
          }}
        />
      ))}
      {entities
        ?.filter((entity) => !entity.components.itemType)
        .map((entity) => (
          <div
            key={entity.components.id}
            style={{
              position: "absolute",
              left: `${entity.components.x * 50}px`,
              top: `${entity.components.y * 50}px`,
              width: "50px",
              height: "50px",
              backgroundColor: entity.components.isPlayer ? "blue" : "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              border: "1px solid #000",
              zIndex: 3,
            }}
          >
            <p
              style={{
                position: "absolute",
                display: "flex",
                textWrap: "nowrap",
                bottom: "70%",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                overflow: "visible",
                backgroundColor: "rgb(0,0,0,0.3)",
                zIndex: 10,
              }}
            >
              {entity.components.name}
            </p>
            <p
              style={{
                position: "absolute",
                display: "flex",
                textWrap: "nowrap",
                bottom: "120%",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                overflow: "visible",
                backgroundColor: "rgb(0,0,0,0.3)",
                zIndex: 10,
              }}
            >
              Level: {entity.components.level}
            </p>
          </div>
        ))}
      {entities
        ?.filter((entity) => entity.components.itemType)
        .map((entity) => (
          <div
            key={entity.components.id}
            style={{
              position: "absolute",
              left: `${entity.components.x * 50}px`,
              top: `${entity.components.y * 50}px`,
              width: "50px",
              height: "50px",
              backgroundColor: "green",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              border: "1px solid #000",
              zIndex: 3,
            }}
          ></div>
        ))}
    </div>
  );
};
