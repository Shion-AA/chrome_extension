const k_ent_data = [
  { agent_id: "", keyword: "" },
  { agent_id: "", keyword: "" },
  { agent_id: "", keyword: "" },
  { agent_id: "", keyword: "" }
];

function filter(targetSection){     //edit this based on the hmtl id
  let origData; //splice targetSection based on the html content id and tags, assign it here
  let outputData = ""; //sotres the output csv string

  //do filering here, concat matching data to outputData

  return outputData;
}

function run() {
  const targetSection = document.getElementById("mp-otd");
  // console.log("Page HTML length:", htmlString.length);
  // outputData = filter(targetSection)
  // alert("" + outputData)
  console.log(targetSection); //temporary
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", run);
} else {
  run();
}