
function saveToMarkdown() {
  const currentDate = new Date(new Date(new Date(new Date).toISOString()).getTime() - 6e4 * (new Date).getTimezoneOffset()).toISOString().slice(0, 19).replace("T", " ");
  let chatLog = `\`${currentDate}\`\n`;

  function extractChatContent(chatElement) {
    const chatContentElements = chatElement.querySelectorAll("[class*='min-h-[20px]']");
    let chatContent = "";

    for (let i = 0; i < chatContentElements.length; i++) {
      const chatContentElement = chatContentElements[i].firstChild;

      if (chatContentElement) {
        if (chatContentElement.nodeType === Node.ELEMENT_NODE) {
          const childNodes = chatContentElement.childNodes;

          if (chatContentElement.className.includes("request-")) {
            chatContent += `_ChatGPT_:\n`;
          }

          for (let j = 0; j < childNodes.length; j++) {
            const childNode = childNodes[j];

            if (childNode.nodeType === Node.ELEMENT_NODE) {
              const tagName = childNode.tagName;
              const textContent = childNode.textContent;

              if (tagName === "P") {
                chatContent += textContent + "\n";
              } else if (tagName === "OL") {
                childNode.childNodes.forEach((liNode, index) => {
                  if (liNode.nodeType === Node.ELEMENT_NODE && liNode.tagName === "LI") {
                    chatContent += `${index + 1}. ${liNode.textContent}\n`;
                  }
                });
              } else if (tagName === "UL") {
                childNode.childNodes.forEach((liNode) => {
                  if (liNode.nodeType === Node.ELEMENT_NODE && liNode.tagName === "LI") {
                    chatContent += `- ${liNode.textContent}\n`;
                  }
                });
              } else if (tagName === "PRE") {
                chatContent += "```\n" + textContent + "\n```\n";
              }

              chatContent += "\n";
            }
          }
        } else if (chatContentElement.nodeType === Node.TEXT_NODE) {
          chatContent += `_Prompt_: ${chatContentElement.textContent}\n\n`;
        }
      }
    }

    return chatContent;
  }

  chatLog += extractChatContent(document.body);

  console.save = function (data, filename) {
    filename = filename || 'chatgpt.md';
    const blob = new Blob([data], {type: 'text/plain'});
    const link = document.createElement('a');
    link.download = filename;
    link.href = window.URL.createObjectURL(blob);
    link.dataset.downloadurl = ['text/plain', link.download, link.href].join(':');
    const event = new MouseEvent('click', {
      canBubble: true,
      cancelable: false,
      view: window,
      detail: 0,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: null,
    });
    link.dispatchEvent(event);
  };

  console.save(chatLog, 'chatgpt.md');
}

saveToMarkdown();