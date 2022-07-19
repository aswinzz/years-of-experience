import React, { useCallback, useState } from 'react';
import { SETTINGS_LEFTBAR_ITEMS } from '../constants/SettingsConstants';
import Input from '../components/Input';
import { updateProfile } from '../api/profile';

import '../styles/pages/Settings.css';

function Settings() {
  const [profilePicture, setProfilePicture] = useState<File | undefined | null>();
  const [experiences, setExperiences] = useState<IExperience[]>([
    {
      title: '',
      company: '',
      companyLogo: '',
      start: '',
      end: '',
      current: false
    }
  ]);

  const onExperienceDetailsChange = useCallback((field: string, idx: number, value: string) => {
    experiences[idx][field] = value;
    setExperiences([...experiences]);
  }, [experiences]);

  const [name, setName] = useState<string>('');

  const onNameChange = useCallback((value: string) => {
    setName(value);
  }, [name]);

  const addExperienceItem = useCallback(() => {
    experiences.push({
      title: '',
      company: '',
      companyLogo: '',
      start: '',
      end: '',
      current: false
    });
    setExperiences([...experiences]);
  }, [experiences]);

  const onSaveClick = useCallback(() => {
    const formData = new FormData();
    formData.append('name', name);
    console.log('profilePicture', profilePicture);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }
    experiences.map((experience, idx) => {
      formData.append(`experiences[${idx}][title]`, experience.title);
      formData.append(`experiences[${idx}][company]`, experience.company);
      formData.append(`experiences[${idx}][companyLogo]`, experience.companyLogo);
      formData.append(`experiences[${idx}][start]`, experience.start);
      formData.append(`experiences[${idx}][end]`, experience.end);
    });
    updateProfile(1, formData);
  }, [name, profilePicture, experiences]);


  const onProfilePictureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setProfilePicture(e.target.files[0]);
    }
  }, [profilePicture]);

  return (
    <div className='settings-container'>
      <div className='settings-header'>
        <div className='settings-header__title'>
          Settings
        </div>
        <div className='settings-header__action'>
          <button onClick={onSaveClick} className='btn'>
            Save
          </button>
        </div>
      </div>

      <div className='settings-content'>
        <div className='settings-panel__left'>
          <div className='settings-left-panel'>
            {SETTINGS_LEFTBAR_ITEMS.map((item, idx) => (
              <div key={idx} className='settings-left-panel__item'>
                {item}
              </div>  
            ))}
          </div>
        </div>
        <div className='settings-panel__right'>
          <div className='settings-right-panel__header'>
            Profile Details
          </div>
          <div className='settings-right-panel__content'>
              <div className='profile-details-section'>
                <div className='profile-details-section__header'>
                  Basic Details
                </div>
              </div>
              <div className='profile-details-section'>
                <div className='profile-details-section-input__container'>
                  <Input label='Name' value={name} onChange={onNameChange}/>
                </div>
                <div className='profile-details-section-input__container'>
                  <input type="file" id="fileInput" className="drop-zoon__file-input" accept="image/*" onChange={onProfilePictureChange} />
                </div>
              </div>
              <div className='profile-details-section'>
                <div className='profile-details-section__header'>
                  Experience Details
                </div>
              </div>
              <div className='profile-details-section'>
                <div className='profile-details-section-input__container'>
                  {experiences.map((experience, idx) => {
                    return (
                      <div key={`experience-${idx}`} className='profile-details-section-experience__container'>
                        <div className='profile-details-section-experience__field'>
                          <Input label='Title' value={experience.title} onChange={(value: string) => onExperienceDetailsChange('title', idx, value)} />
                        </div>
                        <div className='profile-details-section-experience__field'>
                          <Input label='Company' value={experience.company} onChange={(value: string) => onExperienceDetailsChange('company', idx, value)}/>
                        </div>
                        <div className='profile-details-section-experience__field'>
                          <Input label='CompanyLogo' value={experience.companyLogo} onChange={(value: string) => onExperienceDetailsChange('companyLogo', idx, value)}/>
                        </div>
                        <div className='profile-details-section-experience__field'>
                          <Input type="date" label='Start' value={experience.start} onChange={(value: string) => onExperienceDetailsChange('start', idx, value)}/>
                        </div>
                        <div className='profile-details-section-experience__field'>
                          <Input type="date" label='End' value={experience.end} onChange={(value: string) => onExperienceDetailsChange('end', idx, value)}/>
                        </div>
                      </div>
                    );
                  })}
                  <div className='profile-details-section-experience__add'>
                    <button onClick={addExperienceItem} className='btn'>
                      Add
                    </button>
                  </div>                  
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface IExperience extends Record<string, any> {
  title: string,
  company: string,
  companyLogo: string,
  start: string,
  end: string,
  current: boolean
}

export default Settings;
