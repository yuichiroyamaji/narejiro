import React, { useState, useEffect } from 'react';
import SimpleMde from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import marked from 'marked';
import DOMPurify from 'dompurify';

const MarkdownEditor: React.FC = () => {
  const [markdownValue, setMarkdownValue] = useState<string>('hello');

  const onChange = (value: string) => {
    setMarkdownValue(value);
  };

  useEffect(() => {
    const preview = document.getElementById('preview');
    if (preview) {
      preview.innerHTML = DOMPurify.sanitize(marked.parse(markdownValue));
    }
  }, [markdownValue]);
  

  return (
    <>
      <SimpleMde value={markdownValue} onChange={onChange} />
      <div>
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked.parse(markdownValue))}}></div>
      </div>
    </>
  );
};

export default MarkdownEditor;
