import { Plus } from "phosphor-react";
import logo from "../assets/logo.svg";

export function Header() {
    return (
        <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
          <img src={logo}/>
          <button type="button" 
            className='border border-transparent flex gap-3 items-center font-semibold rounded-lg px-6 py-4 hover:border-black hover:bg-violet-500'>
            <span className="rounded-full bg-violet-500 p-1">
              <Plus size={20}/>
            </span>
            Novo hábito
          </button>
        </div>
    )
}