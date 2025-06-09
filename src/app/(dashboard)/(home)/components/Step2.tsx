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
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import { useFormContext } from "@/src/context/Contex";
import { AddressApi, IBGEAPI } from "@/src/lib/axios";
import { maskCep } from "@/src/lib/masks";
import { cn } from "@/src/lib/utils";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";

export function Step2() {
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

  async function GetAddressData() {
    const data = await AddressApi(`${formData.zipCode}/json`);
    if (data.status === 200) {
      setFormData({
        ...formData,
        neighborhood: data.body.bairro,
        street: data.body.logradouro,
      });
      setSelectedState({
        label: data.body.estado,
        value: data.body.uf,
        id: stateList.find((state) => state.value === data.body.uf)
          ?.id as number,
      });
      setSelectedCity({
        label: data.body.localidade,
        value: data.body.localidade,
        id: data.body.ibge,
      });
    }
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

  useEffect(() => {
    if (formData.zipCode.length === 9) {
      GetAddressData();
    } else {
      setFormData({
        ...formData,
        neighborhood: "",
        street: "",
        state: "",
        city: "",
      });
      setSelectedState(null);
      setSelectedCity(null);
    }
  }, [formData.zipCode]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col w-1/2">
          <label className="text-default-600 w-max font-semibold text-sm">
            Insira seu CEP*
          </label>
          <input
            className="disabled:bg-default-300 text-[16px] disabled:border-default-300 w-full rounded-xl border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
            placeholder="00000-000"
            onChange={(e) =>
              setFormData({ ...formData, zipCode: maskCep(e.target.value) })
            }
            value={formData.zipCode}
            maxLength={9}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-default-600 w-max font-semibold text-sm">
            Seu Bairro*
          </label>
          <input
            disabled={formData.zipCode.length !== 9}
            className="disabled:bg-default-300 text-[16px] disabled:border-default-300 w-full rounded-xl border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
            placeholder="CENTRO"
            onChange={(e) =>
              setFormData({ ...formData, neighborhood: e.target.value })
            }
            value={formData.neighborhood}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col w-1/2">
          <label className="text-default-600 w-max font-semibold text-sm">
            Qual o Logradouro?*
          </label>
          <input
            disabled={formData.zipCode.length !== 9}
            className="disabled:bg-default-300 text-[16px] disabled:border-default-300 w-full rounded-xl border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
            placeholder="LOGRADOURO"
            onChange={(e) =>
              setFormData({ ...formData, street: e.target.value })
            }
            value={formData.street}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label className="text-default-600 w-max font-semibold text-sm">
            Insira o Número*
          </label>
          <input
            disabled={formData.zipCode.length !== 9}
            className="disabled:bg-default-300 text-[16px] disabled:border-default-300 w-full rounded-xl border-2 border-[#123262] h-12 px-4 focus:outline-none placeholder:text-default-400"
            placeholder="NÚMERO"
            onChange={(e) =>
              setFormData({ ...formData, number: e.target.value })
            }
            value={formData.number}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-default-600 w-max font-semibold text-sm">
            Estado*
          </label>
          <DropdownMenu
            open={isStateListOpen}
            onOpenChange={setIsStateListOpen}
          >
            <DropdownMenuTrigger
              asChild
              disabled={formData.zipCode.length !== 9}
            >
              <button
                disabled={formData.zipCode.length !== 9}
                className={cn(
                  "disabled:bg-default-300 disabled:border-default-300 w-full flex items-center rounded-xl border-2 border-[#123262] h-12 px-4",
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
                <CommandInput
                  placeholder="Pesquisar..."
                  className="text-[16px]"
                />
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
            <DropdownMenuTrigger
              asChild
              disabled={formData.zipCode.length !== 9}
            >
              <button
                disabled={formData.zipCode.length !== 9}
                className={cn(
                  "disabled:bg-default-300 disabled:border-default-300 w-full flex items-center rounded-xl border-2 border-[#123262] h-12 px-4",
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
                <CommandInput
                  placeholder="Pesquisar..."
                  className="text-[16px]"
                />
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
    </div>
  );
}
