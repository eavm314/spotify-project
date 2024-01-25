"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface ComboBoxProps {
  text: string;
  getData: () => Promise<string[]>;
}

export const ComboBox = (props: ComboBoxProps) => {
  const [data, setData] = useState<string[]>([]);
  const [selected, setSelected] = useState(props.text);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleGenre = (term: string) => {
    setSelected(term);
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("genre", term);
    } else {
      params.delete("genre");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    props.getData().then((spotifyGenres) => {
      setData(spotifyGenres);
      const randomIndex = Math.floor(Math.random() * spotifyGenres.length);
      handleGenre(spotifyGenres[randomIndex]);
    });
  }, []);

  return (
    <div className="flex w-[50%]">
      <Listbox
        value={selected}
        onChange={(item: string) => {
          handleGenre(item);
        }}
      >
        <div className="relative w-full mx-20 mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm">
            <span className="block truncate text-black">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-black"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {data.map((genre, genreIndex) => (
                <Listbox.Option
                  key={genreIndex}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={genre}
                  onClick={(e) => e.currentTarget.blur()}
                  onBlur={(e) => e.currentTarget.blur()}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {genre}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
