import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';

import AceEditor, { IEditorProps } from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import { observableTodoStore } from './stores/MobXStore';

interface Props {}

const MobXSnippetCode: React.FC<Props> = props => {
  useEffect(() => {
    console.log('TCL: props', observableTodoStore);
  });

  return (
    <React.Fragment>
      <h3>React reaction</h3>
      {observableTodoStore.todos.map((todo, idx) => (
        <p>
          task {idx}: {todo.task}
        </p>
      ))}
    </React.Fragment>
  );
};

export default observer(MobXSnippetCode);
