import React, { useState } from "react";
import { Button } from "@mui/material";
import MyModal from "@/components/PopupInfo";

const index = () => {
  const [data, setData] = useState([]);

  function previewFile() {
    const [file] = document.querySelector("input[type=file]").files;
    const reader = new FileReader();

    reader.addEventListener(
      "load",

      async () => {
        let ligneID, lignePGN;
        let arrayIDSearch = [];

        await reader.result.split(/[\n\r]+/).map((line) => {
          // ligne par ligne
          if (line.indexOf("/", 2) == 2) {
            // surppression de l'entête du fichier
            ligneID = line.substr(26, 2);
            lignePGN = line.substr(22, 4);

            //Est-ce que mon tableau contient l'ID de cette ligne ?
            if (arrayIDSearch.find((x) => x.ID.includes(ligneID))) {
              //Est-ce que mon tableau de PGN contient le PGN de cette ligne ?
              if (
                !arrayIDSearch
                  .find((w) => w.ID == ligneID)
                  .PGN.includes(lignePGN)
              ) {
                arrayIDSearch.find((w) => w.ID == ligneID).PGN.push(lignePGN);
                arrayIDSearch.find((w) => w.ID == ligneID).PGN.sort();
              }
            } else {
              //Création d'un object avec l'ID et le PGN tableau vide.
              arrayIDSearch.push({
                ID: ligneID,
                PGN: [],
              });
              //Ajout du PGN dans la liste.
              arrayIDSearch.find((w) => w.ID == ligneID).PGN.push(lignePGN);
            }
          }
        });
        setData(arrayIDSearch);
      },
      false
    );

    if (file) {
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col m-2 gap-3">
      <Button variant="contained" component="label" className="w-fit">
        Upload J1939 Sniffer
        <input
          hidden
          accept=".txt"
          type="file"
          onChange={() => {
            previewFile();
          }}
        />
      </Button>

      {data.length != 0 ? (
        <p className="p-2">Il y a {data.length} ID.</p>
      ) : null}
      <div className="flex flex-col gap-2  text-[22px] justify-start ">
        {data.map((data, index) => (
          <div
            key={index}
            className="rounded-2xl bg-zinc-900 border-[1px] border-zinc-700 p-3"
          >
            <div className="flex px-3 gap-3">
              ID: <span className="font-semibold ">{data.ID}</span>
              <span className="text-yellow-500">
                {data.PGN.find((x) => x == "0000") && "Controleur moteur"}
                {data.PGN.find((x) => x == "F004") && "ECU moteur"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 p-2 justify-start max-sm:justify-center">
              {data.PGN.map((pgn, index) => (
                <div key={index}>
                  <MyModal pgn={pgn} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default index;
