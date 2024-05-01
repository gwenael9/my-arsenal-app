import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Button } from "../ui/button";
import { usePlayersQuery } from "@/types/graphql";

Modal.setAppElement("#__next");

export default function ModalFilter() {
  // affichage de notre modal
  const [showModal, setShowModal] = useState(true);

  // style de notre modal
  const styles = {
    content: {
      width: "50%",
      height: "50%",
      margin: "auto",
    },
  };

  useEffect(() => {
    setShowModal(true);
  }, []);

  const { data: playersData } = usePlayersQuery();
  const players = playersData?.players || [];

  const handleSubmit = () => {

  }

  return (
    <>
      {!showModal && (
        <Button
          className="rounded p-2 text-white"
          onClick={() => setShowModal(true)}
        >
          Filtres
        </Button>
      )}

      {showModal && (
        <Modal
          isOpen={showModal}
          style={styles}
          onRequestClose={() => setShowModal(false)}
        >
          <div className="h-full flex flex-col">
            <h2 className="font-bold">
              Les générations suivantes sont en échec :
            </h2>

            <div>

            </div>


            {/* <div className="flex-grow"></div> */}

            <div className="flex justify-end">
              <button
                className="bg-primary rounded p-2 text-white"
                onClick={handleSubmit}
              >
                Fermer
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
