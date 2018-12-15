const Resumable = require("resumablejs");
const mime = require("mime/lite");

window.onload = async function () {
  const input = document.getElementById("uploader");
  const progressbar = document.getElementById("progress--loaded");
  const fileBox = document.getElementById("fileBox");
  const r = new Resumable({
    target: "http://192.168.99.100:3000/"
  });
  r.assignBrowse(input);

  r.cancel();

  r.on("chunkingComplete", () => r.upload());

  r.on("progress", () => {
    progressbar.style.width = (r.progress() * 240).toFixed(0) + "px";
  });

  
  r.on('fileSuccess', () => {
    loadFiles();
    progressbar.style.width = 0 + "px";
  });
  

  const loadFiles = async () => {
    while (fileBox.firstChild) {
      fileBox.removeChild(fileBox.firstChild);
    }
    const fetched = await fetch("http://192.168.99.100:3000/allFiles");
    const fileNames = await fetched.json();
    

    fileNames.forEach(filename => {
      const fileDiv = document.createElement("div");
      fileDiv.classList.add("file");
      const nameSpan = document.createElement("span");
      nameSpan.textContent = filename.slice(6);
      nameSpan.classList.add("filename");
      fileDiv.appendChild(nameSpan);
      const downloadButton = document.createElement("button");
      downloadButton.classList.add("download");
      downloadButton.textContent = "Download";
      fileDiv.appendChild(downloadButton);
      fileBox.appendChild(fileDiv);
      downloadButton.addEventListener("click", () => {
        fetch(`http://192.168.99.100:3000/download?filename=${filename}`).then(res => {
          return res.blob()
        }).then(blob => {
          const a = document.createElement("a");
          document.body.appendChild(a);
          a.style = "display:none";
          const url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = filename;
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        });
      });
    });
  };

  r.on('fileError', (file, message) => alert(message));

  loadFiles();

};
