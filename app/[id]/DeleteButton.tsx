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
        className="px-4 py-2 rounded-md bg-red-900 hover:bg-red-800 active:bg-red-700 text-red-100 transition"
      >
        Удалить
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        className="bg-slate-300 shadow-xl rounded-lg w-96 p-4 absolute translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2"
      >
        <DialogTitle className="text-xl font-bold">
          Удаление документа
        </DialogTitle>
        <Description className="my-4">
          Этот документ будет навсегда удален, вы уверены?
        </Description>
        <div className="flex gap-2 justify-end">
          <Button
            onClick={handleClose}
            type="submit"
            className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-100 transition"
          >
            Отмена
          </Button>
          <form action={deleteDocument.bind(null, id)}>
            <Button
              type="submit"
              className="px-4 py-2 rounded-md bg-red-900 hover:bg-red-800 active:bg-red-700 text-red-100 transition"
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
