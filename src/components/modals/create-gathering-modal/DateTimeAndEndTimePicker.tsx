import DateTimePicker from "@/components/ui/DateTimePicker";

interface IDateTimeAndEndTimePickerProps {
  dateTimeValue: string;
  registrationEndValue: string;
  setDateTimeValue: (value: string) => void;
  setRegistrationEndValue: (value: string) => void;
}

const DateTimeAndEndTimePicker = ({
  dateTimeValue,
  registrationEndValue,
  setDateTimeValue,
  setRegistrationEndValue,
}: IDateTimeAndEndTimePickerProps) => {
  return (
    <section className="flex w-full gap-2">
      <DateTimePicker
        type="dateTime"
        dateTimeValue={dateTimeValue}
        setDateTimeValue={setDateTimeValue}
      />
      <DateTimePicker
        type="registrationEnd"
        dateTimeValue={dateTimeValue}
        registrationEndValue={registrationEndValue}
        setRegistrationEndValue={setRegistrationEndValue}
      />
    </section>
  );
};

export default DateTimeAndEndTimePicker;
