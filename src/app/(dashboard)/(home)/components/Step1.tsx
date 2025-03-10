"use client";
import { LocationProps } from "@/src/@types/forms";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/src/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useFormContext } from "@/src/context/Contex";
import { IBGEAPI } from "@/src/lib/axios";
import { cn } from "@/src/lib/utils";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

export function Step1() {
  const { formData, setFormData } = useFormContext();
  const [stateList, setStateList] = useState<LocationProps[]>([]);
  const [cityList, setCityList] = useState<LocationProps[]>([]);
  const [selectedState, setSelectedState] = useState<LocationProps | null>(
    null
  );
  const [selectedCity, setSelectedCity] = useState<LocationProps | null>(null);
  const [isStateListOpen, setIsStateListOpen] = useState(false);
  const [isCityListOpen, setIsCityListOpen] = useState(false);

  async function handleIBGEState() {
    const connect = await IBGEAPI(`/estados/?orderBy=nome`);
    const states: LocationProps[] = [];
    for (const key in connect.body) {
      states.push({
        label: connect.body[key].nome,
        value: connect.body[key].sigla,
        id: connect.body[key].id,
      });
    }
    setStateList(states);
  }

  async function handleIBGECity(id?: number) {
    const connect = await IBGEAPI(
      `/estados/${id ? id : selectedState?.id}/municipios?orderBy=name`
    );

    const cities: LocationProps[] = [];
    for (const key in connect.body) {
      cities.push({
        label: connect.body[key].nome,
        value: connect.body[key].nome,
        id: connect.body[key].id,
      });
    }
    setCityList(cities);
  }

  useEffect(() => {
    handleIBGEState();
  }, []);

  useEffect(() => {
    if (selectedState) {
      handleIBGECity(selectedState.id);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedState) {
      if (selectedCity) {
        setFormData((prev) => ({
          ...prev,
          state: selectedState.label,
          city: selectedCity.label,
        }));
      }
    }
  }, [selectedCity]);

  return (
    <>
      <span className="font-bold text-lg text-[#123262] w-max mx-auto">
        QUAL SUA LOCALIZAÇÃO?
      </span>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-default-600 w-max font-semibold text-sm">
            Estado*
          </label>
          <DropdownMenu
            open={isStateListOpen}
            onOpenChange={setIsStateListOpen}
          >
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center rounded-xl border-2 border-[#123262] h-12 px-4",
                  !selectedState ? "text-default-400" : "text-[#123262]"
                )}
              >
                {selectedState ? selectedState.label : "Selecione seu Estado"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuArrow />
              <Command
                filter={(value, search) => {
                  if (
                    value
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .includes(search.toLowerCase())
                  )
                    return 1;
                  return 0;
                }}
              >
                <CommandInput placeholder="Pesquisar..." />
                <CommandEmpty>Não encontrado.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea
                    className={cn(stateList.length >= 5 ? "h-60" : "h-auto")}
                  >
                    {stateList.map((state) => (
                      <CommandItem
                        key={state.id}
                        onSelect={() => {
                          setSelectedState(state);
                          setIsStateListOpen(false);
                        }}
                      >
                        {state.label}
                      </CommandItem>
                    ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col">
          <label className="text-default-600 w-max font-semibold text-sm">
            Cidade*
          </label>
          <DropdownMenu open={isCityListOpen} onOpenChange={setIsCityListOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "w-full flex items-center rounded-xl border-2 border-[#123262] h-12 px-4",
                  !selectedCity ? "text-default-400" : "text-[#123262]"
                )}
              >
                {selectedCity ? selectedCity.label : "Selecione sua Cidade"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuArrow />
              <Command
                filter={(value, search) => {
                  if (
                    value
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .includes(search.toLowerCase())
                  )
                    return 1;
                  return 0;
                }}
              >
                <CommandInput placeholder="Pesquisar..." />
                <CommandEmpty>Não encontrado.</CommandEmpty>
                <CommandGroup>
                  <ScrollArea
                    className={cn(cityList.length >= 5 ? "h-60" : "h-auto")}
                  >
                    {cityList &&
                      cityList.map((city) => (
                        <CommandItem
                          key={city.id}
                          onSelect={() => {
                            setSelectedCity(city);
                            setIsCityListOpen(false);
                          }}
                        >
                          {city.label}
                        </CommandItem>
                      ))}
                  </ScrollArea>
                </CommandGroup>
              </Command>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
