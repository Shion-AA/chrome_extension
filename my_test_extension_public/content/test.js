reference_data = [
  { keyword: "Hardness" },
  { keyword: "Best Tool" },
  { keyword: "Material/Tool" },
  { keyword: "Stone Shovel" },
  { keyword: "Wooden" },
  { keyword: "Stone" },
  { keyword: "Iron" },
  { keyword: "Gilded Steel" },
  { keyword: "Diamond" },
  { keyword: "Opal" },
  { keyword: "Void Mattock" }
];

function matchesAnyKeyword(text) {
  return reference_data.some(item =>
    text.includes(item.keyword)
  );
}

function filter(targetSection){     //edit this based on the hmtl id
  let eachRow; //splice targetSection based on the html content id and tags, assign it here
  let outputData = ""; //sotres the output csv string

  // eachRow = targetSection.split(/<tr>|<\/tr>/g).slice(1, -1); // Assuming each row is wrapped in <tr> tags
  eachRow = targetSection.querySelectorAll("tr"); // Get all table rows
  console.log(eachRow);
  eachRow.forEach(row => {
    // let cells = row.split(/<td>|<\/td>/g).slice(1, -1); // Assuming each cell is wrapped in <td> tags
    let cells_th = row.querySelectorAll("th"); // Get all table header cells
    let cells_td = row.querySelectorAll("td"); // Get all table cells
    for(let i = 0; i < cells_th.length; i++) {
      if(matchesAnyKeyword(cells_th[i].innerHTML)){
        if (cells_td[i]) {
          outputData = outputData.concat(cells_td[i].textContent.trim() + ",");
        }
      }
    }
  });
  return outputData;
}

function fallbackCopyToClipboard(text) {  //gpt, might raise browser version error
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';  // Prevents scroll jump
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    const success = document.execCommand('copy');
    console.log(success ? '✅ Fallback copy success' : '❌ Fallback copy failed');
  } catch (err) {
    console.error('❌ Fallback copy error:', err);
  }

  document.body.removeChild(textarea);
}

function run() {
  // const targetSection = document.getElementById("mp-otd");
  // console.log("Page HTML length:", htmlString.length);
  // outputData = filter(targetSection)
  // alert("" + outputData)
  // console.log(targetSection); //temporary
  const table = document.getElementsByClassName("wikitable")[0];
  if(!table) {
    console.error("Table not found");
    return;
  } else {
    let outputData = filter(table);
    // alert(outputData);
    fallbackCopyToClipboard(outputData);
    console.log(outputData);
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}