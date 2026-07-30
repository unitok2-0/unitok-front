import { useCallback, useEffect, useState } from "react";
import { UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import {
  GenericDropdown,
  GenericDropdownButton,
} from "components/GenericDropdown";
import useDisclosure from "hooks/useDisclosure";

import { BsChevronDown } from "react-icons/bs";

import * as S from "./styles";

export type SelectOption = {
  value: string;
  label: string | number;
};

export type SelectProps = {
  options: SelectOption[];
  selectId: string;
  onSelect?: (selectedOption: SelectOption) => void;
  defaultSelectedOptionValue?: string;
  placeholder?: string;
  label: string;
  isFormEditStyles?: boolean;
  /** First argument must be the same as selectId */
  reactHookFormRegisterReturn?: UseFormRegisterReturn;
  errorMessage?: any;
};

export default function Select(props: SelectProps) {
  const { onSelect } = props;
  const { isOpen, handleClose, handleOpen, handleToggle } = useDisclosure();

  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >(
    props.defaultSelectedOptionValue
      ? props.options.find(
        ({ value: id }) => props.defaultSelectedOptionValue === id
      )
      : undefined
  );

  const handleSelect = useCallback(
    (selectedOption: SelectOption) => {
      return () => {
        setSelectedOption(selectedOption);
        onSelect?.(selectedOption);
        handleClose();
      };
    },
    [onSelect, handleClose]
  );

  return (
    <S.Wrapper
      shouldMaintainLabelOnTop={!!selectedOption}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onClick={() => {
        isOpen ? handleClose() : handleOpen()
      }}
      hasError={!!props.errorMessage}
    >
      <GenericDropdown
        customStyles="max-height: 19rem; width: 100%; margin-top: 0.5rem; overflow-y: scroll"
        shouldShowContent={isOpen}
        onClickOutside={handleClose}
        header={
          <>
            { !props.isFormEditStyles && <S.Label>{props.label}</S.Label>}
            <S.Selected
              onClick={handleOpen}
              type="button"
              className="chevron-animation"
              isFormEditStyles={props.isFormEditStyles}
            >
              <span>{selectedOption?.label || props.label}</span>
              <BsChevronDown />
            </S.Selected>
          </>
        }
      >
        {props.options.map((option) => {
          const { onChange, ...inputRegister } =
            props.reactHookFormRegisterReturn || {};

          return (
            <GenericDropdownButton
              style={{ width: "100%" }}
              as="label"
              key={option.value}
            >
              <S.HiddenRadio
                id={`option-${props.selectId}-${option.value}`}
                name={props.selectId}
                value={option.value}
                checked={option.value === selectedOption?.value}
                className="sr-only"
                onChange={(event) => {
                  handleSelect(option)();
                  onChange?.(event);
                }}
                {...inputRegister}
              />
              {option.label}
            </GenericDropdownButton>
          );
        })}
      </GenericDropdown>

      {props.errorMessage && (
        <S.Message isError>{props.errorMessage}</S.Message>
      )}
    </S.Wrapper>
  );
}
