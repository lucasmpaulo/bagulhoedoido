import React from "react";
import { ListItem, ListItemText, Button } from "@material-ui/core";
import { db } from "../firebase_config";

export default function CoresListItem({cor, id}) {
  return (
    <div className="lista" style={{ display: "flex"}}>
      <ListItem>
        <ListItemText primary={cor} />
      </ListItem>

      {/* <Button onClick={updateFrutas}>Atualizar</Button> */}
      {/* <Button onClick={deleteFrutas}>Apagar</Button> */}
    </div>
  )
}