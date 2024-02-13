"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowDownIcon } from "@heroicons/react/16/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { GENRE } from "@/constants/constants";

interface GenresComboBoxProps {
  initialText: string;
  getGenres: () => Promise<string[]>;
}

export const GenresComboBox = (props: GenresComboBoxProps) => {
  // Dropdown States - Para abrir y manipular la lógica del dropdown
  const [genres, setGenres] = useState<string[]>([]);
  const [selected, setSelected] = useState(props.initialText);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  // Referencia para controlar al componente
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Global States - Para manipular la lógica de la página
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleGenre = (term: string) => {
    setSelected(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(GENRE, term);
    } else {
      params.delete(GENRE);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    replace(`${pathname}`);

    props.getGenres().then((spotifyGenres) => {
      setGenres(spotifyGenres);
      const randomIndex = Math.floor(Math.random() * spotifyGenres.length);
      handleGenre(spotifyGenres[randomIndex]);
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute w-72 font-medium h-80" ref={dropdownRef}>
      <div
        className="bg-white w-full p-2 flex items-center justify-between rounded text-black"
        onClick={() => {
          setOpen(!open);
          setInputValue("");
        }}
      >
        {selected}
        <ArrowDownIcon height={20} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white text-black">
          <MagnifyingGlassIcon height={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter Genre"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {genres.map((item, index) => (
          <li
            key={index}
            className={`p-2 text-sm hover:bg-blue-400 hover:text-white 
            ${item === selected ? "bg-blue-400 text-white" : "text-black"} 
            ${item?.toLowerCase().startsWith(inputValue) ? "block" : "hidden"}`}
            onClick={() => {
              if (item !== selected) {
                handleGenre(item);
                setInputValue("");
                setOpen(false);
              }
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
