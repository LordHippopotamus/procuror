"use client";

import { Button, Description, Dialog, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { deleteDocument } from "./actions";

const DeleteButton = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="px-12 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold tracking-widest transition"
      >
        Удалить
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        className="shadow-2xl w-fit p-8 absolute translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 bg-white rounded-md"
      >
        <DialogTitle className="text-2xl font-light text-amber-950 uppercase text-center">
          Удаление документа
        </DialogTitle>
        <Description className="my-4 max-w-72 text-center">
          Этот документ будет навсегда удален, вы уверены?
        </Description>
        <div className="flex gap-2 justify-end">
          <Button
            onClick={handleClose}
            type="submit"
            className="px-12 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold tracking-widest transition"
          >
            Отмена
          </Button>
          <form action={deleteDocument.bind(null, id)}>
            <Button
              type="submit"
              className="px-12 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold tracking-widest transition"
            >
              Удалить
            </Button>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default DeleteButton;
