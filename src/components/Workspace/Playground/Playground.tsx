import React, { useState } from 'react';
import PreferenceNav from './PreferenceNav/PreferenceNav';
import EditorFooter from './EditorFooter/EditorFooter';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { Problem } from '@/utils/types/problem';

type PlaygroundProps = {
  problem: Problem
};

const Playground:React.FC<PlaygroundProps> = ({ problem }) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState(0) 
  
  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav />
      <Split className="h-[calc(100vh-146px)]" direction="vertical" sizes={[60, 40]} minSize={60}>
        <div className="w-full overflow-auto">
          <CodeMirror 
            value={problem.starterCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{fontSize: 16}}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          {/* testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">Testcases</div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white"></hr>
            </div>
          </div>

          <div className="flex">
            {
              problem.examples.map((example, index) => (
                <div 
                  className="mr-2 items-start mt-2" 
                  key={example.id}
                  onClick={() => setActiveTestCaseId(example.id)}
                >
                  <div className="flex flex-wrap items-center gap-y-4">
                    <div className={`caseBtn ${activeTestCaseId === index ? 'text-white' : 'text-gray-500'}`}>Case {index + 1}</div>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input:</p>
            <div className="caseText">
              { problem.examples[activeTestCaseId].inputText }
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output:</p>
            <div className="caseText">
              { problem.examples[activeTestCaseId].outputText }
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter />
    </div>
  )
}
export default Playground;