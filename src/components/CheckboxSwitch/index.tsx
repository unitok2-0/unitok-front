import { usePet } from 'contexts/PetContext';
import { toast } from 'react-toastify';
import * as S from './styles';

interface CheckboxSwitchProps {
  isChecked: boolean;
  setChecked: (parameter: boolean) => void;
  tutor: any;
  setTutors: any;
}

export function CheckboxSwitch({
  isChecked,
  setChecked,
  tutor,
  setTutors
}: CheckboxSwitchProps) {
  const { handleUpdateTutor, pet, setPet } = usePet();

  async function showPetInPerfilTutor() {
    try {
      const data = {
        petId: pet?._id,
        tutorId: tutor?.tutorId._id,
        isOwner: !isChecked
      }

      const updatedTutorInPet = await handleUpdateTutor(data);

      setPet(updatedTutorInPet)
      setTutors(updatedTutorInPet.tutors);
      setChecked(!isChecked)
    } catch (error) {
      toast.warning(error)
    }
  }

  return(
    <S.Container>
      <S.Switch 
        checked={isChecked}
        type="checkbox" 
        onChange={showPetInPerfilTutor}
        /* onClick={showPetInPerfilTutor} */
      />
    </S.Container>
  )
}