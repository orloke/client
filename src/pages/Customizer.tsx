import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useSnapshot } from 'valtio';

import { AIPicker } from '../components/AIPicker';
import { ColorPicker } from '../components/ColorPicker';
import { CustomButton } from '../components/CustomButton';
import { FilePicker } from '../components/FilePicker';
import { Tab } from '../components/Tab';
import { DecalTypes, EditorTabs, FilterTabs } from '../config/constants';
import { reader } from '../config/helpers';
import { fadeAnimation, slideAnimation } from '../config/motion';
import state from '../store';

export default function Customizer() {
  const snap = useSnapshot(state);
  const [file, setFile] = useState({} as File);
  const [prompt, setPrompt] = useState('');
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState<
    'colorpicker' | 'filepicker' | 'aipicker' | ''
  >('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generatedTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker setFile={setFile} file={file} readFile={readFile} />;
      case 'aipicker':
        return <AIPicker />;
      default:
        return null;
    }
  };

  const handleAcctiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
    }
    setActiveFilterTab(prev => {
      return {
        ...prev,
        [tabName]: !prev[tabName]
      }
    })
  };

  const handleDecals = (type: string, result: any) => {
    const decalTypes = DecalTypes[type];
    state[decalTypes.stateProperty] = result;
    if (!activeFilterTab[decalTypes.filtertab]) {
      handleAcctiveFilterTab(decalTypes.filterTab);
    }
  };

  const readFile = (type: string) => {
    reader(file).then(result => {
      handleDecals(type, result);
      setActiveEditorTab('');
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation('left')}
          >
            <div className="flex items-center min-h-screen  ">
              <div className="editortabs-container tabs">
                {EditorTabs.map(tab => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generatedTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div
            className="filtertabs-container"
            {...slideAnimation('up')}
          >
            {FilterTabs.map(tab => (
              <Tab
                key={tab.name}
                isFilterTab={true}
                isActiveTab={activeFilterTab[tab.name]}
                tab={tab}
                handleClick={() => handleAcctiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
