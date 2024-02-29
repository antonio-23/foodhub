import Button from "../../components/Button";
import { Form } from "../../components/Form";
import FormRow from "../../components/FormRow/FormRow";
import { Input } from "../../components/Input";
import {useUpdateUser} from "../../hooks/useUpdateUser.ts";
import {useForm} from "react-hook-form";

interface IFormInput {
    password: string;
    passwordConfirm: string;
}

export default function UpdatePasswordForm() {
    const {updateUser, isUpdating} = useUpdateUser()
    const {register, handleSubmit, getValues, reset, formState} = useForm<IFormInput>()
    const { errors } = formState;


    function onSubmit({password}: {password: string}){
        updateUser({ password });
    }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Nowe hasło (min 6 znaków)' error={errors?.password?.message}>
        <Input
            type='password'
            id='password'
            autoComplete='current-password'
            {...register('password', {minLength: {value: 6, message: 'Hasło musi zawierać 6 znaków'}, required: 'To pole jest wymagane'})}
        />
      </FormRow>

      <FormRow label='Powtórz nowe hasło' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          {...register('passwordConfirm', {minLength: {value: 6, message: 'Hasło musi zawierać 6 znaków'}, required: 'To pole jest wymagane', validate: (value)=> getValues().password === value || 'Hasło musi być takie samo'})}
        />
      </FormRow>

      <FormRow>
        <Button type='reset' variation='secondary' onClick={reset} disabled={isUpdating}>
          Anuluj
        </Button>
        <Button disabled={isUpdating}>Zapisz</Button>
      </FormRow>
    </Form>
  );
}
