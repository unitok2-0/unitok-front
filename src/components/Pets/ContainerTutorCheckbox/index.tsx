import { getImageUrl } from 'constants/functions';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as S from './styles';

interface ContainerTutorCheckboxProps {
  listAllTutors: any;
  selectedTutors: any;
  setSelectedTutors: any;
  tutor: any;
}

export function ContainerTutorCheckbox({
  listAllTutors,
  selectedTutors,
  setSelectedTutors,
  tutor
}: ContainerTutorCheckboxProps) {
  const [checkboxSelected, setCheckboxSelected] = useState(false);

  function toggleSelectedTutor(tutorId: string) {

    if(checkboxSelected && selectedTutors.length >= 3) {
      const newListSelectedTutors = selectedTutors.filter((id: string) => tutorId !== id);
      setSelectedTutors(newListSelectedTutors);
      return setCheckboxSelected(false);
    }

    if (selectedTutors.length >= 3) {
      return toast.error('Só é permitido adicionar três tutores!')
    }

    setCheckboxSelected(!checkboxSelected);

    if (checkboxSelected) {
      setSelectedTutors(selectedTutors.filter((id: string) => tutorId !== id))
    } else {
      setSelectedTutors([...selectedTutors, tutorId]);
    }
    
  }

  return (
    <>
      <S.DataTutor key={tutor?.id}>
        <S.Checkbox isDisabled={selectedTutors.length >= 3}>
          <input type="checkbox"
            checked={checkboxSelected}
            onChange={() => toggleSelectedTutor(tutor?._id)}
          />
        </S.Checkbox>

        <S.ImgContainer
          img_src={getImageUrl(tutor?.userImage)}
        />

        <S.Name>
          <strong>{tutor?.full_name}</strong>
          <p>{tutor?.profession}</p>
        </S.Name>
      </S.DataTutor>
    </>
  )
}