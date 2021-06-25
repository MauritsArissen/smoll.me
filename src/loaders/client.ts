import express from "express";
import path from "path";

export default ({ app }: { app: express.Application }) => {
  app.use(express.static(path.join(__dirname, "../../client/build")));

  app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});
};
