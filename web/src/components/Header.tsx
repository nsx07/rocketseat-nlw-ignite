import { Plus, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import logo from "../assets/logo.svg";
import { NewHabitForm } from "./NewHabitForm";

export function Header() {
    return (
        <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
          <img src={logo}/>

          <Dialog.Root>
            <Dialog.DialogTrigger
              className='border border-transparent flex gap-3 items-center font-semibold rounded-lg px-6 py-4 hover:border-black hover:bg-violet-500'>
              <span className="rounded-full bg-violet-500 p-1">
                <Plus size={20}/>
              </span>
              Novo hábito
            </Dialog.DialogTrigger>

            <Dialog.Portal>
              <Dialog.DialogOverlay className="w-screen h-screen bg-black/80 fixed inset-0"/>
              <Dialog.DialogContent className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                
                <Dialog.DialogClose className="absolute right-6 top-6 text-zinc-400 hover:text-zinc-200">
                  <X size={24} aria-label="Fechar" />
                </Dialog.DialogClose>
                <Dialog.DialogTitle className="text-3xl leading-tight font-extrabold">
                  Criar Hábito
                </Dialog.DialogTitle>

                <NewHabitForm />
                
              </Dialog.DialogContent>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
    )
}