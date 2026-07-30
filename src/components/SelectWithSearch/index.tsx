import WindowedSelect from "react-windowed-select"
import * as S from './styles';

interface IOptions {
  label: string;
  value: string | number;
}

interface SelectWithSearchProps {
  value: string;
  setValue: any;
  options: IOptions[];
  placeholder: string;
  instanceId?: string;
}

export default function SelectWithSearch({
  options,
  setValue,
  value,
  placeholder,
  instanceId,
}: SelectWithSearchProps) {
  return (
    <S.SelectInputWrapper>
      <WindowedSelect
        // react-select/react-windowed-select auto-generate an incremental id
        // (react-select-N-...) when no instanceId is given, which can differ
        // between the server render and the client render and causes a
        // hydration mismatch (and, in production, a crashed page). Passing a
        // stable id here keeps server and client output identical.
        instanceId={instanceId ?? placeholder}
        value={options.find(occ => occ.value === value)}
        placeholder={placeholder}
        onChange={(option: any) => { setValue(option.value) }}
        options={options}
        windowThreshold={50}
        styles={{
          container: (base) => ({
            ...base,
            border: 'none',
            outline: 'none',
            borderBottom: '1px solid #01302F',
          }),
          control: (base, state) => ({
            ...base,
            border: 'none',
            borderRadius: 0,
            boxShadow: 'none',
            outline: 'none'
          }),
          input: (base) => ({
            ...base,
            outline: 'none',
          }),
          valueContainer: (base) => ({
            ...base,
            padding: 0,
            color: 'pink'
          }),
          indicatorSeparator: (base) => ({
            display: 'none'
          }),
          option: (base, { isFocused, isSelected }) => ({
            ...base,
            background: isFocused ? '#FFF' : isSelected ? '#FFF' : 'none',
            color: isSelected ? '#FF4C1C' : 'none',
          }),
        }}
      />
    </S.SelectInputWrapper>
  )
}
