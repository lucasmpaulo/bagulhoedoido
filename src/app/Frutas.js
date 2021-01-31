import { ListItem, ListItemText, Button } from "@material-ui/core";
import React from "react";
import { db } from "../firebase_config";

export default function FrutaListItem({fruta, id}) {
  function updateFrutas() {
    db.collection("frutas").doc(id).update({ 
    });
  }

  function deleteFrutas() {
    db.collection("frutas").doc(id).delete();
  }

  // function idGenerator() {
  //   var randomId = 1 * Math.floor(Math.random() * 6);
  //   return randomId;      
  // }

  return (
    <div className="lista">
      <p>{fruta}</p>
      {/* <Button onClick={updateFrutas}>Atualizar</Button> */}
      {/* <Button onClick={deleteFrutas}>Apagar</Button> */}
    </div>
  )
}