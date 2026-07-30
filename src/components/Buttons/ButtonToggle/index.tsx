import React from "react";
import * as S from './styles'

interface ButtonToggleProps {
  label?: string;
  switchValue: boolean;
  onChangeValue: (parameters: boolean) => void;
}
export const ToggleSwitch = ({
  label,
  switchValue,
  onChangeValue
}: ButtonToggleProps) => {
  return (
    <S.Wrapper>
      <div className="container">
        <div className="toggle-switch">
          <input 
            type="checkbox" 
            className="checkbox" 
            onClick={() => onChangeValue(!switchValue)}
            name={label} 
            id={label} 
            checked={switchValue}
          />
          <label className="label" htmlFor={label}>
            <span className="inner" />
            <span className="switch" />
          </label>
        </div>
      </div>
    </S.Wrapper>
  );
};
