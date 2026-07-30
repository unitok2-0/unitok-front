import styled, { css } from 'styled-components';

export const FormEditProfileConarh = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 15.125rem;
  padding-bottom: 8.25rem;
  
  margin: 0 auto;
  max-width: 90%;
  width: 100%;

  .divisionOne{
    max-width: 25.188rem;
    width: 100%;

    .form-control{
      color: #01302F;
    }

    input {
      margin-top: 2.8rem;
    }

    
  }

  .divisionTwo{
    max-width: 25.188rem;
    width: 100%;

    .title{
      font-weight: 500;
      font-size: 1.25rem;
      margin-top: 80px;
    }
  }
`
export const ContainerInput = styled.div`
  position: relative;

  .showPasswordIcon{
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
  }
`

export const ContainerInputPassword = styled.div`
  max-width: 25.188rem;
  width: 100%;
  position: relative;
  margin-top: 43px;
  .showPasswordIcon{
    position: absolute;
    cursor: pointer;
    right: 0;
    bottom: 4px;

    &:hover{
      color: #D14018;
    }
  }
`

export const styleInput = css`
  margin: auto;
  width: 100%;
  margin-top: 2.875rem;
`

export const styleContainer = css`
  margin: auto;
  max-width: 25.188rem;
  width: 100%;
`