import Input from 'components/Inputs/Input'
import { InputPhone } from 'components/Inputs/InputPhone';
import PhoneInput from 'components/PhoneInput';
import { Heading } from 'components/Typography'

import { Container } from './styles'


interface CompanyInfosProps {
  register: any;
  clearErrors: any;
  errors: any;
  control: any;
  setValue: any;
  getValues: any;
}

export function CompanyInfos({ clearErrors, errors, register, control, setValue, getValues }: CompanyInfosProps) {
  return (
    <Container>
      <Input
        name='corporate_name'
        id='corporate_name'
        label='Razão social'
        shouldMaintainLabelOnTop={getValues()?.corporate_name}
        errorMessage={errors?.corporate_name?.message}
        onClick={() => clearErrors('corporate_name')}
        {...register('corporate_name')}
      />
      <Input
        name='document'
        id='document'
        label='CNPJ'
        mask={"99.999.999/9999-99"}
        shouldMaintainLabelOnTop={getValues()?.document}
        errorMessage={errors?.document?.message}
        onClick={() => clearErrors('document')}
        {...register('document')}
      />
      <Input
        name='segment'
        id='segment'
        label='Segmento da empresa'
        shouldMaintainLabelOnTop={getValues()?.segment}
        errorMessage={errors?.segment?.message}
        onClick={() => clearErrors('segment')}
        {...register('segment')}
      />
      <Input
        name='name'
        id='name'
        label='Nome do responsável'
        shouldMaintainLabelOnTop={getValues()?.name}
        errorMessage={errors?.name?.message}
        onClick={() => clearErrors('name')}
        {...register('name')}
      />
      <div className="grid">
        <Input
          label="Celular"
          type="tel"
          name="phone"
          id="phone"
          autoFocus={true}
          defaultValue={getValues()?.phone}
          onPhoneChange={(phone) => setValue('phone', phone)}
          errorMessage={errors?.phone?.message}
          onClick={() => clearErrors("phone")}
          {...register("phone")}
        />
        <Input
          id="email"
          name='email'
          label='E-mail'
          shouldMaintainLabelOnTop={getValues()?.email}
          errorMessage={errors.email?.message}
          onClick={() => clearErrors('email')}
          {...register('email')}
        />
      </div>
    </Container>
  )
}