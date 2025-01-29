// Load Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
    monaco.editor.create(document.getElementById('editor'), {
        value: `// Write your code here\nconsole.log("Hello, Monaco!");`,
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });
});

// Button Click Example
document.getElementById("myButton").addEventListener("click", () => {
    alert("Button Clicked!");
});
