"use client";

import moment from "moment";
import "moment/locale/pt-br";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { cn } from "@/src/lib/utils";
import { useFormContext } from "@/src/context/Contex";

interface DateInfo {
  day: number;
  weekDay: string;
  date: string;
}

export function Step11() {
  const { formData, setFormData } = useFormContext();
  const [dateRange, setDateRange] = useState<DateInfo[] | null>(null);
  const times = [
    { time: "10:30", available: true, selected: false },
    { time: "11:00", available: true, selected: false },
    { time: "11:30", available: true, selected: false },
    { time: "13:00", available: false, selected: false },
    { time: "13:30", available: false, selected: false },
    { time: "14:00", available: true, selected: false },
    { time: "17:00", available: false, selected: false },
    { time: "17:30", available: true, selected: false },
  ];

  const GetNextDays = (): DateInfo[] => {
    const dias: DateInfo[] = [];

    // Loop de 0 (hoje) até 15 dias à frente
    for (let i = 0; i <= 15; i++) {
      const dataAtual = moment().add(i, "days");
      dias.push({
        day: dataAtual.date(), // Retorna o dia do mês
        weekDay: dataAtual.format("dddd"), // Retorna o dia da semana por extenso
        date: dataAtual.format("YYYY-MM-DD"),
      });
    }
    setDateRange(dias);
    return dias;
  };

  useEffect(() => {
    GetNextDays();
  }, []);

  return (
    <>
      <span className="font-bold text-lg text-[#123262] w-max mx-auto">
        AGENDAMENTO:
      </span>
      <span className="font-semibold text-default-600 mx-auto">
        PARA FINALIZAR, ESCOLHA O MELHOR HORÁRIO PARA VOCÊ RECEBER UMA LIGAÇÃO
        MINHA COM O SEU ORÇAMENTO
      </span>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-[#123262] w-max font-semibold text-sm">
            DATA*:
          </label>
          <div className="w-full">
            <Swiper spaceBetween={10} centeredSlides slidesPerView={5}>
              {dateRange &&
                dateRange.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => {
                        setFormData({
                          ...formData,
                          selectedDate: {
                            date: item.date,
                            time: "",
                          },
                        });
                      }}
                      className={cn(
                        "flex flex-col text-default-600 items-center rounded-xl p-2 transition duration-300",
                        formData.selectedDate.date === item.date &&
                          "bg-[#123262] text-white"
                      )}
                    >
                      <span className="text-xs">
                        {item.weekDay.includes("-")
                          ? item.weekDay.split("-")[0]
                          : item.weekDay}
                      </span>
                      <span className="font-bold text-base">{item.day}</span>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
          <div className="flex flex-col">
            <label className="text-[#123262] w-max font-semibold text-sm">
              HORÁRIO*:
            </label>
            <div className="flex flex-wrap items-center justify-center w-full gap-2">
              {formData.selectedDate.date &&
                times.map((time, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        selectedDate: {
                          ...formData.selectedDate,
                          time: time.time,
                        },
                      })
                    }
                    disabled={!time.available}
                    className={cn(
                      "w-2/5 px-2 text-center py-1 rounded-md border transition duration-300 border-[#123262] text-[#123262]",
                      !time.available && "bg-[#123262] bg-opacity-40",
                      formData.selectedDate.time === time.time &&
                        "bg-[#123262] text-white"
                    )}
                  >
                    {time.time}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
